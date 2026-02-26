import "../styles/loadingDialog.css";

export default function LoadingDialog({ show }) {
  if (!show) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-card">
        <div className="spinner"></div>
        <h2>Just a Moment...</h2>
        <p>
          Our server is taking a little longer than usual.
          Please wait while we prepare everything for you.
        </p>
        <p className="sub-text">Thank you for your patience.</p>
      </div>
    </div>
  );
}