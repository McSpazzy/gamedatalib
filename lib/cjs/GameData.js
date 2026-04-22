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

// src/GameData.ts
var GameData_exports = {};
__export(GameData_exports, {
  GameData: () => GameData
});
module.exports = __toCommonJS(GameData_exports);

// src/Types.ts
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

// src/Codecs/Bool.ts
var boolCodec = {
  read: (view, offset) => view.getUint32(offset, true) === 1,
  write: (view, offset, value) => view.setUint32(offset, value ? 1 : 0, true),
  byteLength: (_value) => 4
};

// src/Codecs/BoolArray.ts
var boolArrayCodec = {
  read: (view, offset) => {
    const count = view.getUint32(offset, true);
    const wordCount = count + 31 >>> 5;
    const values = new Array(count);
    for (let i = 0; i < wordCount; i++) {
      const word = view.getUint32(offset + 4 + i * 4, true);
      for (let bit = 0; bit < 32; bit++) {
        const valueIndex = i * 32 + bit;
        if (valueIndex >= count) {
          break;
        }
        values[valueIndex] = (word & 1 << bit) !== 0;
      }
    }
    return values;
  },
  write: (view, offset, value) => {
    const count = value.length;
    const wordCount = count + 31 >>> 5;
    const bitsOffset = offset + 4;
    view.setUint32(offset, count, true);
    for (let i = 0; i < wordCount; i++) {
      const base = i * 32;
      let word = 0;
      for (let bit = 0; bit < 32; bit++) {
        const valueIndex = base + bit;
        if (valueIndex >= count) {
          break;
        }
        if (value[valueIndex]) {
          word |= 1 << bit;
        }
      }
      view.setUint32(bitsOffset + i * 4, word >>> 0, true);
    }
  },
  byteLength: (value) => 4 + Math.ceil(value.length / 32) * 4
};

// src/Codecs/Bool64bitKey.ts
var bool64bitKeyCodec = {
  read: (view, offset) => {
    const values = [];
    let cursor = offset;
    const limit = view.buffer.byteLength;
    while (cursor + 8 <= limit) {
      const value = view.getBigUint64(cursor, true);
      if (value === 0n) {
        break;
      }
      values.push(value);
      cursor += 8;
    }
    return values;
  },
  write: (view, offset, value) => {
    let cursor = offset;
    for (const item of value) {
      view.setBigUint64(cursor, item, true);
      cursor += 8;
    }
    view.setBigUint64(cursor, 0n, true);
  },
  byteLength: (value) => 8 + value.length * 8
};

// src/Codecs/Int.ts
var intCodec = {
  read: (view, offset) => view.getInt32(offset, true),
  write: (view, offset, value) => view.setInt32(offset, value, true),
  byteLength: (_value) => 4
};

// src/Codecs/UInt.ts
var uintCodec = {
  read: (view, offset) => view.getUint32(offset, true),
  write: (view, offset, value) => view.setUint32(offset, value, true),
  byteLength: (_value) => 4
};

// src/Codecs/UIntArray.ts
var uintArrayCodec = {
  read: (view, offset) => {
    const count = view.getUint32(offset, true);
    return view.getUint32Array(offset + 4, count, true);
  },
  write: (view, offset, value) => {
    view.setUint32(offset, value.length, true);
    view.setUint32Array(offset + 4, value, true);
  },
  byteLength: (value) => 4 + value.length * 4
};

// src/Codecs/Float.ts
var floatCodec = {
  read: (view, offset) => view.getFloat32(offset, true),
  write: (view, offset, value) => view.setFloat32(offset, value, true),
  byteLength: (_value) => 4
};

// src/Codecs/Int64.ts
var int64Codec = {
  read: (view, offset) => view.getBigInt64(offset, true),
  write: (view, offset, value) => view.setBigInt64(offset, value, true),
  byteLength: (_value) => 8
};

// src/Codecs/UInt64.ts
var uint64Codec = {
  read: (view, offset) => view.getBigUint64(offset, true),
  write: (view, offset, value) => view.setBigUint64(offset, value, true),
  byteLength: (_value) => 8
};

// src/Codecs/IntArray.ts
var intArrayCodec = {
  read: (view, offset) => {
    const count = view.getUint32(offset, true);
    return view.getInt32Array(offset + 4, count, true);
  },
  write: (view, offset, value) => {
    view.setUint32(offset, value.length, true);
    view.setInt32Array(offset + 4, value, true);
  },
  byteLength: (value) => 4 + value.length * 4
};

// src/Codecs/FloatArray.ts
var floatArrayCodec = {
  read: (view, offset) => {
    const count = view.getUint32(offset, true);
    return view.getFloat32Array(offset + 4, count, true);
  },
  write: (view, offset, value) => {
    view.setUint32(offset, value.length, true);
    view.setFloat32Array(offset + 4, value, true);
  },
  byteLength: (value) => 4 + value.length * 4
};

