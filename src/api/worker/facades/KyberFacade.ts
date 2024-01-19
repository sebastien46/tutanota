import { LazyLoaded } from "@tutao/tutanota-utils"
import { NativeCryptoFacade } from "../../../native/common/generatedipc/NativeCryptoFacade.js"
import { assertWorkerOrNode } from "../../common/Env.js"
import {
	decapsulateKyber,
	encapsulateKyber,
	generateKeyPairKyber,
	KYBER_RAND_AMOUNT_OF_ENTROPY,
	KyberEncapsulation,
	KyberKeyPair,
	KyberPrivateKey,
	KyberPublicKey,
	random,
} from "@tutao/tutanota-crypto"

assertWorkerOrNode()

/**
 * Abstract interface for the Liboqs crypto system.
 */
export interface KyberFacade {
	/**
	 * Generate a key new random key pair
	 */
	generateKeypair(): Promise<KyberKeyPair>

	/**
	 *
	 * @param publicKey the public key to encapsulate the secret with
	 * @returns the ciphertext and the shared secret
	 */
	encapsulate(publicKey: KyberPublicKey): Promise<KyberEncapsulation>

	/**
	 *
	 * @param privateKey the corresponding private key to the public key used to encapsulate the cipher text
	 * @param ciphertext the encapsulated ciphertext
	 * @returns the shared secret
	 */
	decapsulate(privateKey: KyberPrivateKey, ciphertext: Uint8Array): Promise<Uint8Array>
}

/**
 * WebAssembly implementation of Liboqs
 */
export class WASMKyberFacade implements KyberFacade {
	constructor(private readonly testWASM?: WebAssembly.Exports) {}

	// loads liboqs WASM
	private liboqs: LazyLoaded<WebAssembly.Exports> = new LazyLoaded(async () => {
		if (this.testWASM) {
			return this.testWASM
		}
		const wasm = fetch("wasm/liboqs.wasm")
		if (WebAssembly.instantiateStreaming) {
			return (await WebAssembly.instantiateStreaming(wasm)).instance.exports
		} else {
			// Fallback if the client does not support instantiateStreaming
			const buffer = await (await wasm).arrayBuffer()
			return (await WebAssembly.instantiate(buffer)).instance.exports
		}
	})

	async generateKeypair(): Promise<KyberKeyPair> {
		return generateKeyPairKyber(await this.liboqs.getAsync(), random)
	}

	async encapsulate(publicKey: KyberPublicKey): Promise<KyberEncapsulation> {
		return encapsulateKyber(await this.liboqs.getAsync(), publicKey, random)
	}

	async decapsulate(privateKey: KyberPrivateKey, ciphertext: Uint8Array): Promise<Uint8Array> {
		return decapsulateKyber(await this.liboqs.getAsync(), privateKey, ciphertext)
	}
}

/**
 * Native implementation of Liboqs
 */
export class NativeKyberFacade implements KyberFacade {
	constructor(private readonly nativeCryptoFacade: NativeCryptoFacade) {}

	generateKeypair(): Promise<KyberKeyPair> {
		return this.nativeCryptoFacade.generateKyberKeypair(random.generateRandomData(KYBER_RAND_AMOUNT_OF_ENTROPY))
	}

	encapsulate(publicKey: KyberPublicKey): Promise<KyberEncapsulation> {
		return this.nativeCryptoFacade.kyberEncapsulate(publicKey, random.generateRandomData(KYBER_RAND_AMOUNT_OF_ENTROPY))
	}

	decapsulate(privateKey: KyberPrivateKey, ciphertext: Uint8Array): Promise<Uint8Array> {
		return this.nativeCryptoFacade.kyberDecapsulate(privateKey, ciphertext)
	}
}
