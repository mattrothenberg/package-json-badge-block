import wretch from "wretch";
import useSWR from "swr";
import { PackageDetailResponse } from "../types";

export const fetcher = (url: string) =>
  wretch(url).get().json<PackageDetailResponse>();

export function usePackageDetails(name: string) {
  return useSWR(
    `https://api.npms.io/v2/package/${encodeURIComponent(name)}`,
    fetcher
  );
}
