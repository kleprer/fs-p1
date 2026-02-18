/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchNews } from '../store/newsSlice';
import NewsCard from './NewsCard';

const NewsListRedux: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, hasMore, skip } = useSelector((state: RootState) => state.news);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchNews(0));
  }, [dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          dispatch(fetchNews(skip));
        }
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, loading, skip, dispatch]);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {items.map((item, index) => (
        <NewsCard key={item.id} item={item} index={index} />
      ))}
      
      <div ref={observerRef} style={{ height: '20px', margin: '20px 0' }}>
        {loading && <p style={{ textAlign: 'center' }}>загрузка...</p>}
        {error && <p style={{ textAlign: 'center', color: 'red' }}>ошибка: {error}</p>}
        {!hasMore && <p style={{ textAlign: 'center', color: '#999' }}>новостей больше нет</p>}
      </div>
    </div>
  );
};

export default NewsListRedux;