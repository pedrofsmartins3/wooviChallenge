import { Button, createTheme, ThemeProvider } from "@mui/material";
import React from "react";

function ButtonCommon(props) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#133A6F", // azul
      },
      secondary: { main: "#03D69D" },
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            // Estilos globais para todos os botões
            fontFamily: "Nunito",
            width: "100%",
            textTransform: "unset",
            "&:hover": {
              scale: "1.01",
            },
          },
          contained: {
            padding: 0,
            // Estilos para botões "contained"
            a: {
              color: "#fff", // Cor do texto
              fontWeight: 400,
              "&:hover": {
                color: "#fff", // Cor do texto
                textDecoration: "none",
              },
            },
          },
          outlined: {
            // Estilos para botões "outlined"
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Button
        variant={props.variant || "contained"}
        color={props.color || "primary"}
        onClick={props.onClick}
        {...props}
      >
        {props.children}
      </Button>
    </ThemeProvider>
  );
}

export default ButtonCommon;
