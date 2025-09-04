import clsx from "clsx";
import { forwardRef, HTMLAttributes, ReactNode } from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant: "outlined" | "filled";
  className?: string;
  children: ReactNode | string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "outlined", children, className, ...rest }, ref) => {
    const baseStyle: string =
      "cursor-pointer lg:py-2 sm:py-2 py-1 px-2 lg:px-4 sm:px-4 text-xs lg:text-lg sm:text-sm";
    const outlinedStyle: string =
      baseStyle +
      " " +
      "bg-transparent text-white border-2 border-theme-primary transition-all duration-200 hover:bg-white hover:text-theme-primary hover:tracking-wider";
    const filledStyle: string =
      baseStyle +
      " " +
      "bg-white text-theme-primary border-r-3 border-r-theme-primary border-b-3 border-b-theme-primary rounded-none transition-all duration-200 hover:brightness-theme hover:shadow-theme-style";

    const variantStyle =
      variant === "outlined"
        ? outlinedStyle
        : variant === "filled"
        ? filledStyle
        : baseStyle;
    return (
      <>
        <button
          ref={ref}
          {...rest}
          className={clsx(variantStyle, className ? className : " ")}
        >
          {children}
        </button>
      </>
    );
  }
);
Button.displayName = "Button";
export default Button;
