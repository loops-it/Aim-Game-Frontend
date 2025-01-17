/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import MainInput from "../../MainInput";
import MainSelect from "../../MainSelect";
import MainMultipleSelect from "../../MainMultipleSelect";
import MainImageInput from "../../MainImageInput";
import api from "../../../services/api";
import MainSelectLead from "../../MainSelectLead";
import MainSelectIndustry from "../../MainSelectIndustry";

const base_url = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const initialState = {
  industryTypeId: null,
  photo: null,
};

export default function CreateUpdateModal({
  show,
  onClose,
  data,
  industryTypes,
  workspaces,
  allworkspaces,
  clients,
}) {
  const [client, setClient] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (data) {
      setClient(data);
    }
    if (!data) {
      setClient(initialState);
    }
  }, [data]);

  // create client

  // if (!client.name || !client.address || !client.email || !client.industryTypeId || !client.workspaceId ) {
  //     window.alert('Please fill in all required fields.');
  //     return;
  // }
  async function onCreate() {
    setLoading(true);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(client.email)) {
      setError("Invalid email format");
      setLoading(false);
      return;
    }

    //check name

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(client.name.trim() || client.name.trim() === "")) {
      setError("Invalid name format");
      setLoading(false);
      return;
    }

    //check number

    const phoneRegex = /^0\d{9}$/;

    if (!phoneRegex.test(client.phone || client.phone === "")) {
      setError("Invalid phone number format. It should start with 0 and have 10 digits.");
      setLoading(false);
      return;
    }

    const numberRegex = /^[0-9]+$/;

    if (!numberRegex.test(client.refNo)) {
      setError("Invalid reference number format");
      setLoading(false);
      return;
    }

    try {
      const missingFields = [];

      if (!client.name) missingFields.push("Name");
      if (!client.address) missingFields.push("Address");
      if (!client.email) missingFields.push("Email");
      if (!client.industryTypeId) missingFields.push("Industry Type");
      if (!client.workspaceId) missingFields.push("Workspace");
      if (!client.refNo) missingFields.push("Reference No");
      if (!client.phone) missingFields.push("Contact Number");

      if (missingFields.length > 0) {
        //window.alert(`Please fill in all required fields: ${missingFields.join(', ')}.`);
        setError(
          `Please fill in all required fields: ${missingFields.join(", ")}.`
        );

        setSuccess(null);
        setLoading(false);
        return;
      }

      document.getElementById("page-loader").style.display = "block";
      const response = await fetch(`${base_url}/api-v1/clients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.accessToken}`,
        },

        body: JSON.stringify(client),
      });

      if (!response.ok) {
        document.getElementById("page-loader").style.display = "none";
        const errorData = await response.json();
        setError(errorData.errors);
        setSuccess(null);
        setLoading(false);
      } else {
        document.getElementById("page-loader").style.display = "none";
        setSuccess("Client created successfully");
        setError(null);
        setLoading(false);
        onClose();

      }
    } catch (error) {
      // console.error("Error creating Client:", error);
      document.getElementById("page-loader").style.display = "none";
      setError(error.message);
      setLoading(false);
      setSuccess(null);
    }
    setLoading(false);
  }
  // async function onCreate() {
  //     console.log(client)
  //     try {
  //         const missingFields = [];

  //         if (!client.name) missingFields.push('Name');
  //         if (!client.address) missingFields.push('Address');
  //         if (!client.email) missingFields.push('Email');
  //         if (!client.industryTypeId) missingFields.push('Industry Type');
  //         if (!client.workspaceId) missingFields.push('Workspace');
  //         if (!client.refNo) missingFields.push('Reference No');

  //         if (missingFields.length > 0) {
  //             window.alert(`Please fill in all required fields: ${missingFields.join(', ')}.`);
  //             return;
  //         }

  //         const formData = new FormData();
  //         formData.append('name', client.name);
  //         formData.append('address', client.address);
  //         formData.append('email', client.email);
  //         formData.append('phone', client.phone);
  //         formData.append('refNo', client.refNo);
  //         formData.append('industryTypeId', client.industryTypeId);
  //         formData.append('workspaceId', client.workspaceId);
  //         // formData.append('photo', client.photo);

  //         if (client.photo) {
  //             formData.append('photo', client.photo);
  //             console.log("client.photo : ", client.photo)
  //         }

  //         const headers = { 'Content-Type': 'multipart/form-data' };
  //         document.getElementById("page-loader").style.display = 'block';
  //         const response = await api.post('/api-v1/clients', formData, { headers });
  //         console.log(response);
  //         if (response.status === 201) {
  //             console.log('Client created successfully');
  //             document.getElementById("page-loader").style.display = 'none';
  //             window.alert('Client created successfully');

  //             onClose();
  //         } else {
  //             console.error('Failed to create client:', response.statusText);
  //             document.getElementById("page-loader").style.display = 'none';
  //             window.alert(response.statusText);
  //         }
  //     } catch (error) {
  //         console.error('Error creating client:', error);
  //         document.getElementById("page-loader").style.display = 'none';
  //         window.alert('Failed to create client');
  //     }
  // }

  async function onUpdate() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(client.email)) {
      setError("Invalid email format");
      setLoading(false);
      return;
    }

    //check name

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(client.name.trim() || client.name.trim() === "")) {
      setError("Invalid name format");
      setLoading(false);
      return;
    }

    //vheck number

    const phoneRegex = /^0\d{9}$/;

    if (!phoneRegex.test(client.phone || client.phone === "")) {

      setError("Invalid phone number format. It should start with 0 and have 10 digits.");
      setLoading(false);
      return;
    }

    const numberRegex = /^[0-9]+$/;

    if (!numberRegex.test(client.refNo)) {
      setError("Invalid reference number format");
      setLoading(false);
      return;
    }

    console.log(client);
    try {
      const missingFields = [];

      if (!client.name) missingFields.push("Name");
      if (!client.address) missingFields.push("Address");
      if (!client.email) missingFields.push("Email");
      if (!client.industryTypeId) missingFields.push("Industry Type");
      if (!client.workspaceId) missingFields.push("Workspace");
      if (!client.refNo) missingFields.push("Reference No");
      if (!client.phone) missingFields.push("Contact Number");

      if (missingFields.length > 0) {
        setError(
          `Please fill in all required fields: ${missingFields.join(", ")}.`
        );

        setSuccess(null);
        return;
      }
      document.getElementById("page-loader").style.display = "block";
      //const response = await api.put(`/api-v1/clients/${client._id}`, client);
      const response = await fetch(`${base_url}/api-v1/clients/${client._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.accessToken}`,
        },

        body: JSON.stringify(client),
      });

      if (!response.ok) {
        document.getElementById("page-loader").style.display = "none";
        const errorData = await response.json();
        setError(errorData.errors);
        setSuccess(null);
        setLoading(false);
      } else {
        document.getElementById("page-loader").style.display = "none";
        setSuccess("Client updated successfully");
        setError(null);
        setLoading(false);
        onClose();
      }
    } catch (error) {
      // console.error('Error updating client:', error);
      // window.alert('Failed to update client');
      setError("Error updating client:", error);
      document.getElementById("page-loader").style.display = "none";
      setSuccess(null);
      setLoading(false);
    }
  }

  const selectedWorkspace = allworkspaces?.find(
    (workspace) => workspace._id === client?.workspaceId
  );
  // console.log("Selected WOrkspace:", selectedWorkspace);
  // console.log("workspaceId:", client.workspaceId);

  const selectedIndustryType = industryTypes?.find(
    (industry) => industry._id === client?.industryTypeId
  );

  // console.log("Selected Client ===== :", client.industryTypeId._id);
  // client.industryTypeId = client?.industryTypeId?._id;
  // let SelectedIndustryTypeId = client

  // console.log("industryTypeId:", client);
  if (client.industryTypeId && client.industryTypeId._id) {
    client.industryTypeId = client.industryTypeId._id;
  }

  // console.log("industryTypeId changed:", client);
  // console.log("Selected Industry:", selectedIndustryType);

  // const clientIndustryTypeId = client?.industryTypeId?._id;
  // const selectedIndustryType = industryTypes?.find(industry => industry._id === clientIndustryTypeId);
  // console.log("Selected Industry:", selectedIndustryType);

  // console.log("industryTypes : ", industryTypes)

  // console.log("client photo : ", client.photo)

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
          <div className="font-semibold">
            {data ? (
              <span>
                View Client -{" "}
                <span className="text-app-blue-4">{data?.companyName}</span>
              </span>
            ) : (
              "Create New Client"
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
            {/* <MainImageInput
                            type="client"
                            onChange={file => setClient({ ...client, photo: file })}
                            value={client?.photo}
                        /> */}
            <MainImageInput
              type="client"
              onChange={(file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setClient({ ...client, photo: reader.result });
                };
                reader.readAsDataURL(file);
              }}
              value={client?.photo}
            />
            {client?.photo && (
              <div className="mt-4 flex justify-center">
                <button
                style={{fontSize: "14px"}}
                  onClick={() => setClient({ ...client, photo: null })}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>

          <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 px-10 pt-10">
            <MainInput
              disabled={loading}
              value={client?.name}
              onChange={(text) => setClient({ ...client, name: text })}
              label={"Company Name"}
              placeholder={"Enter Company Name"}
            />
            <MainInput
              disabled={loading}
              value={client?.refNo}
              onChange={(text) => setClient({ ...client, refNo: text })}
              label={"Reference No"}
              placeholder={"Enter Reference No"}
            />
            {/* <MainSelect
                            disabled={loading}
                            value={industryTypes?.find(row => row?.name === client?.industryType)}
                            onChange={value => setClient({
                                ...client,
                                industryTypeId: value?._id || ''
                            })}
                            label={"Industry Type"}
                            placeholder={"Please Select Industry Type"}
                            options={industryTypes}
                        /> */}
            {/* <MainSelectIndustry
              disabled={loading}
              value={selectedIndustryType}
              onChange={(value) =>
                setClient({
                  ...client,
                  industryTypeId: value?._id || "",
                })
              }
              label={"Industry Type"}
              placeholder={"Please Select Industry Type"}
              options={industryTypes}
            /> */}

            <MainSelectLead
              disabled={loading}
              value={selectedIndustryType || null}
              onChange={(value) =>
                setClient({
                  ...client,
                  industryTypeId: value?._id || "",
                })
              }
              label={"Industry Type"}
              placeholder={"Please Select Industry Type"}
              options={industryTypes}
            />


            <MainInput
              disabled={loading}
              value={client?.email}
              onChange={(text) => setClient({ ...client, email: text })}
              label={"Business Email"}
              placeholder={"Enter Business Email"}
            />
            <MainInput
              disabled={loading}
              value={client?.phone}
              onChange={(text) => setClient({ ...client, phone: text })}
              label={"Contact Number"}
              placeholder={"Enter Contact Number"}
            />
          </div>
          <div className="px-10 py-5">
            {/* <MainInput
                            disabled={loading}
                            value={client?.workspaceId}
                            onChange={text => setClient({ ...client, workspaceId: text })}
                            label={"workspaceId"}
                            placeholder={"workspaceId"}
                        /> */}
            <MainSelectLead
              disabled={loading}
              // value={allworkspaces?.find(row => row?.name === client?.workspaceId)}
              value={selectedWorkspace}
              onChange={(value) =>
                setClient({
                  ...client,
                  workspaceId: value?._id || "",
                })
              }
              label={"Workspaces"}
              placeholder={"Please Select workspaces"}
              options={allworkspaces}
            />
            <MainInput
              disabled={loading}
              value={client?.address}
              onChange={(text) => setClient({ ...client, address: text })}
              label={"Business Address"}
              placeholder={"Enter Business Address"}
            />
          </div>
          <div className="px-10 ">
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
            {/* <button
                            onClick={() => {
                                data ? onCreate() : onUpdate()
                            }}
                            disabled={loading}
                            className='disabled:bg-app-gray flex items-center gap-3 bg-app-blue-2 rounded-lg w-fit px-10 py-2 text-white' >
                            {data ? "Save" : "Create"}
                        </button> */}
            {/* <button
                            onClick={onCreate}
                            disabled={loading}
                            className='disabled:bg-app-gray flex items-center gap-3 bg-app-blue-2 rounded-lg w-fit px-10 py-2 text-white'
                        >
                            Create
                        </button> */}
            <button
              onClick={() => {
                data ? onUpdate() : onCreate();
              }}
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
