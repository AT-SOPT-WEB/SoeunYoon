import { useState } from 'react';
import Header from './components/Header';
import GithubSearch from './components/GithubSearch';
import BaseballGame from './components/BaseballGame';

export default function App() {
  const [tab, setTab] = useState('github');

  return (
    <div className="w-full min-h-screen bg-bg text-black">
      <Header tab={tab} setTab={setTab} />
      <main className="flex justify-center pt-10 px-4">
        {tab === 'github' ? <GithubSearch /> : <BaseballGame />}
      </main>
    </div>
  );
}