import clsx from "clsx";
import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

export function Label({
  children,
  forId,
  className,
}: {
  children: string | ReactNode;
  forId: string;
  className?: string;
}) {
  return (
    <label
      htmlFor={forId}
      className={clsx(
        "text-sm font-medium text-theme-foreground capitalize",
        className
      )}
    >
      {children}
    </label>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "outlined" | "filled";
  className?: string;
  id: string;
  label: string | ReactNode;
  labelClassname?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { variant = "outlined", label, id, className, labelClassname, ...rest },
    ref
  ) => {
    const baseStyle: string =
      "w-full px-3 py-2 rounded-none transition-all duration-200";
    const outlinedStyle =
      "border border-theme-primary focus:outline-none focus:ring-4 focus:ring-theme-primary/40 ";
    const filledStyle =
      "bg-white text-theme-black border-r-3 border-r-theme-primary border-b-3 border-b-theme-primary rounded-none transition-all duration-200 focus:outline-1 focus:outline-theme-primary focus:ring-2 focus:ring-theme-primary/40 focus:shadow-theme-style";
    const variantClass =
      variant === "outlined"
        ? "input-variant-outlined" + " " + baseStyle + " " + outlinedStyle
        : variant === "filled"
        ? "input-variant-filled" + " " + baseStyle + " " + filledStyle
        : " ";

    return (
      <>
        <div className="flex flex-col gap-2">
          <Label forId={id} className={labelClassname}>
            {label}
          </Label>
          <input
            ref={ref}
            id={id}
            className={clsx(variantClass, className)}
            {...rest}
          />
        </div>
      </>
    );
  }
);
Input.displayName = "Input";
export default Input;
