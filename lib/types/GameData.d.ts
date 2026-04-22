import { BaseGameData } from "./BaseGameData";
import "./prototypes";
export declare class GameData extends BaseGameData {
    #private;
    version: number;
    constructor(version?: number);
    static toArrayBuffer(gameData: GameData): ArrayBufferLike;
    static fromArrayBuffer(buffer: ArrayBufferLike): GameData;
}
