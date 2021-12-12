export class HistoryPair {
  price: number;
  time: string;

  constructor(data: any) {
    this.price = data?.price;
    this.time = data?.time;
  }
}
