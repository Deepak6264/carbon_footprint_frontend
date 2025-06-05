import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Typography, Box } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business"; // Company icon
import LocationOnIcon from "@mui/icons-material/LocationOn"; // Location icon
import AssessmentIcon from "@mui/icons-material/Assessment"; // Emission level icon
import { useNavigate } from "react-router-dom";
import { getData } from "../userinterface/homepage/FetchNodeAdminServices"; // Import postData function

const CarbonCompanyTable = () => {
  const [data, setData] = useState([]); // State to store company data
  const navigate = useNavigate();

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await getData("admin/show_rejected_company"); 
      if (response.status) {
        setData(response.data); 
        console.log("Fetched data:", response.data); 
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Handle row click to navigate to the company profile
  const handleRowClick = (companyId) => {
    navigate(`/companycard/${companyId}`); 
  };

  return (
    <Box style={{ marginTop: "20px", padding: "20px" }}>
      
      {/* Heading */}
      <Typography variant="h4" style={{ fontWeight: "bold", color: "#d32f2f", marginBottom: "20px" }}>
        Rejected Companies
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" style={{ fontWeight: "bold", color: "#1976d2" }}>
                  Company ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" style={{ fontWeight: "bold", color: "#1976d2" }}>
                  Company Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" style={{ fontWeight: "bold", color: "#1976d2" }}>
                  State
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" style={{ fontWeight: "bold", color: "#1976d2" }}>
                  City
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" style={{ fontWeight: "bold", color: "#1976d2" }}>
                  Emission Level
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((company, index) => (
              <TableRow
                key={index}
                onClick={() => handleRowClick(company.company_id)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>{company.company_id}</TableCell>
                <TableCell>
                  <Avatar style={{ backgroundColor: "#1976d2", marginRight: "10px", display: "inline-flex" }}>
                    <BusinessIcon />
                  </Avatar>
                  {company.company_name}
                </TableCell>
                <TableCell>
                  <Avatar style={{ backgroundColor: "#1976d2", marginRight: "10px", display: "inline-flex" }}>
                    <LocationOnIcon />
                  </Avatar>
                  {company.state}
                </TableCell>
                <TableCell>
                  <Avatar style={{ backgroundColor: "#1976d2", marginRight: "10px", display: "inline-flex" }}>
                    <LocationOnIcon />
                  </Avatar>
                  {company.city}
                </TableCell>
                <TableCell>
                  <Avatar style={{ backgroundColor: "#1976d2", marginRight: "10px", display: "inline-flex" }}>
                    <AssessmentIcon />
                  </Avatar>
                  {company.emission}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CarbonCompanyTable;
