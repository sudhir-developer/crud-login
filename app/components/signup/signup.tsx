"use client";

import React, { useState } from "react";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  contact?: string;
}

const Signup: React.FC = () => {
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    contact: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // success or error message

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const contentType = res.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error("Server returned non-JSON response: " + text);
      }

      if (!res.ok) throw new Error(data.message);

      setMessage("✅ Signup successful!");
      // Clear form
      setFormData({ name: "", email: "", password: "", contact: "" });

    } catch (error: any) {
      setMessage("❌ " + (error.message || "Signup failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h2>Sign Up</h2>

      {message && (
        <p style={{ marginBottom: "1rem", color: message.startsWith("✅") ? "green" : "red" }}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
        />

        <input
          type="text"
          name="contact"
          placeholder="Contact (optional)"
          value={formData.contact}
          onChange={handleChange}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.5rem",
            background: "blue",
            color: "white",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
