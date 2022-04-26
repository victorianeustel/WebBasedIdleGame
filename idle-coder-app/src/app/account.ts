import { item } from "src/item";

export interface Account{
    id: string;
    score: number;
    multiplier: number;
    itemInventory: item[];
  }
