import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.scss";
import { signIn, signOut, useSession } from "next-auth/client";

export const SignInButton = () => {
  const [session] = useSession();

  console.log(session);

  return session ? (
    <button
      onClick={() => {
        signOut();
      }}
      className={styles.button__container}
      type="button"
    >
      <FaGithub color="#04d361" />
      {session.user.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      onClick={() => {
        signIn("github");
      }}
      className={styles.button__container}
      type="button"
    >
      <FaGithub color="#eba417" />
      SignIn with GitHub
    </button>
  );
};
