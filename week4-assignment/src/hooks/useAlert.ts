import { useState } from 'react';

export default function useAlert() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const open = (msg: string, error = false) => {
    setMessage(msg);
    setIsError(error);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setMessage('');
    setIsError(false);
  };

  return { isOpen, message, isError, open, close };
}
