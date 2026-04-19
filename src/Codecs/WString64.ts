import { StructCodec } from "../Types";

const MAX_BYTES = 0x80;

export const wString64Codec: StructCodec<string> = {
  read: (view, offset) => {
    return view.getNullTerminatedUtf16String(offset, MAX_BYTES, true);
  },
  write: (view, offset, value) => {
    view.setNullTerminatedUtf16String(offset, value, MAX_BYTES, true);
  },
};
