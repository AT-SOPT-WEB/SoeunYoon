import { useState } from 'react';
import Input from './baseball/Input';
import Message from './baseball/Message';
import List from './baseball/List';

function generateAnswer() {
  const digits = [];
  while (digits.length < 3) {
    const rand = Math.floor(Math.random() * 10);
    if (!digits.includes(rand)) digits.push(rand);
  }
  return digits.join('');
}

export default function BaseballGame() {
  const [answer, setAnswer] = useState(generateAnswer());
  const [tries, setTries] = useState([]);
  const [message, setMessage] = useState('');

  const handleTry = (input) => {
    if (input.length !== 3 || new Set(input).size !== 3 || !/^[0-9]{3}$/.test(input)) {
      setMessage('⚠️ 서로 다른 숫자 3자리를 입력해주세요!');
      return;
    }
    if (tries.length >= 10) return;

    let strike = 0;
    let ball = 0;

    [...input].forEach((num, idx) => {
      if (num === answer[idx]) strike++;
      else if (answer.includes(num)) ball++;
    });

    const result = `${input} - ${strike}S ${ball}B`;
    setTries([...tries, result]);

    if (strike === 3) {
      setMessage('🎉 정답입니다! 게임을 다시 시작합니다.');
      setTimeout(() => {
        setAnswer(generateAnswer());
        setTries([]);
        setMessage('');
      }, 3000);
    } else if (tries.length + 1 >= 10) {
      setMessage('💥 10번 실패! 정답은 ' + answer + ' 입니다. 게임이 5초 뒤 초기화됩니다.');
      setTimeout(() => {
        setAnswer(generateAnswer());
        setTries([]);
        setMessage('');
      }, 5000);
    } else {
      setMessage(`${strike} 스트라이크 ${ball} 볼`);
    }
  };

  return (
    <div className="w-full max-w-md px-4 space-y-5">
      <div className="rounded-lg">
        <Input onSubmit={handleTry} />
      </div>
      <div className="rounded-lg text-center">
        <Message text={message} />
      </div>
      <div className="rounded-lg">
        <List tries={tries} />
      </div>
    </div>
  );
}
