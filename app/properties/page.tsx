
// import PropertiesLocationTabs from "@/components/PropertiesLocationTabs";
import SearchedProperties from "@/components/SearchedProperties";
import { Property } from "@/types/types";
import { fetchApi } from "@/utils/fetchApi";

interface Props {
  searchParams: {
    country?: string;
    city?: string;
    university?: string;
  };
}

export default async function Properties({ searchParams }: Props) {
  const { country, city, university } = await searchParams;
  let properties: Property[] = [];
  let response;
  if (country && city) {
    response = await fetchApi(`/properties/searchproperties?country=${country}&city=${city}`);
  } else if (university) {
    response = await fetchApi(`/properties/searchproperties?keyword=${university}&field=university`);
  }

  if (
        response &&
        typeof response === "object" &&
        "properties" in response
      ) {
    properties = response.properties as Property[];
  } else {
    properties = [];
  }
  return (
    <div className="min-h-screen">
      {properties.length > 0 ? (
        <SearchedProperties properties={properties} />
      ) : (
        <p>No properties found.</p>
      )}
    </div>
  );
}
