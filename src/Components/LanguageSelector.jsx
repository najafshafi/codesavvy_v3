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
      className="px-3 py-2 border-2 rounded-md w-[150px] h-[50px] my-3 border-slate-900"
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
