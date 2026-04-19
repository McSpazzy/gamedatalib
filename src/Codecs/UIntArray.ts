import { StructCodec } from "../Types";

export const uintArrayCodec: StructCodec<number[]> = {
  read: (view, offset) => {
    const count = view.getUint32(offset, true);
    return view.getUint32Array(offset + 4, count, true);
  },
  write: (view, offset, value) => {
    view.setUint32(offset, value.length, true);
    view.setUint32Array(offset + 4, value, true);
  },
};
