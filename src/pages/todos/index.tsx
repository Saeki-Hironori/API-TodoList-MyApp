import React, { useEffect } from "react";
import styles from "../../styles/Signup.module.css";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const index = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/signup");
    console.log(session);
    fetch("/api/hello")
      .then((res) => res.json())
      .then(console.log);
  }, [status]);

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

export default index;
