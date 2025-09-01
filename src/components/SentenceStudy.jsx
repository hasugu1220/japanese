import { useState } from 'react';
import { katakanaSentences, sentenceLevels } from '../data/sentences';

const SentenceStudy = () => {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [showTranslation, setShowTranslation] = useState({});
  const [showWords, setShowWords] = useState({});

  const filteredSentences = katakanaSentences.filter(sentence => sentence.level === selectedLevel);

  const toggleTranslation = (index) => {
    setShowTranslation(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleWords = (index) => {
    setShowWords(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>가타카나 문장 학습</h2>
      
      {/* 레벨 선택 */}
      <div className="level-selector">
        <h3 style={{ marginBottom: '20px', color: '#333' }}>난이도 선택</h3>
        <div className="level-buttons">
          {Object.entries(sentenceLevels).map(([level, name]) => (
            <button
              key={level}
              className={`level-btn ${selectedLevel === parseInt(level) ? 'active' : ''}`}
              onClick={() => setSelectedLevel(parseInt(level))}
            >
              {name} ({level})
            </button>
          ))}
        </div>
      </div>

      {/* 문장 목록 */}
      <div className="sentence-grid">
        {filteredSentences.map((sentence, index) => (
          <div key={index} className="sentence-card">
            <div className="sentence-japanese">{sentence.japanese}</div>
            
            {/* 번역 보기/숨기기 버튼 */}
            <div className="sentence-controls">
              <button 
                className="control-btn translation-btn"
                onClick={() => toggleTranslation(index)}
              >
                {showTranslation[index] ? '번역 숨기기' : '번역 보기'}
              </button>
              <button 
                className="control-btn words-btn"
                onClick={() => toggleWords(index)}
              >
                {showWords[index] ? '단어 숨기기' : '주요 단어'}
              </button>
            </div>

            {/* 번역 */}
            {showTranslation[index] && (
              <div className="sentence-korean">
                {sentence.korean}
              </div>
            )}

            {/* 주요 단어 */}
            {showWords[index] && (
              <div className="sentence-words">
                <strong>주요 단어:</strong>
                <div className="word-tags">
                  {sentence.words.map((word, wordIndex) => (
                    <span key={wordIndex} className="word-tag">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 학습 팁 */}
      <div className="study-tips">
        <h3>📚 학습 팁</h3>
        <ul>
          <li>먼저 일본어 문장을 소리내어 읽어보세요</li>
          <li>번역을 보기 전에 의미를 추측해보세요</li>
          <li>주요 단어들을 따로 외워보세요</li>
          <li>문장을 여러 번 반복해서 읽어보세요</li>
        </ul>
      </div>
    </div>
  );
};

export default SentenceStudy;