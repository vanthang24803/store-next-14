import { Button } from "./ui/button";
import Image from "next/image";

import { cn } from "@/lib/utils";

type Providers = "google" | "facebook";

import GoogleIcon from "../public/google.svg";
import FacebookIcon from "../public/fb.png";

const icons = {
  google: GoogleIcon,
  facebook: FacebookIcon,
};

type Props = {
  className?: string;
  onClick?: () => void;
  provider: Providers;
  size: number;
};

export const SocialButton = ({ className, onClick, provider, size }: Props) => {
  const capitalizedProvider =
    provider.charAt(0).toUpperCase() + provider.slice(1);
  const Icon = icons[provider];
  return (
    <Button
      className={cn(
        `bg-white hover:bg-white text-black flex items-center justify-start gap-8`,
        className
      )}
      onClick={onClick}
    >
      <div className="w-16">
        <Image src={Icon} alt={provider} width={size} height={size} />
      </div>
      <span>Sign In with {capitalizedProvider}</span>
    </Button>
  );
};
