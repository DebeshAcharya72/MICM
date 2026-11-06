import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  showArrow = true,
  className = '',
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseClasses = "inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-lg group focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const sizeClasses = {
    sm: "px-4 py-2 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5 shadow-md hover:shadow-lg",
    xl: "px-8 py-4 text-base md:text-lg gap-3 shadow-lg hover:shadow-xl"
  };

  const variantClasses = {
    primary: "bg-brand-yellow hover:bg-brand-yellow-hover text-brand-navy font-bold focus:ring-brand-yellow shadow-sm hover:-translate-y-0.5",
    secondary: "bg-transparent border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white focus:ring-brand-navy",
    white: "bg-white text-brand-navy hover:bg-brand-light font-bold focus:ring-white shadow-sm hover:-translate-y-0.5",
    outlineWhite: "bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand-navy focus:ring-white",
    navy: "bg-brand-navy text-white hover:bg-brand-navy-light focus:ring-brand-navy shadow-sm hover:-translate-y-0.5",
    text: "bg-transparent text-brand-navy hover:text-brand-navy-muted p-0 underline-offset-4 hover:underline"
  };

  const classes = `${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${variantClasses[variant] || variantClasses.primary} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} {...props}>
      {content}
    </button>
  );
}
