import { HistoryPair } from "./histiry-pair.model";

export class HistoryPairMapper {
  public static getHistoryPairFromResponse(res: any[]): HistoryPair[] {
    return res.map(data => new HistoryPair({ price: data.rate_close, time: data.time_close }));
  }
}