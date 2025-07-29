"use client";


import { useGlobal } from "@/context/GlobalContext";

import SearchedProperties from "./SearchedProperties";
import PropertyTabs from "./PropertyTabs";
import { useEffect, useState } from "react";
import { fetchTopProperties } from "@/constants/api";
import { CountryPropertyCount } from "@/types/types";

const PropertiesLocationTabs = () => {
  const [countryProperty, setCountryProperty] = useState<CountryPropertyCount[]>([]);
  const { properties, filterData } = useGlobal();

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
      <SearchedProperties properties={properties} filterData={filterData}/>
    );
  }
};

export default PropertiesLocationTabs;
