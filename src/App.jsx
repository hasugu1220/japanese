import { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import CharacterTable from './components/CharacterTable';
import WordList from './components/WordList';
import CharacterQuiz from './components/CharacterQuiz';
import WordQuiz from './components/WordQuiz';
import './styles/index.css';

function App() {
  const [activeTab, setActiveTab] = useState('characters');

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'characters':
        return <CharacterTable />;
      case 'words':
        return <WordList />;
      case 'character-quiz':
        return <CharacterQuiz />;
      case 'word-quiz':
        return <WordQuiz />;
      default:
        return <CharacterTable />;
    }
  };

  return (
    <div className="container">
      <Header />
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="tab-content">
        {renderContent()}
      </div>
      <div className="made-by">Made by hohoham</div>
    </div>
  );
}

export default App;