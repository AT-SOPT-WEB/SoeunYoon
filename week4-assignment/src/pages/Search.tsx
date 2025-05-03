import { FaRotateRight } from 'react-icons/fa6';
import SearchBar from '../components/common/SearchBar';
import SearchButton from '../components/button/SearchButton';
import { useRef, useState } from 'react';

export default function Search() {
  const [keyword, setKeyword] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (keyword.trim()) {
      console.log('검색어:', keyword);
    }
  };

  //TODO: handleReset 로직 수정
  const handleReset = () => {
    setKeyword('');
    inputRef.current?.focus();
  };

  return (
    <div className="w-full h-full pt-[120px] flex justify-center">
      <div className="w-[600px] bg-white rounded-xl shadow-sm px-10 py-8">
        <div className="flex items-center justify-center gap-2 mb-6">
          <FaRotateRight className="text-darkGray hover:text-darkGray-hover active:text-darkGray-active cursor-pointer" />
          <h2 className="text-lg font-semibold">
            <span className="text-darkSky">SOPT</span> <span className='text-black'>회원 조회하기</span>
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
        </div>
      </div>
    </div>
  );
}
