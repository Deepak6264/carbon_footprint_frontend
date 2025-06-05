import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Button ,Grid2 as Grid} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', carbon: 40 },
  { month: 'Feb', carbon: 35 },
  { month: 'Mar', carbon: 50 },
  { month: 'Apr', carbon: 30 },
  { month: 'May', carbon: 45 },
  { month: 'Jun', carbon: 55 },
];

export default function CompanyCard() {
  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Card sx={{ width: 900, boxShadow: 3 }}> {/* Width increased */}
        <CardMedia
          component="img"
          // alt="Company Logo"
          height="180"
          image="largescale.jpg"// Replace with actual company logo path
        />
        <CardContent>
        <Grid sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography gutterBottom variant="h4" component="div" sx={{}}>
              Carbon Hexaware
            </Typography>
            <Button sx={{marginBottom:'10px'}}>
              <img 
                src="google-maps.png" 
                alt="Google Maps" 
                style={{ width: '24px', height: '24px', }} // Corrected style for width and height
              />
            </Button>
          </Grid>

          <Typography variant="body1" color="text.secondary" paragraph>
            Address: 123 Business Street, Banglore, India
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Established: 1990
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            CEO: John Doe
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Industry: Renewable Energy
          </Typography>
        

          {/* Carbon Release Graph */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" component="div" gutterBottom>
              Carbon Release (tons)
            </Typography>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="carbon" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
          {/* <Grid sx={{display:'flex', alignItems:'center',justifyContent:'center', gap: '20px',}} >
            <Button  variant="contained" color="success"sx={{marginTop:'75px'}}>Verify</Button>
            <Button  variant="contained" color="error"sx={{marginTop:'75px'}}>Reject</Button>
          </Grid> */} 
        </CardContent>
      </Card>
    </Box>
  );
}