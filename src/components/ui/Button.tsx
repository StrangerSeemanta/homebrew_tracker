import { forwardRef, HTMLAttributes, ReactNode } from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant: "outlined" | "filled";
  className?: string;
  children: ReactNode | string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "outlined", children, className, ...rest }, ref) => (
    <>
      <style>
        {`
        button{cursor:pointer}
      .btn-outlined {
        background: transparent;
        color: white;
        border: 2px solid #798026;
        transition: background 0.2s, color 0.2s;
      }
      .btn-outlined:hover {
        background: white;
        color: #798026;
      }
      .btn-filled {
        background: white;
        color: #798026;
        border: none;
        border-right:3px solid #798026;border-bottom:3px solid #798026;
        transition: all 0.2s, color 0.2s;
                 border-radius:0px;

      }
      .btn-filled:hover {
            filter:brightness(1.2);
            box-shadow:0px 0px 14px 0px #798026;

      }
    `}
      </style>
      <button
        ref={ref}
        {...rest}
        className={`lg:py-2 sm:py-2 py-1 px-2 lg:px-4 sm:px-4 text-xs lg:text-lg sm:text-sm btn-${variant} ${
          className ?? ""
        }`}
      >
        {children}
      </button>
    </>
  )
);
Button.displayName = "Button";
export default Button;
