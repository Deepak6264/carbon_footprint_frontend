import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getData } from "../FetchNodeAdminServices";
import { Box, Button, Card, CardContent, Typography, CircularProgress, Grid, Chip } from "@mui/material";

const CompanyDetails = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCompanyData = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getData(`large/company?userId=${userId}`);

      if (response.status) {
        setCompanyData(response.data);
        
      } else {
        setError("No company details found.");
        setCompanyData(null);
      }
    } catch (err) {
      setError("Failed to load company data.");
    }

    setLoading(false);
  };

  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      {/* User Details */}
      {user && (
        <Card sx={{ width: "100%", maxWidth: 800, mb: 3 }}>
          <CardContent>
            <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
              User Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}><b>Name:</b> {user.name}</Grid>
              <Grid item xs={12} md={6}><b>Email:</b> {user.email}</Grid>
              <Grid item xs={12} md={6}><b>Phone:</b> {user.phone || "N/A"}</Grid>
              <Grid item xs={12} md={6}><b>Role:</b> {user.role || "N/A"}</Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Fetch Button */}
      <Button variant="contained" color="primary" onClick={fetchCompanyData} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Get Company Details"}
      </Button>

      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

      {/* Company Details */}
      {companyData && (
        <Card sx={{ mt: 4, width: "100%", maxWidth: 800, p: 2 }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h5">{companyData.company_name}</Typography>
              
              {/* Show Verified or Rejected Badge */}
              {companyData.vstatus === "Verified" && (
                <Chip label="Verified" color="success" sx={{ fontSize: 14, fontWeight: "bold" }} />
              )}
              {companyData.vstatus === "Rejected" && (
                <Chip label="Rejected" color="error" sx={{ fontSize: 14, fontWeight: "bold" }} />
              )}
            </Box>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} md={6}><b>CEO:</b> {companyData.ceo_name}</Grid>
              <Grid item xs={12} md={6}><b>Type:</b> {companyData.type}</Grid>
              <Grid item xs={12} md={6}><b>State:</b> {companyData.state}</Grid>
              <Grid item xs={12} md={6}><b>City:</b> {companyData.city}</Grid>
              <Grid item xs={12} md={6}><b>CO2 Emission:</b> {companyData.co2}</Grid>
              <Grid item xs={12} md={6}><b>Emission Details:</b> {companyData.emission || "N/A"}</Grid>
              <Grid item xs={12}>
                <b>Google Link:</b> <a href={companyData.google_link} target="_blank" rel="noopener noreferrer">View</a>
              </Grid>
            </Grid>

            {companyData.company_image && (
             <Box sx={{ mt: 2, textAlign: "center" }}>
             <img 
               src={`http://localhost:5000/images/${companyData.company_image}`} 
               alt="Company" 
               style={{ width: "100%", maxHeight: 200, objectFit: "contain" }} 
             />
           </Box>
           
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default CompanyDetails;
