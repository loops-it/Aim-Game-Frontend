import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import MainInput from "../../MainInput";
import MainSelect from "../../MainSelect";
import api from "../../../services/api";

const initialState = {
  refNo: "",
  name: "",
  userID: localStorage.userID,
};

export default function CreateUpdateModal({ show, onClose, data }) {
  const [workspace, setWorkspace] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [tempData, setTempData] = useState([]);

  useEffect(() => {
    if (data) {
      setWorkspace(data);
    } else {
      setWorkspace(initialState);
    }
  }, [data]);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        document.getElementById("page-loader").style.display = "block";
        const response = await api.get(
          `/api-v1/workspaces/user/${localStorage.userID}`
        );
        setTempData(response.data.data);
      } catch (error) {
        console.error("Error fetching workspaces:", error);
      }
    };

    fetchWorkspaces();
  }, []);

  const validateFields = () => {
    if (!workspace.refNo.trim()) {
      setError("Reference number is required");
      return false;
    }
    if (!/^[0-9]+$/.test(workspace.refNo.trim())) {
      setError("Invalid reference number format");
      return false;
    }
    if (!workspace.name.trim()) {
      setError("Workspace name is required");
      return false;
    }
    if (!/^[a-zA-Z\s]+$/.test(workspace.name.trim())) {
      setError("Invalid name format");
      return false;
    }
    setError(null);
    return true;
  };

  async function onCreate() {
    if (!validateFields()) return;
    
    if (tempData.some((item) => item.refNo === workspace.refNo)) {
      setError("Reference number already exists");
      return;
    }
    if (tempData.some((item) => item.name === workspace.name)) {
      setError("Name already exists");
      return;
    }

    try {
      document.getElementById("page-loader").style.display = "block";
      const response = await api.post("/api-v1/workspaces", workspace);
      document.getElementById("page-loader").style.display = "none";
      if (response.status === 201) {
        setSuccess("Workspace created successfully.");
      } else {
        setError("Failed to create Workspace: " + response.statusText);
      }
    } catch (error) {
      setError("Error creating Workspace: " + error.message);
    }
  }

  async function onUpdate() {
    if (!validateFields()) return;
    
    if (tempData.some((item) => item.refNo === workspace.refNo && item._id !== workspace._id)) {
      setError("Reference number already exists");
      return;
    }
    if (tempData.some((item) => item.name === workspace.name && item._id !== workspace._id)) {
      setError("Name already exists");
      return;
    }

    try {
      const response = await api.put(
        `/api-v1/workspaces/${workspace._id}`,
        workspace
      );
      if (response.status === 200 || response.status === 201) {
        setSuccess("Workspace updated successfully.");
      } else {
        setError("Error updating Workspace: " + response.statusText);
      }
    } catch (error) {
      setError("Error updating Workspace: " + error.message);
    }
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
      className={"w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-[#0000006d]"}
    >
      <div className="bg-white shadow-lg rounded-md h-[90%] lg:h-fit w-[95%] lg:w-[70%]">
        <div className="bg-[#C5C5C533] h-14 flex justify-between items-center px-10">
          <div className="font-semibold">
            {data ? (
              <span>
                View Workspace - <span className="text-app-blue-4">{data?.name}</span>
              </span>
            ) : (
              "Create New Workspace"
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
              value={workspace?.refNo}
              onChange={(text) => setWorkspace({ ...workspace, refNo: text })}
              label={"Reference No"}
              placeholder={"Enter Reference No"}
            />
            <MainInput
              disabled={loading}
              value={workspace?.name}
              onChange={(text) => setWorkspace({ ...workspace, name: text })}
              label={"Workspace Name"}
              placeholder={"Enter Workspace Name"}
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
              onClick={() => { data ? onUpdate() : onCreate(); }}
              disabled={loading}
              className="disabled:bg-app-gray flex items-center gap-3 bg-app-blue-2 rounded-lg w-fit px-10 py-2 text-white"
            >
              {data ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  );
}
