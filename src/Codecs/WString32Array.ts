import { StructCodec } from "../Types";

const MAX_BYTES = 0x40;

export const wString32ArrayCodec: StructCodec<string[]> = {
  read: (view, offset) => {
    const count = view.getUint32(offset, true);
    const values: string[] = new Array<string>(count);
    let cursor = offset + 4;

    for (let index = 0; index < count; index++) {
      values[index] = view.getNullTerminatedUtf16String(cursor, MAX_BYTES, true);
      cursor += MAX_BYTES;
    }

    return values;
  },
  write: (view, offset, value) => {
    view.setUint32(offset, value.length, true);
    let cursor = offset + 4;

    for (const item of value) {
      view.setNullTerminatedUtf16String(cursor, item, MAX_BYTES, true);
      cursor += MAX_BYTES;
    }
  },
};
