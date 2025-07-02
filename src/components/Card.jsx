export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white border rounded-xl shadow-sm ${className}`}>
      {children}
    </div>
  );
}
