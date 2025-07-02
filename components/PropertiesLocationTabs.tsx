"use client";


import { useGlobal } from "@/context/GlobalContext";
import PropertyTabs from "./PropertyTabs";
import SearchedProperties from "./SearchedProperties";

const PropertiesLocationTabs = () => {
  const { properties, filterData } = useGlobal();
  console.log(properties);
  if (properties.length === 0) {
    return <PropertyTabs />;
  } else {
    return (
      <SearchedProperties properties={properties} filterData={filterData}/>
    );
  }
};

export default PropertiesLocationTabs;
