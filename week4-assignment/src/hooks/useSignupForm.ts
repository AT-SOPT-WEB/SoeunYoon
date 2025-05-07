import { useState } from 'react';

export default function useSignupForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [nickname, setNickname] = useState('');

  const canGoNextStep =
    (step === 1 && id.trim()) ||
    (step === 2 && password && confirmPw && password === confirmPw);

  const goToNextStep = () => {
    if (step < 3 && canGoNextStep) {
      setStep((prev) => (prev + 1) as 1 | 2 | 3);
    }
  };

  return {
    step,
    id, setId,
    password, setPassword,
    confirmPw, setConfirmPw,
    nickname, setNickname,
    canGoNextStep,
    goToNextStep,
  };
}
