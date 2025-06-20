import { BusCompany } from "@/types/bus";

interface Props {
  company: BusCompany;
}

const BusCompanyCard: React.FC<Props> = ({ company }) => {
  return (
    <div className="border border-[#0B3B2E] p-6 rounded-lg shadow-md w-full sm:w-[300px]">
      <h2 className="text-xl font-semibold text-[#0B3B2E]">{company.name}</h2>
      <p className=" mb-2">Buses: {company.numberOfBuses}</p>
      <button className="bg-[#0B3B2E] text-white px-4 py-2 rounded hover:bg-green-800">
        View Routes
      </button>
    </div>
  );
};

export default BusCompanyCard;
