import React from 'react';

interface Props {
  version: 'context' | 'redux';
  onToggle: () => void;
}

const Header: React.FC<Props> = ({ version, onToggle }) => {
  return (
    <header style={{
      color: 'black',
      padding: '20px',
      margin: '20px',
      textAlign: 'center'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '750px', margin: '0 auto' }}>
        <h1 style={{ margin: 0, fontSize: '24px'}}>
          Лента новостей ({version === 'context' ? 'context API' : 'redux toolkit'})
        </h1>
        <button 
          onClick={onToggle}
          style={{
            padding: '10px 10px',
            background: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold'
          }}
        >
          Переключить на {version === 'context' ? 'Redux' : 'Context'}
        </button>
      </div>
    </header>
  );
};

export default Header;