import React from "react";

const SearchInput = ({ value, onChange }) => {
    function handleChange(event){
        onChange(event.target.value);
    }
    return(
        <input type = "search" value = {value} onChange = {handleChange} placeholder = "Pesquise o produto" />
    );
}

export default SearchInput;