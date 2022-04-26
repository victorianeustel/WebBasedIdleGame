import { item } from "src/item";

export interface Account{
    id: string;
    score: number;
    multiplier: number;
    perMinute: number;
    itemInventory: item[];
  }