// src/Codecs/Int64Array.ts
var int64ArrayCodec = {
  read: (view, offset) => {
    const count = view.getUint32(offset, true);
    return view.getBigInt64Array(offset + 4, count, true);
  },
  write: (view, offset, value) => {
    view.setUint32(offset, value.length, true);
    view.setBigInt64Array(offset + 4, value, true);
  },
  byteLength: (value) => 4 + value.length * 8
};

// src/Codecs/UInt64Array.ts
var uint64ArrayCodec = {
  read: (view, offset) => {
    const count = view.getUint32(offset, true);
    return view.getBigUint64Array(offset + 4, count, true);
  },
  write: (view, offset, value) => {
    view.setUint32(offset, value.length, true);
    view.setBigUint64Array(offset + 4, value, true);
  },
  byteLength: (value) => 4 + value.length * 8
};

// src/Codecs/Vector2.ts
var vector2Codec = {
  read: (view, offset) => {
    return {
      x: view.getFloat32(offset, true),
      y: view.getFloat32(offset + 4, true)
    };
  },
  write: (view, offset, value) => {
    view.setFloat32(offset, value.x, true);
    view.setFloat32(offset + 4, value.y, true);
  },
  byteLength: (_value) => 8
};

// src/Codecs/Vector2Array.ts
var VECTOR2_SIZE = 8;
var vector2ArrayCodec = {
  read: (view, offset) => {
    const count = view.getUint32(offset, true);
    const values = [];
    let cursor = offset + 4;
    for (let i = 0; i < count; i += 1) {
      values.push({
        x: view.getFloat32(cursor, true),
        y: view.getFloat32(cursor + 4, true)
      });
      cursor += VECTOR2_SIZE;
    }
    return values;
  },
  write: (view, offset, value) => {
    view.setUint32(offset, value.length, true);
    let cursor = offset + 4;
    for (const vector of value) {
      view.setFloat32(cursor, vector.x, true);
      view.setFloat32(cursor + 4, vector.y, true);
      cursor += VECTOR2_SIZE;
    }
  },
  byteLength: (value) => 4 + value.length * VECTOR2_SIZE
};

// src/Codecs/Vector3.ts
var vector3Codec = {
  read: (view, offset) => {
    return {
      x: view.getFloat32(offset, true),
      y: view.getFloat32(offset + 4, true),
      z: view.getFloat32(offset + 8, true)
    };
  },
  write: (view, offset, value) => {
    view.setFloat32(offset, value.x, true);
    view.setFloat32(offset + 4, value.y, true);
    view.setFloat32(offset + 8, value.z, true);
  },
  byteLength: (_value) => 12
};

// src/Codecs/Vector3Array.ts
var VECTOR3_SIZE = 12;
var vector3ArrayCodec = {
  read: (view, offset) => {
    const count = view.getUint32(offset, true);
    const values = [];
    let cursor = offset + 4;
    for (let i = 0; i < count; i += 1) {
      values.push({
        x: view.getFloat32(cursor, true),
        y: view.getFloat32(cursor + 4, true),
        z: view.getFloat32(cursor + 8, true)
      });
      cursor += VECTOR3_SIZE;
    }
    return values;
  },
  write: (view, offset, value) => {
    view.setUint32(offset, value.length, true);
    let cursor = offset + 4;
    for (const vector of value) {
      view.setFloat32(cursor, vector.x, true);
      view.setFloat32(cursor + 4, vector.y, true);
      view.setFloat32(cursor + 8, vector.z, true);
      cursor += VECTOR3_SIZE;
    }
  },
  byteLength: (value) => 4 + value.length * VECTOR3_SIZE
};

// src/Codecs/WString16.ts
var MAX_BYTES = 64;
var wString16Codec = {
  read: (view, offset) => {
    return view.getNullTerminatedUtf16String(offset, MAX_BYTES, true);
  },
  write: (view, offset, value) => {
    view.setNullTerminatedUtf16String(offset, value, MAX_BYTES, true);
  },
  byteLength: (_value) => MAX_BYTES
};

// src/Codecs/WString16Array.ts
var MAX_BYTES2 = 32;
var wString16ArrayCodec = {
  read: (view, offset) => {
    const count = view.getUint32(offset, true);
    const values = new Array(count);
    let cursor = offset + 4;
    for (let index = 0; index < count; index++) {
      values[index] = view.getNullTerminatedUtf16String(cursor, MAX_BYTES2, true);
      cursor += MAX_BYTES2;
    }
    return values;
  },
  write: (view, offset, value) => {
    view.setUint32(offset, value.length, true);
    let cursor = offset + 4;
    for (const item of value) {
      view.setNullTerminatedUtf16String(cursor, item, MAX_BYTES2, true);
      cursor += MAX_BYTES2;
    }
  },
  byteLength: (value) => 4 + value.length * MAX_BYTES2
};

