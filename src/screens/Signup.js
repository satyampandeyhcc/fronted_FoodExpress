import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Signup() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  const handleSubmit = async (e) => {

    e.preventDefault(); //preventDefault is aSynthetic Event.
   
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });
    const json = await response.json();


    if (!json.success) {
      
      alert("Enter valid credentials!!");
    } else {
      navigate("/login");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1547496502-affa22d38842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=677&q=80")',
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <div>
          <Navbar></Navbar>
        </div>
        <div className="container">
          <form
            className="w-50 m-auto mt-5 bg-secondary p-3 rounded"
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={credentials.name}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={credentials.email}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={credentials.password}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPasswords1"
                name="geolocation"
                value={credentials.geolocation}
                onChange={onChange}
              />
            </div>
            <button type="submit" className="m-3 btn btn-success">
              Submit
            </button>
            <Link to="/login" className="m-3 btn btn-danger">
              Already a User
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
