import axios from "axios";
import React, { useState } from "react";
import DrugDetails from "./DrugDetails";

const DrugList = () => {
  const [searchText, setSearchText] = useState("");
  const [suggectedDrug, setsuggectedDrug] = useState([]);
  const [drugDetails, setdrugDetails] = useState([]);

  const handleSearchDrug = async () => {
    const getDrugsData = await axios.get(
      `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${searchText}`
    );
    if (getDrugsData.data.drugGroup.conceptGroup) {
      setdrugDetails(getDrugsData.data.drugGroup.conceptGroup);
    }
    console.log(getDrugsData.data.drugGroup.conceptGroup, "getDrugsData.data");
    if (!getDrugsData.data.drugGroup.conceptGroup) {
      const getSuggectedDrugsData = await axios.get(
        `https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=${searchText}`
      );

      console.log(
        getSuggectedDrugsData.data.suggestionGroup?.suggestionList?.suggestion,
        "getDrugsData.data.suggestionGroup?.suggestionList?.suggestion"
      );
      setsuggectedDrug(
        getSuggectedDrugsData.data.suggestionGroup?.suggestionList?.suggestion
      );
    }
    //drugGroup.conceptGroup
    //: https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=ambienn
  };

  console.log(drugDetails, "drugDetails");

  console.log(suggectedDrug, "suggectedDrug");
  return (
    <div className="flex flex-col items-center  p-4 w-full max-w-md ">
      <h1 className="text-2xl font-bold mb-8"> Search Drug </h1>

      <div className="flex w-full mb-4">
        <input
          type="text"
          placeholder="Search Drugs..."
          className="border border-gray-300 rounded-md p-2 w-full "
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          className=" bg-blue-300 text-white rounded-r-md p-2"
          onClick={handleSearchDrug}
        >
          Search{" "}
        </button>
      </div>
      {drugDetails.length > 0 && (
        <ul>
          {drugDetails.map((drug) => (
            <li key={drug.ui}>
              {
                <div>
                  <p1> {drug["tty"]}</p1>
                </div>
              }
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DrugList;
