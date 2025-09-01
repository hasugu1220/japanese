import { useState, useEffect } from 'react';
import { katakanaSentences, sentenceLevels } from '../data/sentences';

const SentenceQuiz = () => {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [quizData, setQuizData] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [options, setOptions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = () => {
    const levelSentences = katakanaSentences.filter(sentence => sentence.level === selectedLevel);
    const shuffledSentences = [...levelSentences].sort(() => Math.random() - 0.5).slice(0, Math.min(10, levelSentences.length));
    
    setQuizData(shuffledSentences);
    setCurrentQuiz(0);
    setScore(0);
    setShowResult(false);
    setQuizStarted(true);
    setSelectedOption(null);
    showQuestion(0, shuffledSentences);
  };

  const showQuestion = (questionIndex, data) => {
    if (questionIndex >= data.length) {
      setShowResult(true);
      return;
    }

    const currentSentence = data[questionIndex];
    const correctKorean = currentSentence.korean;
    
    // 같은 레벨의 다른 문장들에서 오답 선택지 가져오기
    const sameLevel = katakanaSentences.filter(s => s.level === selectedLevel && s.korean !== correctKorean);
    const wrongOptions = sameLevel
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(s => s.korean);

    const questionOptions = [correctKorean, ...wrongOptions].sort(() => Math.random() - 0.5);
    
    setCorrectAnswer(correctKorean);
    setOptions(questionOptions);
    setSelectedOption(null);
  };

  const checkAnswer = (selected) => {
    setSelectedOption(selected);
    if (selected === correctAnswer) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuiz + 1;
      setCurrentQuiz(nextQuestion);
      showQuestion(nextQuestion, quizData);
    }, 1500);
  };

  const getRank = () => {
    const percentage = (score / quizData.length) * 100;
    if (percentage <= 30) return '새내기';
    if (percentage <= 50) return '초보';
    if (percentage <= 70) return '중급';
    if (percentage <= 90) return '고수';
    return '마스터';
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setShowResult(false);
    setCurrentQuiz(0);
    setScore(0);
    setSelectedOption(null);
  };

  if (!quizStarted) {
    return (
      <div className="quiz-container">
        <h2 style={{ marginBottom: '20px', color: '#333' }}>가타카나 문장 퀴즈</h2>
        
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

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <p style={{ marginBottom: '20px', color: '#666' }}>
            선택한 난이도: <strong>{sentenceLevels[selectedLevel]}</strong><br/>
            문제 수: <strong>{Math.min(10, katakanaSentences.filter(s => s.level === selectedLevel).length)}문제</strong>
          </p>
          <button className="restart-btn" onClick={startQuiz}>
            퀴즈 시작하기
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = (score / quizData.length) * 100;
    return (
      <div className="quiz-container">
        <div className="quiz-result">
          <div className="score">점수: {score}/{quizData.length} ({percentage.toFixed(1)}%)</div>
          <div className="rank">등급: {getRank()}</div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button className="restart-btn" onClick={startQuiz}>다시 도전하기</button>
            <button className="restart-btn" onClick={resetQuiz}>난이도 변경</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2 style={{ marginBottom: '20px', color: '#333' }}>
          가타카나 문장 퀴즈 ({sentenceLevels[selectedLevel]})
        </h2>
        <div className="progress">{currentQuiz + 1} / {quizData.length}</div>
      </div>
      
      {quizData.length > 0 && (
        <>
          <div className="question sentence-question">
            {quizData[currentQuiz]?.japanese}
          </div>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
            위 문장의 한국어 뜻을 선택하세요
          </p>
          <div className="options">
            {options.map((option, index) => (
              <button
                key={index}
                className={`option-btn sentence-option ${
                  selectedOption === option
                    ? option === correctAnswer
                      ? 'correct'
                      : 'incorrect'
                    : selectedOption && option === correctAnswer
                    ? 'correct'
                    : ''
                }`}
                onClick={() => checkAnswer(option)}
                disabled={selectedOption !== null}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SentenceQuiz;