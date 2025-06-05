import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardContent, CardMedia, Divider } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { postData } from '../userinterface/homepage/FetchNodeAdminServices';

export default function BannerUpload() {
  const [image, setImage] = useState(null); // State to hold the image file
  const [imagePreview, setImagePreview] = useState(null); // State for preview

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl); // Set image preview
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }
  
    const formData = new FormData();
    formData.append('banner', image); // Append file to FormData
  
    try {
      const response = await postData('admin/upload', formData); // Use your postData function
  
      if (response?.status) {
        alert('Banner uploaded successfully!');
        setImage(null);
        setImagePreview(null);
        
       
      } else {
        alert('Error uploading banner.');
      }
    } catch (error) {
      alert('Error uploading banner.');
      console.error(error);
    }
  };
  

  return (
    <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f4f4f9' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 3, color: '#333' }}>
        Upload Your Banner
      </Typography>

      <Card sx={{ width: 400, padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 3, borderRadius: 2 }}>
        <CardContent sx={{ textAlign: 'center', padding: 2 }}>
          <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
            Choose a Banner Image
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />

          {/* File Input */}
          <Button
            variant="contained"
            color="primary"
            component="label"
            sx={{
              padding: '10px 20px',
              backgroundColor: '#00796b',
              '&:hover': { backgroundColor: '#004d40' },
              transition: '0.3s',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <CloudUploadIcon sx={{ marginRight: 1 }} />
            Choose Banner
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>

          {/* Image Preview */}
          {imagePreview && (
            <CardMedia
              component="img"
              src={imagePreview}
              alt="Banner Preview"
              sx={{
                marginTop: 2,
                width: '100%',
                height: 200,
                objectFit: 'cover',
                borderRadius: 2,
              }}
            />
          )}
        </CardContent>

        {/* Upload Button */}
        <Box sx={{ marginTop: 3, width: '100%' }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#ff5722',
              '&:hover': { backgroundColor: '#e64a19' },
              transition: '0.3s',
            }}
            onClick={handleUpload}
          >
            Upload Banner
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