// src/Codecs/WString32.ts
var MAX_BYTES3 = 64;
var wString32Codec = {
  read: (view, offset) => {
    return view.getNullTerminatedUtf16String(offset, MAX_BYTES3, true);
  },
  write: (view, offset, value) => {
    view.setNullTerminatedUtf16String(offset, value, MAX_BYTES3, true);
  },
  byteLength: (_value) => MAX_BYTES3
};

// src/Codecs/WString32Array.ts
var MAX_BYTES4 = 64;
var wString32ArrayCodec = {
  read: (view, offset) => {
    const count = view.getUint32(offset, true);
    const values = new Array(count);
    let cursor = offset + 4;
    for (let index = 0; index < count; index++) {
      values[index] = view.getNullTerminatedUtf16String(cursor, MAX_BYTES4, true);
      cursor += MAX_BYTES4;
    }
    return values;
  },
  write: (view, offset, value) => {
    view.setUint32(offset, value.length, true);
    let cursor = offset + 4;
    for (const item of value) {
      view.setNullTerminatedUtf16String(cursor, item, MAX_BYTES4, true);
      cursor += MAX_BYTES4;
    }
  },
  byteLength: (value) => 4 + value.length * MAX_BYTES4
};

// src/Codecs/WString64.ts
var MAX_BYTES5 = 128;
var wString64Codec = {
  read: (view, offset) => {
    return view.getNullTerminatedUtf16String(offset, MAX_BYTES5, true);
  },
  write: (view, offset, value) => {
    view.setNullTerminatedUtf16String(offset, value, MAX_BYTES5, true);
  },
  byteLength: (_value) => MAX_BYTES5
};

// src/Codecs/WString64Array.ts
var MAX_BYTES6 = 128;
var wString64ArrayCodec = {
  read: (view, offset) => {
    const count = view.getUint32(offset, true);
    const values = new Array(count);
    let cursor = offset + 4;
    for (let index = 0; index < count; index++) {
      values[index] = view.getNullTerminatedUtf16String(cursor, MAX_BYTES6, true);
      cursor += MAX_BYTES6;
    }
    return values;
  },
  write: (view, offset, value) => {
    view.setUint32(offset, value.length, true);
    let cursor = offset + 4;
    for (const item of value) {
      view.setNullTerminatedUtf16String(cursor, item, MAX_BYTES6, true);
      cursor += MAX_BYTES6;
    }
  },
  byteLength: (value) => 4 + value.length * MAX_BYTES6
};

// src/Codecs/Binary.ts
var binaryCodec = {
  read: (view, offset) => {
    const size = view.getUint32(offset, true);
    const dataOffset = offset + 4;
    const bytes = new Uint8Array(size);
    for (let i = 0; i < size; i++) {
      bytes[i] = view.getUint8(dataOffset + i);
    }
    return bytes;
  },
  write: (view, offset, value) => {
    view.setUint32(offset, value.length, true);
    const dataOffset = offset + 4;
    for (let i = 0; i < value.length; i++) {
      view.setUint8(dataOffset + i, value[i]);
    }
  },
  byteLength: (value) => 4 + value.length
};

// src/Codecs/BinaryArray.ts
var binaryArrayCodec = {
  read: (view, offset) => {
    const count = view.getUint32(offset, true);
    const values = new Array(count);
    let cursor = offset + 4;
    for (let index = 0; index < count; index++) {
      const size = view.getUint32(cursor, true);
      const dataOffset = cursor + 4;
      const bytes = new Uint8Array(size);
      for (let i = 0; i < size; i++) {
        bytes[i] = view.getUint8(dataOffset + i);
      }
      values[index] = bytes;
      cursor = dataOffset + size;
    }
    return values;
  },
  write: (view, offset, value) => {
    view.setUint32(offset, value.length, true);
    let cursor = offset + 4;
    for (const item of value) {
      view.setUint32(cursor, item.length, true);
      const dataOffset = cursor + 4;
      for (let i = 0; i < item.length; i++) {
        view.setUint8(dataOffset + i, item[i]);
      }
      cursor = dataOffset + item.length;
    }
  },
  byteLength: (value) => 4 + value.reduce((sum, bytes) => sum + 4 + bytes.length, 0)
};

// src/Codecs/String16.ts
var MAX_BYTES7 = 16;
var string16Codec = {
  read: (view, offset) => {
    return view.getNullTerminatedUtf8String(offset, MAX_BYTES7);
  },
  write: (view, offset, value) => {
    view.setNullTerminatedUtf8String(offset, value, MAX_BYTES7);
  },
  byteLength: (_value) => MAX_BYTES7
};

