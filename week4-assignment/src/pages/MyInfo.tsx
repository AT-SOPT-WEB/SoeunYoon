import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/common/Input';
import SearchButton from '../components/button/SearchButton';
import { fetchMyNickname, updateNickname } from '../services/userService';

export default function MyInfo() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [originalNickname, setOriginalNickname] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    if (!storedId) return;

    setUserId(storedId);
    fetchMyNickname(storedId)
      .then((res) => {
        setNickname(res.data.nickname);
        setOriginalNickname(res.data.nickname);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const handleChange = async () => {
    if (!userId || !nickname.trim()) return;

    try {
      await updateNickname(userId, nickname);
      alert('닉네임이 성공적으로 변경되었습니다!');
      setOriginalNickname(nickname);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="w-full text-black h-full bg-bg pt-[110px] flex justify-center">
      <div className="w-[600px] bg-white rounded-xl shadow-md px-10 py-8 text-center">
        <h2 className="text-lg font-semibold mb-1">
          <p>내 정보(닉네임) 조회</p>
        </h2>
        <hr className='my-5' />

        <p className="text-lg font-semibold text-darkerGray mb-3 mt-2">{originalNickname} 님!</p>
        <p className="text-sm text-gray-600 mb-7">
          <span className="text-darkSky font-semibold">회원 조회 서비스</span>에서 새롭게 사용할 닉네임을 입력해 주세요!
        </p>

        <div className="mb-6 max-w-[370px] mx-auto text-left">
          <Input
            label="닉네임"
            placeholder="닉네임을 입력해 주세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <div className="flex justify-center my-4 gap-3">
          <SearchButton color="normalGray" onClick={() => navigate(-1)} name="돌아가기" />
          <SearchButton color="darkSky" onClick={handleChange} name="변경하기" />
        </div>
      </div>
    </div>
  );
}
