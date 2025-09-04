import { forwardRef, HTMLAttributes, ReactNode } from "react";

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode | string;
  className?: string;
}

const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  ({ children, className = "", ...props }, ref) => (
    <h1
      ref={ref}
      {...props}
      className={`title tracking-wide text-center text-4xl sm:text-6xl xl:text-8xl ${className}`}
    >
      {children}
    </h1>
  )
);

Title.displayName = "Title";

export default Title;
