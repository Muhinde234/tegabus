import ActionButton from "@/components/dashboard/ActionButton";
import StatsCard from "@/components/dashboard/statCard"
import Topsection from "@/components/dashboard/topsection"
import { Plus } from "lucide-react"


const users = Array.from({ length: 20 }, (_, i) => ({
  firstName: `First${i + 1}`,
  lastName: `Last${i + 1}`,
  phone: `+25078${String(i).padStart(6, "0")}`,
  role: i % 2 === 0 ? "Admin" : "User",
  country: ["Rwanda", "Kenya", "Uganda", "Tanzania", "DRC"][i % 5],

}));


const page = () => {
  return (
    <div className="px-6">
        <Topsection/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
            title="Passengers"
            value={30}
            description="End Users of our stystem"
            color="green"
          />
          <StatsCard
            title="Managers"
            value={20}
            description="Managers of our system"
            color="blue"
          />
          <StatsCard
            title="Administrator"
            value={1}
            description="controls the over all system"
            color="orange"
          />
          <StatsCard
            title="Verifiers"
            value={2}
            description="Verifiers who verify the tickets"
            color="teal"
          />   
     
        </div>
        <div className="flex justify-between">
    <h1 className="text-2xl font-bold ">Users  List </h1>
      <button
               
                  className="flex items-center gap-2 bg-[#1EA17E] text-white px-4 py-2 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                  
                >
                  <Plus size={20} />
                  
                  Add New User
                </button>
        </div>
 <div className="p-8">
    
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="py-2 px-4">First Name</th>
              <th className="py-2 px-4">Last Name</th>
              <th className="py-2 px-4">Phone</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Country</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} >
                <td className="py-4 px-4">{user.firstName}</td>
                <td className="py-4 px-4">{user.lastName}</td>
                <td className="py-4 px-4">{user.phone}</td>
                <td className="py-4 px-4">{user.role}</td>
                <td className="py-4 px-4">{user.country}</td>
                 <td className="py-4 px-4">
            <ActionButton/>
                    
         </td>
              </tr>
            ))}
            <tr>

            </tr>
           

          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default page