import { useEffect, useRef, useState } from "react";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";

interface Country {
  name: {
    common: string;
  };
  cca2: string;
  cca3: string;
}

interface SearchableSelectProps {
  countriesData: Country[];
  setCodeForCountry: Function;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  countriesData,
  setCodeForCountry,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCountries = countriesData.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (country: Country) => {
    setIsOpen(false);
    setCodeForCountry(country.name.common);
    setSearchTerm(country.name.common);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="w-full bg-slate-800 px-4 py-3 rounded-lg flex justify-between items-center"
      ref={dropdownRef}
    >
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Search your country*"
          className="w-full bg-transparent outline-none text-white"
          onClick={() => setIsOpen(true)}
        />

        {isOpen && (
          <ul className="absolute z-10 w-full mt-2 bg-white border rounded-md max-h-32 overflow-y-auto shadow-lg">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(country)}
                  className="px-4 py-2 cursor-pointer hover:bg-slate-800 hover:text-white"
                >
                  {country.name.common}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No matching countries</li>
            )}
          </ul>
        )}
      </div>
      <FaMagnifyingGlassLocation className="text-white text-lg" />
    </div>
  );
};

export default SearchableSelect;
