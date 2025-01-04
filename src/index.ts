import express, { Request, Response } from "express";
import yahooFinance from "yahoo-finance2";
import { getCurrentPeriod, getPreviousPeriod } from "./utils/dateHelpers";

// Set the network port
const port = 3000;
const app = express();
app.use(express.json());

const currentPeriod = getCurrentPeriod();
const previousPeriod = getPreviousPeriod();

const options = {
  period1: currentPeriod,
  period2: previousPeriod,
  events: "dividends",
  return: "array" as const,
  interval: "1mo" as const,
  includePrePost: false,
};

// Basic route to fetch stock price
app.get("/stocks/:symbol", async (req: Request, res: Response) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const quote = await yahooFinance.chart(symbol, options);
    res.json({ quote: quote });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error fetching stock data for this ${req} ${error}` });
  }
});

app.post("/stock", async (req: Request, res: Response) => {
  const result: any[] = [];
  try {
    const { stocks } = req.body;
    for (const stock of stocks) {
      const stockInformtion = await yahooFinance.quote(stock);
      result.push(stockInformtion);
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