// src/Codecs/String16Array.ts
var MAX_BYTES8 = 16;
var string16ArrayCodec = {
  read: (view, offset) => {
    const count = view.getUint32(offset, true);
    const values = new Array(count);
    let cursor = offset + 4;
    for (let index = 0; index < count; index++) {
      values[index] = view.getNullTerminatedUtf8String(cursor, MAX_BYTES8);
      cursor += MAX_BYTES8;
    }
    return values;
  },
  write: (view, offset, value) => {
    view.setUint32(offset, value.length, true);
    let cursor = offset + 4;
    for (const item of value) {
      view.setNullTerminatedUtf8String(cursor, item, MAX_BYTES8);
      cursor += MAX_BYTES8;
    }
  },
  byteLength: (value) => 4 + value.length * MAX_BYTES8
};

// src/Codecs/String32.ts
var MAX_BYTES9 = 32;
var string32Codec = {
  read: (view, offset) => {
    return view.getNullTerminatedUtf8String(offset, MAX_BYTES9);
  },
  write: (view, offset, value) => {
    view.setNullTerminatedUtf8String(offset, value, MAX_BYTES9);
  },
  byteLength: (_value) => MAX_BYTES9
};

// src/Codecs/String32Array.ts
var MAX_BYTES10 = 32;
var string32ArrayCodec = {
  read: (view, offset) => {
    const count = view.getUint32(offset, true);
    const values = new Array(count);
    let cursor = offset + 4;
    for (let index = 0; index < count; index++) {
      values[index] = view.getNullTerminatedUtf8String(cursor, MAX_BYTES10);
      cursor += MAX_BYTES10;
    }
    return values;
  },
  write: (view, offset, value) => {
    view.setUint32(offset, value.length, true);
    let cursor = offset + 4;
    for (const item of value) {
      view.setNullTerminatedUtf8String(cursor, item, MAX_BYTES10);
      cursor += MAX_BYTES10;
    }
  },
  byteLength: (value) => 4 + value.length * MAX_BYTES10
};

// src/Codecs/String64.ts
var MAX_BYTES11 = 64;
var string64Codec = {
  read: (view, offset) => {
    return view.getNullTerminatedUtf8String(offset, MAX_BYTES11);
  },
  write: (view, offset, value) => {
    view.setNullTerminatedUtf8String(offset, value, MAX_BYTES11);
  },
  byteLength: (_value) => MAX_BYTES11
};

// src/Codecs/String64Array.ts
var MAX_BYTES12 = 64;
var string64ArrayCodec = {
  read: (view, offset) => {
    const count = view.getUint32(offset, true);
    const values = new Array(count);
    let cursor = offset + 4;
    for (let index = 0; index < count; index++) {
      values[index] = view.getNullTerminatedUtf8String(cursor, MAX_BYTES12);
      cursor += MAX_BYTES12;
    }
    return values;
  },
  write: (view, offset, value) => {
    view.setUint32(offset, value.length, true);
    let cursor = offset + 4;
    for (const item of value) {
      view.setNullTerminatedUtf8String(cursor, item, MAX_BYTES12);
      cursor += MAX_BYTES12;
    }
  },
  byteLength: (value) => 4 + value.length * MAX_BYTES12
};

// src/Codecs/index.ts
var scalarCodecs = {
  [0 /* Bool */]: boolCodec,
  [6 /* Enum */]: uintCodec,
  [2 /* Int */]: intCodec,
  [4 /* Float */]: floatCodec,
  [20 /* UInt */]: uintCodec,
  [22 /* Int64 */]: int64Codec,
  [24 /* UInt64 */]: uint64Codec,
  [8 /* Vector2 */]: vector2Codec,
  [10 /* Vector3 */]: vector3Codec,
  [18 /* Binary */]: binaryCodec,
  [12 /* String16 */]: string16Codec,
  [14 /* String32 */]: string32Codec,
  [16 /* String64 */]: string64Codec,
  [26 /* WString16 */]: wString16Codec,
  [28 /* WString32 */]: wString32Codec,
  [30 /* WString64 */]: wString64Codec
};
var arrayCodecs = {
  [1 /* BoolArray */]: boolArrayCodec,
  [7 /* EnumArray */]: uintArrayCodec,
  [3 /* IntArray */]: intArrayCodec,
  [5 /* FloatArray */]: floatArrayCodec,
  [21 /* UIntArray */]: uintArrayCodec,
  [23 /* Int64Array */]: int64ArrayCodec,
  [25 /* UInt64Array */]: uint64ArrayCodec,
  [9 /* Vector2Array */]: vector2ArrayCodec,
  [11 /* Vector3Array */]: vector3ArrayCodec,
  [19 /* BinaryArray */]: binaryArrayCodec,
  [13 /* String16Array */]: string16ArrayCodec,
  [15 /* String32Array */]: string32ArrayCodec,
  [17 /* String64Array */]: string64ArrayCodec,
  [27 /* WString16Array */]: wString16ArrayCodec,
  [29 /* WString32Array */]: wString32ArrayCodec,
  [31 /* WString64Array */]: wString64ArrayCodec,
  [32 /* Bool64bitKey */]: bool64bitKeyCodec
};

