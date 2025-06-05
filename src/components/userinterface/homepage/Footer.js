import React from 'react';
import { Grid, Box, Typography, Button, Link } from '@mui/material';
import { Twitter, Facebook, Instagram, LinkedIn } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: '#ecf0f1', color: 'black', padding: '50px 0', marginTop: '50px' }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        
        {/* Left Section - Let's Talk */}
        <Grid item xs={12} md={6}>
          <Box sx={{ paddingLeft: '20px' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
              Let's Talk
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '20px' }}>
              Every project starts with a chat. Joven leads our client conversations and will be happy to discuss your project. 
              He will also pull in the right people from the team when needed.
            </Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#00d084', fontWeight: 'bold', fontSize: '16px', padding: '10px 20px' }}
            >
              Tell us about your project
            </Button>
          </Box>
        </Grid>

        {/* Right Section - Contact Info */}
        <Grid item xs={12} md={6} sx={{}}>
          <Box sx={{marginLeft:'23px' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
              Email
            </Typography>
            <Link href="mailto:deepakrathore769731@gmail.com" sx={{ color: '#00d084', display: 'block', marginBottom: '10px' }}>
             Deepakrathore769731@gmail.com
            </Link>
            
            <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
              Phone
            </Typography>
            <Link href="tel:+6264723033" sx={{ color: '#00d084', display: 'block', marginBottom: '10px' }}>
              +91-6264723033
            </Link>
            
            <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: '5px' }}>
              Address
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
              Durgapuri Colony<br />
               Gadaipura<br />
              Gwalior 474004, Madhya Pradesh
            </Typography>
            <br/>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
             Let's Talk
            </Typography>
            

            {/* Social Media Icons */}
            <Box sx={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
              <Link href="https://twitter.com" target="_blank" >
                <Twitter fontSize="large" />
              </Link>
              <Link href="https://facebook.com" target="_blank" >
                <Facebook fontSize="large" />
              </Link>
              <Link href="https://www.instagram.com/the_deepak_rathore/" target="_blank" >
                <Instagram fontSize="large" />
              </Link>
              <Link href="https://www.linkedin.com/in/deepak-rathore-7a225b25b/" target="_blank" >
                <LinkedIn fontSize="large" />
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
