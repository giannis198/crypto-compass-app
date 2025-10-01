export interface Coin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply?: number;
  total_supply?: number;
  max_supply?: number;
  quotes: {
    USD: {
      price: number;
      market_cap: number;
      percent_change_24h: number;
      volume_24h: number;
      percent_change_1h?: number;
      percent_change_7d?: number;
      percent_change_30d?: number;
    };
  };
}
