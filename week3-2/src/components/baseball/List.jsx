export default function List({ tries }) {
    return (
      <div className="space-y-2">
        {tries.map((tryStr, idx) => (
          <div
            key={idx}
            className="border border-normalGray p-2 rounded-md text-center bg-white shadow-sm text-sm"
          >
            {tryStr}
          </div>
        ))}
      </div>
    );
  }
  