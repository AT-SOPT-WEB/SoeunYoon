import type { ChangeEvent } from 'react';

export type ButtonColor = 'darkSky' | 'normalGray' | 'normalSky';

export interface SearchButtonProps {
  name?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  color?: ButtonColor;
  children?: React.ReactNode;
  disabled?: boolean;
}

export interface SearchBarProps {
  name: string;
  placeholder?: string;
  width?: string;
  height?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onEnter?: () => void;
}
