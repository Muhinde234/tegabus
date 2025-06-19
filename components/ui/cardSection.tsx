import Card from "../ui/card";

import { features } from "../../helpers/data";

const CardSection = () => {
  return (
    <div>
      
        <div className="py-10 px-4 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:w-[1356px]  ">
            {features.map((feature, index) => (
              <Card
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
     
    </div>
  );
};

export default CardSection;
