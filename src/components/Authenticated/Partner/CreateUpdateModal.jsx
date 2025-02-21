/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import MainInput from "../../MainInput";
import MainSelect from "../../MainSelect";
import api from "../../../services/api";
import MainSelectLead from "../../MainSelectLead";
import MainImageInput from "../../MainImageInput";
import MainImageInputPartner from "../../MainImageInputPartner";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";

const rates = [
  { id: 1, name: "1" },
  { id: 2, name: "2" },
  { id: 3, name: "3" },
];

const initialState = {
  name: "",
  accountName: "",
  rate: "",
  workspaceId: "",
  industryTypeId: null,
  photo: null,
  contacts: [
    {
      name: "",
      designation: "",
      email: "",
      phone: "",
      business: "",
      // isPrimary: true,
    },
  ],
};


export default function CreateUpdateModal({
  show,
  onClose,
  data,
  workspaces,
  allworkspaces,
  clientsData,
}) {
  const [partner, setPartner] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [clients, setClients] = useState([]);


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

  const addContact = () => {
    setPartner((prevState) => {
      if (prevState.contacts.length >= 2) {
        alert("You can only add up to 2 contact persons.");
        return prevState;
      }
      return {
        ...prevState,
        contacts: [
          ...prevState.contacts,
          {
            name: "",
            designation: "",
            email: "",
            phone: "",
            business: "",
            // isPrimary: prevState.contacts.length === 0, 
          },
        ],
      };
    });
  };



  const updateContactField = (index, field, value) => {
    setPartner((prevState) => {
      const updatedContacts = [...prevState.contacts];
      updatedContacts[index][field] = value;
      return {
        ...prevState,
        contacts: updatedContacts,
      };
    });
  };

  const removeContact = (index) => {
    setPartner((prevState) => ({
      ...prevState,
      contacts: prevState.contacts.filter((_, i) => i !== index),
    }));
  };


  async function onCreate() {
    setError(null);
    setSuccess(null);
    setLoading(true);

    console.log("clientsData data:", clientsData);

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

  // const selectedWorkspace = workspaces?.find(
  //   (workspace) => workspace._id === partner?.workspaceId?._id
  // );
  console.log("clientsData : ", clientsData)
  console.log("workspaces : ", workspaces)
 
  // const selectedClient = clientsData?.find(
  //   (client) => client._id === partner?.clientId
  // );
  const selectedClient = clientsData?.find(
    (client) => client._id === partner?.clientId
  );
  console.log("selectedClient :", selectedClient);

  const selectedWorkspace = workspaces?.find(
    (workspace) => workspace._id === partner?.workspaceId
  );
  // console.log("selectedWorkspace :", selectedWorkspace);
  console.log("partner :", partner);

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
                View Partner -{" "}
                <span className="text-app-blue-4">{data?.name}</span>
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
          <div className="flex justify-center items-center mt-5">
            <MainImageInputPartner
              type="client"
              onChange={(file) => setPartner({ ...partner, photo: file.path })}
              value={partner?.photo}
            />
          </div>
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
              value={partner?.company}
              onChange={(text) => setPartner({ ...partner, company: text })}
              label={"Company"}
              placeholder={"Enter Company Name"}
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
              // value={workspaces?.find(
              //   (row) => row?._id === partner?.workspaceId?._id
              // )}
              value={selectedWorkspace || ""}
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
            <MainSelectLead
              disabled={loading}
              value={selectedClient || ""}
              onChange={(value) =>
                setPartner({
                  ...partner,
                  clientId: value?._id || "",
                })
              }
              label={"Clients"}
              placeholder={"Please Select Client"}
              options={clientsData ?? []}
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
          <div className="px-10 pt-10 pb-5">
            {partner.contacts.map((contact, index) => (
              <div key={index} className="d-flex flex-column">
                <div className="font-semibold">
                  <span>
                    {index === 0 ? (
                      <>
                        Contact Person Details <span className="text-app-blue-4">{data?.name}</span>
                      </>
                    ) : (
                      "Another Person Contact Details"
                    )}
                  </span>
                </div>
                <div className="contact-item grid gap-5 grid-cols-1 lg:grid-cols-2 border p-2 rounded mb-5">
                  <MainInput
                    value={contact.name}
                    onChange={(text) => updateContactField(index, "name", text)}
                    label={`Name`}
                    placeholder="Enter name"
                  />
                  <MainInput
                    value={contact.designation}
                    onChange={(text) => updateContactField(index, "designation", text)}
                    label={`Designation`}
                    placeholder="Enter designation"
                  />
                  <MainInput
                    value={contact.email}
                    onChange={(text) => updateContactField(index, "email", text)}
                    label={`Email`}
                    placeholder="Enter email"
                  />
                  <MainInput
                    value={contact.phone}
                    onChange={(text) => updateContactField(index, "phone", text)}
                    label={`Phone Number`}
                    placeholder="Enter phone"
                  />
                  <MainInput
                    value={contact.business}
                    onChange={(text) => updateContactField(index, "business", text)}
                    label={`Business`}
                    placeholder="Enter Business"
                  />
                  <button
                    onClick={() => removeContact(index)}
                    className="flex items-center gap-2 text-app-blue text-xs"
                  >
                    <div className="border border-app-blue">
                      <MinusIcon className="w-3 h-3" />
                    </div>
                    Remove Contact
                  </button>
                </div>
              </div>
            ))}
            <div className="d-flex py-3">
              {partner.contacts.length < 2 && (
                <button
                  onClick={addContact}
                  className="flex items-center gap-2 text-app-blue text-xs"
                >
                  <div className="border border-app-blue">
                    <PlusIcon className="w-3 h-3" />
                  </div>
                  Add Another Contact Person
                </button>
              )}

            </div>
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
