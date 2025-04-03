/* eslint-disable no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import MainInput from "../../MainInput";
import MainSelect from "../../MainSelect";
import MainMultipleSelect from "../../MainMultipleSelect";
import { PlusIcon } from "@heroicons/react/24/solid";
import api from "../../../services/api";
import MainStageSelect from "../../StageDataSelect";
import MainRatesSelect from "../../RatesDataSelect";
import MainSelectFunnelStatus from "../../MainSelectFunnelStatus";
import MainSelectStage from "../../MainSelectStage";
import MainSelectRate from "../../MainSelectRate";
import MainMultipleSelectTasks from "../../MainMultipleSelectTasks";
import MainDateInput from "../../MainDateInput";
import MainRequiredInput from "../MainRequiredInput";
import MainSelectLead from "../../MainSelectLead";
import MainMultipleSelectTeam from "../../MainMultipleSelectTeam";
import OpMapRoleMainMultipleSelect from "../../OpMapRoleMainMultipleSelect";

const designations = [
  { id: 1, name: "Head of Sales" },
  { id: 2, name: "Head of Transport" },
  { id: 3, name: "Head of IT" },
  { id: 3, name: "Chief Executive officer" },
];

const stages = [
  { id: 1, name: "Suspect" },
  { id: 2, name: "Success" },
];

const rates = [
  { id: 1, name: "Low" },
  { id: 2, name: "Medium" },
  { id: 2, name: "High" },
];

const funnelState = [
  { id: 1, name: "1" },
  { id: 2, name: "2" },
  { id: 2, name: "3" },
];

const probability = [
  { id: 1, name: "0" },
  { id: 2, name: "10" },
  { id: 3, name: "20" },
  { id: 4, name: "30" },
  { id: 5, name: "40" },
  { id: 6, name: "50" },
  { id: 7, name: "60" },
  { id: 8, name: "70" },
  { id: 9, name: "80" },
  { id: 10, name: "90" },
  { id: 11, name: "100" },
];

const opMappingRoles = [
  { name: "Test1", designation: "CEO", role: "CEO" },
  { name: "Test2", designation: "Director", role: "Director" },
  { name: "Test3", designation: "Manager", role: "Manager" },
  { name: "Test4", designation: "Team Member", role: "Team Member" },
];

const lead = [
  { id: 1, name: "Admin user" },
  { id: 2, name: "IT Main" },
  { id: 3, name: "Altmanb" },
  { id: 3, name: "DILAXN" },
];

const initialState = {
  team: [],
  probability: 0,
  mappingRoles: [],
};

const initialOpportunityState = {
  name: "",
  referenceNumber: "",
  leadId: "",
  workspaceId: "",
  clientId: "",
  funnelStatusId: "",
  completionDate: "",
  partners: [],
  team: [],
  probability: 0,
  mappingRoles: [],
};

export default function CreateUpdateModal({
  show,
  onClose,
  data,
  onPartnerAddClick,
  onTaskAddClick,
  onOpMappingAddClick,
  leadData,
  partners,
  teamMembers,
  clients,
  allworkspaces,
  tasks,
  funnelStatus,
}) {
  const [opportunity, setOpportunity] = useState(initialOpportunityState);
  // const [opportunity, setOpportunity] = useState({
  //     name: '',
  //     referenceNumber: '',
  //     leadId: '',
  // })
  const [loading, setLoading] = useState(false);
  const [mappingRoles, setMappingRoles] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [tempData, setTempData] = useState();
  const [selectedId, setSelectedId] = useState();

  // const opportunityMappingRoles = data.opportunityMappingRoles;

  // console.log("opportunityMappingRoles : - ", opportunityMappingRoles)

  useEffect(() => {
    if (leadData && leadData.length > 0) {
      const selectedLead = leadData.find(
        (row) => row?.name === opportunity.leadId?.name
      );

      if (selectedLead) {
        setOpportunity((prevState) => ({
          ...prevState,
          leadId: selectedLead._id,
        }));
      }
    }
  }, [leadData, opportunity.leadId]);

  useEffect(() => {
    if (data) {
      setOpportunity(data);
    }
    if (!data) {
      setOpportunity(initialOpportunityState);
    }
  }, [data]);

  useEffect(() => {
    if (funnelStatus && funnelStatus.length > 0) {
      const defaultFunnelStatusId = funnelStatus[0]._id;
      if (!opportunity.funnelStatusId) {
        setOpportunity((prevState) => ({
          ...prevState,
          funnelStatusId: defaultFunnelStatusId,
        }));
      }
    }
  }, [funnelStatus, opportunity.funnelStatusId]);

  // console.log("funnelStatus : - ", funnelStatus);
  // if (funnelStatus.length > 0) {
  //     console.log("funnelStatus index 0 _id : ", funnelStatus[0]._id);
  // } else {
  //     console.log("funnelStatus array is empty.");
  // }

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        document.getElementById("page-loader").style.display = "block";
        const response = await api.get(`/api-v1/opportunities`);
        setTempData(response.data.data);
        const theId = tempData.find((row) => row._id === opportunity._id);
        setSelectedId(theId);
      } catch (error) {
        console.error("Error fetching opportunities:", error);
      }
    };
  }, []);

  async function onCreate() {
    //check name

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (
      !nameRegex.test(opportunity.name.trim() || opportunity.name.trim() === "")
    ) {
      setError("Invalid name format");
      return;
    }

    //check reference number

    const numberRegex = /^[0-9]+$/;

    if (!numberRegex.test(opportunity.referenceNumber || opportunity.referenceNumber === "")) {
      setError("Invalid reference number format");
      return;
    }

    if (selectedId) {
      alert("the Id is already exist");
      return;
    }

    try {
      const missingFields = [];
      if (!opportunity.referenceNumber) missingFields.push("Reference Number");
      if (!opportunity.name) missingFields.push("Name");
      if (!opportunity.workspaceId) missingFields.push("Workspace");
      if (!opportunity.clientId) missingFields.push("Client");
      if (!opportunity.leadId) missingFields.push("Lead");
      if (!opportunity.funnelStatusId) missingFields.push("Funnel Status");
      if (!opportunity.completionDate) missingFields.push("Completion Date");
      if (!opportunity.partners.length) missingFields.push("Partners");
      if (!opportunity.team.length) missingFields.push("Team Members");

      if (missingFields.length > 0) {
        setSuccess(null);
        setError(
          `Please fill in all required fields: ${missingFields.join(", ")}.`
        );
        return;
      }

      const defaultFunnelStatus =
        funnelStatus.length > 0 ? funnelStatus[0]._id : null;
      console.log("Default funnelStatus _id:", defaultFunnelStatus);

      const updatedOpportunity = {
        ...opportunity,
        completionDate: opportunity.completionDate || null,
        leadId: opportunity.leadId._id || opportunity.leadId,
        clientId: opportunity.clientId._id || opportunity.clientId,
        workspaceId: opportunity.workspaceId._id || opportunity.workspaceId,
        funnelStatusId: opportunity.funnelStatusId || defaultFunnelStatus,
      };

      console.log("Opportunity Updated:", updatedOpportunity);

      document.getElementById("page-loader").style.display = "block";

      const response = await api.post(
        "/api-v1/opportunities",
        updatedOpportunity
      );

      if (response.status === 201) {
        setError(null);
        document.getElementById("page-loader").style.display = "none";
        setSuccess(`Opportunity created successfully`);
        setOpportunity(initialOpportunityState);
      } else {
        setSuccess(null);
        document.getElementById("page-loader").style.display = "none";
        setError(`Failed to create opportunity`);
      }
    } catch (error) {
      setSuccess(null);
      document.getElementById("page-loader").style.display = "none";
      setError(`Failed to create opportunity`);
    }
  }

  async function onUpdate() {
    //check name

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (
      !nameRegex.test(opportunity.name.trim() || opportunity.name.trim() === "")
    ) {
      setError("Invalid name format");
      return;
    }

    //check reference number

    const numberRegex = /^[0-9]+$/;

    if (!numberRegex.test(opportunity.referenceNumber || opportunity.referenceNumber === "")) {
      setError("Invalid reference number format");
      return;
    }
    console.log("Update data:", opportunity);
    const missingFields = [];
    if (!opportunity.referenceNumber) missingFields.push("Reference Number");
    if (!opportunity.name) missingFields.push("Name");
    if (!opportunity.workspaceId) missingFields.push("Workspace");
    if (!opportunity.clientId) missingFields.push("Client");
    if (!opportunity.leadId) missingFields.push("Lead");

    if (!opportunity.funnelStatusId) missingFields.push("Funnel Status");
    if (!opportunity.completionDate) missingFields.push("Completion Date");
    if (!opportunity.partners) missingFields.push("Partners");
    if (!opportunity.team) missingFields.push("Team Members");

    if (missingFields.length > 0) {
      setSuccess(null);
      setError(
        `Please fill in all required fields: ${missingFields.join(", ")}.`
      );
      //window.alert(`Please fill in all required fields: ${missingFields.join(', ')}.`);
      return;
    }

    const updatedOpportunity = {
      ...opportunity,
      completionDate: opportunity.completionDate || null,
      leadId: opportunity.leadId?._id || opportunity.leadId,
      clientId: opportunity.clientId?._id || opportunity.clientId,
      workspaceId: opportunity.workspaceId?._id || opportunity.workspaceId,
      funnelStatusId:
        opportunity.funnelStatusId?._id || opportunity.funnelStatusId,
    };

    try {
      document.getElementById("page-loader").style.display = "block";
      const response = await api.put(
        `/api-v1/opportunities/${opportunity._id}`,
        updatedOpportunity
      );

      if (response.status === 200 || response.status === 201) {
        setError(null);
        document.getElementById("page-loader").style.display = "none";
        setSuccess(`Opportunity updated successfully`);
        setOpportunity(initialOpportunityState);
      } else {
        setSuccess(null);
        document.getElementById("page-loader").style.display = "none";
        setError(`Failed to update opportunity`);
      }
    } catch (error) {
      setSuccess(null);
      document.getElementById("page-loader").style.display = "none";
      setError(`Failed to update opportunity`);
    }
  }

  function isValidNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

  const fetchOpportunitiesMappingRoles = async () => {
    try {
      const response = await api.get(
        `/api-v1/opportunities/65867fc7cbe698d4c8d1d716/mapping-role`
      );
      setMappingRoles(response.data.data);
    } catch (error) {
      console.error("Error fetching opportunities:", error);
    }
  };

  // console.log("funnel status :", funnelStatus)
  const handleFunnelStatusChange = (selectedStatus) => {
    const selectedStatusData = funnelStatus.find(
      (row) => row._id === selectedStatus?._id
    );

    setOpportunity({
      ...opportunity,
      funnelStatusId: {
        _id: selectedStatusData?._id || "",
        status: selectedStatusData?.status || "List",
        stage: selectedStatusData?.stage || "Suspect",
        rate: selectedStatusData?.rate || "No",
        level: selectedStatusData?.level || 0,
      },
    });
  };
  useEffect(() => {
    fetchOpportunitiesMappingRoles();
  }, []);

  useEffect(() => {}, [opportunity]);

  // console.log("Selected clients:", clients);
  // console.log("Selected lead:", leadData);

  const selectedLead = leadData?.find(
    (lead) => lead._id === opportunity?.leadId
  );
  const selectedClient = clients?.find(
    (client) => client._id === opportunity?.clientId
  );
  console.log("Selected clients id:", selectedClient);
  console.log("Selected lead:", selectedLead);

  // value={clients?.find(row => row?.name === opportunity?.clientId?.name) || ''}
  // console.log("Selected Lead:", selectedLead);

  const selectedWorkspace = allworkspaces?.find(
    (workspace) => workspace._id === opportunity?.workspaceId
  );
  // console.log("Selected Lead:", selectedWorkspace);
  // allworkspaces?.find(row => row?.name === opportunity?.workspaceId?.name)

  const teamMemberIds = Array.isArray(opportunity.team)
    ? opportunity.team.map((member) => member._id)
    : [];
  // console.log("teamMemberIds : ", teamMemberIds)

  // console.log("partners : ", partners)
  // console.log("teamMembers : ", teamMembers)
  // console.log("opportunity : ", opportunity)

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
                View Opportunity -{" "}
                <span className="text-app-blue-4">{opportunity?.name}</span>
              </span>
            ) : (
              "Create New Opportunity"
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
          <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 px-10 pt-10">
            <MainRequiredInput
              disabled={loading}
              value={opportunity?.name}
              onChange={(text) =>
                setOpportunity({ ...opportunity, name: text })
              }
              label={"Opportunity Name"}
              placeholder={"Enter Opportunity Name"}
            />
            <MainRequiredInput
              disabled={loading}
              value={opportunity?.referenceNumber}
              onChange={(text) =>
                setOpportunity({ ...opportunity, referenceNumber: text })
              }
              label={"Reference Number"}
              placeholder={"Enter Reference Number"}
            />
            <MainSelectLead
              disabled={loading}
              value={selectedLead || ""}
              onChange={(value) =>
                setOpportunity({
                  ...opportunity,
                  leadId: value?._id || "",
                })
              }
              label={"Opportunity Lead"}
              placeholder={"Please Select Opportunity Lead"}
              options={leadData ?? []}
            />
             {/*<MainInput
              disabled={true}
              value={
                leadData.find((lead) => lead._id === opportunity?.leadId)
                  ?.designation || ""
              }
              label={"Designation"}
              placeholder={"Please Select Designation"}
            />*/}

            <MainSelectFunnelStatus
              disabled={loading}
              value={funnelStatus?.find(
                (row) => row?.status === opportunity?.funnelStatusId?.status
              )}
              onChange={handleFunnelStatusChange}
              label={"Funnel Status"}
              placeholder={"Please Select A Status"}
              options={funnelStatus ?? []}
            />
            <div className="d-flex">
              <MainInput
                disabled={loading}
                value={
                  isValidNumber(opportunity?.funnelStatusId?.level)
                    ? parseFloat(opportunity?.funnelStatusId?.level)
                    : ""
                }
                min={0}
                max={100}
                type={"number"}
                label={"Probability(%)"}
              />
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#ddd",
                  height: "20px",
                  marginTop: "10px",
                  borderRadius: "8px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: `${
                      parseFloat(opportunity?.funnelStatusId?.level) || 0
                    }%`,
                    height: "20px",
                    backgroundColor: "#30385e",
                    borderRadius: "8px",
                    color: "#fff",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {parseFloat(opportunity?.funnelStatusId?.level) || 0}%
                </div>
              </div>
            </div>
            <MainInput
              disabled={true}
              value={opportunity?.funnelStatusId?.stage || "Suspect"}
              label={"Stage"}
              placeholder={"Stage"}
            />
            <MainInput
              disabled={true}
              value={opportunity?.funnelStatusId?.rate || "No"}
              label={"Rate"}
              placeholder={"Rate"}
            />
          </div>
          <div className="px-10 py-5 flex flex-col gap-5">
            <MainDateInput
              disabled={loading}
              value={opportunity?.completionDate || ""}
              onChange={(date) =>
                setOpportunity({ ...opportunity, completionDate: date })
              }
              label={"Expected Opportunity Completion Date"}
              placeholder={""}
            />
            <div>
              {/* <MainSelect
                                disabled={loading}
                                value={clients?.find(row => row?.name === opportunity?.clientId?.name) || ''}
                                onChange={value => setOpportunity({
                                    ...opportunity,
                                    clientId: value?._id || ''
                                })}
                                label={"Clients"}
                                placeholder={"Please Select Client"}
                                options={clients ?? []}
                            /> */}
              <MainSelectLead
                disabled={loading}
                value={selectedClient || ""}
                onChange={(value) =>
                  setOpportunity({
                    ...opportunity,
                    clientId: value?._id || "",
                  })
                }
                label={"Clients"}
                placeholder={"Please Select Client"}
                options={clients ?? []}
              />
              <div className="mt-2 flex justify-end">
                <button
                  onClick={onOpMappingAddClick}
                  className="flex items-center gap-2 text-app-blue text-xs"
                >
                  <div className="border border-app-blue">
                    <PlusIcon className="w-3 h-3" />
                  </div>
                  Add New
                </button>
              </div>
            </div>
            <MainSelectLead
              disabled={loading}
              // value={allworkspaces?.find(row => row?.name === opportunity?.workspaceId?.name)}
              value={selectedWorkspace || ""}
              onChange={(value) =>
                setOpportunity({
                  ...opportunity,
                  workspaceId: value?._id || "",
                })
              }
              label={"Workspace"}
              placeholder={"Please Select Workspace"}
              options={allworkspaces ?? []}
            />
            <MainMultipleSelectTeam
              key={JSON.stringify(opportunity.team)}
              disabled={loading}
              value={opportunity.team}
              onChange={(value) =>
                setOpportunity({ ...opportunity, team: value })
              }
              onDeleteItem={(index) => {
                let tempData = [...opportunity.team];
                tempData.splice(index, 1);
                setOpportunity({ ...opportunity, team: tempData });
              }}
              label={"Team Members"}
              placeholder={""}
              // options={teamMembers.map(member => ({ _id: member._id, name: member.name }))}
              options={teamMembers}
            />
            <div>
              <MainMultipleSelect
                key={JSON.stringify(opportunity.partners)}
                disabled={loading}
                value={opportunity.partners}
                onChange={(value) =>
                  setOpportunity({ ...opportunity, partners: value })
                }
                onDeleteItem={(index) => {
                  let tempData = [...opportunity.partners];
                  tempData.splice(index, 1);
                  setOpportunity({ ...opportunity, partners: tempData });
                }}
                label={"Partners"}
                placeholder={""}
                options={partners ?? []}
              />

              <div className="mt-2 flex justify-end">
                <button
                  onClick={onPartnerAddClick}
                  className="flex items-center gap-2 text-app-blue text-xs"
                >
                  <div className="border border-app-blue">
                    <PlusIcon className="w-3 h-3" />
                  </div>
                  Add New
                </button>
              </div>
            </div>
            {data && (
              <div>
                <OpMapRoleMainMultipleSelect
                  key={JSON.stringify(opportunity.opportunityMappingRoles)}
                  disabled={loading}
                  value={opportunity.opportunityMappingRoles}
                  onChange={(value) =>
                    setOpportunity({
                      ...opportunity,
                      opportunityMappingRoles: value,
                    })
                  }
                  onDeleteItem={(index) => {
                    let tempData = [...opportunity.opportunityMappingRoles];
                    tempData.splice(index, 1);
                    setOpportunity({
                      ...opportunity,
                      opportunityMappingRoles: tempData,
                    });
                  }}
                  label={"OP Mapping Roles"}
                  placeholder={""}
                  options={opportunity.opportunityMappingRoles}
                />

                <div className="mt-2 flex justify-end">
                  <button
                    onClick={onOpMappingAddClick}
                    className="flex items-center gap-2 text-app-blue text-xs"
                  >
                    <div className="border border-app-blue">
                      <PlusIcon className="w-3 h-3" />
                    </div>
                    Add New
                  </button>
                </div>
              </div>
            )}

            {data && (
              <div>
                {/* <MainMultipleSelectTasks
                                    key={JSON.stringify(opportunity.tasks)}
                                    disabled={loading}
                                    value={opportunity.tasks}
                                    onChange={value => setOpportunity({ ...opportunity, tasks: value })}
                                    onDeleteItem={index => {
                                        let tempData = [...opportunity.tasks];
                                        tempData.splice(index, 1);
                                        setOpportunity({ ...opportunity, tasks: tempData });
                                    }}
                                    label={"Tasks"}
                                    placeholder={""}
                                    options={tasks.map(member => ({ _id: member.name, name: member.name }))}
                                /> */}

                <MainInput
                  disabled={true}
                  value={""}
                  label={"Tasks"}
                  placeholder={"Tasks"}
                />

                <div className="mt-2 flex justify-end">
                  <button
                    onClick={onTaskAddClick}
                    className="flex items-center gap-2 text-app-blue text-xs"
                  >
                    <div className="border border-app-blue">
                      <PlusIcon className="w-3 h-3" />
                    </div>
                    Add New
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="px-10 ">
            {error && <p className="text-red-500 mt-2 mb-2">{error}</p>}
            {success && <p className="text-green-500 mt-2 mb-2">{success}</p>}
          </div>
          <div className="flex justify-center items-center gap-5 mb-5">
            {/* {message && (
                            <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>
                                {message}
                            </div>
                        )} */}
            <button
              onClick={onClose}
              disabled={loading}
              className="disabled:bg-app-gray disabled:border-app-gray disabled:text-white flex items-center gap-3 border text-app-blue-2 border-app-blue-2 rounded-lg w-fit px-10 py-2"
            >
              Cancel
            </button>
            {/* <button
                            onClick={onCreate}
                            disabled={loading}
                            className='disabled:bg-app-gray flex items-center gap-3 bg-app-blue-2 rounded-lg w-fit px-10 py-2 text-white' >
                            {data ? "Save" : "Create"}
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
