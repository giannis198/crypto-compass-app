import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Coin {
  id: string;
  name: string;
  market_cap: number;
  price: number;
  percent_change_24h: number;
  quotes: {
    USD: {
      price: number;
      market_cap: number;
      percent_change_24h: number;
    };
  };
}

interface CryptoState {
  coins: Coin[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  refreshing: boolean;
  fetchCoins: () => Promise<void>;
  fetchMoreCoins: () => Promise<void>;
  loadCoinsFromStorage: () => Promise<void>;
  refreshCoins: () => Promise<void>;
}

export const useCryptoStore = create<CryptoState>((set, get) => ({
  coins: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  refreshing: false,
  fetchCoins: async () => {
    if (!get().hasMore) return;
    set({ loading: true });
    try {
      const response = await fetch(
        `https://api.coinpaprika.com/v1/tickers?page=${get().page}`
      );
      const newCoins = await response.json();
      if (newCoins.length === 0) {
        set({ hasMore: false });
      }
      const coinsToStore = [...get().coins, ...newCoins];
      await AsyncStorage.setItem("coins", JSON.stringify(coinsToStore));
      set({
        coins: coinsToStore,
        loading: false,
        page: get().page + 1,
        refreshing: false,
      });
    } catch (e) {
      set({
        error: "Failed to fetch coins",
        loading: false,
        refreshing: false,
      });
    }
  },
  fetchMoreCoins: async () => {
    get().fetchCoins();
  },
  loadCoinsFromStorage: async () => {
    set({ loading: true });
    try {
      const storedCoins = await AsyncStorage.getItem("coins");
      if (storedCoins) {
        set({ coins: JSON.parse(storedCoins), loading: false, page: 1 });
      }
    } catch (e) {
      set({ error: "Could not load data from storage", loading: false });
    }
  },
  refreshCoins: async () => {
    set({ refreshing: true, page: 1, hasMore: true, coins: [] });
    await get().fetchCoins();
  },
}));
