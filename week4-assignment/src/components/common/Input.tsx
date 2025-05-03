interface InputProps {
    label: string;
    placeholder: string;
    type?: string;
  }
  
  export default function Input({ label, placeholder, type = 'text' }: InputProps) {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-zinc-800">{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          className="pl-3 pr-4 py-2.5 text-xs text-zinc-700 bg-white rounded-md outline outline-[0.7px] outline-zinc-200 placeholder:text-zinc-500"
        />
      </div>
    );
  }
  