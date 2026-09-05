import type { IconProps } from '../../types/icon';

interface OnlineDotProps extends IconProps {
  size?: number;
}

export const OnlineDot = ({ size = 14, className }: OnlineDotProps) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 8 8"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="4" cy="4" r="4" fill="currentColor" />
  </svg>
);
