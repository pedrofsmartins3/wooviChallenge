import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import ButtonCommon from "../components/Button";
import { useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

function Home() {
  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();
  const name = user?.firstName + " " + user?.lastName;

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box sx={styles.container}>
        <Box
          component="img"
          src="https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111339_sp818-mbp13touch-silver-select-202005.png"
          sx={styles.img}
        />
        <Box sx={styles.buttonBox}>
          <Box sx={{ paddingBlock: 1, marginInline: "auto" }}>
            <SignedOut>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <SignInButton className="signIn" />
              </Box>
            </SignedOut>
            <SignedIn>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  justifyContent: "center",
                }}
              >
                <UserButton />
                <Typography>{name}</Typography>
              </Box>
            </SignedIn>
          </Box>
          <Typography sx={{ ...styles.text, letterSpacing: 2, fontSize: 18 }}>
            MacBook Pro
          </Typography>
          <Typography sx={{ ...styles.text, fontSize: 14 }}>
            R$ 35.500,00
          </Typography>

          <ButtonCommon
            sx={{
              padding: 1,
            }}
            onClick={() => navigate("/payment")}
          >
            {isSignedIn ? "Comprar" : "Comprar como convidado"}
          </ButtonCommon>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: 1,
    width: "90%",
    maxWidth: "400px",
  },
  buttonBox: {
    width: "100%",
    textAlign: "center",
    marginBlock: 1,
  },
  text: {
    fontFamily: "Nunito",
    fontWeight: 700,
    fontSize: 16,
    marginBottom: 1,
  },
  img: {
    width: "100%",
    maxWidth: "300px",
    border: "none",
    borderRadius: "10px",
    boxShadow: "3px 3px 10px #222222",
  },
};
