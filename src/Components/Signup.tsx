import React, { useState } from "react";
import "../Css/Signup.css";
import { FaArrowRight, FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";

const Signup: React.FC = () => {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState("");
  const [orgType, setOrgType] = useState("");
  const [projectType, setProjectType] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        setStep(5); 
      } else if (response.status === 409) {
        alert("This email is already registered.");
      } else {
        const errorText = await response.text();
        alert("Error while registering: " + errorText);
      }
    } catch (error) {
      console.error("Error while registering:", error);
      alert("Network error. Please try again later...");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">

        {/* Step 1 - Select type of activity */}
        {step === 1 && (
          <>
            <h2>Start your fundraising journey</h2>
            <h3>What would you like to do?</h3>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Please select</option>
              {["Find an sponser for my idea", "Support ideas", "Both"].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button onClick={handleNext} disabled={!category}>
              Next <FaArrowRight />
            </button>
          </>
        )}

        {/* Step 2 - Organization type */}
        {step === 2 && (
          <>
            <h2>Get started</h2>
            <h3>I'm a ...</h3>
            <div className="radio-group">
              {[
                { value: "non-profit", label: "  Not for profit organisation" },
                { value: "for-profit", label: "For-Profit organization" }
              ].map((org) => (
                <label key={org.value} className={orgType === org.value ? "selected" : ""}>
                  <input type="radio" name="orgType" value={org.value} onChange={() => setOrgType(org.value)} />
                  {org.label}
                </label>
              ))}
            </div>
            <div className="buttonsStrani">
              <button onClick={handleBack}><FaArrowLeft /> Back</button>
              <button onClick={handleNext} disabled={!orgType}>
                Next <FaArrowRight />
              </button>
            </div>
          </>
        )}

        {/* Step 3 - Project Category*/}
        {step === 3 && (
          <>
            <h2>My project is best described as...</h2>
            <select value={projectType} onChange={(e) => setProjectType(e.target.value)}>
              <option value="">Please select</option>
              {["Creative", "Technology", "Education", "Environment", "Health"].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <div className="buttonsStrani">
              <button onClick={handleBack}><FaArrowLeft /> Back</button>
              <button onClick={handleNext} disabled={!projectType}>
                Next <FaArrowRight />
              </button>
            </div>
          </>
        )}

        {/* Step 4 - Registration form */}
        {step === 4 && (
          <>
            <h2>Create an account to continue</h2>
            <input
              type="text"
              name="fullName"
              placeholder="Full name"
              onChange={handleChange}
              value={formData.fullName}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
            />
            <div className="password-box">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <label>
              <input type="checkbox" required /> I accept the Terms and Conditions
            </label>
            <div className="buttonsStrani">
              <button onClick={handleBack}><FaArrowLeft /> Back</button>
              <button
                onClick={handleRegister}
                disabled={!formData.email || !formData.password}
              >
                Sign up
              </button>
            </div>
          </>
        )}

        {/* Step 5 - Success */}
        {step === 5 && (
          <>
            <h2>Signup Successful!</h2>
            <p>You have successfully created an account.</p>
            <button onClick={() => window.location.href = "/login"}>Login</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
