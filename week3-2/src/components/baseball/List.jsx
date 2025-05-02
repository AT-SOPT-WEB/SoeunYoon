export default function List({ tries }) {
    return (
      <div className="space-y-2">
        {tries.map((tryStr, idx) => (
          <div
            key={idx}
            className="border border-blue-500 p-2 rounded-full text-center bg-white"
          >
            {tryStr}
          </div>
        ))}
      </div>
    );
  }