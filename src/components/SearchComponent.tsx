import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { BiPlanet } from "react-icons/bi";
import { IoClose } from "react-icons/io5"; // X 아이콘

type Option = {
  value: string;
  label: string;
};

type SearchProp = {
  onSearch: (filter: string, query: string) => void;
  options?: Option[];
  placeholder?: string;
};

export default function SearchComponent({
  onSearch,
  options,
  placeholder,
}: SearchProp) {
  const hasOptions = Array.isArray(options) && options.length > 0;

  const [filter, setFilter] = useState<string>(
    hasOptions ? options[0].value : "all"
  );
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    if (hasOptions) {
      setFilter(options![0].value);
    }
  }, [options]);

  const searchHandler = () => {
    onSearch(filter, query);
  };

  const clearInput = () => {
    setQuery("");
  };

  return (
    <div className="flex flex-row gap-2">
      {hasOptions && (
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="text-sm md:px-3 py-2 focus:outline-hidden"
        >
          {options!.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
      <div className="min-w-[230px] w-[80%] sm:w-[400px]">
        <div className="flex flex-row items-center border border-gray-300 rounded-full px-4 py-2 gap-3">
          <BiPlanet
            size={20}
            className="text-gray-500 shrink-0 min-w-[20px] min-h-[20px]"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchHandler();
              }
            }}
            placeholder={placeholder ?? "검색어를 입력하세요"}
            className="flex-1 min-w-0"
          />
          {query && (
            <IoClose
              size={18}
              onClick={clearInput}
              className="cursor-pointer text-gray-500 hover:text-gray-700 shrink-0"
            />
          )}
          <IoSearch
            size={20}
            onClick={searchHandler}
            className="w-5 h-5 shrink-0 text-gray-500 hover:text-gray-700 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
