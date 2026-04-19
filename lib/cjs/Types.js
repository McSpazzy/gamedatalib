"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/Types.ts
var Types_exports = {};
__export(Types_exports, {
  KNOWN_STRUCT_TYPES: () => KNOWN_STRUCT_TYPES,
  STRUCT_TYPE_METADATA: () => STRUCT_TYPE_METADATA,
  STRUCT_VALUE_TYPES: () => STRUCT_VALUE_TYPES,
  StructType: () => StructType,
  createEmptyParsedGameData: () => createEmptyParsedGameData
});
module.exports = __toCommonJS(Types_exports);
var StructType = /* @__PURE__ */ ((StructType2) => {
  StructType2[StructType2["Bool"] = 0] = "Bool";
  StructType2[StructType2["BoolArray"] = 1] = "BoolArray";
  StructType2[StructType2["Int"] = 2] = "Int";
  StructType2[StructType2["IntArray"] = 3] = "IntArray";
  StructType2[StructType2["Float"] = 4] = "Float";
  StructType2[StructType2["FloatArray"] = 5] = "FloatArray";
  StructType2[StructType2["Enum"] = 6] = "Enum";
  StructType2[StructType2["EnumArray"] = 7] = "EnumArray";
  StructType2[StructType2["Vector2"] = 8] = "Vector2";
  StructType2[StructType2["Vector2Array"] = 9] = "Vector2Array";
  StructType2[StructType2["Vector3"] = 10] = "Vector3";
  StructType2[StructType2["Vector3Array"] = 11] = "Vector3Array";
  StructType2[StructType2["String16"] = 12] = "String16";
  StructType2[StructType2["String16Array"] = 13] = "String16Array";
  StructType2[StructType2["String32"] = 14] = "String32";
  StructType2[StructType2["String32Array"] = 15] = "String32Array";
  StructType2[StructType2["String64"] = 16] = "String64";
  StructType2[StructType2["String64Array"] = 17] = "String64Array";
  StructType2[StructType2["Binary"] = 18] = "Binary";
  StructType2[StructType2["BinaryArray"] = 19] = "BinaryArray";
  StructType2[StructType2["UInt"] = 20] = "UInt";
  StructType2[StructType2["UIntArray"] = 21] = "UIntArray";
  StructType2[StructType2["Int64"] = 22] = "Int64";
  StructType2[StructType2["Int64Array"] = 23] = "Int64Array";
  StructType2[StructType2["UInt64"] = 24] = "UInt64";
  StructType2[StructType2["UInt64Array"] = 25] = "UInt64Array";
  StructType2[StructType2["WString16"] = 26] = "WString16";
  StructType2[StructType2["WString16Array"] = 27] = "WString16Array";
  StructType2[StructType2["WString32"] = 28] = "WString32";
  StructType2[StructType2["WString32Array"] = 29] = "WString32Array";
  StructType2[StructType2["WString64"] = 30] = "WString64";
  StructType2[StructType2["WString64Array"] = 31] = "WString64Array";
  StructType2[StructType2["Bool64bitKey"] = 32] = "Bool64bitKey";
  return StructType2;
})(StructType || {});
var STRUCT_TYPE_METADATA = {
  [0 /* Bool */]: { section: "Bool", storage: "value", hasCount: false, isArray: false },
  [1 /* BoolArray */]: { section: "BoolArray", storage: "offset", hasCount: true, isArray: true },
  [2 /* Int */]: { section: "Int", storage: "value", hasCount: false, isArray: false },
  [3 /* IntArray */]: { section: "IntArray", storage: "offset", hasCount: true, isArray: true },
  [4 /* Float */]: { section: "Float", storage: "value", hasCount: false, isArray: false },
  [5 /* FloatArray */]: { section: "FloatArray", storage: "offset", hasCount: true, isArray: true },
  [6 /* Enum */]: { section: "Enum", storage: "value", hasCount: false, isArray: false },
  [7 /* EnumArray */]: { section: "EnumArray", storage: "offset", hasCount: true, isArray: true },
  [8 /* Vector2 */]: { section: "Vector2", storage: "offset", hasCount: false, isArray: false },
  [9 /* Vector2Array */]: { section: "Vector2Array", storage: "offset", hasCount: true, isArray: true },
  [10 /* Vector3 */]: { section: "Vector3", storage: "offset", hasCount: false, isArray: false },
  [11 /* Vector3Array */]: { section: "Vector3Array", storage: "offset", hasCount: true, isArray: true },
  [12 /* String16 */]: { section: "String16", storage: "offset", hasCount: false, isArray: false },
  [13 /* String16Array */]: { section: "String16Array", storage: "offset", hasCount: true, isArray: true },
  [14 /* String32 */]: { section: "String32", storage: "offset", hasCount: false, isArray: false },
  [15 /* String32Array */]: { section: "String32Array", storage: "offset", hasCount: true, isArray: true },
  [16 /* String64 */]: { section: "String64", storage: "offset", hasCount: false, isArray: false },
  [17 /* String64Array */]: { section: "String64Array", storage: "offset", hasCount: true, isArray: true },
  [18 /* Binary */]: { section: "Binary", storage: "offset", hasCount: false, isArray: false },
  [19 /* BinaryArray */]: { section: "BinaryArray", storage: "offset", hasCount: true, isArray: true },
  [20 /* UInt */]: { section: "UInt", storage: "value", hasCount: false, isArray: false },
  [21 /* UIntArray */]: { section: "UIntArray", storage: "offset", hasCount: true, isArray: true },
  [22 /* Int64 */]: { section: "Int64", storage: "offset", hasCount: false, isArray: false },
  [23 /* Int64Array */]: { section: "Int64Array", storage: "offset", hasCount: true, isArray: true },
  [24 /* UInt64 */]: { section: "UInt64", storage: "offset", hasCount: false, isArray: false },
  [25 /* UInt64Array */]: { section: "UInt64Array", storage: "offset", hasCount: true, isArray: true },
  [26 /* WString16 */]: { section: "WString16", storage: "offset", hasCount: false, isArray: false },
  [27 /* WString16Array */]: { section: "WString16Array", storage: "offset", hasCount: true, isArray: true },
  [28 /* WString32 */]: { section: "WString32", storage: "offset", hasCount: false, isArray: false },
  [29 /* WString32Array */]: { section: "WString32Array", storage: "offset", hasCount: true, isArray: true },
  [30 /* WString64 */]: { section: "WString64", storage: "offset", hasCount: false, isArray: false },
  [31 /* WString64Array */]: { section: "WString64Array", storage: "offset", hasCount: true, isArray: true },
  [32 /* Bool64bitKey */]: { section: "Bool64bitKey", storage: "offset", hasCount: true, isArray: true }
};
var KNOWN_STRUCT_TYPES = new Set(Object.keys(STRUCT_TYPE_METADATA).map((type) => Number(type)));
var STRUCT_VALUE_TYPES = /* @__PURE__ */ new Set([0 /* Bool */, 2 /* Int */, 4 /* Float */, 6 /* Enum */, 20 /* UInt */]);
var createEmptyParsedGameData = () => ({
  Bool: {},
  BoolArray: {},
  Int: {},
  IntArray: {},
  Float: {},
  FloatArray: {},
  Enum: {},
  EnumArray: {},
  Vector2: {},
  Vector2Array: {},
  Vector3: {},
  Vector3Array: {},
  String16: {},
  String16Array: {},
  String32: {},
  String32Array: {},
  String64: {},
  String64Array: {},
  Binary: {},
  BinaryArray: {},
  UInt: {},
  UIntArray: {},
  Int64: {},
  Int64Array: {},
  UInt64: {},
  UInt64Array: {},
  WString16: {},
  WString16Array: {},
  WString32: {},
  WString32Array: {},
  WString64: {},
  WString64Array: {},
  Bool64bitKey: {}
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  KNOWN_STRUCT_TYPES,
  STRUCT_TYPE_METADATA,
  STRUCT_VALUE_TYPES,
  StructType,
  createEmptyParsedGameData
});
