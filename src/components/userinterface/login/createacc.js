import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { postData } from '../homepage/FetchNodeAdminServices';

export default function LoginForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setNameError(false);
    setEmailError(false);
    setPasswordError(false);

    // Validation
    if (!name) setNameError(true);
    if (!/\S+@\S+\.\S+/.test(email)) setEmailError(true);
    if (password.length < 6) setPasswordError(true);

    // Stop submission if there are errors
    if (!name || !/\S+@\S+\.\S+/.test(email) || password.length < 6) return;

    const payload = { "ename":name, "email":email, "epass":password, "emob":mobile };

    try {
      const result = await postData('large/insert', payload);
      if (result.status) {
       
        navigate('/login'); // Redirect on success
      } else {
        console.error('Error creating account:', result.message);
        alert(result.message || 'Error creating account');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('An error occurred while creating the account.');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(/green.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          borderRadius: 3,
          backgroundColor: 'transparent',
          backdropFilter: 'blur(50px)',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Create Account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={nameError}
              helperText={nameError ? 'Name is required' : ''}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText={emailError ? 'Enter a valid email address' : ''}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              helperText={passwordError ? 'Password must be at least 6 characters' : ''}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="mobile"
              label="Mobile"
              id="mobile"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Create Account
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
