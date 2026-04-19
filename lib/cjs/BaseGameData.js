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

// src/BaseGameData.ts
var BaseGameData_exports = {};
__export(BaseGameData_exports, {
  BaseGameData: () => BaseGameData
});
module.exports = __toCommonJS(BaseGameData_exports);
var BaseGameData = class {
  Bool = {};
  BoolArray = {};
  Int = {};
  IntArray = {};
  Float = {};
  FloatArray = {};
  Enum = {};
  EnumArray = {};
  Vector2 = {};
  Vector2Array = {};
  Vector3 = {};
  Vector3Array = {};
  String16 = {};
  String16Array = {};
  String32 = {};
  String32Array = {};
  String64 = {};
  String64Array = {};
  Binary = {};
  BinaryArray = {};
  UInt = {};
  UIntArray = {};
  Int64 = {};
  Int64Array = {};
  UInt64 = {};
  UInt64Array = {};
  WString16 = {};
  WString16Array = {};
  WString32 = {};
  WString32Array = {};
  WString64 = {};
  WString64Array = {};
  Bool64bitKey = {};
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseGameData
});
