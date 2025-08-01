"use client";


import SearchedProperties from "./SearchedProperties";
import PropertyTabs from "./PropertyTabs";
import { useEffect, useState } from "react";
import { fetchTopProperties } from "@/constants/api";
import { CountryPropertyCount, Property } from "@/types/types";

const PropertiesLocationTabs = ({ properties }: { properties: Property[] }) => {
  const [countryProperty, setCountryProperty] = useState<CountryPropertyCount[]>([]);

  useEffect(() => {

    if(properties.length === 0){
      const response = fetchTopProperties();
      if(response && Array.isArray(response))
      setCountryProperty(response as CountryPropertyCount[])
    }
  },[])

  if (properties.length === 0) {
    return <PropertyTabs countryProperty={countryProperty}/>;
  } else {
    return (
      <SearchedProperties properties={properties}/>
    );
  }
};

export default PropertiesLocationTabs;
