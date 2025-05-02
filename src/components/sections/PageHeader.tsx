import React from 'react';
import Section from '../ui/Section';
import Container from '../ui/Container';

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  align?: 'left' | 'center' | 'right';
  size?: 'sm' | 'md' | 'lg';
};

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  backgroundImage,
  align = 'center',
  size = 'md',
}) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const sizeClasses = {
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-20',
    lg: 'py-16 md:py-28',
  };

  const style = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : {};

  return (
    <div
      className={`bg-primary-main bg-opacity-90 bg-cover bg-center relative ${sizeClasses[size]}`}
      style={style}
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-primary-dark opacity-70" />
      )}
      <Container className="relative z-10">
        <div className={alignClasses[align]}>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-white opacity-90 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default PageHeader;