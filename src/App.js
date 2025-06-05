import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import HomePage from "./components/userinterface/homepage/HomePage"; 
import Largescalecalculator from "./components/userinterface/homepage/Largescalecalculator";
import About from './components/userinterface/homepage/About';
import Header from './components/userinterface/homepage/Header';
import CompanyCard from "./components/admin/Companycard";
import Industryform from "./components/userinterface/homepage/Form";
import CompanyTable from "./components/admin/ManageCompanies";
import Usercalculator from "./components/userinterface/homepage/Usercalci";
import Aftercompanycard from "./components/userinterface/homepage/Comapanycardafter";
import Register from "./components/userinterface/homepage/Largecompany/Register";
import Login from "./components/userinterface/login/logincard";
import Createacc from "./components/userinterface/login/createacc";
import Try from "./components/userinterface/homepage/Largecompany/try";
import AdminLogin from "./components/admin/adminlogin";
import AdminDashboard from "./components/admin/admindashboard";
import MainBanner from "./components/admin/mainbanner";
import Editprofile from "./components/userinterface/login/editprofile";
import MonthlyData from "./components/admin/monthlydata";
import Industrydata from "./components/admin/industriesdata";
import Industrygraph from "./components/admin/industrygraph";
import Alldata from "./components/admin/allindustrydata";
import Rejected from "./components/admin/rejectedcompany"


function App() {
  return (
    <Router>
     
      <div>
        <Routes>
          
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Aftercompanycard" element={<Aftercompanycard />} />
          <Route path="/largescalecalculator" element={<Largescalecalculator />} />
          <Route path="/about" element={<About />} />
          <Route path="/industryform" element={<Industryform />} />
          <Route path="/login" element={<Login />} />
          <Route path="/usercalculator" element={<Usercalculator />} />
          <Route path="/create" element={<Createacc />} />
          <Route path="/companies" element={<Try />} />
          <Route path="/edit_profile" element={<Editprofile />} />

          {/* Admin Routes - Updated paths to "/admin/" */}
          <Route path="/companycard/:companyId" element={<CompanyCard />} />
          <Route path="/admin/managecompanies" element={<CompanyTable />} />
          <Route path="/admin/adminlogin" element={<AdminLogin />} />
          <Route path = "/admin/mainbanner" element={<MainBanner />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/monthlydata/:companyId" element={<MonthlyData />} />
          <Route path="/admin/industriesdata" element={<Industrydata />} />
          <Route path="/admin/industrygraph/:companyId" element={<Industrygraph />} />
          <Route path ="/admin/alldata" element={<Alldata />} />
          <Route path="/admin/rejected" element={<Rejected />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
