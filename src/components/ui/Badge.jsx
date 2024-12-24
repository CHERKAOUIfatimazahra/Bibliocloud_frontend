import React from "react";

const Badge = ({ children, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-500 text-white",
    gray: "bg-gray-500 text-white",
    green: "bg-green-500 text-white",
    red: "bg-red-500 text-white",
  };

  return (
    <span className={`px-2 py-1 rounded text-sm font-medium ${colors[color]}`}>
      {children}
    </span>
  );
};

export default Badge;
