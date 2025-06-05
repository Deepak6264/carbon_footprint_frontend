import React, { useState } from "react";
import { Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {postData} from "../userinterface/homepage/FetchNodeAdminServices"; // Adjust the path based on your project structure

export default function AdminLogin() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: "", password: "" });

    // Handle Input Change
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    // Handle Login
    const handleLogin = async () => {
        try {
            const data = await postData("admin/login", credentials);
    
            if (data.success) {
                Swal.fire({
                    title: "Login Successful!",
                    text: "Welcome to the Admin Panel",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                }).then(() => {
                    // Store token, user details, and image URL
                    localStorage.setItem("adminToken", data.token);
                    localStorage.setItem("adminData", JSON.stringify(data.user));
    
                    // Store the image URL separately if available
                    if (data.user.imageUrl) {
                        localStorage.setItem("adminImage", data.user.imageUrl);
                    }
    
                    navigate("/admin/dashboard");
                });
            } else {
                Swal.fire({
                    title: "Login Failed",
                    text: data.message || "Invalid username or password!",
                    icon: "error",
                    confirmButtonText: "Try Again",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Failed to connect to the server",
                icon: "error",
                confirmButtonText: "Retry",
            });
            console.error("Login Error:", error);
        }
    };
    
    
    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: "url('/green.webp')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Card
                sx={{
                    width: 400,
                    padding: 3,
                    borderRadius: 3,
                    background: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                }}
            >
                <CardContent>
                    <Typography variant="h5" align="center" color="black" gutterBottom>
                        Admin Login
                    </Typography>

                    <TextField
                        fullWidth
                        label="Username or Mobile"
                        variant="outlined"
                        name="username"
                        placeholder="Enter email, username, or mobile"
                        value={credentials.username}
                        onChange={handleChange}
                        sx={{ input: { color: "black" }, label: { color: "#555" }, mt: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        sx={{ input: { color: "black" }, label: { color: "#555" }, mt: 2 }}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3,
                            backgroundColor: "#ff9800",
                            color: "white",
                            "&:hover": { backgroundColor: "#e68900" },
                        }}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}
