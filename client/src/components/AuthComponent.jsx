import React, { useState } from "react";

function AuthComponent() {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const role = document.getElementById("role").value;

    if (authenticateUser(email, password)) {
      alert("Login successful! Redirecting to the main page...");

      // Redirect to the home page
      window.location.href = "/";
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  const handleRegistration = (event) => {
    event.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    if (registerUser(username, email, password)) {
      alert("Account registered successfully. You can now log in.");
      setIsLoginForm(true);
    } else {
      alert("Registration failed. Please try again.");
    }
  };

  async function authenticateUser(email, password) {
    try {
      // Make an API request to your server to authenticate the user
      const response = await fetch("/api/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Authentication successful
        return true;
      } else {
        // Authentication failed
        return false;
      }
    } catch (error) {
      console.error("Authentication error:", error);
      return false;
    }
  }

  async function registerUser(username, email, password) {
    try {
      // Make an API request to your server to register the user
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        // Registration successful
        return true;
      } else {
        // Registration failed
        return false;
      }
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  }

  return (
    <div className=" max-w-screen bg-gray-300 flex justify-center items-center md:p-4 rounded-md">
      <div className="bg-gray-700 sm:w-2/3 md:w-2/3 lg:w-2/5 xl:w-1/3 p-4 rounded-lg">
        <h1 className="text-2xl font-semibold text-blue-600 flex justify-center align-center">
          {isLoginForm ? "Login" : "Sign Up"}
        </h1>
        {isLoginForm ? (
          <form className="text-left" onSubmit={handleSubmit}>
            {/* Input fields and labels for login */}
            {/* You can use JSX to avoid selecting elements by ID */}
            <div className="input-container">
              <label htmlFor="email" className="text-white">
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="Email"
                required
                className="w-full p-2 border rounded border-blue-200 mb-2"
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
                className="w-full p-2 border rounded border-blue-200 mb-2"
              />
            </div>
            <div className="input-container">
              <label htmlFor="role" className="text-white">
                Role
              </label>
              <select
                id="role"
                required
                className="w-full p-2 border rounded border-blue-200 mb-2"
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              className="bg-blue-600 text-white rounded-md py-2 px-4 text-lg font-semibold mt-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="submit"
            >
              Login
            </button>
          </form>
        ) : (
          <form className="text-left" onSubmit={handleRegistration}>
            {/* Input fields and labels for registration */}
            <div className="input-container">
              <label htmlFor="firstName" className="text-white">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                required
                className="w-full p-2 border rounded border-blue-200 mb-2"
              />
            </div>
            <div className="input-container">
              <label htmlFor="lastName" className="text-white">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                required
                className="w-full p-2 border rounded border-blue-200 mb-2"
              />
            </div>
            <div className="input-container">
              <label htmlFor="username" className="text-white">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                required
                className="w-full p-2 border rounded border-blue-200 mb-2"
              />
            </div>
            <div className="input-container">
              <label htmlFor="signup-email" className="text-white">
                Email
              </label>
              <input
                type="text"
                id="signup-email"
                placeholder="Email"
                required
                className="w-full p-2 border rounded border-blue-200 mb-2"
              />
            </div>
            <div className="input-container">
              <label htmlFor="role" className="text-white">
                Role
              </label>
              <select
                id="role"
                required
                className="w-full p-2 border rounded border-blue-200 mb-2"
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="input-container">
              <label htmlFor="signup-password" className="text-white">
                Password
              </label>
              <input
                type="password"
                id="signup-password"
                placeholder="Password"
                required
                className="w-full p-2 border rounded border-blue-200 mb-2"
              />
            </div>
            <button
              className="bg-blue-600 text-white rounded-md py-2 px-4 text-lg font-semibold mt-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        )}
        <p>
          {isLoginForm
            ? "Don't have an account? "
            : "Already have an account? "}
          <span className="text-blue-600 cursor-pointer" onClick={toggleForm}>
            Sign {isLoginForm ? "up" : "in"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthComponent;

// import React, { useState } from 'react';

// function AuthComponent() {
//   const [isLoginForm, setIsLoginForm] = useState(true);

//   const toggleForm = () => {
//     setIsLoginForm(!isLoginForm);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     // Simulated authentication - replace with your actual authentication logic
//     if (authenticateUser(email, password)) {
//       alert("Login successful! Redirecting to the main page...");
//       // You can redirect the user to the main page using React Router or other routing methods
//     } else {
//       alert("Invalid email/username or password. Please try again.");
//     }
//   };

//   const handleRegistration = (event) => {
//     event.preventDefault();
//     const firstName = document.getElementById("First Name").value;
//     const username = document.getElementById("username").value;
//     const email = document.getElementById("signup-email").value;
//     const password = document.getElementById("signup-password").value;

//     // Simulated user registration - replace with your actual registration logic
//     if (registerUser(username, email, password)) {
//       alert("Account registered successfully. You can now log in.");
//       setIsLoginForm(true); // Automatically switch to the login form
//     } else {
//       alert("Registration failed. Please try again.");
//     }
//   };

//   // Simulated user authentication function (replace with actual logic)
//   function authenticateUser(email, password) {
//     // Replace with your actual authentication logic, e.g., make an AJAX request to a server
//     // Return true if authentication is successful, false otherwise
//     return email === "user@example.com" && password === "password";
//   }

//   // Simulated user registration function (replace with actual logic)
//   function registerUser(username, email, password) {
//     // Replace with your actual registration logic, e.g., make an AJAX request to a server
//     // Return true if registration is successful, false otherwise
//     return true; // Simulated success
//   }

//   return (
//     <div className="bg-blue-100 min-h-screen flex justify-center items-center">
//       <div className="bg-white rounded-lg shadow-md p-8 w-96 text-center">
//         <span className="text-4xl font-bold text-blue-600"></span>
//         <h1 className="text-2xl font-semibold text-blue-600">{isLoginForm ? 'Login' : 'Sign Up'}</h1>
//         {isLoginForm ? (
//           <form className="text-left" onSubmit={handleSubmit}>
//           <input type="text" id="email" placeholder="Email" required />
//           <input type="password" id="password" placeholder="Password" required />

//             <button className="bg-blue-600 text-white rounded-md py-2 px-4 text-lg font-semibold mt-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600" type="submit">Login</button>
//           </form>
//         ) : (
//           <form className="text-left" onSubmit={handleRegistration}>
//           <input type="text" id="firstName" placeholder="First Name" required />
//           <input type="text" id="lastName" placeholder="Last Name" required />
//           <input type="text" id="username" placeholder="Username" required />
//           <input type="text" id="signup-email" placeholder="Email" required />
//           <input type="password" id="signup-password" placeholder="Password" required />
//           <button className="bg-blue-600 text-white rounded-md py-2 px-4 text-lg font-semibold mt-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600" type="submit">Sign Up</button>
//           </form>
//         )}
//         <p>
//           {isLoginForm ? 'Don’t have an account? ' : 'Already have an account? '}
//           <span className="text-blue-600 cursor-pointer" onClick={toggleForm}>Sign {isLoginForm ? 'up' : 'in'}</span>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default AuthComponent;
