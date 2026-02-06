import React, { useState, useCallback } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Theme State
  const [theme, setTheme] = useState({
    name: 'midnight',
    bg: '#1a1a1a',      // Black
    gridBg: '#001f3f',  // Navy
    square: '#ffffff',  // White
    accent: '#ffdc00'   // Yellow
  });

  const themes = {
    prairies: {
      name: 'prairies',
      bg: '#2ecc40',     // Green
      gridBg: '#0074d9', // Blue
      square: '#ffffff', // White
      accent: '#ffdc00'  // Yellow
    },
    midnight: {
      name: 'midnight',
      bg: '#1a1a1a',     // Black
      gridBg: '#001f3f', // Navy
      square: '#ffffff', // White
      accent: '#ffdc00'  // Yellow
    }
  };

  const calculateWinner = useCallback((squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }, []);

  const handleClick = (index) => {
    if (board[index] || winner || isDraw) return;
    setGameStarted(true);
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) { setWinner(gameWinner); } 
    else if (!newBoard.includes(null)) { setIsDraw(true); } 
    else { setIsXNext(!isXNext); }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsDraw(false);
    setGameStarted(false);
  };

  return (
    <div style={{ ...styles.container, backgroundColor: theme.bg }}>
      <div style={styles.headerRow}>
        <h1 style={styles.title}>Tic Tac Toe</h1>
        <div style={styles.themeControls}>
          <button style={styles.themeBtn} onClick={() => setTheme(themes.prairies)}>🌾 Prairies</button>
          <button style={styles.themeBtn} onClick={() => setTheme(themes.midnight)}>🌑 Midnight</button>
        </div>
      </div>
      
      {!gameStarted && !winner && !isDraw && (
        <div style={styles.setupSection}>
          <p>Choose who goes first</p>
          <div style={styles.buttonRow}>
            <button style={{...styles.startBtn, color: theme.accent}} onClick={() => setIsXNext(true)}>X starts</button>
            <button style={{...styles.startBtn, color: theme.accent}} onClick={() => setIsXNext(false)}>O starts</button>
          </div>
        </div>
      )}

      <div style={{ ...styles.grid, backgroundColor: theme.gridBg }}>
        {board.map((value, i) => (
          <button
            key={i}
            style={{ ...styles.square, backgroundColor: theme.square, color: theme.gridBg }}
            onClick={() => handleClick(i)}
            onKeyDown={(e) => e.key === 'Enter' && handleClick(i)}
          >
            {value}
          </button>
        ))}
      </div>

      <p style={{ ...styles.tip, color: theme.accent }}>Tip: You can restart at any time — no refresh needed.</p>
      <button onClick={resetGame} style={styles.restartBtn}>Restart Game</button>

      {(winner || isDraw) && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2 style={{color: '#333'}}>{winner ? `Winner: ${winner}` : "Draw!"}</h2>
            {winner && <p style={{color: '#666'}}>Loser: {winner === 'X' ? 'O' : 'X'}</p>}
            <button onClick={resetGame} style={styles.playAgainBtn}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', padding: '40px', transition: 'background-color 0.4s ease' },
  headerRow: { display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '400px', alignItems: 'center', marginBottom: '20px' },
  title: { fontSize: '2rem', margin: 0 },
  themeControls: { display: 'flex', gap: '10px' },
  themeBtn: { padding: '5px 10px', cursor: 'pointer', borderRadius: '5px', border: '1px solid white', background: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '0.8rem' },
  setupSection: { alignSelf: 'center', marginBottom: '20px', textAlign: 'center' },
  buttonRow: { display: 'flex', gap: '10px', marginTop: '10px' },
  startBtn: { padding: '10px 20px', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '8px', padding: '8px', borderRadius: '15px', margin: '20px 0' },
  square: { width: '100px', height: '100px', border: 'none', borderRadius: '10px', fontSize: '2.5rem', fontWeight: 'bold', cursor: 'pointer' },
  tip: { fontSize: '0.9rem', marginTop: '20px', fontWeight: 'bold' },
  restartBtn: { marginTop: '10px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', textDecoration: 'underline' },
  overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  modal: { backgroundColor: 'white', padding: '40px', borderRadius: '15px', textAlign: 'center' },
  playAgainBtn: { marginTop: '20px', padding: '10px 30px', backgroundColor: '#000', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }
};

export default TicTacToe;