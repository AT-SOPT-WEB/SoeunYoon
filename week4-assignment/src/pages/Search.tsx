import { useRef, useState } from 'react';
import { FaRotateRight } from 'react-icons/fa6';

import SearchBar from '../components/common/SearchBar';
import SearchButton from '../components/button/SearchButton';
import { fetchAllMembers } from '../services/memberService';

export default function Search() {
  const [keyword, setKeyword] = useState('');
  const [members, setMembers] = useState<{ nickname: string }[]>([]);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSearch = async () => {
    try {
      const result = await fetchAllMembers(keyword);
      setMembers(result);
      setError('');
    } catch (err) {
      setMembers([]);
      setError((err as Error).message);
    }
  };

  const handleReset = () => {
    setKeyword('');
    setMembers([]);
    setError('');
    inputRef.current?.focus();
  };

  return (
    <div className="w-full h-full pt-[120px] flex justify-center">
      <div className="w-[600px] bg-white rounded-xl shadow-sm px-10 py-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          <FaRotateRight
            className="text-darkGray hover:text-darkGray-hover active:text-darkGray-active cursor-pointer"
            onClick={handleReset}
          />
          <h2 className="text-lg font-semibold">
            <span className="text-darkSky">SOPT</span>{' '}
            <span className="text-black">회원 조회하기</span>
          </h2>
        </div>

        <hr className="border-gray-200 mb-6" />

        <div className="flex items-center gap-2">
          <SearchBar
            ref={inputRef}
            name="nickname"
            placeholder="검색할 회원의 닉네임을 입력해 주세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onEnter={handleSearch}
          />
          <SearchButton onClick={handleSearch} />
        </div>

        <div className="mt-8 min-h-[200px]">
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}
          {!error && members.length === 0 && (
            <p className="text-sm text-gray-500 text-center">조회 결과가 없습니다.</p>
          )}
          <ul className="mt-4 flex flex-col gap-3">
            {members.map((member, index) => (
              <li key={index} className="text-sm text-black bg-lightSky px-4 py-2 rounded">
                {member.nickname}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-darkSky text-white px-4 py-2 rounded-full shadow-md hover:bg-darkSky-hover active:bg-darkSky-active text-sm"
      >
        TOP
      </button>
    </div>
  );
}
