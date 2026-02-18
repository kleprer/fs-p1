import React from 'react';

interface Props {
  version: 'context' | 'redux';
  onToggle: () => void;
}

const Header: React.FC<Props> = ({ version, onToggle }) => {
  return (
    <header style={{
      background: version === 'context' ? '#2196F3' : '#9C27B0',
      color: 'white',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ margin: 0 }}>
          📰 News Feed ({version === 'context' ? 'Context API' : 'Redux Toolkit'})
        </h1>
        <button 
          onClick={onToggle}
          style={{
            padding: '10px 20px',
            background: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            color: version === 'context' ? '#2196F3' : '#9C27B0'
          }}
        >
          Переключить на {version === 'context' ? 'Redux' : 'Context'}
        </button>
      </div>
    </header>
  );
};

export default Header;