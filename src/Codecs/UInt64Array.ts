import { StructCodec } from "../Types";

export const uint64ArrayCodec: StructCodec<bigint[]> = {
  read: (view, offset) => {
    const count = view.getUint32(offset, true);
    return view.getBigUint64Array(offset + 4, count, true);
  },
  write: (view, offset, value) => {
    view.setUint32(offset, value.length, true);
    view.setBigUint64Array(offset + 4, value, true);
  },
};
