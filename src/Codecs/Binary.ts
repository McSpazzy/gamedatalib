import { StructCodec } from "../Types";

export const binaryCodec: StructCodec<Uint8Array> = {
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
  },
};
