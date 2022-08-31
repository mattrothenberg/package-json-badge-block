import wretch from "wretch";
import { useEffect, useState } from "react";
import { getPackument } from "query-registry";
import useSWR from "swr";
import { PackageDetailResponse } from "../types";

export const packageDetailsFetcher = (url: string) =>
  wretch(url)
    .get()
    .json<PackageDetailResponse>()
    .catch((e) => {
      debugger;
      console.log("ERROR", e);
    });

export function usePackageDetails(name: string) {
  return useSWR(
    `https://api.npms.io/v2/package/${encodeURIComponent(name)}`,
    packageDetailsFetcher
  );
}

export function useRegistryDetails(name: string) {
  return useSWR(`https://registry.npmjs.org/${encodeURIComponent(name)}`, () =>
    getPackument({ name })
  );
}

export const useRunkitScript = () => {
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (initialized) return;
    const script = document.createElement("script");

    script.src = `https://embed.runkit.com`;
    document.body.appendChild(script);

    setInitialized(true);

    return () => {
      document.body.removeChild(script);
    };
  }, [initialized]);
};