// src/StructEntry.ts
var StructEntry = class {
  #scalarValue;
  #arrayValue;
  #arrayCount;
  structType;
  hash = 0;
  readIndex;
  offset;
  constructor(view, type, hash, offset, readIndex) {
    this.structType = type;
    this.hash = hash;
    this.#arrayCount = 0;
    this.readIndex = readIndex;
    this.offset = offset;
    if (this.structType === 32 /* Bool64bitKey */ && offset === 0) {
      const arrayCodec2 = arrayCodecs[this.structType];
      if (arrayCodec2) {
        this.#arrayValue = [];
        this.#arrayCount = 0;
        return;
      }
    }
    const scalarCodec = scalarCodecs[this.structType];
    if (scalarCodec) {
      this.#scalarValue = scalarCodec.read(view, offset);
      return;
    }
    const arrayCodec = arrayCodecs[this.structType];
    if (arrayCodec) {
      this.#arrayValue = arrayCodec.read(view, offset);
      this.#arrayCount = view.getUint32(offset, true);
      return;
    }
  }
  get value() {
    const codec = scalarCodecs[this.structType];
    if (codec) {
      return this.#scalarValue;
    }
    throw new Error(`value is not supported for struct type: ${this.structType}`);
  }
  /**
   * Alias for {@link value}. Gets the scalar value for this struct entry.
   */
  getValue() {
    return this.value;
  }
  set value(value) {
    const codec = scalarCodecs[this.structType];
    if (codec) {
      this.#scalarValue = value;
      return;
    }
    throw new Error(`value is not supported for struct type: ${this.structType}`);
  }
  /**
   * Alias for setting {@link value}. Writes a scalar value for this struct entry.
   * @param value - The value to write.
   */
  setValue(value) {
    this.value = value;
  }
  get values() {
    const codec = arrayCodecs[this.structType];
    if (codec) {
      return this.#arrayValue;
    }
    throw new Error(`values is not supported for struct type: ${this.structType}`);
  }
  set values(values) {
    const codec = arrayCodecs[this.structType];
    if (codec) {
      this.#arrayValue = values;
      this.#arrayCount = Array.isArray(values) ? values.length : 0;
      return;
    }
    throw new Error(`values is not supported for struct type: ${this.structType}`);
  }
  /**
   * Gets the value at a specific index in this array entry.
   */
  getValueAt(index) {
    if (this.isArrayType(this.structType)) {
      const values = this.values;
      if (!values) {
        throw new Error(`getValueAt is not supported for struct type: ${this.structType}`);
      }
      return values[index];
    }
    throw new Error(`getValueAt is not supported for struct type: ${this.structType}`);
  }
  /**
   * Sets the value at a specific index in this array entry.
   * @param index - Zero-based index in the array.
   * @param value - Value to write at index.
   */
  setValueAt(index, value) {
    if (this.isArrayType(this.structType)) {
      const currentValues = this.values;
      const values = [...currentValues];
      values[index] = value;
      this.values = values;
      return;
    }
    throw new Error(`setValueAt is not supported for struct type: ${this.structType}`);
  }
  get count() {
    if (this.isArrayType(this.structType)) {
      return this.#arrayCount;
    }
    throw new Error(`count is not supported for struct type: ${this.structType}`);
  }
  getSize() {
    const metadata = STRUCT_TYPE_METADATA[this.structType];
    if (metadata.storage === "value") {
      return 0;
    }
    const scalarCodec = scalarCodecs[this.structType];
    if (scalarCodec) {
      return scalarCodec.byteLength(this.value);
    }
    const arrayCodec = arrayCodecs[this.structType];
    if (arrayCodec) {
      return arrayCodec.byteLength(this.values);
    }
    throw new Error(`getSize is not supported for struct type: ${this.structType}`);
  }
  isArrayType(type) {
    return STRUCT_TYPE_METADATA[type].isArray;
  }
};

// src/ParseError.ts
var ParseError = class extends Error {
};

