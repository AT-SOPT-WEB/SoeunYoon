import { useState } from 'react';
import { useNavigate } from 'react-router';
import { login } from '../services/authService';

import AuthLayout from '../components/login/AuthLayout';
import Input from '../components/common/Input';
import Button from '../components/button/Button';
import Alert from '../components/common/Alert';

export default function Login() {
  const navigate = useNavigate();

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ isOpen: false, message: '', isError: false });

  const handleLogin = async () => {
    try {
      const response = await login(loginId, password);
      const userId = response.data.userId;

      localStorage.setItem('userId', String(userId));

      setAlert({
        isOpen: true,
        message: '로그인에 성공했습니다!',
        isError: false,
      });
    } catch (error) {
      setAlert({
        isOpen: true,
        message: (error as Error).message,
        isError: true,
      });
    }
  };

  const handleAlertConfirm = () => {
    setAlert({ isOpen: false, message: '', isError: false });
    if (!alert.isError) {
      navigate('/mypage/Info');
    }
  };

  return (
    <AuthLayout title="로그인" highlight="SUS">
      <div className="flex flex-col gap-6">
        <Input
          label="아이디"
          placeholder="아이디를 입력해 주세요"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
        />
        <Input
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex flex-col gap-3 mt-4">
          <Button
            onClick={handleLogin}
            disabled={!loginId.trim() || !password.trim()}
          >
            로그인
          </Button>
          <Button variant="secondary" onClick={() => navigate('/signup')}>
            회원가입
          </Button>
        </div>
      </div>

      <Alert
        isOpen={alert.isOpen}
        title={alert.isError ? '로그인 오류' : '로그인 완료'}
        message={alert.message}
        onConfirm={handleAlertConfirm}
      />
    </AuthLayout>
  );
}
