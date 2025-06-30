

const FlightSchedule = () => {
  return (
    <div className="bg-white rounded shadow-lg border border-gray-200 mt-2 p-4 flex space-x-4">
  
      <div className="flex flex-col items-center space-y-6 mt-12">
        <div className="bg-gradient-to-r from-[#1EA17E] to-[#1EA17E] text-white px-3 py-1 rounded-r-full text-sm font-semibold">
          Next
        </div>
        <div className="border-l-2 border-dashed border-black h-6" />
        <div className="bg-gradient-to-r from-[#1EA17E] to-[#1EA17E] text-white px-3 py-1 rounded-r-full text-sm font-semibold">
          Later
        </div>
      </div>

     
      <div className="space-y-4">
      
        <div className="bg-blue-100 rounded-md overflow-hidden shadow-sm w-64">
          <div className="p-3">
            <p className="font-bold text-gray-900">RAC 320 D</p>
            <p className="text-gray-700 text-sm">Kigali to Uganda</p>
          </div>
          <div className="bg-[#1EA17E] text-white text-center text-sm py-2 font-medium">
            07:50 am
          </div>
        </div>

    
        <div className="bg-blue-100 rounded-md overflow-hidden shadow-sm w-64">
          <div className="p-3">
            <p className="font-bold text-gray-900">RAC 400 B</p>
            <p className="text-gray-700 text-sm">Kigali to Kinshasa</p>
          </div>
          <div className="bg-[#1EA17E] text-white text-center text-sm py-2 font-medium">
            08:30 am
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSchedule;
