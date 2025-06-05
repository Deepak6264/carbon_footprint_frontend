import React from "react";
import { Box, Typography } from "@mui/material";

const AverageCalculator = ({ percent, isPositive }) => {
  // Define the message and color based on isPositive
  const message = isPositive ? "Better than average" : "Worse than average";
  const textColor = isPositive ? "green" : "red";

  return (
    <Box>
      <Typography color={textColor} variant="h1" fontWeight="bold">
        {percent} %
      </Typography>
      <Typography color={textColor} variant="body1">
        {message}
      </Typography>
    </Box>
  );
};

export default AverageCalculator;
