import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { logout } from '../login/authSlice';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  // Dropdown state
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const handleRegister = () => {
    if (isAuthenticated) {
      handleNavigation('/register');
    } else {
      Swal.fire({
        title: 'Please Log In',
        text: 'You need to log in to access this page!',
        icon: 'warning',
        confirmButtonText: 'Log In',
      }).then((result) => {
        if (result.isConfirmed) {
          handleNavigation('/login');
        }
      });
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    handleNavigation('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#78e08f' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => handleNavigation('/')} sx={{ color: 'white', fontWeight: 'bold', fontSize: 24 }}>
            EcoSavy
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button onClick={handleRegister} sx={{ color: 'white', fontSize: '15px', mx: matches ? 2 : 1 }}>
              Register
            </Button>
            <Button onClick={() => handleNavigation('/about')} sx={{ color: 'white', fontSize: '15px', mx: matches ? 2 : 1 }}>
              About
            </Button>
            <Button onClick={() => handleNavigation('/admin/adminlogin')} sx={{ color: 'white', fontSize: '15px', mx: matches ? 2 : 1 }}>
              Admin
            </Button>

            {/* Account Icon & Menu */}
            {isAuthenticated ? (
              <>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="account"
                  onClick={handleMenuOpen}
                >
                  <AccountCircleIcon sx={{ fontSize: 30 }} />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      mt: 1.5,
                      minWidth: 180,
                    },
                  }}
                >
                  <MenuItem onClick={() => handleNavigation('/Edit_profile')}>Edit Profile</MenuItem>
                  <MenuItem onClick={() => handleNavigation('/companies')}>Companies</MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout} sx={{ color: 'red' }}>Sign Out</MenuItem>
                </Menu>
              </>
            ) : (
              <Button onClick={() => handleNavigation('/login')} sx={{ color: 'white', fontSize: '15px', mx: matches ? 2 : 1 }}>
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
