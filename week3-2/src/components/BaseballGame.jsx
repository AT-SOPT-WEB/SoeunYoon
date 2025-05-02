import { useState } from 'react';
import Input from './common/Input';
import Message from './baseball/Message';
import List from './baseball/List';
import { generateAnswer, getBaseballResult, isValidInput } from '../utils/baseball';

export default function BaseballGame() {
  const [answer, setAnswer] = useState(generateAnswer());
  const [tries, setTries] = useState([]);
  const [message, setMessage] = useState('');

  const handleTry = (input) => {
    if (!isValidInput(input)) {
      setMessage('⚠️ 서로 다른 숫자 3자리를 입력해주세요!');
      return;
    }
    if (tries.length >= 10) return;

    const { strike, ball } = getBaseballResult(input, answer);
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
      setMessage('💥 10번 실패! 정답은 ' + answer + ' 입니다. 게임이 3초 뒤 초기화됩니다.');
      setTimeout(() => {
        setAnswer(generateAnswer());
        setTries([]);
        setMessage('');
      }, 3000);
    } else {
      setMessage(`${strike} 스트라이크 ${ball} 볼`);
    }
  };

  return (
    <div className="w-full max-w-md px-4 space-y-5">
      <div className="rounded-lg">
        <Input
          placeholder="서로 다른 숫자 3자리를 입력하세요"
          onSubmit={handleTry}
          resetAfterSubmit={true}
          maxLength={3}
          className="text-center"
        />
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
