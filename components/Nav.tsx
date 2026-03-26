"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Nav() {
  const { isSignedIn } = useUser();

  return (
    <nav>
      <Link href="/" className="nav-brand">PaceMap</Link>
      <ul className="nav-links">
        <li><Link href="/archive">Archive</Link></li>
        <li><Link href="/pricing">Pricing</Link></li>
        {isSignedIn ? (
          <li><UserButton  /></li>
        ) : (
          <>
            <li>
              <SignInButton mode="modal">
                <button>Sign In</button>
              </SignInButton>
            </li>
            <li>
              <SignUpButton mode="modal">
                <button className="nav-pill">Join Free</button>
              </SignUpButton>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
