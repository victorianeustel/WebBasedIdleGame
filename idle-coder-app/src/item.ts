export interface item{
    //name: the name of the item
    name: string;
    //desc: the description of the item
    desc: string;
    //price: the cost of the item
    price: number;
    //isIncrementModifier: if this is true increaseToStat increases the on click multiplier, if false increaseToStat increases the passive generation
    isIncrementModifier: boolean;
    //increaseToStat: value added once purchased
    increaseToStat: number;
    //isPurchased: defaults to false, once purchased changes to true
    isPurchased: boolean;
}