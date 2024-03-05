import { Link, LinkProps } from "expo-router";

type LinkButtonProps = LinkProps<string> & {
  title: string;
};

export function LinkButton({ title, ...rest }: LinkButtonProps) {
  return (
    <Link
      className="items-center justify-center p-4 text-base text-white bg-blue-400 rounded-md font-heading"
      {...rest}
    >
      {title}
    </Link>
  );
}
