import Input from './common/Input';
import GithubSearchResult from './github/GithubSearchResult';
import GithubRecentList from './github/GithubRecentList';
import useGithubSearch from '../hooks/useGithubSearch';

export default function GithubSearch() {
  const {
    userInfo,
    recent,
    getUserInfo,
    removeRecent,
    resetUserInfo,
  } = useGithubSearch();

  return (
    <div className="w-full max-w-md px-4">
      <Input
        placeholder="Github 프로필을 검색해보세요."
        onSubmit={getUserInfo}
        resetAfterSubmit={false}
      />
      <GithubRecentList
        recent={recent}
        onSelect={getUserInfo}
        onRemove={removeRecent}
      />
      <GithubSearchResult
        status={userInfo.status}
        user={userInfo.data}
        onClose={resetUserInfo}
      />
    </div>
  );
}
