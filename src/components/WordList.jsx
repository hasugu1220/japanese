import { useState } from 'react';
import { katakanaWords, wordsPerPage, totalPages } from '../data/words';

const WordList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * wordsPerPage;
  const endIndex = startIndex + wordsPerPage;
  const currentWords = katakanaWords.slice(startIndex, endIndex);

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  const changePage = (direction) => {
    const newPage = currentPage + direction;
    goToPage(newPage);
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>가타카나 단어장</h2>
      <div className="word-grid">
        {currentWords.map(([word, meaning], index) => (
          <div key={index} className="word-card">
            <div className="word">{word}</div>
            <div className="meaning">{meaning}</div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button 
          className="page-btn" 
          onClick={() => changePage(-1)}
          disabled={currentPage === 1}
        >
          ‹
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
          <button
            key={pageNum}
            className="page-btn"
            onClick={() => goToPage(pageNum)}
            style={{
              background: pageNum === currentPage ? '#764ba2' : '#667eea'
            }}
          >
            {pageNum}
          </button>
        ))}
        <button 
          className="page-btn" 
          onClick={() => changePage(1)}
          disabled={currentPage === totalPages}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default WordList;