import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';

export default function AttendanceIndex({ auth, attendances }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Attendance</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-4">
                                <label className="font-bold"> Attendances : {attendances.total}</label>
                            </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b-2">
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black">
                                            Id
                                        </th>
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black">
                                            Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black">
                                            Description
                                        </th>
                                        <th className="px-6 py-3 text-left text-lg font-medium text-black">
                                            Address
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendances.data.map((attendance) => (
                                        <tr key={attendance.id} className="border-b">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {attendance.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {attendance.created_at}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {attendance.user.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {attendance.status}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {attendance.description ?? '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {attendance.address}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Pagination links={attendances.links}/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
