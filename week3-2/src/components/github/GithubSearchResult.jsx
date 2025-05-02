import LoopLoading from '../common/LoopLoading';
import GithubUserCard from './GithubUserCard';

export default function GithubSearchResult({ status, user, onClose }) {
  if (status === 'idle') {
    return (
      <div className="mt-8 text-center text-darkGray text-sm">
        검색어를 입력하고 <span className="font-semibold">Enter</span>를 눌러 Github 유저를 검색해보세요.
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div className="mt-6 flex justify-center">
        <LoopLoading size={200} />
      </div>
    );
  }

  if (status === 'rejected') {
    return (
      <div className="mt-6 p-5 text-center rounded-xl bg-lightGray border border-normalGray">
        <p className="text-2xl mb-2">😕</p>
        <p className="text-sm text-darkGray">검색 결과를 찾을 수 없습니다.</p>
        <p className="text-xs text-darkGray mt-1">사용자명이 정확한지 확인해주세요.</p>
      </div>
    );
  }

  if (status === 'resolved') {
    return <GithubUserCard user={user} onClose={onClose} />;
  }

  return null;
}
