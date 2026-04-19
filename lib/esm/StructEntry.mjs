// src/Codecs/Bool.ts
var boolCodec = {
  read: (view, offset) => view.getUint32(offset, true) === 1,
  write: (view, offset, value) => view.setUint32(offset, value ? 1 : 0, true)
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
  }
};

// src/Codecs/Int.ts
var intCodec = {
  read: (view, offset) => view.getInt32(offset, true),
  write: (view, offset, value) => view.setInt32(offset, value, true)
};

// src/Codecs/UInt.ts
var uintCodec = {
  read: (view, offset) => view.getUint32(offset, true),
  write: (view, offset, value) => view.setUint32(offset, value, true)
};

// src/Codecs/Float.ts
var floatCodec = {
  read: (view, offset) => view.getFloat32(offset, true),
  write: (view, offset, value) => view.setFloat32(offset, value, true)
};

// src/Codecs/Int64.ts
var int64Codec = {
  read: (view, offset) => view.getBigInt64(offset, true),
  write: (view, offset, value) => view.setBigInt64(offset, value, true)
};

// src/Codecs/UInt64.ts
var uint64Codec = {
  read: (view, offset) => view.getBigUint64(offset, true),
  write: (view, offset, value) => view.setBigUint64(offset, value, true)
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
};

// src/Codecs/WString16.ts
var MAX_BYTES = 32;
var wString16Codec = {
  read: (view, offset) => {
    return view.getNullTerminatedUtf16String(offset, MAX_BYTES, true);
  },
  write: (view, offset, value) => {
    view.setNullTerminatedUtf16String(offset, value, MAX_BYTES, true);
  }
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
  }
};

// src/Codecs/WString32.ts
var MAX_BYTES3 = 64;
var wString32Codec = {
  read: (view, offset) => {
    return view.getNullTerminatedUtf16String(offset, MAX_BYTES3, true);
  },
  write: (view, offset, value) => {
    view.setNullTerminatedUtf16String(offset, value, MAX_BYTES3, true);
  }
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
  }
};

// src/Codecs/WString64.ts
var MAX_BYTES5 = 128;
var wString64Codec = {
  read: (view, offset) => {
    return view.getNullTerminatedUtf16String(offset, MAX_BYTES5, true);
  },
  write: (view, offset, value) => {
    view.setNullTerminatedUtf16String(offset, value, MAX_BYTES5, true);
  }
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
  }
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
    const currentSize = view.getUint32(offset, true);
    if (value.length > currentSize) {
      throw new Error(`Binary value exceeds existing size (${currentSize} bytes); in-place updates cannot grow the entry`);
    }
    view.setUint32(offset, value.length, true);
    const dataOffset = offset + 4;
    for (let i = 0; i < value.length; i++) {
      view.setUint8(dataOffset + i, value[i]);
    }
    for (let i = value.length; i < currentSize; i++) {
      view.setUint8(dataOffset + i, 0);
    }
  }
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
      const currentSize = view.getUint32(cursor, true);
      if (item.length > currentSize) {
        throw new Error(`BinaryArray item exceeds existing size (${currentSize} bytes); in-place updates cannot grow the entry`);
      }
      view.setUint32(cursor, item.length, true);
      const dataOffset = cursor + 4;
      for (let i = 0; i < item.length; i++) {
        view.setUint8(dataOffset + i, item[i]);
      }
      for (let i = item.length; i < currentSize; i++) {
        view.setUint8(dataOffset + i, 0);
      }
      cursor = dataOffset + currentSize;
    }
  }
};

// src/Codecs/String16.ts
var MAX_BYTES7 = 32;
var string16Codec = {
  read: (view, offset) => {
    return view.getNullTerminatedUtf8String(offset, MAX_BYTES7);
  },
  write: (view, offset, value) => {
    view.setNullTerminatedUtf8String(offset, value, MAX_BYTES7);
  }
};

// src/Codecs/String16Array.ts
var MAX_BYTES8 = 32;
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
  }
};

// src/Codecs/String32.ts
var MAX_BYTES9 = 64;
var string32Codec = {
  read: (view, offset) => {
    return view.getNullTerminatedUtf8String(offset, MAX_BYTES9);
  },
  write: (view, offset, value) => {
    view.setNullTerminatedUtf8String(offset, value, MAX_BYTES9);
  }
};

// src/Codecs/String32Array.ts
var MAX_BYTES10 = 64;
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
  }
};

// src/Codecs/String64.ts
var MAX_BYTES11 = 128;
var string64Codec = {
  read: (view, offset) => {
    return view.getNullTerminatedUtf8String(offset, MAX_BYTES11);
  },
  write: (view, offset, value) => {
    view.setNullTerminatedUtf8String(offset, value, MAX_BYTES11);
  }
};

// src/Codecs/String64Array.ts
var MAX_BYTES12 = 128;
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
  }
};

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

// src/Codecs/index.ts
var scalarCodecs = {
  [0 /* Bool */]: boolCodec,
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
  [31 /* WString64Array */]: wString64ArrayCodec
};

// src/StructEntry.ts
var StructEntry = class {
  #view;
  structType;
  hash = 0;
  offset = 0;
  constructor(view, type, hash, offset) {
    this.#view = view;
    this.structType = type;
    this.hash = hash;
    this.offset = offset;
  }
  get value() {
    const codec = scalarCodecs[this.structType];
    if (codec) {
      return codec.read(this.#view, this.offset);
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
      codec.write(this.#view, this.offset, value);
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
      return codec.read(this.#view, this.offset);
    }
    throw new Error(`values is not supported for struct type: ${this.structType}`);
  }
  set values(values) {
    const codec = arrayCodecs[this.structType];
    if (codec) {
      codec.write(this.#view, this.offset, values);
      return;
    }
    throw new Error(`values is not supported for struct type: ${this.structType}`);
  }
  /**
   * Gets the value at a specific index in this array entry.
   */
  getValueAt(index) {
    if (this.isArrayType(this.structType)) {
      const codec = arrayCodecs[this.structType];
      if (!codec) {
        throw new Error(`getValueAt is not supported for struct type: ${this.structType}`);
      }
      const values = codec.read(this.#view, this.offset);
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
      return this.#view.getUint32(this.offset, true);
    }
    throw new Error(`count is not supported for struct type: ${this.structType}`);
  }
  isArrayType(type) {
    return STRUCT_TYPE_METADATA[type].isArray;
  }
};
export {
  StructEntry
};
