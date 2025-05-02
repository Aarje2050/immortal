import React from 'react';
import Container from './Container';

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'light' | 'primary' | 'dark';
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  id?: string;
};

const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  background = 'white',
  containerSize = 'lg',
  spacing = 'lg',
  id,
}) => {
  const backgroundClasses = {
    white: 'bg-white',
    light: 'bg-background-paper',
    primary: 'bg-primary-main text-white',
    dark: 'bg-text-primary text-white',
  };

  const spacingClasses = {
    none: 'py-0',
    sm: 'py-4 md:py-6',
    md: 'py-6 md:py-12',
    lg: 'py-12 md:py-16',
    xl: 'py-16 md:py-24',
  };

  return (
    <section
      id={id}
      className={`${backgroundClasses[background]} ${spacingClasses[spacing]} ${className}`}
    >
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  );
};

export default Section;