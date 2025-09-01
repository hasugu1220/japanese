import { useState, useEffect } from 'react';
import { katakanaWords } from '../data/words';

const WordQuiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [options, setOptions] = useState([]);

  const startQuiz = () => {
    const shuffledWords = [...katakanaWords].sort(() => Math.random() - 0.5).slice(0, 20);
    setQuizData(shuffledWords);
    setCurrentQuiz(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    showQuestion(0, shuffledWords);
  };

  const showQuestion = (questionIndex, data) => {
    if (questionIndex >= 20) {
      setShowResult(true);
      return;
    }

    const [correctWord, correctMeaning] = data[questionIndex];
    const wrongOptions = katakanaWords
      .filter(([word, meaning]) => meaning !== correctMeaning)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(([word, meaning]) => meaning);

    const questionOptions = [correctMeaning, ...wrongOptions].sort(() => Math.random() - 0.5);
    
    setCorrectAnswer(correctMeaning);
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
    const percentage = (score / 20) * 100;
    if (percentage <= 20) return '새내기';
    if (percentage <= 40) return '초보';
    if (percentage <= 60) return '중급';
    if (percentage <= 80) return '고수';
    return '마스터';
  };

  useEffect(() => {
    startQuiz();
  }, []);

  if (showResult) {
    const percentage = (score / 20) * 100;
    return (
      <div className="quiz-container">
        <div className="quiz-result">
          <div className="score">점수: {score}/20 ({percentage.toFixed(1)}%)</div>
          <div className="rank">등급: {getRank()}</div>
          <button className="restart-btn" onClick={startQuiz}>다시 도전하기</button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2 style={{ marginBottom: '20px', color: '#333' }}>가타카나 단어 퀴즈</h2>
        <div className="progress">{currentQuiz + 1} / 20</div>
      </div>
      {quizData.length > 0 && (
        <>
          <div className="question">
            {quizData[currentQuiz]?.[0]?.split(' (')[0]}
          </div>
          <div className="options">
            {options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${
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

export default WordQuiz;