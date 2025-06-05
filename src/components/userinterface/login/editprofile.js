import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Avatar,
  Typography,
} from "@mui/material";
import { CloudUpload, Edit } from "@mui/icons-material";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    image: null,
    preview: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("mobile", formData.mobile);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/users/update-profile", // Fixed API Endpoint
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-green-100">
      {/* Centered Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="rounded-2xl shadow-2xl border border-green-300 bg-white/20 backdrop-blur-md p-6">
          <CardContent>
            <Typography
              variant="h5"
              className="text-center font-bold text-green-800 mb-4"
            >
              Edit Profile
            </Typography>

            {/* Avatar Upload */}
            <div className="flex flex-col items-center relative mb-4">
              <Avatar
                src={formData.preview || "/default-avatar.png"}
                className="w-20 h-20 border-4 border-green-400 shadow-lg"
              />
              <label
                htmlFor="fileInput"
                className="absolute bottom-0 right-0 bg-green-500 hover:bg-green-600 text-white rounded-full p-2 cursor-pointer transition-all duration-300 shadow-md"
              >
                <Edit fontSize="small" />
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* Input Fields */}
            <TextField
              label="Name"
              name="name"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              className="bg-white rounded-lg border border-green-300"
            />

            <TextField
              label="Email"
              name="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              className="bg-white rounded-lg border border-green-300"
            />

            <TextField
              label="Mobile"
              name="mobile"
              fullWidth
              variant="outlined"
              value={formData.mobile}
              onChange={handleChange}
              margin="normal"
              className="bg-white rounded-lg border border-green-300"
            />

            {/* Submit Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                fullWidth
                className="bg-green-500 hover:bg-green-600 text-white font-semibold mt-4 transition-all duration-300 shadow-lg"
                onClick={handleSubmit}
                startIcon={<CloudUpload />}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default EditProfile;
