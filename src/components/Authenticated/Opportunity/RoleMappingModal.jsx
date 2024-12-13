/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import MainInput from "../../MainInput";
import MainSelect from "../../MainSelect";
import api from "../../../services/api";

const designations = [
  { id: 1, name: "Head of Sales" },
  { id: 2, name: "Head of Transport" },
  { id: 3, name: "Head of IT" },
  { id: 3, name: "Chief Executive officer" },
];

const roles = [
  { id: 1, name: "Admin" },
  { id: 2, name: "User" },
  { id: 3, name: "Team Member" },
];

const departments = [
  { id: 1, name: "Development" },
  { id: 2, name: "Human Resources" },
  { id: 3, name: "Sales" },
];

const statuses = [
  { id: 1, name: "Pending" },
  { id: 2, name: "Completed" },
  { id: 3, name: "Lost" },
];

export default function RoleMappingModal({
  show,
  onClose,
  data,
  org,
  allworkspaces,
}) {
  const [mappedRole, setMappedRole] = useState({});
  const [loading, setLoading] = useState(false);

  // console.log("Role data : ",data)

  const onSave = async () => {
    // console.log("mappedRole data : ",mappedRole)
    try {
      document.getElementById("page-loader").style.display = "block";
      const response = await api.post(
        `/api-v1/opportunities/${data._id}/mapping-role`,
        mappedRole
      );

      if (response.status === 201) {
        console.log("Mapped Role successfully");
        document.getElementById("page-loader").style.display = "none";
        onClose();
      } else {
        console.error("Failed to mapped role:", response.statusText);
        document.getElementById("page-loader").style.display = "none";
      }
    } catch (error) {
      console.error("Error mapping role:", error);
      document.getElementById("page-loader").style.display = "none";
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
        "w-screen h-screen fixed top-0 left-0 flex items-center justify-center bg-[#0000006d]"
      }
    >
      <div className="bg-white shadow-lg rounded-md h-[90%] lg:h-fit w-[95%] lg:w-[70%]">
        <div className="bg-[#C5C5C533] h-14 flex justify-between items-center px-10">
          <div className="font-semibold">Opportunity Mapping Role</div>
          <button
            disabled={loading}
            onClick={onClose}
            className="flex justify-center items-center text-app-gray-3"
          >
            <XCircleIcon className="w-7 h-7" />
          </button>
        </div>
        <div className="max-h-[80vh] h-[80vh] lg:h-fit overflow-y-auto no-scrollbar">
          <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 px-10 pt-10">
            <MainInput
              value={mappedRole?.name}
              onChange={(text) => setMappedRole({ ...mappedRole, name: text })}
              label={"Name"}
              placeholder={"Enter Name"}
            />

            <MainSelect
              value={designations?.find(
                (row) => row?.name == mappedRole.designation
              )}
              onChange={(value) =>
                setMappedRole({ ...mappedRole, designation: value?.name })
              }
              label={"Designation"}
              placeholder={"Please Select Designation"}
              options={designations}
            />
            <MainSelect
              disabled={loading}
              value={departments?.find(
                (row) => row?.name == mappedRole?.department
              )}
              onChange={(value) =>
                setMappedRole({ ...mappedRole, department: value?.name })
              }
              label={"Department"}
              placeholder={"Please Select Department"}
              options={departments}
            />
            <MainSelect
              disabled={loading}
              value={roles?.find((row) => row?.name == mappedRole?.role)}
              onChange={(value) =>
                setMappedRole({ ...mappedRole, role: value?.name })
              }
              label={"Role"}
              placeholder={"Please Select Role"}
              options={roles}
            />
          </div>
          <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 px-10 lg:px-20 pt-10">
            <MainInput
              disabled={loading}
              value={mappedRole?.impact}
              onChange={(text) =>
                setMappedRole({ ...mappedRole, impact: text })
              }
              label={"Rate - How Impact do you feel?"}
              placeholder={""}
            />

            <MainSelect
              disabled={loading}
              value={statuses?.find((row) => row?.name == mappedRole?.status)}
              onChange={(value) =>
                setMappedRole({ ...mappedRole, status: value?.name })
              }
              label={"Status"}
              placeholder={"Please Select Status"}
              options={statuses}
            />
          </div>
          <div className="flex justify-center items-center gap-5 mb-5 mt-10">
            <button
              onClick={onClose}
              disabled={loading}
              className="disabled:bg-app-gray disabled:border-app-gray disabled:text-white flex items-center gap-3 border text-app-blue-2 border-app-blue-2 rounded-lg w-fit px-10 py-2"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave()}
              disabled={loading}
              className="disabled:bg-app-gray flex items-center gap-3 bg-app-blue-2 rounded-lg w-fit px-10 py-2 text-white"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Transition>
  );
}
