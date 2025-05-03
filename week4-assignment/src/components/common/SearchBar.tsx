import { forwardRef, useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import type { ChangeEvent, KeyboardEvent, ForwardedRef } from 'react';

interface SearchBarProps {
  name: string;
  placeholder?: string;
  width?: string;
  height?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onEnter?: () => void;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      name,
      placeholder = '',
      width = 'w-[422px]',
      height = 'h-[40px]',
      onChange,
      onEnter,
      value,
    },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [isFocus, setIsFocus] = useState(false);

    const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onEnter) {
        onEnter();
      }
    };

    const onToggleFocus = (focus: boolean) => setIsFocus(focus);

    return (
      <label
        htmlFor={name}
        className={`flex items-center justify-between rounded-full bg-white hover:text-black hover:outline hover:outline-1 hover:outline-gray-300 ${width} ${height} px-4 ${
          !isFocus ? 'text-gray-400' : ''
        }`}
      >
        {!isFocus && <FaMagnifyingGlass />}
        <input
          ref={ref}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={() => onToggleFocus(true)}
          onBlur={() => onToggleFocus(false)}
          onKeyPress={handlePressEnter}
          className="ml-2 border-none px-0 bg-transparent outline-none w-full"
        />
      </label>
    );
  }
);

SearchBar.displayName = 'SearchBar';

export default SearchBar;
