import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import api from "../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const handleSendEmail = async () => {
  if (!email) {
    alert("Masukkan email terlebih dahulu");
    return;
  }

  try {
    const res = await api.post("/auth/forgot-password", {
      email,
    });

    alert(
      res.data.message ||
      "Email reset password berhasil dikirim"
    );
  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Gagal mengirim email"
    );
  }
};

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "#CFE9DE",
      }}
    >
      {/* Container 1440x1024 */}
      <div
        style={{
          width: "1440px",
          height: "1024px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Card 1034x738 */}
        <div
          style={{
            width: "1034px",
            height: "738px",
            background: "#FFFFFF",
            borderRadius: "40px",
            padding: "80px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <img
              src="/logo.png"
              alt="logo"
              className="w-14 h-14"
            />

            <h1
              style={{
                fontSize: "56px",
                fontWeight: "800",
                color: "#000",
              }}
            >
              Probit
            </h1>
          </div>

          {/* Title */}
          <h2
            style={{
              fontSize: "40px",
              fontWeight: "700",
              marginBottom: "20px",
              color: "#111827",
            }}
          >
            Forgot Password?
          </h2>

          {/* Description */}
          <p
            style={{
              fontSize: "18px",
              color: "#6B7280",
              maxWidth: "700px",
              lineHeight: "32px",
              marginBottom: "60px",
            }}
          >
            Enter your registered email address and we will send
            you instructions to reset your password.
          </p>

          {/* Label */}
          <label
            style={{
              display: "block",
              fontSize: "22px",
              fontWeight: "600",
              marginBottom: "18px",
              color: "#111827",
            }}
          >
            Email Address
          </label>

          {/* Input */}
          <div className="relative mb-10">
            <Mail
              size={24}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
              style={{
                width: "100%",
                height: "78px",
                border: "2px solid #D1D5DB",
                borderRadius: "20px",
                paddingLeft: "70px",
                fontSize: "20px",
                outline: "none",
              }}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-16">
            {/* Back */}
            <Link to="/login">
              <button
                style={{
                  width: "220px",
                  height: "70px",
                  borderRadius: "18px",
                  border: "2px solid #10B981",
                  color: "#10B981",
                  background: "white",
                  fontSize: "20px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Back to Login
              </button>
            </Link>

            {/* Send */}
            <button
              onClick={handleSendEmail}
              style={{
                width: "220px",
                height: "70px",
                borderRadius: "18px",
                border: "none",
                background: "#10B981",
                color: "#fff",
                fontSize: "20px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}