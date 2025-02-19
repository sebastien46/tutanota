import m, { Children, Component } from "mithril"
import type { DomMutation } from "../animation/Animations"
import { animations } from "../animation/Animations"
import { ease } from "../animation/Easing"
import { LayerType } from "../../RootView"
import type { lazy } from "@tutao/tutanota-utils"
import { remove } from "@tutao/tutanota-utils"
import { assertMainOrNodeBoot } from "../../api/common/Env"

assertMainOrNodeBoot()
export type PositionRect = {
	top?: string | null
	left?: string | null
	right?: string | null
	width?: string | null
	bottom?: string | null
	height?: string | null
	zIndex?: LayerType
}
type AnimationProvider = (dom: HTMLElement) => DomMutation
type OverlayAttrs = {
	component: Component
	position: lazy<PositionRect>
	createAnimation?: AnimationProvider
	closeAnimation?: AnimationProvider
	shadowClass: string
}

type Overlay = [OverlayAttrs, HTMLElement | null, number]
const overlays: Array<Overlay> = []
let key = 0

export function displayOverlay(
	position: lazy<PositionRect>,
	component: Component,
	createAnimation?: AnimationProvider,
	closeAnimation?: AnimationProvider,
	shadowClass: string = "dropdown-shadow",
): () => Promise<void> {
	const newAttrs = {
		position,
		component,
		createAnimation,
		closeAnimation,
		shadowClass,
	}
	const pair = [newAttrs, null, key++] as Overlay
	overlays.push(pair)
	return async () => {
		const dom = pair[1]
		const animation =
			newAttrs.closeAnimation && dom
				? animations.add(dom, newAttrs.closeAnimation(dom), {
						duration: 100,
						easing: ease.in,
				  })
				: Promise.resolve()
		await animation

		if (remove(overlays, pair)) {
			m.redraw()
		}
	}
}

export const overlay: Component = {
	view: (): Children =>
		m(
			// we want the overlays to position relative to the overlay parent
			// the overlay parent also should fill the root
			"#overlay.fill-absolute.noprint",
			{
				style: {
					display: overlays.length > 0 ? "" : "none",
					"margin-top": "env(safe-area-inset-top)", // insets for iPhone X
					// we would need to change this if we wanted something to appear from the side
					"margin-left": "env(safe-area-inset-left)",
					"margin-right": "env(safe-area-inset-right)",
				},
				"aria-hidden": overlays.length === 0,
			},
			overlays.map((overlayAttrs) => {
				const [attrs, dom, key] = overlayAttrs
				const position = attrs.position()
				return m(
					".abs.elevated-bg." + attrs.shadowClass,
					{
						key,
						style: {
							width: position.width,
							top: position.top,
							bottom: position.bottom,
							right: position.right,
							left: position.left,
							height: position.height,
							"z-index": position.zIndex != null ? position.zIndex : LayerType.Overlay,
						},
						oncreate: (vnode) => {
							const dom = vnode.dom as HTMLElement
							overlayAttrs[1] = dom

							if (attrs.createAnimation) {
								animations.add(dom, attrs.createAnimation(dom))
							}
						},
						onremove: () => {
							overlayAttrs[1] = null
						},
					},
					m(attrs.component),
				)
			}),
		),
}
