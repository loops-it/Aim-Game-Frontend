/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '../layouts/AuthenticatedLayout'
import { PlusIcon, ArrowPathIcon, EllipsisVerticalIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import TableProvider from '../components/TableProvider'
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import CreateUpdateModal from '../components/Authenticated/Client/CreateUpdateModal';
import api from '../services/api'
import SearchModal from '../components/Authenticated/Client/SearchModal';

export default function Clients({ title }) {
    document.title = title
 
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [selectedData, setSelectedData] = useState(null)
    const [showSearch, setShowSearch] = useState(false)
    const [allClients, setAllClients] = useState([]);

    const updateAllClients = (data) => {
        setAllClients(data);
      };
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;



    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000);
    }, [loading])


    // api data
    const [clients, setClients] = useState([]);
    const [industryTypes, setIndustryTypes] = useState([]);
    const [workspaces, setWorkspaces] = useState([]);
    const [searchValue, setSearchValue] = useState([]);
    const [allworkspaces, setAllWorkspaces] = useState([]);


    // industry types data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/api-v1/industryTypes');
                const data = response.data.data;
                setIndustryTypes(data);
            } catch (error) {
                // console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    // console.log("industryTypes data : ", industryTypes);



    // workspace data
    // useEffect(() => {
    //     const fetchWorkspaces = async () => {
    //         try {
    //             const response = await api.get('/api-v1/workspaces');
    //             setWorkspaces(response.data.data);
    //         } catch (error) {
    //             console.error('Error fetching workspaces:', error);
    //         }
    //     };

    //     fetchWorkspaces();
    // }, []);


    // // clients data
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await api.get('/api-v1/clients');
    //             const data = response.data.data;
    //             setClients(data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);
    
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch workspaces first
                const workspacesResponse = await api.get(`/api-v1/workspaces/user/${localStorage.userID}`);
                const workspacesData = workspacesResponse.data.data;
                setWorkspaces(workspacesData);
                // Fetch opportunities for each workspace
                const clientsData = [];
                for (const workspace of workspacesData) {
                    // console.log('WSID:', workspace._id);
                    const clientsResponse = await api.get(`/api-v1/clients/workspace/${workspace._id}`);
                    const clientsForWorkspace = clientsResponse.data.data;
                    clientsData.push(...clientsForWorkspace);
                }
    
                setClients(clientsData);
                
            } catch (error) {
                // console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

    // console.log("clients workspace data : ", clients)

    const fetchAllWorkspaces = async () => {
        try {
            const response = await api.get('/api-v1/workspaces');
            const data = response.data.data;
            setAllWorkspaces(data);
        } catch (error) {
            // console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchClients();
        fetchAllWorkspaces();
    }, []);

    const fetchClients = async () => {
        try {
            document.getElementById("page-loader").style.display = 'block';
            const response = await api.get('/api-v1/clients');
            setAllClients(response.data.data);
            document.getElementById("page-loader").style.display = 'none';
            // console.log("allClients2 : ", response.data.data)
        } catch (error) {
            // console.error('Error fetching workspaces:', error);
            document.getElementById("page-loader").style.display = 'none';
        }
    };

 

    const fetchSearchResults = async () => {
        if (searchValue.trim() !== '') {
            try {
                const response = await api.get(`/api-v1/clients/${searchValue}`);
                const data = response.data.data;
                // setClients(data.data);
                // console.log('Search results:', data);
            } catch (error) {
                console.error('Error fetching data by id:', error);
            }
        }
    };


   console.log("selected data : ", selectedData)
   console.log("allClients : ", allClients)
    // console.log(clients)
    const paginatedData = allClients.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    return (
        <AuthenticatedLayout>
            <div className='flex flex-col-reverse lg:flex-row  lg:items-center justify-between gap-3'  >
                <div className='flex lg:items-center gap-3' >
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
                     <button onClick={() => setShowSearch(true)} className='flex justify-center items-center text-white bg-app-gray-5 px-5 py-2 w-full lg:w-fit rounded-lg' >Search</button>
                     <a href={'/clients'} className='flex justify-center items-center text-white bg-app-gray-5 px-5 py-2 w-full lg:w-fit rounded-lg' style={{cursor: 'pointer'}} >See All</a>
                </div>
                <button onClick={() => {
                    setShow(true)
                    setSelectedData(null)
                }} className='flex items-center gap-3 justify-center bg-app-blue-2 rounded-lg w-full lg:w-fit px-6 py-2 text-white' >
                    <PlusIcon className='w-6 h-6 text-white' />
                    <div>Create Client</div>
                </button>
            </div>
            <div className='bg-white rounded-lg mt-10' >
                <div className='flex items-center justify-between h-20 p-5' >
                    <div className='flex items-center gap-5' >
                        <div className="text-lg lg:text-2xl text-app-blue font-semibold" >All Clients</div>
                        <button
                            onClick={() => {
                                setLoading(true);
                                fetchClients();
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
                     data={allClients}
                     loading={loading}
                     emptyMessage="No Opportunity Found"
                >
                    <thead className="text-xs text-app-blue uppercase bg-white">
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
                            <th scope="col" className="py-5 px-6 border-b">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData?.map((row, index) => {
                            const formattedDate = new Date(row?.createdAt).toLocaleDateString();
                            
                            return (
                                <tr key={index} className="bg-white border-b text-gray-900 ">
                                    <td className="py-5 px-6" >{row?._id}</td>
                                    <td className="py-5 px-6" >{row?.refNo}</td>
                                    <td className="py-5 px-6" >
                                        <Avatar
                                            alt={row?.name}
                                            src={row?.photo}
                                            sx={{ border: "0.5px solid #ABB3BB" }}
                                        />
                                        {/* <img src={row?.photo} style={{height:"50px", width: "50px", borderRadius: '100%'}}></img> */}
                                    </td>
                                    <td className="py-5 px-6" >{formattedDate}</td>
                                    <td className="py-5 px-6" >{row?.name}</td>
                                    <td className="py-5 px-6" >{row?.industryTypeId.name}</td>
                                    <td className="py-5 px-6" >{row?.address}</td>
                                    <td className="py-5 px-6" >{row?.phone}</td>
                                    <td className="py-5 px-6" >{row?.email}</td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                setShow(true)
                                                setSelectedData(row)
                                            }}
                                        >
                                            <PencilSquareIcon className='w-6 h-6 text-app-blue-2' />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </TableProvider>
            </div>
            <CreateUpdateModal
                data={selectedData}
                industryTypes={industryTypes}
                workspaces={workspaces}
                allworkspaces={allworkspaces}
                clients={clients}
                show={show}
                onClose={() => {
                    setShow(false)
                    fetchClients();
                }}
            />
            <SearchModal
                list={allClients}
                show={showSearch}
                onClose={() => setShowSearch(false)}
                updateAllClients={updateAllClients}
            />
        </AuthenticatedLayout>
    )
}
