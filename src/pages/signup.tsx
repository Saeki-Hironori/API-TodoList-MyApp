import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Signup = () => {
  const { data: session, status } = useSession();

  const router = useRouter();
  const defaultTheme = createTheme();

  useEffect(() => {
    if (status === "authenticated") {
      router.push(`/todos`);
    }
  }, [status]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("Credentials");
  };

  return (
    <>
      {!session && (
        <ThemeProvider theme={defaultTheme}>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage:
                  "url(https://source.unsplash.com/random?shape)",
                backgroundRepeat: "no-repeat",
                backgroundColor: "gray",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    onClick={(e) => {
                      e.preventDefault();
                      signIn("google");
                    }}
                    sx={{ mt: 3, mb: 1 }}
                  >
                    Sign In by Google
                  </Button>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    onClick={(e) => {
                      e.preventDefault();
                      signIn("github");
                    }}
                    sx={{ mt: 1, mb: 2 }}
                  >
                    Sign In by Github
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      )}
    </>
  );
};

export default Signup;

{
  /* <header>
<noscript>
  <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
</noscript>
<div className={styles.signedInStatus}>
  <p
    className={`nojs-show ${
      !session && loading ? styles.loading : styles.loaded
    }`}
  >
    {!session && (
      <>
        <span className={styles.notSignedInText}>
          You are not signed in
        </span>
        <a
          href={`/api/auth/signin`}
          className={styles.buttonPrimary}
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          Sign in
        </a>
      </>
    )}
    {session?.user && (
      <>
        {session.user.image && (
          <span
            style={{ backgroundImage: `url('${session.user.image}')` }}
            className={styles.avatar}
          />
        )}
        <span className={styles.signedInText}>
          <small>Signed in as</small>
          <br />
          <strong>{session.user.email ?? session.user.name}</strong>
        </span>
        <a
          href={`/api/auth/signout`}
          className={styles.button}
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
        >
          Sign out
        </a>
      </>
    )}
  </p>
</div>
</header> */
}
