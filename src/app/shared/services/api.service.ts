import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, map, mergeMap, Observable, tap } from "rxjs";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { ApiKey } from "@assets/coin-api.key";
import { HistoryPair, HistoryPairMapper, Pair, PairMapper } from "../models";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly defaultPairName = 'BTC/USD';
  private readonly websocketApiUrl = 'wss://ws.coinapi.io/v1';
  private readonly restApiUrl = 'https://rest.coinapi.io/v1';

  public historyCurrencyPair$: Observable<HistoryPair[] | undefined>;
  public pairData$: Observable<Pair | undefined>;
  public pairName$ = new BehaviorSubject(this.defaultPairName);

  private historyCurrencyPair = new BehaviorSubject<HistoryPair[] | undefined>(undefined);
  private pairData = new BehaviorSubject<Pair | undefined>(undefined);
  private websocketConnection$!: WebSocketSubject<any>;

  constructor(private http: HttpClient) {
    this.historyCurrencyPair$ = this.historyCurrencyPair.asObservable();
    this.pairData$ = this.pairData.asObservable();
  }

  public searchPairData(pairName: string): void {
    this.pairName$.next(pairName);
  }

  public loadPairData(): Observable<Pair> {
    this.websocketConnection$ = webSocket(this.websocketApiUrl);
    this.pairName$.subscribe(pairName => {
      const pairItems = pairName.split('/');

      this.websocketConnection$.next({
        type: 'hello', apikey: ApiKey, subscribe_data_type: ['trade'],
        subscribe_filter_symbol_id: [
          `BITSTAMP_SPOT_${ pairItems[0] }_${ pairItems[1] }`,
          `BITFINEX_SPOT_${ pairItems[0] }_${ pairItems[1] }`,
          `BITFOREX_SPOT_${ pairItems[0] }_${ pairItems[1] }`,
          `COINBASE_SPOT_${ pairItems[0] }_${ pairItems[1] }`,
          `POLONIEX_SPOT_${ pairItems[0] }_${ pairItems[1] }`,
          `KRAKENFTS_SPOT_${ pairItems[0] }_${ pairItems[1] }`,
          `ITBIT_SPOT_${ pairItems[0] }_${ pairItems[1] }`,
          `IDCM_SPOT_${ pairItems[0] }_${ pairItems[1] }`,
        ],
      });
    });

    return this.pairName$.pipe(
      mergeMap(pairName => this.websocketConnection$.pipe(
        map(data => PairMapper.getPairFromResponse(data, pairName)),
        tap(pair => this.pairData.next(pair)),
      )),
    );
  }

  public loadHistoryCurrencyPair(): Observable<HistoryPair[]> {
    return this.pairName$.pipe(
      mergeMap(pairName => {
        const yearAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 2)).toISOString().split('.')[0];
        return this.http.get<HistoryPair[]>(
          `${ this.restApiUrl }/exchangerate/${ pairName }/history?period_id=7DAY&time_start=${ yearAgo }&`,
          { headers: new HttpHeaders({ 'X-CoinAPI-Key': ApiKey }) }
        ).pipe(
          map(data => HistoryPairMapper.getHistoryPairFromResponse(data)),
          tap(data => this.historyCurrencyPair.next(data))
        )
      }),
    );
  }
}
