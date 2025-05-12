export default function GithubRecentList({ recent, onSelect, onRemove }) {
    return (
      <div className="flex flex-row flex-wrap gap-2 mt-3">
        {[...recent].reverse().map(user => (
          <span
            key={user}
            className="bg-lightGray hover:bg-lightGray-hover active:bg-lightGray-active px-3 py-1 rounded-full border border-normalGray flex items-center gap-1 text-sm cursor-pointer"
            onClick={() => onSelect(user)}
          >
            {user}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(user);
              }}
              className="text-darkGray hover:text-black"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    );
  }
  