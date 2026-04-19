import { StructCodec } from "../Types";

export const uint64Codec: StructCodec<bigint> = {
  read: (view, offset) => view.getBigUint64(offset, true),
  write: (view, offset, value) => view.setBigUint64(offset, value, true),
};
