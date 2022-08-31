import wretch from "wretch";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { PackageDetailResponse } from "../types";

export const fetcher = (url: string) =>
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
    fetcher
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
