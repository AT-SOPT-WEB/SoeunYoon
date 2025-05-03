import { useNavigate } from 'react-router';

import AuthLayout from '../components/login/AuthLayout';
import Input from '../components/common/Input';
import Button from '../components/button/Button';

export default function Signup() {
  const navigate = useNavigate();
  return (
    <AuthLayout title="회원가입" highlight="SUS" optionalText="SOPT User Search에 오신 것을 환영합니다!">
      <div className="flex flex-col gap-6">
        <Input label="아이디" placeholder="아이디를 입력해 주세요" />

        <div className="flex flex-col gap-3 mt-4 mb-2">
          <Button>다음</Button>
          <Button variant="secondary" onClick={() => navigate('/login')}>로그인</Button>
        </div>
      </div>
    </AuthLayout>
  );
}
