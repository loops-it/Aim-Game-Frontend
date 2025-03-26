import React, { useState, useEffect } from 'react'
import Divider from '@mui/material/Divider';
import { ArrowPathIcon, EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import TableProvider from '../../TableProvider'
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom'; 
import api from '../../../services/api';

const tempData = [
    {
        companyName: "Dialog 1",
        image: "https://fastly.picsum.photos/id/655/536/354.jpg?hmac=yks7pBLyZAstY3Khhmjee0_AcrlFgbVV6VpCAwNx1EU",
        industryType: "Telecommunication",
        email: "test@dialog.lk",
        contact: "+94312222344",
        address: "No 123 test rd, test",
    },
    {
        companyName: "Dialog 1",
        image: "https://fastly.picsum.photos/id/655/536/354.jpg?hmac=yks7pBLyZAstY3Khhmjee0_AcrlFgbVV6VpCAwNx1EU",
        industryType: "Telecommunication",
        email: "test@dialog.lk",
        contact: "+94312222344",
        address: "No 123 test rd, test",
    },
]

export default function ClientCard() {
    const [loading, setLoading] = useState(false)
    const [tempData, setTempData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await api.get(`/api-v1/clients`);
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
                    <div className="text-lg lg:text-2xl text-app-blue font-semibold" >All Clients</div>
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
            <TableProvider data={tempData} loading={loading} emptyMessage="No Clients Found">
                <thead className="text-xs text-app-blue uppercase bg-white ">
                <tr>
                            <th scope="col" className="py-5 px-6 border-b">
                                ID
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                            Reference No
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Logo
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Created Date
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Company Name
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Industry Type
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Business Address
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Contact
                            </th>
                            <th scope="col" className="py-5 px-6 border-b">
                                Business Email
                            </th>
                           
                        </tr>
                </thead>
                
                <tbody>
                    {tempData?.slice(0, 10).map((row, index) => {
                         const formattedDate = new Date(row?.createdAt).toLocaleDateString();
                        return (
                            <tr key={index} className="bg-white border-b text-gray-900 ">
                                    <td className="py-5 px-6" >{row?._id}</td>
                                    <td className="py-5 px-6" >{row?.refNo}</td>
                                    <td className="py-3 px-6" >
                                                        <Link to={`/client/${row._id}`}>
                                        <div className="flex items-center gap-2">
                                            <Avatar
                                            alt="Remy Sharp"
                                            src={row?.photo}
                                            sx={{ border: "0.5px solid #ABB3BB" }}
                                            />
                                           
                                        </div>
                                        </Link>
                                    </td>
                                    <td className="py-5 px-6" >{formattedDate}</td>
                                    <td className="py-5 px-6" >{row?.name}</td>
                                    <td className="py-5 px-6" >{row?.industryTypeId ? row.industryTypeId.name : "-"}</td>
                                    <td className="py-5 px-6" >{row?.address}</td>
                                    <td className="py-5 px-6" >{row?.phone}</td>
                                    <td className="py-5 px-6" >{row?.email}</td>
                                    
                                </tr>
                        )
                    })}
                </tbody>
            </TableProvider>
            <div style={{ textAlign: 'center'}}>
            <a href={"/clients"} ><button className='bg-app-blue-2 rounded-lg w-full lg:w-fit px-6 py-2 text-white mt-4 mb-4' >
                    <div>View All</div>
            </button></a>
            </div>
        </div>
    )
}
