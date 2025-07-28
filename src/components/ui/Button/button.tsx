import type React from 'react';
import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'destructive'
    | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center gap-2 rounded-xl font-medium
      transition-all duration-200 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
      ${fullWidth ? 'w-full' : ''}
    `;

    const variants = {
      primary: `
        bg-gradient-to-r from-blue-600 to-blue-700 text-white
        hover:from-blue-700 hover:to-blue-800
        focus:ring-blue-500
        shadow-lg shadow-blue-500/25
        hover:shadow-xl hover:shadow-blue-500/30
        active:scale-[0.98]
      `,
      secondary: `
        bg-gradient-to-r from-slate-600 to-slate-700 text-white
        hover:from-slate-700 hover:to-slate-800
        focus:ring-slate-500
        shadow-lg shadow-slate-500/25
        hover:shadow-xl hover:shadow-slate-500/30
        active:scale-[0.98]
      `,
      outline: `
        border-2 border-slate-300 text-slate-700 bg-white
        hover:bg-slate-50 hover:border-slate-400
        focus:ring-slate-500
        active:scale-[0.98]
      `,
      ghost: `
        text-slate-600 bg-transparent
        hover:bg-slate-100 hover:text-slate-900
        focus:ring-slate-500
        active:scale-[0.98]
      `,
      destructive: `
        bg-gradient-to-r from-red-600 to-red-700 text-white
        hover:from-red-700 hover:to-red-800
        focus:ring-red-500
        shadow-lg shadow-red-500/25
        hover:shadow-xl hover:shadow-red-500/30
        active:scale-[0.98]
      `,
      success: `
        bg-gradient-to-r from-green-600 to-green-700 text-white
        hover:from-green-700 hover:to-green-800
        focus:ring-green-500
        shadow-lg shadow-green-500/25
        hover:shadow-xl hover:shadow-green-500/30
        active:scale-[0.98]
      `,
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm h-8',
      md: 'px-4 py-2.5 text-sm h-10',
      lg: 'px-6 py-3 text-base h-12',
      xl: 'px-8 py-4 text-lg h-14',
    };

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isDisabled}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}

        {!loading && icon && iconPosition === 'left' && (
          <span className="flex-shrink-0">{icon}</span>
        )}

        {children && <span>{children}</span>}

        {!loading && icon && iconPosition === 'right' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
