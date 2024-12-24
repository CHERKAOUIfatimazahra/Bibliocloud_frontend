import React from "react";

export const Card = ({ title, children }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 bg-white">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export const CardHeader = ({ children }) => {
    return <header className="mb-4">{children}</header>;
};

export const CardContent = ({ children }) => {
    return <div>{children}</div>;
};

export const CardTitle = ({ children }) => {
    return <h2 className="text-lg font-bold mb-2">{children}</h2>;
};

export const CardDescription = ({ children }) => {
    return <p className="text-muted-foreground">{children}</p>;
};

export default Card;
