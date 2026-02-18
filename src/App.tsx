import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { NewsProvider } from './context/NewsContext';
import Header from './components/Header';
import NewsListContext from './components/NewsList';
import NewsListRedux from './components/NewsListRedux';

function App() {
  const [version, setVersion] = useState<'context' | 'redux'>('context');

  const toggleVersion = () => {
    setVersion(prev => prev === 'context' ? 'redux' : 'context');
  };

  // контент в зависимости от версии
  const content = version === 'context' ? (
    <NewsProvider>
      <NewsListContext />
    </NewsProvider>
  ) : (
    <Provider store={store}>
      <NewsListRedux />
    </Provider>
  );

  return (
    <div className="App">
      <Header version={version} onToggle={toggleVersion} />
      {content}
    </div>
  );
}

export default App;