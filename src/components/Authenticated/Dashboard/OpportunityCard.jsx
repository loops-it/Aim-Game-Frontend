import React, { useState, useEffect } from 'react'
import Divider from '@mui/material/Divider';
import { ChevronUpDownIcon, PlusIcon, ArrowPathIcon, EllipsisVerticalIcon, ArrowUpRightIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import TableProvider from '../../TableProvider'
import api from '../../../services/api';
import Chip from '@mui/material/Chip';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
const tempData = [
    {
        opportunityName: "Sale of office supplies",
        stage: "Suspect",
        probability: "10%",
        funnelStatus: "No Task",
        rate: "Law",
        lead: "James",
    },
    {
        opportunityName: "New Sale of office supplies",
        stage: "Suspect",
        probability: "40%",
        funnelStatus: "Proposal Submission",
        rate: "Law",
        lead: "James",
    },
]

export default function OpportunityCard() {
    const [loading, setLoading] = useState(false)
    const [tempData, setTempData] = useState([]);
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

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await api.get(`/api-v1/opportunities`);
            setTempData(response.data.data);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000);
    }, [loading])
    return (
        <div className='bg-white rounded-lg min-h-[25rem] dashboard-table-container' >
            <div className='flex items-center justify-between h-20 p-5' >
                <div className='flex items-center gap-5' >
                    <div className="text-lg lg:text-2xl text-app-blue font-semibold" >All Opportunities</div>
                    <button
                        onClick={() => {
                            setLoading(true)
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
            <TableProvider data={tempData} loading={loading} emptyMessage="No Opportunity Found">
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
                            {/* <th scope="col" className="py-5 px-6 border-b">
                                Funnel Status
                            </th> */}
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
                                Lead
                            </th>
                           
                        </tr>
                </thead>
                <tbody>
                    {tempData?.slice(0, 8).map((row, index) => {
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
                            <td className="py-5 px-6" >{row?.leadId ? row.leadId.name : "-"}</td>
                           
                        </tr>
                        )
                    })}
                </tbody>
            </TableProvider>
            <div style={{ textAlign: 'center'}}>
            <a href={"/opportunities"} ><button className='bg-app-blue-2 rounded-lg w-full lg:w-fit px-6 py-2 text-white mt-4 mb-4' >
                    <div>View All</div>
            </button></a>
            </div>
        </div>
    )
}
