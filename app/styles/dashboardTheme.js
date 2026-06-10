export const dashboardTheme = {
  page: {
    background: "#b0b0b0", // medium grey background
    minHeight: "100vh",
    padding: "20px",
  },
  card: {
    background: "#f2f2f2", // lighter grey, almost white
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  navBar: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  navBtn: (active) => ({
    background: active ? "#FFD700" : "#222",
    color: active ? "#000" : "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "600",
  }),
  th: {
    padding: "10px",
    textAlign: "left",
    color: "#FFD700",
    borderBottom: "2px solid #FFD700",
  },
  td: {
    padding: "10px",
    verticalAlign: "top",
    color: "#000",
  },
  removeBtn: {
    background: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "600",
  },
  undoBtn: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "600",
  },
}
