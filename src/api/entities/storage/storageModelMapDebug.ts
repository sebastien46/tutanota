const map: Record<string, unknown> = {
	"BlobDataGet": () => Promise.resolve({
		"_TypeModel": {
			"name": "BlobDataGet",
			"since": 1,
			"type": "DATA_TRANSFER_TYPE",
			"id": 50,
			"rootId": "B3N0b3JhZ2UAMg",
			"versioned": false,
			"encrypted": false,
			"values": {
				"_format": {
					"id": 51,
					"type": "Number",
					"cardinality": "One",
					"final": false,
					"encrypted": false
				},
				"archiveId": {"id": 52, "type": "GeneratedId", "cardinality": "One", "final": false, "encrypted": false}
			},
			"associations": {
				"blobId": {
					"id": 53,
					"type": "AGGREGATION",
					"cardinality": "One",
					"final": true,
					"refType": "BlobId",
					"dependency": "sys"
				}
			},
			"app": "storage",
			"version": "2"
		}
	}),
	"BlobWriteData": () => Promise.resolve({
		"_TypeModel": {
			"name": "BlobWriteData",
			"since": 1,
			"type": "AGGREGATED_TYPE",
			"id": 73,
			"rootId": "B3N0b3JhZ2UASQ",
			"versioned": false,
			"encrypted": false,
			"values": {
				"_id": {"id": 74, "type": "CustomId", "cardinality": "One", "final": true, "encrypted": false},
				"archiveOwnerGroup": {
					"id": 75,
					"type": "GeneratedId",
					"cardinality": "One",
					"final": false,
					"encrypted": false
				}
			},
			"associations": {
				"type": {
					"id": 76,
					"type": "AGGREGATION",
					"cardinality": "One",
					"final": true,
					"refType": "TypeInfo",
					"dependency": "sys"
				}
			},
			"app": "storage",
			"version": "2"
		}
	}),
	"BlobAccessTokenData": () => Promise.resolve({
		"_TypeModel": {
			"name": "BlobAccessTokenData",
			"since": 1,
			"type": "DATA_TRANSFER_TYPE",
			"id": 77,
			"rootId": "B3N0b3JhZ2UATQ",
			"versioned": false,
			"encrypted": false,
			"values": {
				"_format": {
					"id": 78,
					"type": "Number",
					"cardinality": "One",
					"final": false,
					"encrypted": false
				},
				"readArchiveId": {
					"id": 79,
					"type": "GeneratedId",
					"cardinality": "ZeroOrOne",
					"final": false,
					"encrypted": false
				}
			},
			"associations": {
				"write": {
					"id": 80,
					"type": "AGGREGATION",
					"cardinality": "ZeroOrOne",
					"final": false,
					"refType": "BlobWriteData",
					"dependency": null
				}
			},
			"app": "storage",
			"version": "2"
		}
	}),
	"BlobAccessTokenReturn": () => Promise.resolve({
		"_TypeModel": {
			"name": "BlobAccessTokenReturn",
			"since": 1,
			"type": "DATA_TRANSFER_TYPE",
			"id": 81,
			"rootId": "B3N0b3JhZ2UAUQ",
			"versioned": false,
			"encrypted": false,
			"values": {
				"_format": {
					"id": 82,
					"type": "Number",
					"cardinality": "One",
					"final": false,
					"encrypted": false
				}
			},
			"associations": {
				"blobAccessInfo": {
					"id": 83,
					"type": "AGGREGATION",
					"cardinality": "One",
					"final": false,
					"refType": "BlobAccessInfo",
					"dependency": "sys"
				}
			},
			"app": "storage",
			"version": "2"
		}
	}),
	"BlobReferenceDataPut": () => Promise.resolve({
		"_TypeModel": {
			"name": "BlobReferenceDataPut",
			"since": 1,
			"type": "DATA_TRANSFER_TYPE",
			"id": 94,
			"rootId": "B3N0b3JhZ2UAXg",
			"versioned": false,
			"encrypted": false,
			"values": {
				"_format": {
					"id": 95,
					"type": "Number",
					"cardinality": "One",
					"final": false,
					"encrypted": false
				},
				"blobReferenceToken": {
					"id": 96,
					"type": "Bytes",
					"cardinality": "One",
					"final": false,
					"encrypted": false
				},
				"field": {"id": 108, "type": "String", "cardinality": "One", "final": false, "encrypted": false},
				"instanceElementId": {
					"id": 107,
					"type": "GeneratedId",
					"cardinality": "ZeroOrOne",
					"final": false,
					"encrypted": false
				},
				"instanceListElementId": {
					"id": 98,
					"type": "GeneratedId",
					"cardinality": "ZeroOrOne",
					"final": false,
					"encrypted": false
				},
				"instanceListId": {
					"id": 97,
					"type": "GeneratedId",
					"cardinality": "ZeroOrOne",
					"final": false,
					"encrypted": false
				}
			},
			"associations": {
				"type": {
					"id": 99,
					"type": "AGGREGATION",
					"cardinality": "One",
					"final": true,
					"refType": "TypeInfo",
					"dependency": "sys"
				}
			},
			"app": "storage",
			"version": "2"
		}
	}),
	"BlobReferenceDataDelete": () => Promise.resolve({
		"_TypeModel": {
			"name": "BlobReferenceDataDelete",
			"since": 1,
			"type": "DATA_TRANSFER_TYPE",
			"id": 100,
			"rootId": "B3N0b3JhZ2UAZA",
			"versioned": false,
			"encrypted": false,
			"values": {
				"_format": {
					"id": 101,
					"type": "Number",
					"cardinality": "One",
					"final": false,
					"encrypted": false
				},
				"field": {"id": 109, "type": "String", "cardinality": "One", "final": false, "encrypted": false},
				"instanceListElementId": {
					"id": 103,
					"type": "GeneratedId",
					"cardinality": "One",
					"final": false,
					"encrypted": false
				},
				"instanceListId": {
					"id": 102,
					"type": "GeneratedId",
					"cardinality": "One",
					"final": false,
					"encrypted": false
				}
			},
			"associations": {
				"blobs": {
					"id": 105,
					"type": "AGGREGATION",
					"cardinality": "Any",
					"final": true,
					"refType": "Blob",
					"dependency": "sys"
				},
				"type": {
					"id": 104,
					"type": "AGGREGATION",
					"cardinality": "One",
					"final": true,
					"refType": "TypeInfo",
					"dependency": "sys"
				}
			},
			"app": "storage",
			"version": "2"
		}
	}),
}
export default map