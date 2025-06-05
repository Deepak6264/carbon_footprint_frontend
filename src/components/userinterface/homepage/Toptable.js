import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function TopCompanies() {
    const [companies] = useState([
        'Apple', 
        'Microsoft', 
        'Google', 
        'Amazon', 
        'Facebook', 
        'Tesla', 
        'Netflix'
    ]);

    return (
        <Box 
            sx={{
                border: '1px solid #ccc', 
                borderRadius: '8px', 
                padding: '16px', 
                maxWidth: '300px',
                margin: '20px auto'
            }}
        >
            <Typography variant="h6" component="div" gutterBottom>
                Top 5 Companies
            </Typography>

            <Box component="div" sx={{ paddingLeft: '8px', height: '183px'}}>
                {companies.slice(0, 5).map((company, index) => (
                    <Typography
                        key={index} 
                        variant="body2" 
                        sx={{ margin: '4px 0',border: '1px solid #ccc', }} // Reduced margin for a more compact list
                    >
                        {company}
                    </Typography>
                ))}
            </Box>

            <Box textAlign="center" mt={2}>
                <Button variant="contained" color="primary" size="small">
                    See More
                </Button>
            </Box>
        </Box>
    );
}
