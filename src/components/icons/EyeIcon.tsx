import type { IconProps } from '../../types/icon';

interface EyeIconProps extends IconProps {
  isVisible: boolean;
}

export const EyeIcon = ({ isVisible, className }: EyeIconProps) =>
  isVisible ? (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0.833333 10C0.833333 10 4.16667 3.33333 10 3.33333C15.8333 3.33333 19.1667 10 19.1667 10C19.1667 10 15.8333 16.6667 10 16.6667C4.16667 16.6667 0.833333 10 0.833333 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M14.95 14.95C13.5255 16.0358 11.7909 16.6374 10 16.6667C4.16667 16.6667 0.833333 10 0.833333 10C1.86991 8.06825 3.30761 6.38051 5.05 5.05M8.25 3.53333C8.82361 3.39907 9.41089 3.33195 10 3.33333C15.8333 3.33333 19.1667 10 19.1667 10C18.6608 10.9463 18.0575 11.8373 17.3667 12.6583M11.7667 11.7667C11.5378 12.0123 11.2618 12.2093 10.9551 12.3459C10.6485 12.4826 10.3174 12.556 9.98174 12.562C9.64607 12.5679 9.31264 12.5061 9.00134 12.3804C8.69005 12.2547 8.40727 12.0675 8.16987 11.8301C7.93248 11.5927 7.74533 11.31 7.61959 10.9987C7.49385 10.6874 7.43211 10.3539 7.43803 10.0183C7.44395 9.68258 7.51742 9.35154 7.65406 9.04487C7.7907 8.73821 7.98771 8.46221 8.23333 8.23333"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.833333 0.833333L19.1667 19.1667"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
