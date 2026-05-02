import React from 'react';

const Input = React.forwardRef(({ 
  label, 
  error, 
  hint,
  icon: Icon,
  as = 'input',
  children,
  ...props 
}, ref) => {
  const Component = as;

  return (
    <div>
      {label && <label className="text-label">{label}</label>}
      <div className="relative">
        {Icon && as === 'input' && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 dark:text-dark-500" size={18} />
        )}
        <Component
          ref={ref}
          className={`input-base ${Icon && as === 'input' ? 'pl-10' : ''} ${error ? 'border-accent-red focus:ring-accent-red' : ''}`}
          {...props}
        >
          {children}
        </Component>
      </div>
      {error && <p className="text-xs text-accent-red mt-1">{error}</p>}
      {hint && <p className="text-xs text-dark-500 dark:text-dark-400 mt-1">{hint}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;