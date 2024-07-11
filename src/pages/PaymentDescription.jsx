import { useUser } from "@clerk/clerk-react";
import {
  CheckCircle,
  CircleOutlined,
  KeyboardArrowUp,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Container,
  Grid,
  TextField,
  Snackbar,
  Typography,
  Select,
  MenuItem,
  Modal,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mackBookPrices } from "../data/data";
import ButtonCommon from "../components/Button";
import ReactInputMask from "react-input-mask";
import PaymentModal from "../Layout/components/PaymentModal";

function PaymentDescription() {
  const navigate = useNavigate();
  const { user } = useUser();
  const firstName = user?.firstName || "João";
  const { id } = useParams();
  const data =
    id == 0 ? mackBookPrices?.price : mackBookPrices?.parcelas[id - 1];
  const timesArray = new Array(data.times - 1);
  const filledArray = timesArray.fill().map((_, index) => {
    return { number: index };
  });
  const [values, setValues] = useState({
    name: "",
    CPF: "",
    card: "",
    date: "",
    cvv: "",
    times: 1,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubtraction = (value1, value2) => {
    const number1 = parseFloat(value1.replace(/\./g, "").replace(",", "."));
    const number2 = parseFloat(value2.replace(/\./g, "").replace(",", "."));

    const subtractionResult = number1 - number2;

    const formattedResult = subtractionResult.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formattedResult;
  };

  const leftValue = handleSubtraction(data.totalPrice, data.value);

  const handleChange = (field, value) => {
    setValues({
      ...values,
      [field]: value,
    });
  };

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false), navigate("/");
  };

  const handlePay = () => {
    handleOpenModal();
  };

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <Typography
        sx={{
          ...styles.text,
          fontSize: "1.4rem",
          fontWeight: 900,
          maxWidth: "30ch",
          textAlign: "center",
        }}
      >
        {firstName}, pague o restante em 1x no cartão
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            type="text"
            variant="outlined"
            label="Nome completo"
            sx={styles.input}
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <ReactInputMask
            mask="999.999.999-99" // Exemplo de máscara para CPF
            value={values.CPF}
            onChange={(e) => handleChange("CPF", e.target.value)}
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                type="text"
                variant="outlined"
                label="CPF"
                sx={styles.input}
              />
            )}
          </ReactInputMask>
        </Grid>
        <Grid item xs={12}>
          <ReactInputMask
            mask="999 999 9999 999" // Exemplo de máscara para CPF
            value={values.card}
            onChange={(e) => handleChange("card", e.target.value)}
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                type="text"
                variant="outlined"
                label="Número do cartão"
                sx={styles.input}
              />
            )}
          </ReactInputMask>
        </Grid>
        <Grid item xs={6}>
          <ReactInputMask
            mask="99/99" // Exemplo de máscara para CPF
            value={values.date}
            onChange={(e) => handleChange("date", e.target.value)}
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                type="text"
                variant="outlined"
                label="Vencimento"
                sx={styles.input}
              />
            )}
          </ReactInputMask>
        </Grid>
        <Grid item xs={6}>
          <ReactInputMask
            mask="999" // Exemplo de máscara para CPF
            value={values.cvv}
            onChange={(e) => handleChange("cvv", e.target.value)}
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                type="text"
                variant="outlined"
                label="CVV"
                sx={styles.input}
              />
            )}
          </ReactInputMask>
        </Grid>
        <Grid item xs={12}>
          <Select
            variant="outlined"
            label="Parcelas"
            sx={styles.input}
            value={values.times}
            onChange={(e) => handleChange("times", e.target.value)}
          >
            <MenuItem value={1}>1x de {leftValue}</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <ButtonCommon onClick={handlePay} sx={{ padding: "6px 20px" }}>
        Pagar
      </ButtonCommon>
      <Box>
        <Typography
          sx={{
            ...styles.text,

            color: "#B2B2B2",
          }}
        >
          Prazo de pagamento:
        </Typography>
        <Typography
          sx={{
            ...styles.text,

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
            <CheckCircle fontSize="small" sx={{ color: "#03D69D" }} />
            <Typography
              sx={{
                ...styles.text,
              }}
            >
              1º Entrada no PIX
            </Typography>
          </Box>
          <Typography
            sx={{
              ...styles.text,

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
                  }}
                >
                  {index + 2}º no cartão
                </Typography>
              </Box>
              <Typography
                sx={{
                  ...styles.text,

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
          }}
        >
          CET: 0,5%
        </Typography>
        <Typography
          sx={{
            ...styles.text,
          }}
        >
          Total: R$ {leftValue}
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
            fontSize: "0.8rem",
            color: "#B2B2B2",
          }}
        >
          Identificador
        </Typography>
        <Typography
          sx={{
            ...styles.text,
            fontSize: "0.8rem",
            fontWeight: 700,
          }}
        >
          2c1b951f356c4680b13ba1c9fc889c47
        </Typography>
      </Box>
      <Box>
        <ButtonCommon
          variant="outlined"
          color="secondary"
          onClick={() => {
            navigate(`/payment/${id}`);
          }}
          sx={{ padding: "6px 20px" }}
        >
          Voltar
        </ButtonCommon>
      </Box>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.modal}>
          <PaymentModal name={firstName} />
        </Box>
      </Modal>
    </Container>
  );
}

export default PaymentDescription;

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
    fontSize: "1rem",
  },
  priceText: {
    fontWeight: 900,
  },
  line: {
    border: "1px solid #E5E5E5",
    width: "100%",
  },
  input: {
    width: "100%",
    color: "#000 ",
    fontFamily: "Nunito",
    input: {
      fontFamily: "Nunito",
    },
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "90%",
    maxWidth: "400px",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "none",
    borderRadius: "3px",
    boxShadow: 24,
    p: 4,
  },
};
