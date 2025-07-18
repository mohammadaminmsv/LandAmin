export default function Card({ children, className = "", onClick }) {
  return (
    <div onClick={onClick} className={`bg-white border rounded-xl shadow-sm ${className}`}>
      {children}
    </div>
  );
}
