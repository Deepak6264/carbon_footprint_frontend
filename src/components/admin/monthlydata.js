import React, { useState } from "react";
import { Card, CardContent, TextField, Button, Typography, MenuItem, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { postData } from "../userinterface/homepage/FetchNodeAdminServices";
import Swal from "sweetalert2";

export default function InsertDataCard() {
  const { companyId } = useParams(); 

  // Get current month & year
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  const [carbonValue, setCarbonValue] = useState("");

  const handleSubmit = async () => {
    if (!carbonValue) {
      Swal.fire("Error", "Please enter carbon footprint value!", "error");
      return;
    }

    const payload = { company_id: companyId, month_name: currentMonth, year: currentYear, data_value: carbonValue };

    try {
      const response = await postData("admin/insert_monthly_data", payload);
      if (response.status) {
        Swal.fire("Success", "Data inserted successfully!", "success");
        setCarbonValue("");
      } else {
        Swal.fire("Error", "Failed to insert data.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <Grid container justifyContent="center">
      <Card sx={{ width: 500, mt: 4, p: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Insert Monthly Carbon Footprint Data
          </Typography>

          <TextField
            select
            fullWidth
            label="Month"
            value={currentMonth}
            disabled
            sx={{ mt: 2 }}
          >
            <MenuItem value={currentMonth}>{currentMonth}</MenuItem>
          </TextField>

          <TextField
            select
            fullWidth
            label="Year"
            value={currentYear}
            disabled
            sx={{ mt: 2 }}
          >
            <MenuItem value={currentYear}>{currentYear}</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Carbon Footprint Value"
            type="number"
            value={carbonValue}
            onChange={(e) => setCarbonValue(e.target.value)}
            sx={{ mt: 2 }}
          />

          <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} onClick={handleSubmit}>
            Submit Data
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}
