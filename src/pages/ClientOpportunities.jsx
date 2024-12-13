import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '../layouts/AuthenticatedLayout'
import { ChevronUpDownIcon, PlusIcon, ArrowPathIcon, EllipsisVerticalIcon, ArrowUpRightIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import TableProvider from '../components/TableProvider'
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import MainSelect from '../components/MainSelect';
import CreateUpdateModal from '../components/Authenticated/Workspaces/CreateUpdateModal';
import api from '../services/api';
import { useParams } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import AvatarGroup from '@mui/material/AvatarGroup';

export default function Events({ title }) {
    
    const { clientId } = useParams();
    document.title = title
    
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [selectedData, setSelectedData] = useState(null)
    const [tempData, setTempData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 50;
    useEffect(() => {
        const fetchOpportunities = async () => {
            try {
                const response = await api.get(`/api-v1/opportunities/client/${clientId}`);
                setTempData(response.data.data);
            } catch (error) {
                console.error('Error fetching opportunities:', error);
            }
        };

        fetchOpportunities();
    }, []);
    console.error('Fetching workspaces:', tempData);
    const paginatedData = tempData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

    return (
        <AuthenticatedLayout>
           
           
            <div className='bg-white rounded-lg mt-10' >
                <div className='flex items-center justify-between h-20 p-5' >
                    <div className='flex items-center gap-5' >
                        <div className="text-lg lg:text-2xl text-app-blue font-semibold" >Client Opportunities</div>
                        <button
                            onClick={() => setLoading(true)}
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
                    emptyMessage="No Workspaces Found"
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
                                Status
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Team
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Rate
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Lead
                            </th>
                            {/* <th scope="col" className="py-5 px-6 border-b">

                            </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData?.map((row, index) => {
                            return (
                                <tr key={index} className="bg-white border-b text-gray-900 ">
                                    <td className="py-5 px-6" >{row?.referenceNumber}</td>
                                    <td className="py-5 px-6" >{row?.startDate}</td>
                                    <td className="py-5 px-6" >{row?.endDate}</td>
                                    <td className="py-5 px-6" >{row?.name}</td>
                                    <td className="py-5 px-6" >{row?.funnelStatusId ? row.funnelStatusId.stage : "-"}</td>
                                    <td className="py-5 px-6" >{row?.probability}</td>
                                    <td className="py-5 px-6" >{row?.funnelStatusId ? row.funnelStatusId.status : "-"}</td>
                                    <td className="py-5 px-6" >
                                        <Chip
                                            sx={{ borderColor: getStatusColor(row?.funnelStatusId ? row.funnelStatusId.status : "-"), color: getStatusColor(row?.status), fontWeight: "700", textTransform: "uppercase" }}
                                            icon={<ArrowUpRightIcon style={{ color: getStatusColor(row?.funnelStatusId ? row.funnelStatusId.status : "-") }} className='w-5 h-5' />}
                                            label={row?.funnelStatusId ? row.funnelStatusId.status : "-"}
                                            variant="outlined"
                                        />
                                    </td>
                                    <td className="py-5 px-6" >
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
                                    </td>
                                    <td className="py-5 px-6" >{row?.funnelStatusId ? row.funnelStatusId.rate : "-"}</td>
                                    <td className="py-5 px-6" >{row?.leadId ? row.leadId.name : "-"}</td>
                                    {/* <td>
                                        <button
                                            onClick={() => {
                                                setShow(true)
                                                setSelectedData(row)
                                            }}
                                        >
                                            <PencilSquareIcon className='w-6 h-6 text-app-blue-2' />
                                        </button>
                                    </td> */}
                                </tr>
                            )
                        })}
                    </tbody>
                </TableProvider>
            </div>
            <CreateUpdateModal
                data={selectedData}
                show={show}
                onClose={() => setShow(false)}
            />
        </AuthenticatedLayout>
    )
}
