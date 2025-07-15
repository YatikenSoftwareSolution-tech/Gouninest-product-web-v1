"use client";

import PropertiesHero from "@/components/PropertiesHero";
import PropertiesLocationTabs from "@/components/PropertiesLocationTabs";
import ScrollTransition from "@/components/ScrollTransition";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const PropertiesContent = () => {
  const searchParams = useSearchParams();
  const country = searchParams.get("country");
  const city = searchParams.get("city");

  const hasFilters = country !== null && city !== null;

  return (
    <>
      {!hasFilters && <PropertiesHero />}
      <ScrollTransition />
      <PropertiesLocationTabs />
    </>
  );
};

const Properties = () => {
  return (
    <div className="min-h-screen">
      <Suspense fallback={null}>
        <PropertiesContent />
      </Suspense>
    </div>
  );
};

export default Properties;
