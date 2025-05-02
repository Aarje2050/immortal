import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
};

const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'lg',
  padding = true,
}) => {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  const paddingClass = padding ? 'px-4 sm:px-6 lg:px-8' : '';

  return (
    <div className={`mx-auto ${sizeClasses[size]} ${paddingClass} ${className}`}>
      {children}
    </div>
  );
};

export default Container;