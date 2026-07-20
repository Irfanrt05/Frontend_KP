import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Lock, Eye, EyeOff } from "lucide-react";
import api from "../services/api";
import Toast from "../components/Toast";
import { useToast } from "../components/useToast";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  const handleResetPassword = async () => {
    if (!token) return showToast("Token tidak ditemukan.", "error");
    if (!password || !confirmPassword) return showToast("Semua field wajib diisi.", "error");
    if (password.length < 8) return showToast("Password minimal 8 karakter.", "error");
    if (password !== confirmPassword) return showToast("Konfirmasi password tidak sama.", "error");
    try {
      setLoading(true);
      const res = await api.post("/auth/reset-password", { token, password });
      showToast(res.data.message || "Password berhasil diubah! 🎉", "success");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      showToast(error.response?.data?.message || "Gagal mengubah password.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .rp-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          background: #CFE9DE;
          font-family: 'Inter', system-ui, sans-serif;
          box-sizing: border-box;
        }
        .rp-card {
          width: 100%;
          max-width: 960px;
          background: #fff;
          border-radius: 32px;
          padding: 64px 72px;
          box-shadow: 0 20px 60px rgba(0,0,0,.08);
          box-sizing: border-box;
        }
        .rp-logo { display: flex; align-items: center; gap: 12px; margin-bottom: 32px; }
        .rp-logo img { width: 48px; height: 48px; object-fit: contain; }
        .rp-logo h1 { font-size: 44px; font-weight: 800; margin: 0; color: #0f172a; }
        .rp-title { font-size: 36px; font-weight: 700; margin: 0 0 12px; color: #0f172a; }
        .rp-subtitle { font-size: 16px; color: #6B7280; margin: 0 0 40px; line-height: 1.6; }
        .rp-fields { display: flex; flex-direction: column; gap: 24px; }
        .rp-label { font-size: 16px; font-weight: 600; display: block; margin-bottom: 8px; color: #1f2937; }
        .rp-field-wrap { position: relative; }
        .rp-input {
          width: 100%;
          height: 56px;
          border: 2px solid #D1D5DB;
          border-radius: 14px;
          padding: 0 48px;
          font-size: 15px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .rp-input:focus { border-color: #10B981; }
        .rp-input.error { border-color: #EF4444; }
        .rp-icon {
          position: absolute; left: 14px; top: 50%;
          transform: translateY(-50%);
          color: #9CA3AF; width: 18px; height: 18px; pointer-events: none;
        }
        .rp-eye {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: #6B7280; padding: 0; display: flex; align-items: center;
        }
        .rp-error-text { font-size: 12px; color: #EF4444; margin-top: 4px; }
        .rp-actions { display: flex; gap: 16px; margin-top: 48px; }
        .rp-btn-back {
          flex: 1; height: 56px; border-radius: 14px;
          border: 2px solid #10B981; color: #10B981;
          background: #fff; font-size: 16px; font-weight: 600;
          cursor: pointer; font-family: inherit;
        }
        .rp-btn-submit {
          flex: 1; height: 56px; border-radius: 14px;
          border: none; background: #10B981; color: #fff;
          font-size: 16px; font-weight: 600;
          cursor: pointer; font-family: inherit;
          transition: opacity 0.2s;
        }
        .rp-btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }

        /* Tablet mini 481–768px */
        @media (max-width: 768px) {
          .rp-card { padding: 40px 32px; border-radius: 24px; }
          .rp-logo img { width: 36px; height: 36px; }
          .rp-logo h1 { font-size: 30px; }
          .rp-title { font-size: 24px; }
          .rp-subtitle { font-size: 14px; margin-bottom: 28px; }
          .rp-label { font-size: 14px; }
          .rp-input { height: 50px; font-size: 14px; }
          .rp-btn-back, .rp-btn-submit { height: 50px; font-size: 15px; }
          .rp-actions { margin-top: 32px; }
        }

        /* HP Android & iPhone 481px ke bawah */
        @media (max-width: 480px) {
          .rp-page { align-items: flex-start; padding-top: 24px; }
          .rp-card { padding: 24px 20px; border-radius: 20px; }
          .rp-logo { margin-bottom: 20px; }
          .rp-logo img { width: 30px; height: 30px; }
          .rp-logo h1 { font-size: 24px; }
          .rp-title { font-size: 20px; }
          .rp-subtitle { font-size: 13px; margin-bottom: 20px; }
          .rp-label { font-size: 13px; }
          .rp-input { height: 46px; font-size: 14px; border-radius: 12px; }
          .rp-fields { gap: 16px; }
          .rp-actions { flex-direction: column; margin-top: 24px; gap: 10px; }
          .rp-btn-back, .rp-btn-submit { height: 46px; font-size: 14px; border-radius: 12px; }
        }

        /* iPhone SE / Android kecil 360px ke bawah */
        @media (max-width: 360px) {
          .rp-card { padding: 20px 16px; }
          .rp-title { font-size: 18px; }
          .rp-input { height: 44px; }
          .rp-btn-back, .rp-btn-submit { height: 44px; }
        }
      `}</style>

      <div className="rp-page">
        <Toast toast={toast} onClose={hideToast} />

        <div className="rp-card">
          <div className="rp-logo">
            <img src="/logo.png" alt="logo" />
            <h1>Probit</h1>
          </div>

          <h2 className="rp-title">Reset Password</h2>
          <p className="rp-subtitle">
            Masukkan password baru Anda kemudian konfirmasi password tersebut.
          </p>

          <div className="rp-fields">
            <div>
              <label className="rp-label">New Password</label>
              <div className="rp-field-wrap">
                <Lock className="rp-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rp-input"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="rp-eye">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="rp-label">Confirm Password</label>
              <div className="rp-field-wrap">
                <Lock className="rp-icon" />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`rp-input${confirmPassword && password !== confirmPassword ? " error" : ""}`}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="rp-eye">
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="rp-error-text">Password tidak cocok</p>
              )}
            </div>
          </div>

          <div className="rp-actions">
            <Link to="/login" style={{ flex: 1 }}>
              <button className="rp-btn-back" style={{ width: "100%" }}>Back</button>
            </Link>
            <button className="rp-btn-submit" disabled={loading} onClick={handleResetPassword}>
              {loading ? "Loading..." : "Reset Password"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
