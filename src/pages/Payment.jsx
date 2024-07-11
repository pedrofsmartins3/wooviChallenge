import React, { useState } from "react";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { useUser } from "@clerk/clerk-react";
import { mackBookPrices } from "../data/data";
import BootMark from "../components/BootMark";
import { CheckCircle, CircleOutlined } from "@mui/icons-material";
import ButtonCommon from "../components/Button";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();
  const { user } = useUser();
  const firstName = user?.firstName || "João";
  const [choice, setChoice] = useState(null);

  const check = (int) => choice === int;

  const renderCheckIcon = (int) => {
    if (check(int)) {
      return <CheckCircle />;
    } else {
      return <CircleOutlined color="disabled" />;
    }
  };

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <Typography sx={{ ...styles.text, fontSize: 18, fontWeight: 900 }}>
        {firstName}, como você quer pagar?
      </Typography>
      <Box
        sx={{
          ...styles.card,
          padding: 2,
          transform: check(mackBookPrices.price.id) ? "scale(1.02)" : "none",
          border: check(mackBookPrices.price.id)
            ? "2px solid #03D69D"
            : "1px solid #E5E5E5",
          background: check(mackBookPrices.price.id)
            ? "rgba(3, 214, 157, 0.1)"
            : "transparent",
        }}
      >
        <Box sx={styles.cardType}>Pix</Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ ...styles.text, ...styles.priceText }}>
              {mackBookPrices.price.times}x
            </Typography>
            <Typography sx={{ ...styles.text }}>
              R$ {mackBookPrices.price.value}
            </Typography>
          </Box>
          <IconButton
            sx={{ color: "#03D69D" }}
            onClick={() => {
              if (choice === mackBookPrices.price.id) {
                setChoice(null);
              } else {
                setChoice(mackBookPrices.price.id);
              }
            }}
          >
            {renderCheckIcon(mackBookPrices.price.id)}
          </IconButton>
        </Box>
        <Typography
          sx={{
            ...styles.text,
            fontSize: 14,
            color: "#03D69D",
            fontWeight: 700,
          }}
        >
          Ganhe 3% de Cashback
        </Typography>
        <BootMark
          text={
            <p>
              🤑 <strong>R$ 300,00 de volta</strong> no seu Pix na hora
            </p>
          }
        />
      </Box>

      <Box
        sx={{
          ...styles.card,
        }}
      >
        <Box sx={{ ...styles.cardType, left: 18, zIndex: 999 }}>
          Pix Parcelado
        </Box>
        {mackBookPrices.parcelas.map((item, index) => {
          const checked = check(item.id);
          let style = {
            borderLeft: checked ? "2px solid #03D69D" : "1px solid #E5E5E5",
            borderRight: checked ? "2px solid #03D69D" : "1px solid #E5E5E5",
            borderBottom: checked ? "2px solid #03D69D" : "1px solid #E5E5E5",
            borderTop: checked ? "2px solid #03D69D" : "none",
            padding: 2,
            background: checked ? "rgba(3, 214, 157, 0.1)" : "transparent",
            transform: checked ? "scale(1.02)" : "none",
          };
          const isFirst = index === 0;
          const isLast = index === mackBookPrices.parcelas.length - 1;
          if (isFirst) {
            style = {
              border: checked ? "2px solid #03D69D" : "1px solid #E5E5E5",
              padding: 2,
              background: checked ? "rgba(3, 214, 157, 0.1)" : "transparent",
              borderRadius: "10px 10px 0 0",
              transform: checked ? "scale(1.02)" : "none",
            };
          } else if (isLast) {
            style = {
              transform: checked ? "scale(1.02)" : "none",
              borderLeft: checked ? "2px solid #03D69D" : "1px solid #E5E5E5",
              borderRight: checked ? "2px solid #03D69D" : "1px solid #E5E5E5",
              borderBottom: checked ? "2px solid #03D69D" : "1px solid #E5E5E5",
              borderTop: checked ? "2px solid #03D69D" : "none",
              padding: 2,
              background: checked ? "rgba(3, 214, 157, 0.1)" : "transparent",
              borderRadius: "0 0 10px 10px",
            };
          }

          return (
            <Box
              key={index}
              sx={style}
              onClick={() => {
                if (choice === item.id) {
                  setChoice(null);
                } else {
                  setChoice(item.id);
                }
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography sx={{ ...styles.text, ...styles.priceText }}>
                    {item.times}x
                  </Typography>
                  <Typography sx={{ ...styles.text }}>
                    R$ {item.value}
                  </Typography>
                </Box>
                <IconButton sx={{ color: "#03D69D" }}>
                  {renderCheckIcon(item.id)}
                </IconButton>
              </Box>
              <Typography
                sx={{
                  ...styles.text,
                  fontSize: 12,
                  color: "#AFAFAF",
                }}
              >
                Total: {item.totalPrice}
              </Typography>
              {item.isBestPrice && (
                <BootMark
                  text={
                    <p>
                      <strong>{item.jurosMessage}</strong>: {item.isBestPrice}
                    </p>
                  }
                />
              )}
            </Box>
          );
        })}
      </Box>
      {choice !== null && (
        <Box>
          <ButtonCommon
            onClick={() => {
              navigate(`/payment/${choice}`);
            }}
            sx={{ padding: "6px 20px" }}
          >
            Continuar com o pagamento
          </ButtonCommon>
        </Box>
      )}
      <Box>
        <ButtonCommon
          variant="outlined"
          color="secondary"
          onClick={() => {
            navigate("/");
          }}
          sx={{ padding: "6px 20px" }}
        >
          Voltar
        </ButtonCommon>
      </Box>
    </Container>
  );
}

export default Payment;

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: 3,
    maxWidth: "400px",
  },
  card: {
    borderRadius: 3,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    position: "relative",
    cursor: "pointer",
  },
  cardType: {
    borderRadius: 50,
    backgroundColor: "#E5E5E5",
    width: "fit-content",
    padding: "0 16px",
    fontWeight: 700,
    fontSize: 14,
    position: "absolute",
    top: -10,
  },
  text: {
    fontFamily: "Nunito",
    fontWeight: 400,
    fontSize: 18,
  },
  priceText: {
    fontWeight: 900,
  },
  timesText: {},
  totalText: {},
};
