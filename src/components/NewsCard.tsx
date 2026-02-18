import React from 'react';
import { NewsItem } from '../types/news.types';

interface Props {
  item: NewsItem;
  index: number;
}

const NewsCard: React.FC<Props> = ({ item, index }) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      margin: '10px 0',
      background: 'white'
    }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
        {index + 1}. {item.title} 
      </h3>
      
      <p style={{ color: '#666', lineHeight: '1.5' }}>
        {item.body}
      </p>
      
      <div style={{ marginTop: '10px' }}>
        <div style={{ marginBottom: '10px' }}>
          {item.tags.map(tag => (
            <span key={tag} style={{
              background: '#e0e0e0',
              padding: '3px 8px',
              marginRight: '5px',
              fontSize: '12px'
            }}>
              #{tag}
            </span>
          ))}
        </div>
        
        <div style={{ display: 'flex', gap: '15px', color: '#666' }}>
          <span> likes: {item.reactions.likes}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;