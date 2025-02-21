/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import {
  PlusIcon,
  ArrowPathIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import TableProvider from "../components/TableProvider";
import Divider from "@mui/material/Divider";
import MainSelect from "../components/MainSelect";
import CreateUpdateModal from "../components/Authenticated/Partner/CreateUpdateModal";
import api from "../services/api";
import MainSelectNoId from "../components/MainSelectNoId";

export default function Partners({ title }) {
  document.title = title;

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [tempData, setTempData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [workspaces, setWorkspaces] = useState([]);
  const [clients, setClients] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);

  // client: null,
  const [filterValues, setFilterValues] = useState({
    workspace: null,
    company: null,
  });

  const handleWorkspaceChange = async (workspaceId) => {
    try {
      setLoading(true);
      console.log("selectedWorkspaceId :", workspaceId);
      // Fetch filtered data based on selected workspace
      const response = await api.get(
        `/api-v1/partners/filterbyworkspace/${workspaceId}`
      );
      setTempData(response.data.data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await api.get("/api-v1/workspaces");
        // console.log("WORKSPACES :" , response.data.data);
        setWorkspaces(response.data.data);
      } catch (error) {
        console.error("Error fetching workspaces:", error);
      }
    };

    fetchWorkspaces();
  }, []);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      document.getElementById("page-loader").style.display = "block";
      const response = await api.get("/api-v1/partners");
      setTempData(response.data.data);
      console.log(response.data.data);
      document.getElementById("page-loader").style.display = "none";
    } catch (error) {
      console.error("Error fetching workspaces:", error);
      document.getElementById("page-loader").style.display = "none";
    }
  };



  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await api.get('/api-v1/clients');
        setClients(response.data.data);
      } catch (error) {
        console.error('Error fetching workspaces:', error);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await api.get("/api-v1/clients");
        setClients(response.data.data);
      } catch (error) {
        console.error("Error fetching workspaces:", error);
      }
    };

    fetchWorkspaces();
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api.get("/api-v1/partners/filter/companies/get");
        setCompanies(response.data.data);
        console.log("companies : ", response.data);
      } catch (error) {
        console.error("Error fetching workspaces:", error);
      }
    };

    fetchCompanies();
  }, []);

  // console.log("tempData : ", tempData)

  const paginatedData = tempData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [loading]);

  const handleAllWorkspaceChange = (workspaceId) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      workspace: workspaceId,
    }));
  };

  // const handleClientChange = (clientId) => {
  //     setFilterValues((prevValues) => ({
  //         ...prevValues,
  //         client: clientId,
  //     }));
  // };

  const handleCompanyChange = (companyId) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      company: companyId,
    }));
  };

  const handleFilterClick = async () => {
    console.log("filter values ======== >", filterValues);
    try {
      const response = await api.post(
        `/api-v1/partners/filter/partners/get`,
        filterValues
      );
      console.log("Response:", response.data);
      setTempData(response.data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="flex flex-col-reverse lg:flex-row  lg:items-center justify-between gap-3">
        <div className="flex lg:items-center gap-3">
          {/* <input
                        type="search"
                        placeholder='Search'
                        onChange={(e) => setSearchValue(e.target.value)}
                    />

                    <button
                        onClick={fetchSearchResults}
                        className='flex justify-center items-center text-white bg-app-gray-5 px-5 py-2 w-full lg:w-fit rounded-lg'
                    >
                        Search
                    </button> */}
          <a
            href={"/partners"}
            className="flex justify-center items-center text-white bg-app-gray-5 px-5 py-2 w-full lg:w-fit rounded-lg"
            style={{ cursor: "pointer" }}
          >
            See All
          </a>
        </div>
        <button
          onClick={() => {
            setShow(true);
            setSelectedData(null);

          }}
          className="flex items-center gap-3 justify-center bg-app-blue-2 rounded-lg w-full lg:w-fit px-6 py-2 text-white"
        >
          <PlusIcon className="w-6 h-6 text-white" />
          <div>Create Partner</div>
        </button>
      </div>
      <div className="">
        {/* <div className='flex flex-col lg:flex-row lg:justify-end my-3' >
                    <MainSelect
                        variant="small"
                        placeholder={"Select Workspace"}
                        options={workspaces}
                        onChange={(selectedOption) => {
                            setSelectedWorkspace(selectedOption._id);
                            handleWorkspaceChange(selectedOption._id);
                        }}
                    />
                </div> */}
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-5">
          {/* <MainSelect
                        variant="small"
                        placeholder={"Select Account"}
                        options={[
                            { id: 1, name: 'Account 1' },
                            { id: 2, name: 'Account 2' },
                        ]}
                    /> */}
          <MainSelect
            variant="small"
            placeholder={"Select Workspace"}
            options={workspaces}
            onChange={(selectedOption) => {
              console.log(selectedOption.name);
              handleAllWorkspaceChange(selectedOption._id);
            }}
          />
          {/* <MainSelect
                        variant="small"
                        placeholder={"Select Client"}
                        options={clients}
                        onChange={(selectedOption) => {
                            console.log(selectedOption.name);
                            handleClientChange(selectedOption.name);
                        }}
                    /> */}
          <MainSelectNoId
            variant="small"
            placeholder={"Select Company"}
            options={companies}
            onChange={(selectedOption) => {
              console.log(selectedOption.company);
              handleCompanyChange(selectedOption.company);
            }}
          />
          <button
            onClick={handleFilterClick}
            className="flex items-center gap-3 justify-center bg-app-blue-2 rounded-lg w-full lg:w-fit px-6 py-2 text-white"
          >
            <div>Filter</div>
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg mt-10">
        <div className="flex items-center justify-between h-20 p-5">
          <div className="flex items-center gap-5">
            <div className="text-lg lg:text-2xl text-app-blue font-semibold">
              All Partners
            </div>
            <button

              onClick={() => {
                setLoading(true);
                fetchPartners();
              }}
            >
              <ArrowPathIcon
                className={`${loading ? "animate-spin" : ""} w-6 h-6`}
              />
            </button>
          </div>
          {/* <button>
                        <EllipsisVerticalIcon className='w-8 h-8' />
                    </button> */}
        </div>
        <Divider />
        <TableProvider
          currentPage={currentPage}
          setCurrentPage={(page) => setCurrentPage(page)}
          itemsPerPage={itemsPerPage}
          pagination={true}
          data={tempData}
          loading={loading}
          emptyMessage="No Partners Found"
        >
          <thead className="text-xs text-app-blue uppercase bg-white">
            <tr>
              <th scope="col" className="py-5 px-6 border-b">
                ID
              </th>
              <th scope="col" className="py-5 px-6 border-b">
                Date
              </th>
              <th scope="col" className="py-5 px-6 border-b">
                Company
              </th>
              <th scope="col" className="py-5 px-6 border-b">
                Name
              </th>
              <th scope="col" className="py-5 px-6 border-b">
                Rate
              </th>
              <th scope="col" className="py-5 px-6 border-b">
                Account Name
              </th>
              <th scope="col" className="py-5 px-6 border-b">
                Workspace
              </th>
              <th scope="col" className="py-5 px-6 border-b">
                Designation
              </th>
              <th scope="col" className="py-5 px-6 border-b">
                Contact
              </th>
              <th scope="col" className="py-5 px-6 border-b">
                Email
              </th>
              <th scope="col" className="py-5 px-6 border-b">
                Contact Person&apos;s Name
              </th>
              <th scope="col" className="py-5 px-6 border-b">
                Contact Person&apos;s Email
              </th>
              <th scope="col" className="py-5 px-6 border-b">
                Contact Person&apos;s Contact No.
              </th>
              <th scope="col" className="py-5 px-6 border-b">
                Contact Person&apos;s Designation
              </th>
              <th scope="col" className="py-5 px-6 border-b">
                Contact Person&apos;s Business
              </th>
              <th scope="col" className="py-5 px-6 border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((row, index) => {
              const firstContact = row?.contacts?.length > 0 ? row.contacts[0] : null;
              return (
                <tr key={index} className="bg-white border-b text-gray-900 ">
                  <td className="py-5 px-6">{row?._id}</td>
                  <td className="py-5 px-6">{row?.date}</td>
                  <td className="py-5 px-6">{row?.company}</td>
                  <td className="py-5 px-6">{row?.name}</td>
                  <td className="py-5 px-6">{row?.rate}</td>
                  <td className="py-5 px-6">{row?.accountName}</td>
                  <td className="py-5 px-6">{row?.workspaceId.name}</td>
                  <td className="py-5 px-6">
                    {row?.clientId ? row.clientId.designation : "-"}
                  </td>
                  <td className="py-5 px-6">
                    {row?.clientId ? row.clientId.phone : "-"}
                  </td>
                  <td className="py-5 px-6">
                    {row?.clientId ? row.clientId.email : "-"}
                  </td>
                  <td className="py-5 px-6">
                    {firstContact ? firstContact.name : "-"}
                  </td>
                  <td className="py-5 px-6">
                    {firstContact ? firstContact.email : "-"}
                  </td>
                  <td className="py-5 px-6">
                    {firstContact ? firstContact.phone : "-"}
                  </td>
                  <td className="py-5 px-6">
                    {firstContact ? firstContact.designation : "-"}
                  </td>
                  <td className="py-5 px-6">
                    {firstContact ? firstContact.business : "-"}
                  </td>


                  {/* <td className="py-5 px-6" >{row?.workspaceId ? row.workspaceId.contactEmail : "-"}</td> */}
                  {/* <td className="py-5 px-6" >{row?.contacts}</td> */}

                  <td>
                    <button
                      onClick={() => {
                        setShow(true);
                        setSelectedData(row);
                      }}
                    >
                      <PencilSquareIcon className="w-6 h-6 text-app-blue-2" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </TableProvider>
      </div>
      <CreateUpdateModal
        data={selectedData}
        workspaces={workspaces}
        clientsData={clients}
        show={show}
        onClose={() => setShow(false)}
      />
    </AuthenticatedLayout>
  );
}
