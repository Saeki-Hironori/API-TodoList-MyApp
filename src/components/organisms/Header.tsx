import React from "react";
import styles from "../../styles/Signup.module.css";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();

  const handleSignout = (e: any) => {
    e.preventDefault();
    signOut();
  };

  return (
    <>
      {session?.user?.image && (
        <span
          style={{ backgroundImage: `url('${session.user.image}')` }}
          className={styles.avatar}
        />
      )}
      <span className={styles.signedInText}>
        <small>Signed in as</small>
        <br />
        <strong>{session?.user?.email ?? session?.user?.name}</strong>
      </span>
      <a
        href={`/api/auth/signout`}
        className={styles.button}
        onClick={(e) => {
          handleSignout(e);
        }}
      >
        Sign out
      </a>
    </>
  );
};

export default Header;
