// src/components/ui/Button.jsx
export default function Button({ children, onClick, variant = "primary" }) {
  const baseStyle =
    "px-4 py-2 rounded text-white font-medium focus:outline-none";
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600",
    secondary: "bg-gray-500 hover:bg-gray-600",
    danger: "bg-red-500 hover:bg-red-600",
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]}`}>
      {children}
    </button>
  );
}
