/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import { useNews } from '../context/NewsContext';
import NewsCard from './NewsCard';

const NewsListContext: React.FC = () => {
  const { news, loading, error, hasMore, loadMore } = useNews();
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
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
  }, [hasMore, loading, loadMore]);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {news.map((item, index) => (
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

export default NewsListContext;