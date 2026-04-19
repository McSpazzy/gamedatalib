import { StructCodec } from "../Types";

export const int64Codec: StructCodec<bigint> = {
  read: (view, offset) => view.getBigInt64(offset, true),
  write: (view, offset, value) => view.setBigInt64(offset, value, true),
};
