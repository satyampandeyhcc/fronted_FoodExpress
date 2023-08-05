import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent default is a Synthetic Event
    //console.log(JSON.stringify({ email: credentials.email, password: credentials.password }));
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    //console.log(json);

    if (json.success) {
      
  
      //  console.log("In login comp email is :", credentials.email);
      localStorage.setItem("authToken", json.authToken);//header is same but littlebeat is different so every time we login then differnt authtoken will be generated.
      //but we can verify from secretkey with auttoken which is generated slightly different. that means verification is correct because we do a correct signature or secretkey.
      localStorage.setItem("userEmail", credentials.email);
      //  console.log(localStorage.getItem("authToken"));//authorization token in console
      //The localStorage.setItem() method is used to store data in the browser's localStorage. It takes two parameters: the key and the value.
          //In this case, the key is set as "authToken", and the value is retrieved from the json object using json.authToken.
      navigate("/");//Navigate to homepage
    } // this success part is given in backend of createuser endpoint
    else {
      alert("Enter valid credentials!!");
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
          height: "100vh",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          filter: "brightness(90%)",
        }}
      >
        <div>
          <Navbar />
        </div>
        <div className="container">
          <form
            className="w-50 p-2 m-auto mt-5 bg-secondary rounded"
            onSubmit={handleSubmit}
          >
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
            <button type="submit" className="m-3 btn btn-success">
              Submit
            </button>
            <Link to="/createuser" className="m-3 btn btn-danger">
              I'm a new User
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
