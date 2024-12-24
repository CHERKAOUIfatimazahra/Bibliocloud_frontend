const Input = ({ type = "text", placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border rounded px-4 py-2 w-full"
    />
  );
};

export { Input };
