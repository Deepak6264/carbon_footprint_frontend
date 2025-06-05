import { motion } from "framer-motion";
import Header from "./Header";
import Scrollimage from "./scrollimage";
import { Grid, Box, Tooltip } from "@mui/material";
import Largescale from "./Largescale";
import Footer from "./Footer";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import ContactSupportIcon from "@mui/icons-material/ContactSupport"; 
import { useState } from "react";  // Import useState
import ChatWidget from "./chatbot";  // Import the chatbot
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    
    const [showChat, setShowChat] = useState(false);  // State for toggling chatbot

    function handleNavigation(path) {
        if (!isAuthenticated) {
            Swal.fire({
                title: "Please Log In",
                text: "You need to log in to access this page!",
                icon: "warning",
                confirmButtonText: "Log In",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login");
                }
            });
        } else {
            navigate(path);
        }
    }

    const toggleChat = () => {
        setShowChat((prev) => !prev);  // Toggle chatbot visibility
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
        >
            <Header sx={{ position: "absolute" }} />

            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                style={{ width: "82.6%", alignSelf: "center", marginTop: 35 }}
            >
                <Scrollimage />
            </motion.div>

            <Grid
                container
                spacing={2}
                alignItems="stretch"
                sx={{ marginTop: "50px", width: "82.6%", alignSelf: "center" }}
            >
                {[
                    { title: "At User Level", image: "userscale.jpg", path: "/usercalculator" },
                    { title: "Small Scale Industries", image: "smallscale.jpg", path: "/smallscalecalculator" },
                    { title: "Large Scale Industries", image: "largescale.jpg", path: "/largescalecalculator" }
                ].map((item, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Box style={{ height: "100%", marginTop: "20px" }}>
                                <Largescale
                                    title={item.title}
                                    description="Register your Industries to receive your carbon efficiency."
                                    image={item.image}
                                    buttonText="Register"
                                    onButtonClick={() => handleNavigation(item.path)}
                                />
                            </Box>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                sx={{ width: "95.6%", alignSelf: "center", marginTop: "90px" }}
            >
                <Footer />
            </motion.div>

            {/* Conditionally render the chatbot */}
            {showChat && <ChatWidget isVisible={showChat} />}

            {/* Sticky Chat Button */}
            <Tooltip title={showChat ? "Close Chat" : "Open Chat"} arrow>
                <button onClick={toggleChat} className="chat-button">
                    <ContactSupportIcon style={{ fontSize: "32px" }} />
                </button>
            </Tooltip>

            {/* Inline Styles */}
            <style>{`
                .chat-button {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 9999;
                    width: 60px;
                    height: 60px;
                    background-color: #4caf50;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.3s ease, transform 0.2s;
                }

                .chat-button:hover {
                    background-color: #388e3c;
                    transform: scale(1.1);
                }

                .chat-button:active {
                    transform: scale(0.9);
                }
            `}</style>
        </motion.div>
    );
}
