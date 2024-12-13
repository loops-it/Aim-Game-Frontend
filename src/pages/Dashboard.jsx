import React from 'react'
import AuthenticatedLayout from '../layouts/AuthenticatedLayout'
import ClientCard from '../components/Authenticated/Dashboard/ClientCard'
import OpportunityCard from '../components/Authenticated/Dashboard/OpportunityCard'
import TaskCard from '../components/Authenticated/Dashboard/TaskCard'
import PartnerCard from '../components/Authenticated/Dashboard/PartnerCard'

export default function Dashboard({ title }) {
    document.title = title
    return (
        <AuthenticatedLayout>
            <div className='grid grid-cols-1 gap-10 lg:grid-cols-2' >
                <ClientCard />
                <OpportunityCard />
                <TaskCard />
                <PartnerCard />
            </div> 
        </AuthenticatedLayout>
    )
}
