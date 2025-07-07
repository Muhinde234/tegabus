import { Search } from "lucide-react";


interface SearchBarProps {
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  iconClassName?: string;
  iconContainerClassName?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search",
  className = "",
  inputClassName = "",
  iconClassName = "",
  iconContainerClassName = "",
  value,
  onChange,
}) => {
  return (
    <div className={`flex items-center w-full bg-gray-200 rounded-full ${className}`}>
      <div className={`bg-gray-300 rounded-full p-2 flex items-center justify-center ${iconContainerClassName}`}>
        <Search className={`h-4 w-4 text-white ${iconClassName}`} />
      </div>

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`ml-3 py-2 px-2 text-sm w-full focus:outline-none placeholder:text-gray-500 ${inputClassName}`}
      />
    </div>
  );
};

export default SearchBar;