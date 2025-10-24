
import React from 'react';

interface RoleIconProps {
  role: 'user' | 'bot';
  className?: string;
}

const RoleIcon: React.FC<RoleIconProps> = ({ role, className = "h-6 w-6" }) => {
  if (role === 'user') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  // Bot Icon
  return (
     <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
        viewBox="0 0 24 24" 
        fill="currentColor">
        <path d="M12.0006 18.26L4.94057 21.31L6.52057 13.59L0.550568 8.69L8.38057 7.9L12.0006 0.5L15.6206 7.9L23.4506 8.69L17.4806 13.59L19.0606 21.31L12.0006 18.26Z" />
     </svg>
  );
};

export default RoleIcon;
