import React,{ useState } from "react";


const searchedValue = (searchValue, arrayData) => {
  const regex = new RegExp(`${searchValue}`, "gi");
  const [originalArray,setOriginalValue] = useState(arrayData);
  const [filterArray, setFilterArray] = useState(Array());
  if (searchValue === "") {
    setFilterArray(originalArray);
  } else {
    let arr = originalArray.filter((prev) => {
      if (prev.name.match(regex)) {
        return prev;
      }
    });
    setFilterArray(arr);
  }
  return {filterArray};
};
export default searchedValue;
