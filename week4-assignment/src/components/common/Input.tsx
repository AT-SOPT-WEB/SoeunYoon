import { InputProps } from '../../types';

export default function Input({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold text-black">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pl-3 pr-4 py-2.5 text-xs text-zinc-700 bg-white rounded-md outline outline-[0.7px] outline-zinc-200 placeholder:text-zinc-500
                  focus:outline-none focus:ring-2 focus:ring-darkSky focus:border-transparent"
      />
    </div>
  );
}
