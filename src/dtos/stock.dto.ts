export interface stockDto {
  symbol: string;
  price: number;
  dividend: number;
  yearLow: number | undefined;
  yearHigh: number | undefined;
}
