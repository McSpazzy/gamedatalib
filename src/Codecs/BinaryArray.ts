import { StructCodec } from "../Types";

export const binaryArrayCodec: StructCodec<Uint8Array[]> = {
  read: (view, offset) => {
    const count = view.getUint32(offset, true);
    const values: Uint8Array[] = new Array<Uint8Array>(count);

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
  byteLength: (value) => 4 + value.reduce((sum, bytes) => sum + 4 + bytes.length, 0),
};
