import { CheckBox, CheckCircle } from "@mui/icons-material";
import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function PaymentModal({ name }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {loading ? (
        <>
          <CircularProgress color="inherit" />
          <Typography sx={styles.text}>Verificando pagamento...</Typography>
        </>
      ) : (
        <>
          <CheckCircle sx={{ color: "#03D69D" }} fontSize="large" />
          <Typography sx={styles.text}>
            {name}, o seu pagamento foi realizado com sucesso!
          </Typography>
        </>
      )}
    </Box>
  );
}

export default PaymentModal;

const styles = {
  text: {
    fontFamily: "Nunito",
    fontWeight: 400,
    fontSize: 18,
    textAlign: "center",
    fontWeight: 700,
  },
};
