import { stockDto } from "../dtos/stock.dto";

export const createStockDto = (stockInformation: any): stockDto => {
  return {
    symbol: stockInformation.meta.symbol ?? "",
    price: stockInformation.meta.regularMarketPrice ?? undefined,
    dividend: stockInformation.events.dividends[0].amount ?? undefined,
    yearLow: stockInformation.meta.fiftyTwoWeekLow ?? undefined,
    yearHigh: stockInformation.meta.fiftyTwoWeekHigh ?? undefined,
  };
};
