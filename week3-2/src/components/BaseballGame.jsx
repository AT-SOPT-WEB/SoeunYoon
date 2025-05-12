import Input from './common/Input';
import Message from './baseball/Message';
import List from './baseball/List';
import useBaseballGame from '../hooks/useBaseballGame';

export default function BaseballGame() {
  const { message, tries, countdown, handleTry } = useBaseballGame();

  return (
    <div className="w-full max-w-md px-4 space-y-5 relative">
      {countdown !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <p className="text-skyBlue text-7xl font-bold animate-bounce">{countdown}</p>
        </div>
      )}

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
