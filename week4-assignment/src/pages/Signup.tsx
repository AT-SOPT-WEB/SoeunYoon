import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthLayout from '../components/login/AuthLayout';
import Input from '../components/common/Input';
import Button from '../components/button/Button';
import Alert from '../components/common/Alert';

export default function Signup() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [nickname, setNickname] = useState('');
  
  const handleNext = () => {
    if (step === 1 && id.trim()) {
      setStep(2);
    } else if (step === 2 && password && confirmPw && password === confirmPw) {
      setStep(3);
    }
  };

  const handleSubmit = () => {
    if (!nickname.trim()) return;
    setIsModalOpen(true);
  };

  return (
    <AuthLayout title="회원가입" highlight="SUS" optionalText="SOPT User Search에 오신 것을 환영합니다!">
      <div className="flex flex-col gap-6">
        {step === 1 && (
          <Input
            label="아이디"
            placeholder="아이디를 입력해 주세요"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        )}

        {step === 2 && (
          <>
            <Input
              label="비밀번호"
              placeholder="비밀번호를 입력해 주세요"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 입력해 주세요"
              type="password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
            />
            {password && confirmPw && password !== confirmPw && (
              <p className="text-xs text-red-500">비밀번호가 일치하지 않습니다.</p>
            )}
          </>
        )}

        {step === 3 && (
          <Input
            label="닉네임"
            placeholder="닉네임을 입력해 주세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        )}

        <div className="flex flex-col gap-3 mt-4 mb-2">
          {step < 3 ? (
            <Button
              onClick={handleNext}
              disabled={
                (step === 1 && !id.trim()) ||
                (step === 2 &&
                  (!password || !confirmPw || password !== confirmPw))
              }
            >
              다음
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!nickname.trim()}
            >
              회원가입
            </Button>
          )}

          <Button variant="secondary" onClick={() => navigate('/login')}>
            로그인
          </Button>
        </div>
      </div>
      <Alert
        isOpen={isModalOpen}
        title="회원가입 완료"
        message={`${nickname}님, 회원가입이 완료되었습니다!`}
        confirmText="로그인"
        onConfirm={() => {
          setIsModalOpen(false);
          navigate('/login');
        }}
      />
    </AuthLayout>
  );
}
