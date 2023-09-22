import styles from "./Loading.module.css";

function Loading() {
  return (
    <div
      className={styles.loading}
      style={{ width: "64px", height: "64px", color: "maroon" }}
    >
      <svg viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
          stroke="#ffffff"
        />
      </svg>
      <h1>Carregando...</h1>
    </div>
  );
}

export default Loading;