import { BusCompany } from "@/types/bus";
import { Button } from "./ui/button";

interface Props {
  company: BusCompany;
}

const BusCompanyCard: React.FC<Props> = ({ company }) => {
  return (
    <div className="border border-gray-300  rounded-lg shadow-sm p-6  mb-3 w-full sm:w-[300px]">
      <h2 className="text-xl font-semibold text-[#0B3B2E]">{company.name}</h2>
      <p className=" mb-2">Buses: {company.numberOfBuses}</p>
      <Button 
      variant="default"
      className="bg-[#0B3B2E] text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer">
        View Routes
      </Button>
      
    </div>
  );
};

export default BusCompanyCard;
