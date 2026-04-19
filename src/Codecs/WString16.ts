import { StructCodec } from "../Types";

const MAX_BYTES = 0x20;

export const wString16Codec: StructCodec<string> = {
  read: (view, offset) => {
    return view.getNullTerminatedUtf16String(offset, MAX_BYTES, true);
  },
  write: (view, offset, value) => {
    view.setNullTerminatedUtf16String(offset, value, MAX_BYTES, true);
  },
};