// src/BaseGameData.ts
var scratchDataView = new DataView(new ArrayBuffer(1024));
var GameDataRecord = class {
  #structType;
  constructor(structType) {
    this.#structType = structType;
  }
  addNew(hash, value) {
    const entry = new StructEntry(scratchDataView, this.#structType, hash, 0);
    if (scalarCodecs[this.#structType]) {
      entry.value = value;
    }
    if (arrayCodecs[this.#structType]) {
      entry.values = value;
    }
    this[hash] = entry;
    return entry;
  }
};
var BaseGameData = class {
  Bool = new GameDataRecord(0 /* Bool */);
  BoolArray = new GameDataRecord(1 /* BoolArray */);
  Int = new GameDataRecord(2 /* Int */);
  IntArray = new GameDataRecord(3 /* IntArray */);
  Float = new GameDataRecord(4 /* Float */);
  FloatArray = new GameDataRecord(5 /* FloatArray */);
  Enum = new GameDataRecord(6 /* Enum */);
  EnumArray = new GameDataRecord(7 /* EnumArray */);
  Vector2 = new GameDataRecord(8 /* Vector2 */);
  Vector2Array = new GameDataRecord(9 /* Vector2Array */);
  Vector3 = new GameDataRecord(10 /* Vector3 */);
  Vector3Array = new GameDataRecord(11 /* Vector3Array */);
  String16 = new GameDataRecord(12 /* String16 */);
  String16Array = new GameDataRecord(13 /* String16Array */);
  String32 = new GameDataRecord(14 /* String32 */);
  String32Array = new GameDataRecord(15 /* String32Array */);
  String64 = new GameDataRecord(16 /* String64 */);
  String64Array = new GameDataRecord(17 /* String64Array */);
  Binary = new GameDataRecord(18 /* Binary */);
  BinaryArray = new GameDataRecord(19 /* BinaryArray */);
  UInt = new GameDataRecord(20 /* UInt */);
  UIntArray = new GameDataRecord(21 /* UIntArray */);
  Int64 = new GameDataRecord(22 /* Int64 */);
  Int64Array = new GameDataRecord(23 /* Int64Array */);
  UInt64 = new GameDataRecord(24 /* UInt64 */);
  UInt64Array = new GameDataRecord(25 /* UInt64Array */);
  WString16 = new GameDataRecord(26 /* WString16 */);
  WString16Array = new GameDataRecord(27 /* WString16Array */);
  WString32 = new GameDataRecord(28 /* WString32 */);
  WString32Array = new GameDataRecord(29 /* WString32Array */);
  WString64 = new GameDataRecord(30 /* WString64 */);
  WString64Array = new GameDataRecord(31 /* WString64Array */);
  Bool64bitKey = new GameDataRecord(32 /* Bool64bitKey */);
};

// src/prototypes.ts
var utf8Encoder = new TextEncoder();
var utf8Decoder = new TextDecoder("utf-8");
if (!DataView.prototype.getUint32Array) {
  DataView.prototype.getUint32Array = function(offset, count, littleEndian = true) {
    const values = new Array(count);
    for (let index = 0; index < count; index++) {
      values[index] = this.getUint32(offset, littleEndian);
      offset += 4;
    }
    return values;
  };
}
if (!DataView.prototype.getInt32Array) {
  DataView.prototype.getInt32Array = function(offset, count, littleEndian = true) {
    const values = new Array(count);
    for (let index = 0; index < count; index++) {
      values[index] = this.getInt32(offset, littleEndian);
      offset += 4;
    }
    return values;
  };
}
if (!DataView.prototype.getFloat32Array) {
  DataView.prototype.getFloat32Array = function(offset, count, littleEndian = true) {
    const values = new Array(count);
    for (let index = 0; index < count; index++) {
      values[index] = this.getFloat32(offset, littleEndian);
      offset += 4;
    }
    return values;
  };
}
if (!DataView.prototype.getBigInt64Array) {
  DataView.prototype.getBigInt64Array = function(offset, count, littleEndian = true) {
    const values = new Array(count);
    for (let index = 0; index < count; index++) {
      values[index] = this.getBigInt64(offset, littleEndian);
      offset += 8;
    }
    return values;
  };
}
if (!DataView.prototype.getBigUint64Array) {
  DataView.prototype.getBigUint64Array = function(offset, count, littleEndian = true) {
    const values = new Array(count);
    for (let index = 0; index < count; index++) {
      values[index] = this.getBigUint64(offset, littleEndian);
      offset += 8;
    }
    return values;
  };
}
if (!DataView.prototype.setUint32Array) {
  DataView.prototype.setUint32Array = function(offset, array, littleEndian = true) {
    for (const item of array) {
      this.setUint32(offset, item, true);
      offset += 4;
    }
  };
}
if (!DataView.prototype.setFloat32Array) {
  DataView.prototype.setFloat32Array = function(offset, array, littleEndian = true) {
    for (const item of array) {
      this.setFloat32(offset, item, littleEndian);
      offset += 4;
    }
  };
}
if (!DataView.prototype.setBigInt64Array) {
  DataView.prototype.setBigInt64Array = function(offset, array, littleEndian = true) {
    for (const item of array) {
      this.setBigInt64(offset, item, littleEndian);
      offset += 8;
    }
  };
}
if (!DataView.prototype.setBigUint64Array) {
  DataView.prototype.setBigUint64Array = function(offset, array, littleEndian = true) {
    for (const item of array) {
      this.setBigUint64(offset, item, littleEndian);
      offset += 8;
    }
  };
}
if (!DataView.prototype.setInt32Array) {
  DataView.prototype.setInt32Array = function(offset, array, littleEndian = true) {
    for (const item of array) {
      this.setInt32(offset, item, true);
      offset += 4;
    }
  };
}
if (!DataView.prototype.getNullTerminatedUtf16String) {
  DataView.prototype.getNullTerminatedUtf16String = function(offset, maxLength, littleEndian = true) {
    const units = [];
    const endOffset = offset + maxLength;
    for (let cursor = offset; cursor < endOffset; cursor += 2) {
      const value = this.getUint16(cursor, littleEndian);
      if (value === 0) {
        break;
      }
      units.push(value);
    }
    return String.fromCharCode(...units);
  };
}
if (!DataView.prototype.getNullTerminatedUtf8String) {
  DataView.prototype.getNullTerminatedUtf8String = function(offset, maxLength) {
    const bytes = [];
    const endOffset = offset + maxLength;
    for (let cursor = offset; cursor < endOffset; cursor++) {
      const value = this.getUint8(cursor);
      if (value === 0) {
        break;
      }
      bytes.push(value);
    }
    return utf8Decoder.decode(new Uint8Array(bytes));
  };
}
if (!DataView.prototype.setNullTerminatedUtf16String) {
  DataView.prototype.setNullTerminatedUtf16String = function(offset, value, maxLength, littleEndian = true) {
    const maxChars = Math.floor(maxLength / 2);
    if (value.length > maxChars) {
      throw new Error(`String exceeds maximum ${maxChars} UTF-16 code units`);
    }
    const endOffset = offset + maxLength;
    const byteCount = value.length * 2;
    for (let i = 0; i < value.length; i++) {
      this.setUint16(offset + i * 2, value.charCodeAt(i), littleEndian);
    }
    if (value.length < maxChars) {
      this.setUint16(offset + byteCount, 0, littleEndian);
      for (let cursor = offset + byteCount + 2; cursor < endOffset; cursor += 2) {
        this.setUint16(cursor, 0, littleEndian);
      }
    }
  };
}
if (!DataView.prototype.setNullTerminatedUtf8String) {
  DataView.prototype.setNullTerminatedUtf8String = function(offset, value, maxLength) {
    const bytes = utf8Encoder.encode(value);
    if (bytes.length > maxLength - 1) {
      throw new Error(`String exceeds maximum ${maxLength - 1} UTF-8 bytes`);
    }
    const endOffset = offset + maxLength;
    const dataLength = bytes.length;
    for (let i = 0; i < bytes.length; i++) {
      this.setUint8(offset + i, bytes[i]);
    }
    this.setUint8(offset + dataLength, 0);
    for (let cursor = offset + dataLength + 1; cursor < endOffset; cursor++) {
      this.setUint8(cursor, 0);
    }
  };
}

// src/GameData.ts
var GameData = class _GameData extends BaseGameData {
  #parsedByteLength;
  version = 0;
  constructor(version = 1) {
    super();
    this.version = version;
  }
  static toArrayBuffer(gameData) {
    const structTypes = Object.keys(STRUCT_TYPE_METADATA).map((type) => Number(type)).filter((type) => Number.isFinite(type)).sort((left, right) => left - right);
    const entriesPerStruct = /* @__PURE__ */ new Map();
    let indexEntryCount = 0;
    let dataSize = 0;
    for (const type of structTypes) {
      const metadata = STRUCT_TYPE_METADATA[type];
      const section = gameData[metadata.section];
      const entries = Object.keys(section).map((key) => Number(key)).filter((key) => Number.isFinite(key)).map((hash) => [hash, section[hash]]);
      entries.sort((left, right) => {
        const leftIndex = left[1].readIndex;
        const rightIndex = right[1].readIndex;
        if (leftIndex === void 0 && rightIndex === void 0) {
          return 0;
        }
        if (leftIndex === void 0) {
          return 1;
        }
        if (rightIndex === void 0) {
          return -1;
        }
        return leftIndex - rightIndex;
      });
      entriesPerStruct.set(type, entries);
      indexEntryCount += 1 + entries.length;
      if (metadata.storage === "offset") {
        for (const [, entry] of entries) {
          if (type === 32 /* Bool64bitKey */) {
            const values = entry.values;
            if (values?.length === 0) {
              continue;
            }
          }
          dataSize += entry.getSize();
        }
      }
    }
    const indexSize = indexEntryCount * 8;
    const headerSize = 32;
    const dataOffset = headerSize + indexSize;
    const baseLength = dataOffset + dataSize;
    const buffer = new ArrayBuffer(baseLength);
    const view = new DataView(buffer);
    view.setUint32(0, 16909060, true);
    view.setUint32(4, gameData.version, true);
    view.setUint32(8, dataOffset, true);
    let indexCursor = headerSize;
    let dataCursor = dataOffset;
    for (const type of structTypes) {
      const metadata = STRUCT_TYPE_METADATA[type];
      const entries = entriesPerStruct.get(type) ?? [];
      view.setUint32(indexCursor, 0, true);
      view.setUint32(indexCursor + 4, type, true);
      indexCursor += 8;
      for (const [hash, entry] of entries) {
        view.setUint32(indexCursor, hash, true);
        const scalarCodec = scalarCodecs[type];
        const arrayCodec = arrayCodecs[type];
        if (scalarCodec) {
          if (metadata.storage === "offset") {
            view.setUint32(indexCursor + 4, dataCursor, true);
            scalarCodec.write(view, dataCursor, entry.value);
            dataCursor += entry.getSize();
          } else {
            scalarCodec.write(view, indexCursor + 4, entry.value);
          }
        } else if (arrayCodec) {
          const codec = arrayCodecs[type];
          if (!codec) {
            throw new Error(`Missing array codec for struct type: ${type}`);
          }
          if (type === 32 /* Bool64bitKey */) {
            const values = entry.values;
            if (!values || values.length === 0) {
              view.setUint32(indexCursor + 4, 0, true);
              indexCursor += 8;
              continue;
            }
          }
          view.setUint32(indexCursor + 4, dataCursor, true);
          codec.write(view, dataCursor, entry.values);
          dataCursor += entry.getSize();
        } else {
          throw new Error(`Missing codec for struct type: ${type}`);
        }
        indexCursor += 8;
      }
    }
    if (gameData.#parsedByteLength !== void 0 && gameData.#parsedByteLength > baseLength) {
      const padded = new ArrayBuffer(gameData.#parsedByteLength);
      const out = new Uint8Array(padded);
      out.set(new Uint8Array(buffer), 0);
      return padded;
    }
    return buffer;
  }
  static fromArrayBuffer(buffer) {
    const gameData = new _GameData();
    const view = new DataView(buffer);
    gameData.#parsedByteLength = view.byteLength;
    if (view.byteLength < 32) {
      throw new ParseError("Invalid file. Too Small.");
    }
    if (view.getUint32(0, true) !== 16909060) {
      throw new Error("Invalid File. Magic Mismatch.");
    }
    const version = view.getUint32(4, true);
    gameData.version = version;
    const dataOffset = view.getUint32(8, true);
    if (dataOffset < 32 || dataOffset > view.byteLength) {
      throw new ParseError(`Invalid File: dataOffset out of bounds (${dataOffset})`);
    }
    if (dataOffset % 4 !== 0) {
      throw new ParseError("Invalid File: dataOffset must be 4-byte aligned");
    }
    let offset = 32;
    let currentStruct = 0 /* Bool */;
    let currentSection = null;
    let currentStructType = null;
    let skippingUnknownSection = false;
    let currentReadIndex = 0;
    while (offset + 8 <= dataOffset) {
      const hashKey = view.getUint32(offset, true);
      const hashOffset = offset + 4;
      const hashObjectValue = view.getUint32(hashOffset, true);
      offset += 8;
      if (hashKey === 0) {
        currentStruct = hashObjectValue;
        currentStructType = STRUCT_TYPE_METADATA[currentStruct];
        if (!KNOWN_STRUCT_TYPES.has(currentStruct)) {
          currentSection = null;
          skippingUnknownSection = true;
          currentReadIndex = 0;
          continue;
        }
        skippingUnknownSection = false;
        currentSection = gameData[currentStructType.section];
        currentReadIndex = 0;
        continue;
      }
      if (skippingUnknownSection || currentStruct === null || currentSection === null || currentStructType === null) {
        continue;
      }
      const entryOffset = currentStructType.storage === "value" ? hashOffset : hashObjectValue;
      currentSection[hashKey] = new StructEntry(view, currentStruct, hashKey, entryOffset, currentReadIndex);
      currentReadIndex += 1;
    }
    if (offset !== dataOffset) {
      throw new ParseError("Invalid File: incomplete struct entry at end");
    }
    return gameData;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GameData
});
