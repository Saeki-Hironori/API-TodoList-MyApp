import React from "react";
import styles from "../../styles/Signup.module.css";
import { signOut, useSession } from "next-auth/react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

const Header = () => {
  const { data: session, status } = useSession();

  const handleSignout = (e: any) => {
    e.preventDefault();
    signOut();
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Avatar src={session?.user?.image as string} sx={{ mr: 3 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {session?.user?.email ?? session?.user?.name}
              <br />
              {session?.user?.id}
            </Typography>
            <Button color="inherit" onClick={(e) => handleSignout(e)}>
              signout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
