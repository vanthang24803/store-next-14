import { Button } from "@/components/ui/button";
import React from "react";

interface SocialButtonProps {
  name: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  onClick: () => void;
}

export const SocialButton = ({
  name,
  icon: Icon,
  onClick,
}: SocialButtonProps) => {
  return (
    <Button
      className="bg-white text-black gap-x-2 hover:bg-neutral-300"
      onClick={onClick}
    >
      <Icon />
      Login with {name}
    </Button>
  );
};
