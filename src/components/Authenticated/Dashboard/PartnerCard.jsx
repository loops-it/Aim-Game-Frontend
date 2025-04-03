import React, { useState, useEffect } from 'react'
import Divider from '@mui/material/Divider';
import { ArrowPathIcon, EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import TableProvider from '../../TableProvider'
import api from '../../../services/api';

const tempData = [
    {
        name: "Brad",
        company: "DB2",
        accountName: "Account 1",
        designation: "Head of Sales",
        contact: "77234564",
        email: "amal@gmail.com",
    },
]

export default function PartnerCard() {
    const [loading, setLoading] = useState(false)
    const [tempData, setTempData] = useState([]); 

    useEffect(() => {
        
        const fetchData = async () => {
          try {
            document.getElementById("page-loader").style.display = 'block';
            const response = await api.get(`/api-v1/partners`);
            setTempData(response.data.data);
            document.getElementById("page-loader").style.display = 'none';
            setLoading(false);
          } catch (error) {
            console.error('Error fetching data:', error);
            document.getElementById("page-loader").style.display = 'none';
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
                    <div className="text-lg lg:text-2xl text-app-blue font-semibold" >All Partners</div>
                    {/* <button
                        onClick={() => {
                            setLoading(true)
                        }}
                    >
                        <ArrowPathIcon className={`${loading ? "animate-spin" : ""} w-6 h-6`} />
                    </button> */}
                </div>
                {/* <button>
                    <EllipsisVerticalIcon className='w-8 h-8' />
                </button> */}
            </div>
            <Divider />
            <TableProvider data={tempData} loading={loading} emptyMessage="No Partners Found" >
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
            </tr>
                </thead>
                <tbody>
                    {tempData?.slice(0, 7).map((row, index) => {
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
                          {/* <td className="py-5 px-6" >{row?.workspaceId ? row.workspaceId.contactEmail : "-"}</td> */}
                          {/* <td className="py-5 px-6" >{row?.contacts}</td> */}
        
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
                        </tr>
                        )
                    })}
                </tbody>
            </TableProvider>
            <div style={{ textAlign: 'center'}}>
            <a href={"/partners"} ><button className='bg-app-blue-2 rounded-lg w-full lg:w-fit px-6 py-2 text-white mt-4 mb-4' >
                    <div>View All</div>
            </button></a>
            </div>
        </div>
    )
}
