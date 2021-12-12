export class Pair {
  pairName: string;
  price: number;
  time: string;

  constructor(data: any) {
    this.pairName = data?.pairName;
    this.price = data?.price;
    this.time = data?.time;
  }
}
