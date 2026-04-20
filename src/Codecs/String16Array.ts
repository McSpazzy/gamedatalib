import { StructCodec } from "../Types";

const MAX_BYTES = 0x10;

export const string16ArrayCodec: StructCodec<string[]> = {
  read: (view, offset) => {
    const count = view.getUint32(offset, true);
    const values: string[] = new Array<string>(count);
    let cursor = offset + 4;

    for (let index = 0; index < count; index++) {
      values[index] = view.getNullTerminatedUtf8String(cursor, MAX_BYTES);
      cursor += MAX_BYTES;
    }

    return values;
  },
  write: (view, offset, value) => {
    view.setUint32(offset, value.length, true);
    let cursor = offset + 4;

    for (const item of value) {
      view.setNullTerminatedUtf8String(cursor, item, MAX_BYTES);
      cursor += MAX_BYTES;
    }
  },
};
