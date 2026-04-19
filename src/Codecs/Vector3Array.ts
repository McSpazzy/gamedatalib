import { StructCodec, Vector3 as Vector3Type } from "../Types";

const VECTOR3_SIZE = 12;

export const vector3ArrayCodec: StructCodec<Vector3Type[]> = {
  read: (view, offset) => {
    const count = view.getUint32(offset, true);
    const values: Vector3Type[] = [];
    let cursor = offset + 4;

    for (let i = 0; i < count; i += 1) {
      values.push({
        x: view.getFloat32(cursor, true),
        y: view.getFloat32(cursor + 4, true),
        z: view.getFloat32(cursor + 8, true),
      });
      cursor += VECTOR3_SIZE;
    }
    return values;
  },
  write: (view, offset, value) => {
    view.setUint32(offset, value.length, true);
    let cursor = offset + 4;

    for (const vector of value) {
      view.setFloat32(cursor, vector.x, true);
      view.setFloat32(cursor + 4, vector.y, true);
      view.setFloat32(cursor + 8, vector.z, true);
      cursor += VECTOR3_SIZE;
    }
  },
};
