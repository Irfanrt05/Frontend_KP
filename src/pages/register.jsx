import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import api from "../services/api";


export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const googleRegister = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    console.log("Google Register Success");
    console.log(tokenResponse);

    localStorage.setItem(
      "googleAccessToken",
      tokenResponse.access_token
    );

    alert("Login Google berhasil");

    navigate("/dashboard");
  },

  onError: () => {
    console.log("Google Register Failed");
    alert("Login Google gagal");
  },
});
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};

const handleRegister = async () => {
  if (form.password !== form.confirmPassword) {
    alert("Password dan confirm password tidak sama");
    return;
  }

  try {
    await api.post("/auth/register", {
      username: form.username,
      email: form.email,
      password: form.password,
    });

    alert("Register berhasil");
    navigate("/login");
  } catch (error) {
    alert(error.response?.data?.message || "Register gagal");
  }
};

  return (
    <div
  className="w-full min-h-screen flex"
>
      {/* WRAPPER UTAMA */}
      <div
        className="flex overflow-hidden w-full"
        style={{
          Width: "100px",
          Height: "100vh",
          borderRadius: "0px",
          background: "#f5f5f5",
        }}
      >
        {/* Area Form & Logo */}
        <div
          className="flex flex-col"
          style={{
            width: "46%",
            padding: "50px 119px",
            background: "#f8fafc",
            borderRight: "1px solid rgba(148, 163, 184, 0.1)",
          }}
        >
          {/* Logo PROBIT */}
          <div
            className="flex items-center"
            style={{
              gap: "10px",
              marginLeft: "-50px",
            }}
          >
            <img
              src="/logo.png"
              alt="Probit Logo"
              style={{
                width: "55px",
                height: "55px",
                objectFit: "contain",
                borderRadius: "6px",
              }}
            />
            <span
              style={{
                fontWeight: 800,
                fontSize: "50px",
                color: "#0f172a",
                letterSpacing: "-0.8px",
              }}
            >
              Probit
            </span>
          </div>

          {/* CARD FORM */}
          <div
            className="w-full"
            style={{
              maxWidth: "520px",
              marginTop: "60px",
              marginLeft: "80px",
            }}
          >
            {/* Header */}
            <h2
              style={{
                fontWeight: 700,
                fontSize: "32px",
                color: "#0f172a",
                lineHeight: 1.2,
                marginBottom: "4px",
                letterSpacing: "-0.5px",
                textTransform: "capitalize",
              }}
            >
              Create an account
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#475569",
                fontWeight: 500,
                marginBottom: "14px",
                lineHeight: 1.4,
              }}
            >
              Start your journey to optimal equilibrium today.
            </p>

            {/* Social Buttons */}
            <div className="flex" style={{ gap: "10px", marginBottom: "12px" }}>
              <button
                onClick={() => googleRegister()}
                className="flex-1 flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.75)",
                  border: "1px solid rgba(148,163,184,0.4)",
                  borderRadius: "14px",
                  padding: "14px",
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#374151",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.215 36 24 36c-6.627 0-12-5.373-12-12S17.373 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.277 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.277 4 24 4c-7.682 0-14.318 4.337-17.694 10.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24 44c5.177 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.143 35.091 26.715 36 24 36c-5.194 0-9.624-3.329-11.287-7.946l-6.522 5.025C9.529 39.556 16.227 44 24 44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.084 5.57l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                  />
                </svg>

                <span>Google</span>
              </button>
              <button
            className="flex-1 flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.75)",
              border: "1px solid rgba(148,163,184,0.4)",
              borderRadius: "14px",
              padding: "14px",
              fontSize: "16px",
              fontWeight: 600,
              color: "#374151",
              gap: "8px",
              cursor: "pointer",
            }}
          >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.45.06 2.44.75 3.28.78 1.25-.26 2.44-1 3.77-.87 1.61.12 2.82.78 3.62 1.96-3.31 2.02-2.56 6.16.48 7.25-.53 1.41-1.25 2.8-3.15 3.76zM12.03 7.25C11.84 5.02 13.59 3.18 15.62 3c.28 2.56-2.3 4.42-3.59 4.25z" />
                </svg>
                Apple
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "12px",
              }}
            >
    
            </div>

            {/* Divider */}
            <div
              className="flex items-center"
              style={{ gap: "10px", marginBottom: "12px" }}
            >
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "rgba(148,163,184,0.4)",
                }}
              />
              <span
                style={{
                  fontSize: "14px",
                  color: "#64748b",
                  whiteSpace: "nowrap",
                  padding: "0 2px",
                  fontWeight: 500,
                }}
              >
                Or register with email
              </span>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "rgba(148,163,184,0.4)",
                }}
              />
            </div>

            {/* Username */}
            <div style={{ marginBottom: "10px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#334155",
                  marginBottom: "4px",
                  paddingLeft: "2px",
                }}
              >
                Username
              </label>

              <div className="relative flex items-center">
                <User
                  className="absolute"
                  style={{
                    left: "12px",
                    width: "16px",
                    height: "16px",
                    color: "#64748b",
                  }}
                />

                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter your username"
                  style={{
                    width: "100%",
                    paddingLeft: "36px",
                    paddingRight: "16px",
                    paddingTop: "14px",
                    paddingBottom: "14px",
                    background: "rgba(255,255,255,0.9)",
                    border: "1px solid #cbd5e1",
                    borderRadius: "14px",
                    fontSize: "15px",
                    color: "#111827",
                    outline: "none",
                    fontFamily: "inherit",
                    transition: "all 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#22c55e")}
                  onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: "10px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#334155",
                  marginBottom: "4px",
                  paddingLeft: "2px",
                }}
              >
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail
                  className="absolute"
                  style={{
                    left: "12px",
                    width: "16px",
                    height: "16px",
                    color: "#64748b",
                  }}
                />
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="name@example.com"
                  style={{
                    width: "100%",
                    paddingLeft: "36px",
                    paddingRight: "16px",
                    paddingTop: "14px",
                    paddingBottom: "14px",
                    background: "rgba(255,255,255,0.9)",
                    border: "1px solid #cbd5e1",
                    borderRadius: "14px",
                    fontSize: "15px",
                    color: "#111827",
                    outline: "none",
                    fontFamily: "inherit",
                    transition: "all 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#22c55e")}
                  onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: "10px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#334155",
                  marginBottom: "4px",
                  paddingLeft: "2px",
                }}
              >
                Password
              </label>
              <div className="relative flex items-center">
                <Lock
                  className="absolute"
                  style={{
                    left: "12px",
                    width: "16px",
                    height: "16px",
                    color: "#64748b",
                  }}
                />
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  style={{
                    width: "100%",
                    paddingLeft: "36px",
                    paddingRight: "40px",
                    paddingTop: "14px",
                    paddingBottom: "14px",
                    background: "rgba(255,255,255,0.9)",
                    border: "1px solid #cbd5e1",
                    borderRadius: "14px",
                    fontSize: "15px",
                    color: "#111827",
                    outline: "none",
                    fontFamily: "inherit",
                    transition: "all 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#22c55e")}
                  onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute flex items-center"
                  style={{
                    right: "12px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#64748b",
                    padding: 0,
                  }}
                >
                  {showPassword ? (
                    <EyeOff style={{ width: "16px", height: "16px" }} />
                  ) : (
                    <Eye style={{ width: "16px", height: "16px" }} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: "12px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#334155",
                  marginBottom: "4px",
                  paddingLeft: "2px",
                }}
              >
                Confirm Password
              </label>
              <div className="relative flex items-center">
                <Lock
                  className="absolute"
                  style={{
                    left: "12px",
                    width: "16px",
                    height: "16px",
                    color: "#64748b",
                  }}
                />
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    paddingLeft: "36px",
                    paddingRight: "40px",
                    paddingTop: "14px",
                    paddingBottom: "14px",
                    background: "rgba(255,255,255,0.9)",
                    border: "1px solid #cbd5e1",
                    borderRadius: "14px",
                    fontSize: "15px",
                    color: "#111827",
                    outline: "none",
                    fontFamily: "inherit",
                    transition: "all 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#22c55e")}
                  onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute flex items-center"
                  style={{
                    right: "12px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#64748b",
                    padding: 0,
                  }}
                >
                  {showConfirmPassword ? (
                    <EyeOff style={{ width: "16px", height: "16px" }} />
                  ) : (
                    <Eye style={{ width: "16px", height: "16px" }} />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div
              className="flex items-start"
              style={{ gap: "8px", marginBottom: "14px" }}
            >
              <input
                type="checkbox"
                id="terms"
                style={{
                  marginTop: "2px",
                  width: "20px",
                  height: "20px",
                  accentColor: "#22c55e",
                  flexShrink: 0,
                }}
              />
              <label
                htmlFor="terms"
                style={{ fontSize: "15px", color: "#475569", lineHeight: 1.4 }}
              >
                I agree to the{" "}
                <Link
                  to="/terms"
                  style={{
                    color: "#16a34a",
                    fontWeight: 600,
                    textDecoration: "underline",
                  }}
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  style={{
                    color: "#16a34a",
                    fontWeight: 600,
                    textDecoration: "underline",
                  }}
                >
                  Privacy
                </Link>
                .
              </label>
            </div>

            {/* Register Button */}
            <button
              onClick={handleRegister}
              style={{
                width: "100%",
                background: "linear-gradient(135deg,#22c55e,#16a34a)",
                color: "#fff",
                fontWeight: 700,
                borderRadius: "14px",
                padding: "16px",
                fontSize: "18px",
                border: "none",
                cursor: "pointer",
                marginBottom: "12px",
                letterSpacing: "0.4px",
                fontFamily: "inherit",
                boxShadow: "0 6px 12px rgba(22,163,74,0.25)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  "linear-gradient(135deg,#16a34a,#15803d)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  "linear-gradient(135deg,#22c55e,#16a34a)")
              }
            >
              Create Account
            </button>

            {/* Footer */}
            <p
              style={{
                textAlign: "center",
                fontSize: "15px",
                color: "#475569",
                fontWeight: 500,
                margin: 0,
              }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#16a34a",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative overflow-hidden" style={{ width: "54%" }}>
          <img
            src="/ui_login.png"
            alt="Healthy lifestyle"
            className="w-full h-full"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(15,23,42,0.05) 0%, rgba(15,23,42,0.2) 100%)",
            }}
          />

          {/* Quote Card */}
          <div
            style={{
              position: "absolute",
              top: "28px",
              right: "28px",
              background: "rgba(44, 146, 42, 0.4)",
              borderRadius: "20px",
              padding: "20px",
              width: "260px",
              color: "#f9fafb",
              boxShadow: "0 10px 30px rgba(15,23,42,0.3)",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                fontStyle: "italic",
                lineHeight: 1.6,
                fontWeight: 500,
                margin: 0,
              }}
            >
              "Motivasi adalah apa yang membuat Anda memulai. Kebiasaan adalah
              apa yang membuat Anda terus maju."
            </p>
            <span
              style={{
                display: "block",
                fontSize: "11px",
                fontWeight: 700,
                marginTop: "10px",
                textAlign: "right",
                color: "#f9fafb",
              }}
            >
              — Jim Rohn
            </span>
          </div>

          {/* Badge */}
          <div
            style={{
              position: "absolute",
              bottom: "28px",
              left: "28px",
              background: "rgba(15,23,42,0.3)",
              backdropFilter: "blur(12px)",
              borderRadius: "16px",
              padding: "12px 18px",
              color: "#e5e7eb",
              border: "1px solid rgba(148,163,184,0.5)",
            }}
          >
            <p style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>
              🥗 Track your nutrition
            </p>
            <p
              style={{
                fontSize: "16px",
                margin: 0,
                opacity: 0.9,
                marginTop: "3px",
              }}
            >
              Stay balanced every day
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
