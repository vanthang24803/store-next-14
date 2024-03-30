/* eslint-disable jsx-a11y/alt-text */

import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export const Logo = () => {
  return (
    <Link href="/">
      <img
        src="/logo.png"
        className="w-auto h-10 object-cover"
        alt="logo"
      />
    </Link>
  );
};
