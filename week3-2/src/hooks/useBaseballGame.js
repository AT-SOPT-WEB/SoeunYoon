import { useRef, useState } from 'react';
import { generateAnswer, getBaseballResult, isValidInput } from '../utils/baseball';

export default function useBaseballGame() {
  const [answer, setAnswer] = useState(generateAnswer());
  const [tries, setTries] = useState([]);
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(null);
  const timerRef = useRef(null);

  // 게임 초기화
  const resetGame = () => {
    setAnswer(generateAnswer());
    setTries([]);
    setMessage('');
    setCountdown(null);
  };

  // 3초 카운트다운 시작 (게임 종료 후)
  const startCountdown = () => {
    setCountdown(3);
    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(timerRef.current);
          resetGame();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 숫자 입력 처리
  const handleTry = (input) => {
    if (!isValidInput(input)) {
      setMessage('⚠️ 서로 다른 숫자 3자리를 입력해주세요!');
      return;
    }
    if (tries.length >= 10 || countdown !== null) return;

    const { strike, ball } = getBaseballResult(input, answer);
    const result = `${input} - ${strike}S ${ball}B`;
    const updatedTries = [...tries, result];
    setTries(updatedTries);

    if (strike === 3) {
      setMessage('🎉 정답입니다! 게임을 다시 시작합니다.');
      startCountdown();
    } else if (updatedTries.length >= 10) {
      setMessage(`💥 10번 실패! 정답은 ${answer} 입니다. 게임이 3초 뒤 초기화됩니다.`);
      startCountdown();
    } else {
      setMessage(`${strike} 스트라이크 ${ball} 볼`);
    }
  };

  return {
    message,
    tries,
    countdown,
    handleTry,
  };
}
