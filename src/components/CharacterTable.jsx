import { useState } from 'react';
import { katakanaChars } from '../data/katakana';

const CharacterTable = () => {
  const [hintModes, setHintModes] = useState({});

  const toggleHint = (index) => {
    setHintModes(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>가타카나 문자표</h2>
      <p style={{ textAlign: 'center', marginBottom: '20px', color: '#666' }}>
        💡 문자를 클릭하면 암기 힌트가 나타납니다!
      </p>
      <div className="character-grid">
        {katakanaChars.map(([char, pronunciation, hint], index) => (
          <div
            key={index}
            className={`character-card ${hintModes[index] ? 'hint-mode' : ''}`}
            onClick={() => toggleHint(index)}
          >
            <div className="character">{char}</div>
            <div className="pronunciation">{pronunciation}</div>
            {hintModes[index] && (
              <div className="hint-text">{hint}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterTable;