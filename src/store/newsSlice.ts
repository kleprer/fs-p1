import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NewsItem } from '../types/news.types';

interface NewsState {
  items: NewsItem[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  skip: number;
}

const initialState: NewsState = {
  items: [],
  loading: false,
  error: null,
  hasMore: true,
  skip: 0
};

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (skip: number) => {
    const response = await fetch(`https://dummyjson.com/posts?limit=10&skip=${skip}`);
    const data = await response.json();
    return data.posts as NewsItem[];
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    clearNews: (state) => {
      state.items = [];
      state.skip = 0;
      state.hasMore = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        const newItems = action.payload.filter(
          newItem => !state.items.some(existing => existing.id === newItem.id)
        );
        
        state.items = [...state.items, ...newItems];
        state.skip += 10;
        state.hasMore = action.payload.length > 0;
        state.loading = false;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'ошибка загрузки';
      });
  }
});

export const { clearNews } = newsSlice.actions;
export default newsSlice.reducer;