import React from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const SvgContainer = styled("div")({
  position: "relative",
  width: "100%",
  height: "33px",
});

const TextContainer = styled(Typography)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: 12,
  paddingLeft: "10px",
  color: "white",
  width: "100%",
  fontFamily: "Nunito",
  fontWeight: 400,
});

const BootMark = ({ text }) => (
  <SvgContainer>
    <svg
      width="100%"
      height="33"
      viewBox="0 0 385 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 4C0 1.79086 1.79086 0 4 0H382.073C383.869 0 384.755 2.18257 383.467 3.43408L371.502 15.0659C370.694 15.8513 370.694 17.1487 371.502 17.9341L383.467 29.5659C384.755 30.8174 383.869 33 382.073 33H4C1.79086 33 0 31.2091 0 29V4Z"
        fill="#133A6F"
      />
    </svg>
    <TextContainer>{text}</TextContainer>
  </SvgContainer>
);

export default BootMark;
