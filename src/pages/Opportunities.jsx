/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '../layouts/AuthenticatedLayout'
import Divider from '@mui/material/Divider';
import { ChevronUpDownIcon, PlusIcon, ArrowPathIcon, EllipsisVerticalIcon, ArrowUpRightIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import TableProvider from '../components/TableProvider'
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import CreateUpdateModal from '../components/Authenticated/Opportunity/CreateUpdateModal';
import SearchModal from '../components/Authenticated/Opportunity/SearchModal';
import RoleMappingModal from '../components/Authenticated/Opportunity/RoleMappingModal';
import PartnerCreateModal from '../components/Authenticated/Partner/CreateUpdateModal';
import TaskCreateModal from '../components/Authenticated/Task/CreateUpdateModal';
import api from '../services/api';
import ClientCreateUpdateModal from '../components/Authenticated/Client/ClientCreateUpdateModal';



export default function Opportunities({ title }) {
    document.title = title

    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [selectedData, setSelectedData] = useState(null)
    const [showSearch, setShowSearch] = useState(false)
    const [tempData, setTempData] = useState([]);
    const [roleMappingShow, setRoleMappingShow] = useState(false)
    const [partnerCreateModalShow, setPartnerCreateModalShow] = useState(false)
    const [taskCreateModalShow, setTaskCreateModalShow] = useState(false)
    const [clientCreateShow, setClientCreateShow] = useState(false)
    const [workspaces, setWorkspaces] = useState([]);
    const [allworkspaces, setAllWorkspaces] = useState([]);
    const [partners, setPartners] = useState([]);
    const [funnelStatus, setfunnelStatus] = useState([]);
    const [opLead, setOpLead] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [clients, setClients] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [mappingRoles, setMappingRoles] = useState([]);
    const [industryTypes, setIndustryTypes] = useState([]);


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const updateTempData = (data) => {
        setTempData(data);
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000);
    }, [loading])


    function getStatusColor(status) {
        if (status == "start") {
            return "#77C486"
        }
        if (status == "continue") {
            return "#F3EF15"
        }
        if (status == "Completed") {
            return "#E91818"
        }
        return "#9c9c9c"
    }


    const fetchTasks = async () => {
        try {
            const response = await api.get('/api-v1/tasks');
            setTasks(response.data.data);
        } catch (error) {
            console.error('Error fetching workspaces:', error);
        }
    };

    const fetchWorkspacesById = async () => {
        try {
            const response = await api.get(`/api-v1/workspaces/user/${localStorage.userID}`);
            setWorkspaces(response.data.data);
        } catch (error) {
            console.error('Error fetching workspaces:', error);
        }
    };

    const fetchfunnelStatus = async () => {
        try {
            const response = await api.get('/api-v1/funnelStatuses');
            setfunnelStatus(response.data.data);
        } catch (error) {
            console.error('Error fetching workspaces:', error);
        }
    };
    console.log("funnelStatus ---: ", funnelStatus)

    const fetchClients = async () => {
        try {
            const response = await api.get('/api-v1/clients');
            setClients(response.data.data);
        } catch (error) {
            console.error('Error fetching workspaces:', error);
        }
    };

    const fetchOpportunities = async () => {
        try {
            document.getElementById("page-loader").style.display = 'block';
            const response = await api.get(`/api-v1/opportunities`);
            setTempData(response.data.data);
            document.getElementById("page-loader").style.display = 'none';
        } catch (error) {
            console.error('Error fetching opportunities:', error);
            document.getElementById("page-loader").style.display = 'none';
        }
    };
    console.log("Opp Data : ", tempData)
    const deleteOpertunity = async (id) => {
        try {
            const response = await api.delete(`/api-v1/opportunities/${id}`);
            fetchOpportunities();
        } catch (error) {
            console.error('Error fetching workspaces:', error);
        }
    };
    const fetchOpportunitiesMappingRoles = async () => {
        try {
            const response = await api.get(`/api-v1/opportunities/65867fc7cbe698d4c8d1d716/mapping-role`);
            setMappingRoles(response.data.data);
        } catch (error) {
            console.error('Error fetching opportunities:', error);
        }
    };
    // console.log("opMappingRoles : - ", mappingRoles);

    // const fetchOpportunities = async () => {
    //     try {
    //         const response = await api.get('/api-v1/opportunities');
    //         setPartners(response.data.data);
    //     } catch (error) {
    //         console.error('Error fetching workspaces:', error);
    //     }
    // };

    const fetchLeadData = async () => {
        try {
            const response = await api.get('/api-v1/users');
            const data = response.data.data;
            console.log("op lead data : ", data)
            setOpLead(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchAllWorkspaces = async () => {
        try {
            const response = await api.get('/api-v1/workspaces');
            const data = response.data.data;
            setAllWorkspaces(data);
            console.log("op workspace data : ", data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchTeamMembers = async () => {
        try {
            const response = await api.get('/api-v1/team-members');
            setTeamMembers(response.data.data);
        } catch (error) {
            console.error('Error fetching workspaces:', error);
        }
    };

    console.log("team members : ", teamMembers)
    const fetchIndustryTypes = async () => {
        try {
            const response = await api.get('/api-v1/industryTypes');
            const data = response.data.data;
            setIndustryTypes(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    const fetchPartners = async () => {
        try {
            const response = await api.get('/api-v1/partners');
            setPartners(response.data.data);
        } catch (error) {
            console.error('Error fetching workspaces:', error);
        }
    };

    useEffect(() => {
        fetchOpportunitiesMappingRoles();
        fetchTasks();
        fetchWorkspacesById();
        fetchfunnelStatus();
        fetchClients();
        fetchOpportunities();
        fetchLeadData();
        fetchAllWorkspaces();
        fetchTeamMembers();
        fetchPartners();
        fetchIndustryTypes();
    }, []);

    // useEffect(() => {
    //     console.log("Opportunities : ", tempData)
    // }, [tempData])



    const paginatedData = tempData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // console.log("Mapping Roles : ", mappingRoles)


    return (
        <AuthenticatedLayout>
            <div className='flex flex-col-reverse lg:flex-row  lg:items-center justify-between gap-3' >
                <div className='flex lg:items-center gap-3' >
                    {/* <button className='flex items-center justify-between gap-3 bg-app-blue-2 rounded-lg w-full lg:w-fit px-6 py-2 text-white' >
                        <div>Period</div>
                        <ChevronUpDownIcon
                            className="h-5 w-5"
                        />
                    </button> */}
                    <button onClick={() => setShowSearch(true)} className='flex justify-center items-center text-white bg-app-gray-5 px-5 py-2 w-full lg:w-fit rounded-lg' >Search</button>
                    <a href={'/opportunities'} className='flex justify-center items-center text-white bg-app-gray-5 px-5 py-2 w-full lg:w-fit rounded-lg' style={{ cursor: 'pointer' }} >See All</a>
                </div>
                <button onClick={() => {
                    setShow(true)
                    setSelectedData(null)
                }} className='flex items-center gap-3 justify-center bg-app-blue-2 rounded-lg w-full lg:w-fit px-6 py-2 text-white' >
                    <PlusIcon className='w-6 h-6 text-white' />
                    <div>Create Opportunity</div>
                </button>
            </div>
            <div className='bg-white rounded-lg mt-10' >
                <div className='flex items-center justify-between h-20 p-5' >
                    <div className='flex items-center gap-5' >
                        <div className="text-lg lg:text-2xl text-app-blue font-semibold" >All Opportunities</div>
                        <button
                            onClick={() => {
                                setLoading(true);
                                fetchOpportunities();
                            }}
                        >
                            <ArrowPathIcon className={`${loading ? "animate-spin" : ""} w-6 h-6`} />
                        </button>
                    </div>
                    {/* <button>
                        <EllipsisVerticalIcon className='w-8 h-8' />
                    </button> */}
                </div>
                <Divider />
                <TableProvider
                    currentPage={currentPage}
                    setCurrentPage={page => setCurrentPage(page)}
                    itemsPerPage={itemsPerPage}
                    pagination={true}
                    data={tempData}
                    loading={loading}
                    emptyMessage="No Opportunity Found"
                >
                    <thead className="text-xs text-app-blue uppercase bg-white">
                        <tr>
                            <th scope="col" className="py-5 px-6 border-b">
                                ID
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Start Date
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                End Date
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Opportunity Name
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Stage
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Probability
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Funnel Status
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Team
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Rate
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Workspace
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Lead
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Client
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Reference Number
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Partners
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData?.map((row, index) => {
                            // console.log(row.funnelStatusId);
                            // console.log("Creation Date:", row?.creationDate);
                            // console.log("Completion Date:", row?.completionDate);
                            return (
                                <tr key={index} className="bg-white border-b text-gray-900 ">
                                    <td className="py-5 px-6" >{row?.referenceNumber}</td>
                                    <td className="py-5 px-6">
                                        {row?.creationDate ? new Date(row.creationDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        }) : ""}
                                    </td>

                                    {/* <td className="py-5 px-6">{row?.completionDate ? new Date(row?.completionDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    }) : ""}</td> */}
                                    <td className="py-5 px-6">
                                        {row?.completionDate ?
                                            new Date(row?.completionDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            }) :
                                            ""}
                                    </td>
                                    <td className="py-5 px-6" >{row?.name}</td>
                                    <td className="py-5 px-6" >{row?.funnelStatusId ? row.funnelStatusId.stage : "-"}</td>
                                    <td className="py-5 px-6" >{row?.funnelStatusId ? row.funnelStatusId.level : "-"}%</td>
                                    {/* <td className="py-5 px-6" >{row?.funnelStatusId ? row.funnelStatusId.status : "-"}</td> */}
                                    <td className="py-5 px-6" >
                                        <Chip
                                            sx={{ borderColor: getStatusColor(row?.funnelStatusId ? row.funnelStatusId.status : "-"), color: getStatusColor(row?.status), fontWeight: "700", textTransform: "uppercase" }}
                                            icon={<ArrowUpRightIcon style={{ color: getStatusColor(row?.funnelStatusId ? row.funnelStatusId.status : "-") }} className='w-5 h-5' />}
                                            label={row?.funnelStatusId ? row.funnelStatusId.status : "-"}
                                            variant="outlined"
                                        />
                                    </td>
                                    {/* <td className="py-5 px-6" >
                                        <div>
                                            <AvatarGroup
                                                renderSurplus={(surplus) => <span>+{surplus.toString()[0]}</span>}
                                                total={row?.team?.length}
                                            >
                                                {row?.team?.slice(0, 4)?.map((teamRow, teamIndex) => {
                                                    return (
                                                        <Avatar key={teamIndex} alt={teamRow?.name} src={teamRow?.image} />
                                                    )
                                                })}
                                            </AvatarGroup>
                                        </div>
                                    </td> */}
                                    <td className="py-5 px-6">
                                        <div>
                                            <AvatarGroup
                                                renderSurplus={(surplus) => <span>+{surplus.toString()[0]}</span>}
                                                total={row?.team?.length}
                                            >
                                                {row?.team?.slice(0, 4)?.map((teamRow, teamIndex) => (
                                                    <Avatar key={teamIndex} alt={teamRow?.name} src={teamRow?.image} />
                                                ))}
                                            </AvatarGroup>
                                        </div>
                                    </td>

                                    <td className="py-5 px-6" >{row?.funnelStatusId ? row.funnelStatusId.rate : "-"}</td>
                                    <td className="py-5 px-6" >{row?.workspaceId ? row.workspaceId.name : "-"}</td>
                                    <td className="py-5 px-6" >{row?.leadId ? row.leadId.name : "-"}</td>
                                    <td className="py-5 px-6" >{row?.clientId ? row.clientId.name : "-"}</td>
                                    <td className="py-5 px-6" >{row?.referenceNumber}</td>
                                    <td className="py-5 px-6">
                                        {row?.partners?.length
                                            ? row.partners.map(partner => partner.name).join(", ")
                                            : "-"}
                                    </td>

                                    <td>
                                        <button
                                            onClick={() => {
                                                setShow(true)
                                                setSelectedData(row)
                                            }}
                                        >
                                            <PencilSquareIcon className='w-6 h-6 text-app-blue-2' />
                                        </button>
                                        <button
                                            onClick={() => {
                                                deleteOpertunity(row?._id)
                                            }}
                                        >
                                            <TrashIcon className='w-6 h-6 text-app-blue-2' />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </TableProvider>
            </div>
            <CreateUpdateModal
                leadData={opLead}
                clients={clients}
                partners={partners}
                data={selectedData}
                funnelStatus={funnelStatus}
                allworkspaces={allworkspaces}
                teamMembers={teamMembers}
                show={show}
                tasks={tasks}
                onClose={() => setShow(false)}
                onOpMappingAddClick={() => setRoleMappingShow(true)}
                onPartnerAddClick={() => setPartnerCreateModalShow(true)}
                onTaskAddClick={() => setTaskCreateModalShow(true)}
            />

            <SearchModal
                list={tempData}
                show={showSearch}
                onClose={() => setShowSearch(false)}
                updateTempData={updateTempData}
            />

            <RoleMappingModal
                data={selectedData}
                allworkspaces={allworkspaces}
                show={roleMappingShow}
                onClose={() => setRoleMappingShow(false)}
            />

            <PartnerCreateModal
                data={null}
                clientsData={clients}
                allworkspaces={allworkspaces}
                workspaces={workspaces}
                show={partnerCreateModalShow}
                onClose={() => setPartnerCreateModalShow(false)}
            />
            <TaskCreateModal
                data={null}
                rowID={selectedData}
                funnelStatus={funnelStatus}
                show={taskCreateModalShow}
                onClose={() => setTaskCreateModalShow(false)}
            />

            <ClientCreateUpdateModal
                data={selectedData}
                industryTypes={industryTypes}
                workspaces={workspaces}
                allworkspaces={allworkspaces}
                show={clientCreateShow}
                onClose={() => setClientCreateShow(false)}
            />

        </AuthenticatedLayout>
    )
}
