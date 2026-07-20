import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import api from "../services/api";
import Toast from "../components/Toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState(null);

  const handleSendEmail = async () => {
    if (!email) {
      setToast({ message: "Masukkan email terlebih dahulu", type: "error" });
      return;
    }

    try {
      const res = await api.post("/auth/forgot-password", { email });
      setToast({
        message: res.data.message || "Email reset password berhasil dikirim",
        type: "success",
      });
    } catch (error) {
      console.error(error);
      setToast({
        message: error.response?.data?.message || "Gagal mengirim email",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#CFE9DE] p-4">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Responsive Card */}
      <div
        className="w-full bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
        style={{
          maxWidth: "1034px",
          borderRadius: "clamp(16px, 3vw, 40px)",
          padding: "clamp(24px, 6vw, 80px)",
          boxSizing: "border-box",
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center"
          style={{
            gap: "clamp(8px, 2vw, 12px)",
            marginBottom: "clamp(28px, 6vw, 64px)",
          }}
        >
          <img
            src="/logo.png"
            alt="logo"
            style={{
              width: "clamp(32px, 7vw, 56px)",
              height: "clamp(32px, 7vw, 56px)",
              objectFit: "contain",
            }}
          />
          <h1
            style={{
              fontSize: "clamp(22px, 5vw, 56px)",
              fontWeight: "800",
              color: "#000",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Probit
          </h1>
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: "clamp(18px, 4.5vw, 40px)",
            fontWeight: "700",
            color: "#111827",
            margin: "0 0 clamp(10px, 2vw, 20px) 0",
          }}
        >
          Forgot Password?
        </h2>

        {/* Description */}
        <p
          style={{
            fontSize: "clamp(13px, 2.8vw, 18px)",
            color: "#6B7280",
            maxWidth: "700px",
            lineHeight: "1.75",
            marginBottom: "clamp(24px, 5vw, 60px)",
          }}
        >
          Enter your registered email address and we will send you instructions
          to reset your password.
        </p>

        {/* Label */}
        <label
          style={{
            display: "block",
            fontSize: "clamp(14px, 2.8vw, 22px)",
            fontWeight: "600",
            marginBottom: "clamp(8px, 1.8vw, 18px)",
            color: "#111827",
          }}
        >
          Email Address
        </label>

        {/* Input */}
        <div
          style={{
            position: "relative",
            marginBottom: "clamp(16px, 3vw, 40px)",
          }}
        >
          <Mail
            size={20}
            style={{
              position: "absolute",
              left: "clamp(12px, 3vw, 24px)",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9CA3AF",
              flexShrink: 0,
            }}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            style={{
              width: "100%",
              height: "clamp(48px, 8vw, 78px)",
              border: "2px solid #D1D5DB",
              borderRadius: "clamp(10px, 2vw, 20px)",
              paddingLeft: "clamp(40px, 7vw, 70px)",
              paddingRight: "16px",
              fontSize: "clamp(13px, 2.5vw, 20px)",
              outline: "none",
              boxSizing: "border-box",
              background: "white",
            }}
          />
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "clamp(8px, 2vw, 16px)",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "clamp(16px, 4vw, 64px)",
          }}
        >
          {/* Back to Login */}
          <Link
            to="/login"
            style={{ flex: "1 1 120px", maxWidth: "220px" }}
          >
            <button
              style={{
                width: "100%",
                height: "clamp(44px, 7vw, 70px)",
                borderRadius: "clamp(10px, 2vw, 18px)",
                border: "2px solid #10B981",
                color: "#10B981",
                background: "white",
                fontSize: "clamp(13px, 2.5vw, 20px)",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Back to Login
            </button>
          </Link>

          {/* Send Email */}
          <button
            onClick={handleSendEmail}
            style={{
              flex: "1 1 120px",
              maxWidth: "220px",
              height: "clamp(44px, 7vw, 70px)",
              borderRadius: "clamp(10px, 2vw, 18px)",
              border: "none",
              background: "#10B981",
              color: "#fff",
              fontSize: "clamp(13px, 2.5vw, 20px)",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
}