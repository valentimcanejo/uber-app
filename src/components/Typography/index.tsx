import { clsx } from "clsx";
import { styled } from "nativewind";
import { ReactNode } from "react";
import { Text } from "react-native";

const StyledText = styled(Text);

interface TextProps {
  children: ReactNode;
  size?: "xs" | "sm" | "md" | "lg";
  color?: "subtitle" | "red" | "white";
  semiBold?: boolean;
  customClassname?: string;
}

export function Typography({
  children,
  size = "md",
  color,
  semiBold = false,
  customClassname = "",
  ...rest
}: TextProps) {
  return (
    <StyledText
      {...rest}
      className={clsx("text-gray-900 dark:text-zinc-100", {
        "text-xs": size === "xs",
        "text-sm": size === "sm",
        "text-md": size === "md",
        "text-lg": size === "lg",
        "text-zinc-500 dark:text-zinc-400": color === "subtitle",
        "text-red-500": color === "red",
        "text-zinc-100": color === "white",
        "font-semibold": semiBold,
        [customClassname]: customClassname,
      })}
    >
      {children}
    </StyledText>
  );
}
