import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Box, Button, Grid, TextField, Typography, Paper, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CarbonFootprintCalculator = () => {
  const navigate = useNavigate();
  const [activityData, setActivityData] = useState({
    scope1: {
      fuelConsumption: 0,
      manufacturing: 0,
      refrigerantSystems: 0,
      onSiteWasteFacilities: 0,
      fugitiveEmissions: 0,
    },
    scope2: {
      energyConsumption: 0,
    },
    scope3: {
      transportationOfRawMaterials: 0,
      businessTravel: 0,
      employeeCommuting: 0,
      transportationOfPurchasedFuels: 0,
    },
  });

  const [emissionFactors, setEmissionFactors] = useState({
    scope1: {
      fuelConsumption: 0.5,
      manufacturing: 1.2,
      refrigerantSystems: 0.8,
      onSiteWasteFacilities: 0.3,
      fugitiveEmissions: 0.2,
    },
    scope2: {
      energyConsumption: 0.6,
    },
    scope3: {
      transportationOfRawMaterials: 0.4,
      businessTravel: 0.7,
      employeeCommuting: 0.5,
      transportationOfPurchasedFuels: 0.9,
    },
  });

  const [carbonFootprint, setCarbonFootprint] = useState(0);

  const calculateCarbonFootprint = () => {
    const scope1Emissions = Object.keys(activityData.scope1).reduce(
      (acc, key) => acc + activityData.scope1[key] * emissionFactors.scope1[key],
      0
    );

    const scope2Emissions =
      activityData.scope2.energyConsumption * emissionFactors.scope2.energyConsumption;

    const scope3Emissions = Object.keys(activityData.scope3).reduce(
      (acc, key) => acc + activityData.scope3[key] * emissionFactors.scope3[key],
      0
    );

    const totalEmissions = scope1Emissions + scope2Emissions + scope3Emissions;
    setCarbonFootprint(totalEmissions);
  };

  const handleInputChange = (event, scope, field) => {
    const { value } = event.target;
    setActivityData((prevData) => ({
      ...prevData,
      [scope]: {
        ...prevData[scope],
        [field]: parseFloat(value),
      },
    }));
  };

  const handleEmissionFactorChange = (event, scope, field) => {
    const { value } = event.target;
    setEmissionFactors((prevFactors) => ({
      ...prevFactors,
      [scope]: {
        ...prevFactors[scope],
        [field]: parseFloat(value),
      },
    }));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Carbon Footprint Calculator
        </Typography>
        <Grid container spacing={3}>
          {/* Scope 1 Inputs */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Scope 1</Typography>
            <TextField
              fullWidth
              label="Fuel Consumption (tons)"
              type="number"
              variant="outlined"
              value={activityData.scope1.fuelConsumption}
              onChange={(e) => handleInputChange(e, 'scope1', 'fuelConsumption')}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Manufacturing (tons)"
              type="number"
              variant="outlined"
              value={activityData.scope1.manufacturing}
              onChange={(e) => handleInputChange(e, 'scope1', 'manufacturing')}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Refrigerant Systems (tons)"
              type="number"
              variant="outlined"
              value={activityData.scope1.refrigerantSystems}
              onChange={(e) => handleInputChange(e, 'scope1', 'refrigerantSystems')}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="On-Site Waste Facilities (tons)"
              type="number"
              variant="outlined"
              value={activityData.scope1.onSiteWasteFacilities}
              onChange={(e) => handleInputChange(e, 'scope1', 'onSiteWasteFacilities')}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Fugitive Emissions (tons)"
              type="number"
              variant="outlined"
              value={activityData.scope1.fugitiveEmissions}
              onChange={(e) => handleInputChange(e, 'scope1', 'fugitiveEmissions')}
              sx={{ mb: 2 }}
            />
          </Grid>

          {/* Scope 2 Inputs */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Scope 2</Typography>
            <TextField
              fullWidth
              label="Energy Consumption (MWh)"
              type="number"
              variant="outlined"
              value={activityData.scope2.energyConsumption}
              onChange={(e) => handleInputChange(e, 'scope2', 'energyConsumption')}
              sx={{ mb: 2 }}
            />
          </Grid>

          {/* Scope 3 Inputs */}
          <Grid item xs={12}>
            <Typography variant="h6">Scope 3</Typography>
            <TextField
              fullWidth
              label="Transportation of Raw Materials (tons)"
              type="number"
              variant="outlined"
              value={activityData.scope3.transportationOfRawMaterials}
              onChange={(e) => handleInputChange(e, 'scope3', 'transportationOfRawMaterials')}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Business Travel (tons)"
              type="number"
              variant="outlined"
              value={activityData.scope3.businessTravel}
              onChange={(e) => handleInputChange(e, 'scope3', 'businessTravel')}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Employee Commuting (tons)"
              type="number"
              variant="outlined"
              value={activityData.scope3.employeeCommuting}
              onChange={(e) => handleInputChange(e, 'scope3', 'employeeCommuting')}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Transportation of Purchased Fuels (tons)"
              type="number"
              variant="outlined"
              value={activityData.scope3.transportationOfPurchasedFuels}
              onChange={(e) => handleInputChange(e, 'scope3', 'transportationOfPurchasedFuels')}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Box mt={4}>
          <Button variant="contained" color="primary" onClick={calculateCarbonFootprint}>
            Calculate
          </Button>
          <Button variant="contained" color="success" onClick={()=>{navigate('/register')}} sx={{marginLeft:'10px'}}>
           Register
          </Button>

        </Box>

        <Typography variant="h5" mt={3}>
          Total Carbon Footprint: {carbonFootprint.toFixed(2)} tons of CO2e
        </Typography>

        {/* Chart for visualization */}
        <LineChart
          width={500}
          height={300}
          data={[{ name: 'Carbon Footprint', value: carbonFootprint }]}
          sx={{ marginTop: '40px' }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </Paper>
    </Container>
  );
};

export default CarbonFootprintCalculator;
