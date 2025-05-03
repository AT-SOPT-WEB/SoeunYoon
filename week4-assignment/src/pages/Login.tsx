import AuthLayout from '../components/login/AuthLayout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function Login() {
  return (
    <AuthLayout title="로그인" highlight="SUS">
      <div className="flex flex-col gap-6">
        <Input label="아이디" placeholder="아이디를 입력해 주세요" />
        <Input label="비밀번호" type="password" placeholder="비밀번호를 입력해 주세요" />

        <div className="flex flex-col gap-3 mt-4">
          <Button>로그인</Button>
          <Button variant="secondary">회원가입</Button>
        </div>
      </div>
    </AuthLayout>
  );
}
