import React, { useState } from 'react';
import { ConfigEditor } from './components/ConfigEditor';
import { Sidebar } from './components/Sidebar';
import { Documentation } from './components/Documentation';
import { GettingStarted } from './components/GettingStarted';
import { Footer } from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('config');

  const renderContent = () => {
    switch (currentPage) {
      case 'config':
        return <ConfigEditor />;
      case 'docs':
        return <Documentation />;
      case 'getting-started':
        return <GettingStarted />;
      default:
        return <ConfigEditor />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background flex-col">
      <div className="flex flex-1">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <main className="flex-1">{renderContent()}</main>
      </div>
      <Footer />
    </div>
  );
}

export default App;