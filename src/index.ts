import express, { Request, Response } from "express";
import yahooFinance from "yahoo-finance2";
import { getCurrentPeriod, getPreviousPeriod } from "./utils/dateHelpers";
import { createStockDto } from "./utils/dtoHelpers";

// Set the network port
const port = 3000;
const app = express();
app.use(express.json());

const currentPeriod = getCurrentPeriod();
const previousPeriod = getPreviousPeriod();

const options = {
  period1: previousPeriod,
  period2: currentPeriod,
  events: "dividends",
  return: "array" as const,
  interval: "1mo" as const,
  includePrePost: false,
};

// Route to fetch stock data for a given symbol
app.get("/stocks/:symbol", async (req: Request, res: Response) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const quote = await yahooFinance.chart(symbol, options);
    const stockDto = createStockDto(quote);
    res.json({ stock: stockDto });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error fetching stock data for this ${req} ${error}` });
  }
});

// Route to fetch stock data for a list of symbols in the request body
app.post("/stock", async (req: Request, res: Response) => {
  const result: any[] = [];
  try {
    const { stocks } = req.body;
    for (const symbol of stocks) {
      const quote = await yahooFinance.chart(symbol, options);
      const stockDto = createStockDto(quote);
      result.push(stockDto);
    }
    res.json({ stocks: result });
  } catch (error) {
    res.status(500).json({ error: `Error fetching stock data ${error}` });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}`);
});
