import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Lock, Eye, EyeOff } from "lucide-react";
import api from "../services/api";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!token) {
      alert("Token tidak ditemukan.");
      return;
    }
    if (!password || !confirmPassword) {
      alert("Semua field wajib diisi.");
      return;
    }
    if (password.length < 8) {
      alert("Password minimal 8 karakter.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Konfirmasi password tidak sama.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/reset-password", { token, password });
      alert(res.data.message || "Password berhasil diubah.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Gagal mengubah password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "#CFE9DE" }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1034px",
          background: "#fff",
          borderRadius: "40px",
          padding: "80px",
          boxShadow: "0 20px 60px rgba(0,0,0,.08)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-16">
          <img src="/logo.png" alt="logo" className="w-14 h-14" />
          <h1 style={{ fontSize: "56px", fontWeight: "800" }}>Probit</h1>
        </div>

        {/* Title */}
        <h2
          style={{ fontSize: "40px", fontWeight: "700", marginBottom: "20px" }}
        >
          Reset Password
        </h2>
        <p
          style={{
            fontSize: "18px",
            color: "#6B7280",
            marginBottom: "50px",
            lineHeight: "30px",
          }}
        >
          Masukkan password baru Anda kemudian konfirmasi password tersebut.
        </p>

        {/* Password Inputs */}
        <div className="space-y-8">
          <div>
            <label
              style={{
                fontSize: "22px",
                fontWeight: "600",
                display: "block",
                marginBottom: "12px",
              }}
            >
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  height: "78px",
                  border: "2px solid #D1D5DB",
                  borderRadius: "20px",
                  padding: "0 70px",
                  fontSize: "20px",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>

          <div>
            <label
              style={{
                fontSize: "22px",
                fontWeight: "600",
                display: "block",
                marginBottom: "12px",
              }}
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: "100%",
                  height: "78px",
                  border: "2px solid #D1D5DB",
                  borderRadius: "20px",
                  padding: "0 70px",
                  fontSize: "20px",
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-6 top-1/2 -translate-y-1/2"
              >
                {showConfirm ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-6 mt-16">
          <Link to="/login" style={{ flex: 1 }}>
            <button
              style={{
                width: "100%",
                height: "70px",
                borderRadius: "18px",
                border: "2px solid #10B981",
                color: "#10B981",
                background: "#fff",
                fontSize: "20px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Back
            </button>
          </Link>

          <button
            disabled={loading}
            onClick={handleResetPassword}
            style={{
              flex: 1,
              height: "70px",
              borderRadius: "18px",
              border: "none",
              background: "#10B981",
              color: "#fff",
              fontSize: "20px",
              fontWeight: "600",
              cursor: "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Loading..." : "Reset Password"}
          </button>
        </div>
      </div>
    </div>
  );
}
