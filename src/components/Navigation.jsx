const Navigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'characters', label: '문자표' },
    { id: 'words', label: '단어장' },
    { id: 'character-quiz', label: '문자 퀴즈' },
    { id: 'word-quiz', label: '단어 퀴즈' }
  ];

  return (
    <div className="nav-tabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Navigation;