import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { postData, getData } from "../FetchNodeAdminServices";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id || "";
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [establishmentDate, setEstablishmentDate] = useState("");
  const [ceoName, setCeoName] = useState("");
  const [industryType, setIndustryType] = useState("");
  const [googleMapLink, setGoogleMapLink] = useState("");
  const [co2Emission, setCo2Emission] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [companyImage, setCompanyImage] = useState({ bytes: "", fileName: "" });
  const [emission, setEmission] = useState("");

  function handleImage(e) {
    const file = e.target.files[0];
    if (file) {
      setCompanyImage({
        bytes: file,
        fileName: URL.createObjectURL(file),
      });
    }
  }

  const handleReset = () => {
    setCompanyName("");
    setEstablishmentDate("");
    setCeoName("");
    setIndustryType("");
    setGoogleMapLink("");
    setCo2Emission("");
    setState("");
    setCity("");
    setCompanyImage({ bytes: "", fileName: "" });
    setEmission("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      Swal.fire("Error", "User not logged in. Please log in first.", "error");
      return;
    }

    try {
      const existingCompany = await getData(`large/check_company?userId=${userId}`);

      if (existingCompany.exists) {
        Swal.fire(
          "Warning",
          "You have already registered a company. Only one company is allowed per user.",
          "warning"
        );
        navigate("/");
        return;
      }
    } catch (error) {
      console.error("Error checking company existence:", error);
      Swal.fire("Error", "An error occurred while checking company details.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("companyName", companyName);
    formData.append("establishmentDate", establishmentDate);
    formData.append("ceoName", ceoName);
    formData.append("industryType", industryType);
    formData.append("googleMapLink", googleMapLink);
    formData.append("co2Emission", co2Emission);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("emission", emission);
    formData.append("userId", userId);

    if (companyImage.bytes) {
      formData.append("companyImage", companyImage.bytes);
    }

    try {
      const response = await postData("large/insert_company", formData);
      if (response.status) {
        Swal.fire({
          title: "Success",
          text: "Company added successfully!",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
        handleReset();
      } else {
        Swal.fire("Error", "Failed to add company.", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "An error occurred while submitting the data.", "error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Box>
        <Box
          padding={2}
          margin={8}
          sx={{ border: "1px solid black", background: "#f5f6fa" }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {[
                { label: "Enter Company Name", value: companyName, setter: setCompanyName },
                { label: "CEO Name", value: ceoName, setter: setCeoName },
                { label: "Google Map Link", value: googleMapLink, setter: setGoogleMapLink },
                { label: "CO2 Emission", value: co2Emission, setter: setCo2Emission },
                { label: "State", value: state, setter: setState },
                { label: "City", value: city, setter: setCity },
              ].map(({ label, value, setter }, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <TextField
                      label={label}
                      variant="filled"
                      fullWidth
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                    />
                  </motion.div>
                </Grid>
              ))}

              {/* Industry Type Dropdown */}
              <Grid item xs={12} md={4}>
                <FormControl fullWidth variant="filled">
                  <InputLabel>Industry Type</InputLabel>
                  <Select value={industryType} onChange={(e) => setIndustryType(e.target.value)}>
                    <MenuItem value="Renewable">Renewable</MenuItem>
                    <MenuItem value="Non-Renewable">Non-Renewable</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Upload Button */}
              <Grid item xs={12} md={4}>
                <Button variant="contained" component="label" fullWidth>
                  Upload Image
                  <input onChange={handleImage} hidden type="file" accept="image/*" />
                </Button>
                {companyImage.fileName && (
                  <motion.img
                    src={companyImage.fileName}
                    alt="Selected Company"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ width: "150px", height: "150px", borderRadius: "8px", marginTop: "10px" }}
                  />
                )}
              </Grid>
            </Grid>

            {/* Buttons with Animation */}
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </motion.div>
              </Grid>
              <Grid item>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button type="button" variant="contained" color="secondary" onClick={handleReset}>
                    Reset
                  </Button>
                </motion.div>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </motion.div>
  );
}
