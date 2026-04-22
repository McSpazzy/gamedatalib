import { StructCodec } from "../Types";

export const intArrayCodec: StructCodec<number[]> = {
  read: (view, offset) => {
    const count = view.getUint32(offset, true);
    return view.getInt32Array(offset + 4, count, true);
  },
  write: (view, offset, value) => {
    view.setUint32(offset, value.length, true);
    view.setInt32Array(offset + 4, value, true);
  },
  byteLength: (value) => 4 + value.length * 4,
};
