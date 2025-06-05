import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Typography } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business"; // Company icon
import LocationOnIcon from "@mui/icons-material/LocationOn"; // Location icon
import AssessmentIcon from "@mui/icons-material/Assessment"; // Emission level icon
import { useNavigate } from "react-router-dom";
import { getData } from "../userinterface/homepage/FetchNodeAdminServices"; // Import postData function

const CarbonCompanyTable = () => {
  const [data, setData] = useState([]); // State to store company data
  const navigate = useNavigate();

  // Function to fetch data using postData
  const fetchData = async () => {
    try {
      const response = await getData("large/show_company"); // Sending an empty object if no specific parameters are required
      if (response.status) {
        setData(response.data); // Update state with fetched data
        console.log("Fetched data:", response.data); // Debugging purpose
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
  const handleRowClick = async(companyId) => {
  
        const response = await getData(`admin/monthly_data/${companyId}`);
        
        if (response.status) {
            
          navigate(`/admin/industrygraph/${companyId}`, { state: { monthlyData: response.data } }, { replace: true });
        } else {
            
          console.error("Failed to fetch monthly data:", response.message);
        }
       
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: "20px", padding: "10px" }}>
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
              onClick={() => handleRowClick(company.company_id)} // Use company ID from each object
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{company.company_id}</TableCell>
              <TableCell>
                <Avatar
                  style={{ backgroundColor: "#1976d2", marginRight: "10px", display: "inline-flex" }}
                >
                  <BusinessIcon />
                </Avatar>
                {company.company_name}
              </TableCell>
              <TableCell>
                <Avatar
                  style={{ backgroundColor: "#1976d2", marginRight: "10px", display: "inline-flex" }}
                >
                  <LocationOnIcon />
                </Avatar>
                {company.state}
              </TableCell>
              <TableCell>
                <Avatar
                  style={{ backgroundColor: "#1976d2", marginRight: "10px", display: "inline-flex" }}
                >
                  <LocationOnIcon />
                </Avatar>
                {company.city}
              </TableCell>
              <TableCell>
                <Avatar
                  style={{ backgroundColor: "#1976d2", marginRight: "10px", display: "inline-flex" }}
                >
                  <AssessmentIcon />
                </Avatar>
                {company.emission}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CarbonCompanyTable;
