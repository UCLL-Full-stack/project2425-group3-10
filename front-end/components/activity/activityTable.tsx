import {Activity} from "@/types";

type Props = {
    activities: Array<Activity>
}
const ActivityTable: React.FC<Props>=({activities})=>{
    return (
        <>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-200 px-4 py-2 text-left text-gray-600 font-medium">Name</th>
                        <th className="border border-gray-200 px-4 py-2 text-left text-gray-600 font-medium">Description</th>
                        <th className="border border-gray-200 px-4 py-2 text-left text-gray-600 font-medium">Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {activities && activities.map((activity, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100`}>
                            <td className="border border-gray-200 px-4 py-2 text-gray-700">{activity.name}</td>
                            <td className="border border-gray-200 px-4 py-2 text-gray-700">{activity.description}</td>
                            <td className="border border-gray-200 px-4 py-2 text-gray-700">{activity.type}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ActivityTable