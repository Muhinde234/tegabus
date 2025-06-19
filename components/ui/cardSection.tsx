import Card from "../ui/card";

import { infos } from "../../helpers/data";

const CardSection = () => {
  return (
    <div>
      
        <div className="py-10 px-4 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10   ">
            {infos.map((info, index) => (
              <Card
                key={index}
                icon={info.icon}
                title={info.title}
                description={info.description}
              />
            ))}
          </div>
        </div>
     
    </div>
  );
};

export default CardSection;
