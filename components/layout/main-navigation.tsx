import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import classes from "./main-navigation.module.css";

function MainNavigation() {
  const { status } = useSession();

  function logoutHandler() {
    localStorage.removeItem("conversations-history");
    signOut();
  }

  return (
    <header className={classes.header}>
      <Link href="/chat">
        <div className={classes.logo}>Chat App</div>
      </Link>
      <nav>
        <ul>
          {(status === "unauthenticated" || status === "loading") && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {status === "authenticated" && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {status === "authenticated" && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
