export default function GithubUserCard({ user, onClose }) {
    return (
      <div className="mt-6 bg-deepBlue text-white rounded-xl p-5 shadow-card">
        <button
          className="float-right text-white hover:text-red-400 font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <img
          src={user.avatar_url}
          alt="avatar"
          className="w-24 h-24 rounded-full mx-auto cursor-pointer border-4 border-white"
          onClick={() => window.open(user.html_url, '_blank')}
        />
        <p
          className="text-center mt-4 font-bold text-xl cursor-pointer"
          onClick={() => window.open(user.html_url)}
        >
          {user.name}
        </p>
        <p className="text-center text-sm opacity-80">{user.login}</p>
        {user.bio && (
          <p className="text-center text-sm mt-2 italic text-lightGray">{user.bio}</p>
        )}
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-3 mx-auto w-fit text-center text-sm font-medium px-4 py-1 rounded-full bg-white text-deepBlue hover:bg-gray-200 transition"
        >
          GitHub 프로필 방문하기 →
        </a>
        <div className="flex justify-around mt-6 text-sm">
          <div className="text-center">
            <p className="opacity-70">Followers</p>
            <p className="font-semibold text-lg">{user.followers}</p>
          </div>
          <div className="text-center">
            <p className="opacity-70">Following</p>
            <p className="font-semibold text-lg">{user.following}</p>
          </div>
        </div>
      </div>
    );
  }
  