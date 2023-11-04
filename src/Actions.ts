import clap from "./assets/clap.png";
import bow from "./assets/bow.png";
import empty from "./assets/empty.png";

export type Combination = Actions[]

export enum Actions {
    None, Clap, Bow
}

export const actionImage: Record<Actions, string> = {
    [Actions.None]: empty,
    [Actions.Clap]: clap,
    [Actions.Bow]: bow,
}
