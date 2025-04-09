import React from 'react';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  width = 24, 
  height = 24,
  className = ""
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M12 2L2 9V22H22V9L12 2ZM17 18H7V11H17V18Z" 
        fill="currentColor"
      />
      <path 
        d="M10.5 18V14H13.5V18H10.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Logo; 