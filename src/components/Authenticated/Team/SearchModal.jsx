import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
// import MainInput from '../../MainInput'
import api from "../../../services/api";

export default function SearchModal({ show, onClose, list, updateTempData }) {
  const [searchValue, setSearchValue] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  // search
  const fetchSearchResults = async () => {
    if (searchValue.trim() !== "") {
      try {
        document.getElementById("page-loader").style.display = "block";
        const response = await api.get(
          `/api-v1/team-members/search/${searchValue}`
        );
        const data = response.data.data;
        setSearchResults(data);
        // Update the parent component's state with search results
        updateTempData(data);
        document.getElementById("page-loader").style.display = "none";
        onClose();
      } catch (error) {
        console.error("Error fetching search results:", error);
        document.getElementById("page-loader").style.display = "none";
      }
    }
  };

  return (
    <Transition
      show={show}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className={
        "w-screen h-screen fixed overflow-scroll top-0 left-0 flex justify-center items-center bg-[#0000006d]"
      }
    >
      <div className="bg-white shadow-lg rounded-md w-[90%] lg:w-[30%]">
        <div className="bg-[#C5C5C533] h-14 flex justify-between items-center px-10">
          <div className="font-semibold"></div>
          <button
            onClick={onClose}
            className="flex justify-center items-center text-app-gray-3"
          >
            <XCircleIcon className="w-7 h-7" />
          </button>
        </div>
        {/* <MainInput
                    placeholder={"Search Here"}
                /> */}
        <div className="flex flex-row p-3 align-middle justify-center">
          <input
            type="search"
            placeholder="Search by Email"
            className={`w-full border border-app-gray h-[50px] px-4 rounded-lg text-sm lg:text-base`}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            onClick={fetchSearchResults}
            className="flex justify-center items-center text-white bg-app-gray-5 px-5 py-2 w-full lg:w-fit rounded-lg custom-margin-left"
          >
            Search
          </button>
        </div>
      </div>
    </Transition>
  );
}
