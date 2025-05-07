import { useNavigate } from 'react-router-dom';

import { signup } from '../services/authService';
import useSignupForm from '../hooks/useSignupForm';
import useAlert from '../hooks/useAlert';

import AuthLayout from '../components/login/AuthLayout';
import Input from '../components/common/Input';
import Button from '../components/button/Button';
import Alert from '../components/common/Alert';

import { AxiosError } from 'axios';

export default function Signup() {
  const navigate = useNavigate();
  const {
    step, id, setId, password, setPassword, confirmPw, setConfirmPw,
    nickname, setNickname, canGoNextStep, goToNextStep
  } = useSignupForm();
  const alert = useAlert();

  const handleSubmit = async () => {
    if (!nickname.trim()) return;
    try {
      await signup(id, password, nickname);
      alert.open(`${nickname}님, 회원가입이 완료되었습니다!`);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      alert.open(err.response?.data?.message || '회원가입 중 오류가 발생했습니다.', true);
    }
  };
  

  return (
    <AuthLayout title="회원가입" highlight="SUS" optionalText="SOPT User Search에 오신 것을 환영합니다!">
      <div className="flex flex-col gap-6">
        {step === 1 && (
          <Input label="아이디" placeholder="아이디를 입력해 주세요" value={id} onChange={(e) => setId(e.target.value)} />
        )}
        {step === 2 && (
          <>
            <Input label="비밀번호" placeholder="비밀번호를 입력해 주세요" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Input label="비밀번호 확인" placeholder="비밀번호를 다시 입력해 주세요" type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} />
            {password && confirmPw && password !== confirmPw && (
              <p className="text-xs text-red-500">비밀번호가 일치하지 않습니다.</p>
            )}
          </>
        )}
        {step === 3 && (
          <Input label="닉네임" placeholder="닉네임을 입력해 주세요" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        )}

        <div className="flex flex-col gap-3 mt-4 mb-2">
          {step < 3 ? (
            <Button onClick={goToNextStep} disabled={!canGoNextStep}>다음</Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!nickname.trim()}>회원가입</Button>
          )}
          <Button variant="secondary" onClick={() => navigate('/login')}>로그인</Button>
        </div>
      </div>

      <Alert
        isOpen={alert.isOpen}
        title={alert.isError ? '회원가입 실패' : '회원가입 완료'}
        message={alert.message}
        confirmText="확인"
        onConfirm={() => {
          alert.close();
          if (!alert.isError) navigate('/login');
        }}
      />
    </AuthLayout>
  );
}
