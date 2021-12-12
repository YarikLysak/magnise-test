import { Pair } from "./pair.model";

export class PairMapper {
  public static getPairFromResponse(res: any, pairName: string): Pair {
    return new Pair({ price: res.price, time: res.time_exchange, pairName });
  }
}