import { SignInButton } from "../signInButton";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { ActiveLink } from "../activeLink";

export function Header() {

  return (
    <>
      <header className={styles.header__container}>
        <div className={styles.header__content}>
          <img src="/images/logo.svg" alt="ignews" />
          <nav>
            <ActiveLink activeClassName={styles.active} href="/">
              <a>Home</a>
            </ActiveLink>
            <ActiveLink activeClassName={styles.active} href="/posts">
              <a href="">Posts</a>
            </ActiveLink>
          </nav>
          <SignInButton />
        </div>
      </header>
    </>
  );
}
