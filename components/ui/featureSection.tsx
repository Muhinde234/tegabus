import FeatureCard from "../ui/card";
import {features} from "../../helpers/data"

const FeatureSection = () => {
  return (
    <div>
      
        <div className="py-10 px-4 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10   ">
            {features.map((feature, index) => (
              <FeatureCard
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

export default FeatureSection;
