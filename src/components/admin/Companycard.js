import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button, Grid } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getData, postData } from '../userinterface/homepage/FetchNodeAdminServices';
import Swal from "sweetalert2";

export default function CompanyCard() {
  const navigate = useNavigate(); 
  const { companyId } = useParams();
  const [companyData, setCompanyData] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await getData(`large/companycard/${companyId}`);
        if (response.status) {
          setCompanyData(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError('Failed to fetch company details.');
      }
    };

    fetchCompanyDetails();
  }, [companyId]);

  const handleVerify = async () => {
    try {
      const response = await postData(`large/insert_verification/${companyId}`, { status: 'Verified' });
      if (response.status) {
        Swal.fire("Success", "Company verified successfully!", "success");
      } else {
        Swal.fire("Error", "Failed to verify company.", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Error occurred while verifying the company.", "error");
    }
  };

  const handleReject = async () => {
    try {
      const response = await postData(`large/insert_verification/${companyId}`, { status: 'Rejected' });
      if (response.status) {
        Swal.fire("Success", "Company rejected successfully!", "success");
      } else {
        Swal.fire("Error", "Failed to reject company.", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Error occurred while rejecting the company.", "error");
    }
  };

  const handleInsertCarbonFootprint = () => {
    alert(companyId)
    navigate(`/admin/monthlydata/${companyId}`); // Navigating with companyId
  };

  if (!companyData && !error) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor: '#f5f5f5' }}>
      <Card sx={{ width: 900, boxShadow: 3 }}>
        <CardMedia
          component="img"
          height="180"
          image={require('./carbon-footprint.jpg')}
          alt={companyData.company_name}
        />
        <CardContent>
          <Grid sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography gutterBottom variant="h4">
              {companyData.company_name}
            </Typography>
            <Button sx={{ marginBottom: '10px' }} onClick={() => window.open(companyData.googleMapLink, '_blank')}>
              <img src="google-maps.png" alt="Google Maps" style={{ width: '24px', height: '24px' }} />
            </Button>
          </Grid>

          <Typography variant="body1" color="text.secondary" paragraph>
            Address: {companyData.city || 'No address available'}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Established: {companyData.establishment_date || 'Not available'}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            CEO: {companyData.ceo_name || 'Not available'}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Industry: {companyData.type || 'Not available'}
          </Typography>

          <Grid sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <Button variant="contained" color="success" onClick={handleVerify}>
              Verify
            </Button>
            <Button variant="contained" color="error" onClick={handleReject}>
              Reject
            </Button>
            <Button variant="contained" color="primary" onClick={handleInsertCarbonFootprint}>
              Insert Carbon Footprint
            </Button>
          </Grid>

          {message && (
            <Typography variant="h6" color="text.secondary" sx={{ marginTop: '20px', textAlign: 'center' }}>
              {message}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
