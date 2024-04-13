import Select from "react-select";

const SearchableMultiDropdown = ({ options, onChange, placeholder }) => {
    const handleChange = (selectedOption) => {
        onChange(selectedOption);
        console.log("Option selected:", selectedOption);
      };
    
      return (
        <Select
          options={options}
          onChange={handleChange}
          placeholder={placeholder}
          isMulti
        />
      );
}

export default SearchableMultiDropdown