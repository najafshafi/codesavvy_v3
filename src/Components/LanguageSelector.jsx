const LanguageSelector = ({ language, onSelect }) => {
  const languages = [
    "javascript",
    "typescript",
    "python",
    "java",
    "csharp",
    "php",
    "html",
  ];

  return (
    <select
      value={language}
      onChange={(e) => onSelect(e.target.value)}
      className="mb-4 px-3 py-2 border rounded-md"
    >
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang.toUpperCase()}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
