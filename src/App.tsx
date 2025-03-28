import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import LoggedInNavbar from "./Components/LoggedInNavbar";
import Footer from "./Components/Footer";
import HomePage from "./Components/HomePage";
import AboutUs from "./Components/AboutUs";
import Contact from "./Components/Contact";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ProjectsList from "./Components/ProjectsList";
import Dashboard from "./Components/Dashboard";
import ProjectDetail from "./Components/ProjectDetail";
import MyProjects from "./Components/LoggedProjects";
import EditProfile from "./Components/EditProfile";
import AddPost from "./Components/AddPost";
import EditProject from "./Components/EditProject";
import PaymentPage from "./Components/Checkout/PaymentPage"; 
import AddProject from "./Components/AddProject";
import SuccessPage from "./Components/Checkout/SuccessPage";
import CancelPage from "./Components/Checkout/CancelPage";
import Notifiche from "./Components/Notifiche";
import MessaggiRicevuti from "./Components/MessaggiRicevuti";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // API
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      {isLoggedIn ? <LoggedInNavbar /> : <Navbar />}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/login" 
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login setIsLoggedIn={setIsLoggedIn} />} 
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/userProjects" element={isLoggedIn ? <MyProjects /> : <Navigate to="/login" />} />
          <Route path="/edit-profile" element={isLoggedIn ? <EditProfile /> : <Navigate to="/login" />} />
          <Route path="/aggiungipost/:progettoId" element={isLoggedIn ? <AddPost /> : <Navigate to="/login" />} />
          <Route path="/modificaprogetto/:id" element={isLoggedIn ? <EditProject /> : <Navigate to="/login" />} />
          <Route path="/aggiungiprogetto" element={isLoggedIn ? <AddProject /> : <Navigate to="/login" />} />
          <Route path="/payment/:id" element={isLoggedIn ? <PaymentPage /> : <Navigate to="/login" />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
          <Route path="/notifiche" element={<Notifiche />} />
          <Route path="/admin/messages" element={<MessaggiRicevuti />} />

        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
