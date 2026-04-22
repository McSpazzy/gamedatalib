import { StructCodec } from "../Types";

export const bool64bitKeyCodec: StructCodec<bigint[]> = {
  read: (view, offset) => {
    const values: bigint[] = [];
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
  byteLength: (value) => 8 + value.length * 8,
};
