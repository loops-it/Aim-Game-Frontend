/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import MainInput from "../../MainInput";
import MainSelect from "../../MainSelect";
import api from "../../../services/api";

const rates = [
  { id: 1, name: "1" },
  { id: 2, name: "2" },
  { id: 3, name: "3" },
];

const initialState = { name: "", accountName: "", rate: "", workspaceId: "" };

export default function CreateUpdateModal({
  show,
  onClose,
  data,
  workspaces,
  allworkspaces,
}) {
  const [partner, setPartner] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (data) {
      setPartner(data);
    } else {
      setPartner(initialState);
    }
  }, [data]);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await api.get("/api-v1/partners");
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching workspaces:", error);
      }
    };

    fetchWorkspaces();
  }, []);

  async function onCreate() {
    setError(null);
    setSuccess(null);
    setLoading(true);

    console.log("Partner data:", partner);

    // Check if partner name already exists
    const nameExists = userData.some((item) => item.name === partner.name);
    if (nameExists) {
      setError("Name already exists");
      setLoading(false);
      return;
    }

    // Check if account name already exists
    const accountNameExists = userData.some(
      (item) => item.accountName === partner.accountName
    );
    if (accountNameExists) {
      setError("Account name already exists");
      setLoading(false);
      return;
    }

    // Validate name format
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!partner.name || !nameRegex.test(partner.name.trim())) {
      setError("Invalid name format");
      setLoading(false);
      return;
    }

    if (!partner.accountName || !nameRegex.test(partner.accountName.trim())) {
      setError("Invalid account name format");
      setLoading(false);
      return;
    }

    // Validate rate selection
    if (!partner.rate) {
      setError("Please select a rate");
      setLoading(false);
      return;
    }

    // Validate workspace selection
    if (!partner.workspaceId) {
      setError("Please select a workspace");
      setLoading(false);
      return;
    }

    try {
      document.getElementById("page-loader").style.display = "block";
      const response = await api.post("/api-v1/partners", partner);

      if (response.status === 201) {
        console.log("Partner created successfully");
        setSuccess("Partner created successfully");
        document.getElementById("page-loader").style.display = "none";
        onClose();
      } else {
        console.error("Failed to create partner:", response.statusText);
        setError("Failed to create partner");
        document.getElementById("page-loader").style.display = "none";
      }
    } catch (error) {
      console.error("Error creating partner:", error);
      setError("Failed to create partner");
      document.getElementById("page-loader").style.display = "none";
    } finally {
      setLoading(false);
    }
  }

  async function onUpdate() {
    // Logic for updating the partner (if needed)
    console.log("Updating partner:", partner);
    onClose();
  }

  return (
    <Transition
      show={show}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className="w-screen h-screen absolute top-0 left-0 flex items-center justify-center bg-[#0000006d]"
    >
      <div className="bg-white shadow-lg rounded-md h-[90%] lg:h-fit w-[95%] lg:w-[70%]">
        <div className="bg-[#C5C5C533] h-14 flex justify-between items-center px-10">
          <div className="font-semibold">
            {data ? (
              <span>
                View Partner - <span className="text-app-blue-4">{data?.name}</span>
              </span>
            ) : (
              "Create New Partner"
            )}
          </div>
          <button
            disabled={loading}
            onClick={onClose}
            className="flex justify-center items-center text-app-gray-3"
          >
            <XCircleIcon className="w-7 h-7" />
          </button>
        </div>
        <div className="max-h-[80vh] h-[80vh] lg:h-fit overflow-scroll no-scrollbar">
          <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 px-10 pt-10 pb-5">
            <MainInput
              disabled={loading}
              value={partner?.name}
              onChange={(text) => setPartner({ ...partner, name: text })}
              label={"Partner Name"}
              placeholder={"Enter Partner Name"}
            />
            <MainInput
              disabled={loading}
              value={partner?.accountName}
              onChange={(text) => setPartner({ ...partner, accountName: text })}
              label={"Account Name"}
              placeholder={"Enter Account Name"}
            />
            <MainSelect
              disabled={loading}
              value={workspaces?.find(
                (row) => row?._id === partner?.workspaceId
              )}
              onChange={(value) =>
                setPartner({
                  ...partner,
                  workspaceId: value?._id || "",
                })
              }
              label={"Workspaces"}
              placeholder={"Please Select workspaces"}
              options={workspaces ?? []}
            />

            <MainSelect
              disabled={loading}
              value={rates?.find((row) => row?.name === partner?.rate)}
              onChange={(value) =>
                setPartner({ ...partner, rate: value?.name })
              }
              label={"Rate"}
              placeholder={"Please Select Rate"}
              options={rates}
            />
          </div>
          <div className="px-10">
            {error && <p className="text-red-500 mt-2 mb-2">{error}</p>}
            {success && <p className="text-green-500 mt-2 mb-2">{success}</p>}
          </div>
          <div className="flex justify-center items-center gap-5 mb-5">
            <button
              onClick={onClose}
              disabled={loading}
              className="disabled:bg-app-gray disabled:border-app-gray disabled:text-white flex items-center gap-3 border text-app-blue-2 border-app-blue-2 rounded-lg w-fit px-10 py-2"
            >
              Cancel
            </button>
            <button
              onClick={onCreate}
              disabled={loading}
              className="disabled:bg-app-gray flex items-center gap-3 bg-app-blue-2 rounded-lg w-fit px-10 py-2 text-white"
            >
              {data ? "Save" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  );
}
