import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch admin data from localStorage and backend image URL
  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("adminData"));

    if (storedAdmin) {
      setAdmin(storedAdmin);

      // Fetch the latest image from the backend
      const fetchImage = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`http://localhost:5000/admin/show_image/${storedAdmin.adminid}`);

          if (res.data && res.data.image) {
            // Update admin state with the image name
            setAdmin((prev) => ({
              ...prev,
              picture: res.data.image,  // Only the image name
            }));
          }
        } catch (error) {
          console.error("Failed to load image:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchImage();
    } else {
      navigate("/admin/login"); // Redirect if no admin data
    }
  }, [navigate]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("adminData");
    localStorage.removeItem("adminToken");
    navigate("/admin/adminlogin");
  };

  return (
    <div>
      {/* AppBar */}
      <AppBar position="static" sx={{ backgroundColor: "green", boxShadow: "none" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            EcoSavy
          </Typography>
          <Button
            sx={{
              backgroundColor: "green",
              color: "white",
              "&:hover": { backgroundColor: "darkgreen" },
              fontWeight: "bold",
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        {/* Sidebar */}
        <Grid item xs={12} sm={4} md={3}>
          <Paper
            elevation={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 3,
              height: "100vh",
              backgroundColor: "#f7f7f7",
            }}
          >
            {/* Profile Section */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "200px",
              }}
            >
              {loading ? (
                <CircularProgress />
              ) : (
                <img
                  src={
                    admin && admin.picture
                      ? `http://localhost:5000/images/${admin.picture}` // Use image name with uploads path
                      : "https://via.placeholder.com/150"
                  }
                  alt="Admin Profile"
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    border: "3px solid #ccc",
                    objectFit: "cover",
                  }}
                />
              )}
            </Box>

            <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: 2 }}>
              {admin ? admin.name : "Admin"}
            </Typography>
            <Typography variant="body2" sx={{ color: "grey" }}>
              {admin ? admin.email : "admin@example.com"}
            </Typography>

            <Divider sx={{ width: "90%", marginY: 2 }} />

            {/* Sidebar Menu */}
            <List sx={{ width: "100%" }}>
              <ListItem>
                <ListItemButton onClick={() => navigate("/admin/managecompanies")}>
                  <ListItemText primary="Manage Companies" />
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton onClick={() => navigate("/admin/alldata")}>
                  <ListItemText primary="All Industry Data" />
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton onClick={() => navigate("/admin/industriesdata")}>
                  <ListItemText primary="Each Industries Data" />
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton onClick={() => navigate("/admin/rejected")}>
                  <ListItemText primary="Rejected Companies" />
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Content */}
        <Grid item xs={12} sm={8} md={9}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              backgroundColor: "#ffffff",
              height: "100vh",
              borderRadius: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Select an option from the sidebar to display content.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
