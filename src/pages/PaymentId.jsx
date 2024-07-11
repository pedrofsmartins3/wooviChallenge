import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mackBookPrices } from "../data/data";
import { Alert, Box, Container, Snackbar, Typography } from "@mui/material";
import { useUser } from "@clerk/clerk-react";
import photo from "../assets/qr-code.png";
import ButtonCommon from "../components/Button";
import { CircleOutlined, FileCopy, KeyboardArrowUp } from "@mui/icons-material";
function PaymentId() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { id } = useParams();
  const firstName = user?.firstName || "João";
  const data =
    id == 0 ? mackBookPrices?.price : mackBookPrices?.parcelas[id - 1];
  const timesArray = new Array(data.times - 1);
  const filledArray = timesArray.fill().map((_, index) => {
    return { number: index };
  });

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    return;
  };

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <Typography
        sx={{
          ...styles.text,
          fontSize: 18,
          fontWeight: 900,
          maxWidth: "22ch",
          textAlign: "center",
        }}
      >
        {firstName}, pague a entrada de R$ {data.value} pelo Pix
      </Typography>
      <Box sx={styles.qrcode}>
        <Box
          component="img"
          src={photo}
          width="100%"
          sx={{
            borderRadius: 3,
          }}
        />
      </Box>
      <ButtonCommon
        sx={{
          fontWeight: 400,
          display: "flex",
          gap: 1,
          padding: "6px 16px",
          width: "fit-content",
        }}
        onClick={handleClick}
      >
        Clique para copiar QR CODE <FileCopy fontSize="small" />
      </ButtonCommon>
      <Box>
        <Typography
          sx={{
            ...styles.text,
            fontSize: 14,
            color: "#B2B2B2",
          }}
        >
          Prazo de pagamento:
        </Typography>
        <Typography
          sx={{
            ...styles.text,
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          15/12/2021 - 08:17
        </Typography>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <CircleOutlined fontSize="small" sx={{ color: "#03D69D" }} />
            <Typography
              sx={{
                ...styles.text,
                fontSize: 14,
              }}
            >
              1º Entrada no PIX
            </Typography>
          </Box>
          <Typography
            sx={{
              ...styles.text,
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            R$ {data.value}
          </Typography>
        </Box>
        {filledArray?.length > 0 &&
          filledArray.map((item, index) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBlock: "4px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <CircleOutlined fontSize="small" color="disabled" />
                <Typography
                  sx={{
                    ...styles.text,
                    fontSize: 14,
                  }}
                >
                  {index + 2}º no cartão
                </Typography>
              </Box>
              <Typography
                sx={{
                  ...styles.text,
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                R$ {data.value}
              </Typography>
            </Box>
          ))}
      </Box>
      <Box sx={styles.line} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            ...styles.text,
            fontSize: 14,
          }}
        >
          CET: 0,5%
        </Typography>
        <Typography
          sx={{
            ...styles.text,
            fontSize: 14,
          }}
        >
          Total: R$ {data.totalPrice ? data.totalPrice : data.value}
        </Typography>
      </Box>
      <Box sx={styles.line} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            ...styles.text,
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          Como funciona?
        </Typography>
        <KeyboardArrowUp />
      </Box>
      <Box sx={styles.line} />
      <Box sx={{ textAlign: "center" }}>
        <Typography
          sx={{
            ...styles.text,
            fontSize: 12,
            color: "#B2B2B2",
          }}
        >
          Identificador
        </Typography>
        <Typography
          sx={{
            ...styles.text,
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          2c1b951f356c4680b13ba1c9fc889c47
        </Typography>
      </Box>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          variant="filled"
          sx={{ width: "fit-content", background: "#133A6F" }}
        >
          QR-code copiado!
        </Alert>
      </Snackbar>
      <ButtonCommon
        sx={{
          padding: "6px 20px",
        }}
        onClick={() => {
          navigate(`/payment/${id}/description`);
        }}
      >
        Continuar com o pagamento
      </ButtonCommon>
      <ButtonCommon
        variant="outlined"
        color="secondary"
        onClick={() => {
          navigate("/payment");
        }}
        sx={{ padding: "6px 20px" }}
      >
        Voltar
      </ButtonCommon>
    </Container>
  );
}

export default PaymentId;

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: 2,
    maxWidth: "400px",
  },
  qrcode: {
    borderRadius: 3,
    border: "1px solid #03D69D",
    display: "flex",
    gap: "2px",
    width: "90%",
  },
  text: {
    fontFamily: "Nunito",
    fontWeight: 400,
    fontSize: 18,
  },
  priceText: {
    fontWeight: 900,
  },
  line: {
    border: "1px solid #E5E5E5",
    width: "100%",
  },
};
