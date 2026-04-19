export {};

declare global {
  interface DataView {
    getUint32Array(offset: number, count: number, littleEndian?: boolean): number[];
    getInt32Array(offset: number, count: number, littleEndian?: boolean): number[];
    getFloat32Array(offset: number, count: number, littleEndian?: boolean): number[];
    getBigInt64Array(offset: number, count: number, littleEndian?: boolean): bigint[];
    getBigUint64Array(offset: number, count: number, littleEndian?: boolean): bigint[];
    setUint32Array(offset: number, array: number[], littleEndian?: boolean): void;
    setInt32Array(offset: number, array: number[], littleEndian?: boolean): void;
    setFloat32Array(offset: number, array: number[], littleEndian?: boolean): void;
    setBigInt64Array(offset: number, array: bigint[], littleEndian?: boolean): void;
    setBigUint64Array(offset: number, array: bigint[], littleEndian?: boolean): void;

    getNullTerminatedUtf16String(offset: number, maxLength: number, littleEndian?: boolean): string;
    getNullTerminatedUtf8String(offset: number, maxLength: number): string;
    setNullTerminatedUtf16String(offset: number, value: string, maxLength: number, littleEndian?: boolean): void;
    setNullTerminatedUtf8String(offset: number, value: string, maxLength: number): void;
  }
}

const utf8Encoder = new TextEncoder();
const utf8Decoder = new TextDecoder("utf-8");

if (!DataView.prototype.getUint32Array) {
  DataView.prototype.getUint32Array = function (offset: number, count: number, littleEndian = true): number[] {
    const values: number[] = new Array<number>(count);
    for (let index = 0; index < count; index++) {
      values[index] = this.getUint32(offset, littleEndian);
      offset += 4;
    }
    return values;
  };
}

if (!DataView.prototype.getInt32Array) {
  DataView.prototype.getInt32Array = function (offset: number, count: number, littleEndian = true): number[] {
    const values: number[] = new Array<number>(count);
    for (let index = 0; index < count; index++) {
      values[index] = this.getInt32(offset, littleEndian);
      offset += 4;
    }
    return values;
  };
}

if (!DataView.prototype.getFloat32Array) {
  DataView.prototype.getFloat32Array = function (offset: number, count: number, littleEndian = true): number[] {
    const values: number[] = new Array<number>(count);
    for (let index = 0; index < count; index++) {
      values[index] = this.getFloat32(offset, littleEndian);
      offset += 4;
    }
    return values;
  };
}

if (!DataView.prototype.getBigInt64Array) {
  DataView.prototype.getBigInt64Array = function (offset: number, count: number, littleEndian = true): bigint[] {
    const values: bigint[] = new Array<bigint>(count);
    for (let index = 0; index < count; index++) {
      values[index] = this.getBigInt64(offset, littleEndian);
      offset += 8;
    }
    return values;
  };
}

if (!DataView.prototype.getBigUint64Array) {
  DataView.prototype.getBigUint64Array = function (offset: number, count: number, littleEndian = true): bigint[] {
    const values: bigint[] = new Array<bigint>(count);
    for (let index = 0; index < count; index++) {
      values[index] = this.getBigUint64(offset, littleEndian);
      offset += 8;
    }
    return values;
  };
}

if (!DataView.prototype.setUint32Array) {
  DataView.prototype.setUint32Array = function (offset: number, array: number[], littleEndian = true): void {
    for (const item of array) {
      this.setUint32(offset, item, true);
      offset += 4;
    }
  };
}

if (!DataView.prototype.setFloat32Array) {
  DataView.prototype.setFloat32Array = function (offset: number, array: number[], littleEndian = true): void {
    for (const item of array) {
      this.setFloat32(offset, item, littleEndian);
      offset += 4;
    }
  };
}

if (!DataView.prototype.setBigInt64Array) {
  DataView.prototype.setBigInt64Array = function (offset: number, array: bigint[], littleEndian = true): void {
    for (const item of array) {
      this.setBigInt64(offset, item, littleEndian);
      offset += 8;
    }
  };
}

if (!DataView.prototype.setBigUint64Array) {
  DataView.prototype.setBigUint64Array = function (offset: number, array: bigint[], littleEndian = true): void {
    for (const item of array) {
      this.setBigUint64(offset, item, littleEndian);
      offset += 8;
    }
  };
}

if (!DataView.prototype.setInt32Array) {
  DataView.prototype.setInt32Array = function (offset: number, array: number[], littleEndian = true): void {
    for (const item of array) {
      this.setInt32(offset, item, true);
      offset += 4;
    }
  };
}

if (!DataView.prototype.getNullTerminatedUtf16String) {
  DataView.prototype.getNullTerminatedUtf16String = function (offset: number, maxLength: number, littleEndian = true): string {
    const units: number[] = [];
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
  DataView.prototype.getNullTerminatedUtf8String = function (offset: number, maxLength: number): string {
    const bytes: number[] = [];
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
  DataView.prototype.setNullTerminatedUtf16String = function (offset: number, value: string, maxLength: number, littleEndian = true): void {
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
  DataView.prototype.setNullTerminatedUtf8String = function (offset: number, value: string, maxLength: number): void {
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
