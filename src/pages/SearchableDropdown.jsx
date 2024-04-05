// import React from "react";
// import Select from "react-select";

// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

// const SearchableDropdown = () => {
//   const [selectedOption, setSelectedOption] = React.useState(null);

//   const handleChange = (option) => {
//     setSelectedOption(option);
//     console.log(`Option selected:`, option);
//   };

//   return (
//     <Select
//       options={options}
//       onChange={handleChange}
//       placeholder="Select an option..."
//     />
//   );
// };

// export default SearchableDropdown;

import React from "react";
import Select from "react-select";

const SearchableDropdown = ({ options, onChange, placeholder }) => {
  const handleChange = (selectedOption) => {
    onChange(selectedOption);
    console.log("Option selected:", selectedOption);
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

export default SearchableDropdown;
