/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useContext, useCallback, useRef, useEffect } from 'react';
import { NewsItem } from '../types/news.types';

interface NewsContextType {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const skipRef = useRef(0);

  const fetchNews = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`https://dummyjson.com/posts?limit=10&skip=${skipRef.current}`);
      if (!response.ok) throw new Error('ошибка загрузки');
      
      const data = await response.json();
      
      if (data.posts.length === 0) {
        setHasMore(false);
      } else {
        setNews(prev => {
          const existingIds = new Set(prev.map(item => item.id));
          const newItems = data.posts.filter((item: NewsItem) => !existingIds.has(item.id));
          return [...prev, ...newItems];
        });
        skipRef.current += 10;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'unknown error');
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore]);

  const loadMore = useCallback(() => {
    fetchNews();
  }, [fetchNews]);

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <NewsContext.Provider value={{ news, loading, error, hasMore, loadMore }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error('useNews должен использоваться внутри NewsProvider');
  }
  return context;
};