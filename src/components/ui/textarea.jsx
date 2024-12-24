const Textarea = ({ placeholder, value, onChange, rows = 4 }) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className="border rounded px-4 py-2 w-full"
    />
  );
};

export { Textarea };
