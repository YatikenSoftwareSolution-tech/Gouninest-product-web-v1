// import PropertiesLocationTabs from "@/components/PropertiesLocationTabs";
import SearchedProperties from "@/components/SearchedProperties";
import { Property } from "@/types/types";
import { fetchApi } from "@/utils/fetchApi";

interface Props {
  searchParams: Promise<{
    country?: string;
    city?: string;
    university?: string;
  }>;
}

export default async function Properties({ searchParams }: Props) {
  const params = await searchParams;
  const { country, city, university } = params;
  let properties: Property[] = [];
  let response;
  if (country && city) {
    response = await fetchApi(
      `/properties/searchproperties?country=${country}&city=${city}`
    );
  } else if (university) {
    response = await fetchApi(
      `/properties/searchproperties?keyword=${university}&field=university`
    );
  }

  if (response && typeof response === "object" && "properties" in response) {
    properties = response.properties as Property[];
  } else {
    properties = [];
  }

  const renderHeading = () => {
    if (university) {
      return (
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 ">
          Browse Properties near{" "}
          <span className="text-gradient bg-gradient-to-r from-[var(--color-electric-500)] to-amber-500 bg-clip-text text-transparent">
            {university}
          </span>
        </h1>
      );
    } else {
      return (
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 ">
          Browse Properties in{" "}
          <span className="text-gradient bg-gradient-to-r from-[var(--color-electric-500)] to-amber-500 bg-clip-text text-transparent">
            {country || ""}- {city || ""}
          </span>
        </h1>
      );
    }
  };
  return (
    <div className="min-h-screen">
      <div className="text-center mt-20 animate-fade-in">
        {renderHeading()}
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-2">
          Explore our verified student accommodations across top university
          cities in the UK, Australia, and the USA. Each listing is curated to
          ensure affordability, accessibility, and comfort, no matter where
          you&apos;re headed.
        </p>
      </div>

      <SearchedProperties properties={properties} />
    </div>
  );
}
