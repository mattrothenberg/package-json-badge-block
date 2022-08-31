import { FileBlockProps } from "@githubnext/blocks";
import { SWRConfig } from "swr";
import { tw } from "twind";
import { ErrorState } from "./components/error-state";
import { LoadingState } from "./components/loading-state";
import { PackageDetail } from "./components/package-detail";
import { usePackageDetails } from "./hooks";
import "./index.css";
import { PackageJson } from "./types";

function BlockInner(props: FileBlockProps) {
  const { content } = props;
  const parsedPackageJson = JSON.parse(content) as PackageJson;
  const { data, error } = usePackageDetails(parsedPackageJson.name);

  if (!data) return <LoadingState />;
  if (error)
    return (
      <ErrorState>
        Failed to fetch package details. Has this package been published to NPM?
      </ErrorState>
    );

  return <PackageDetail details={data} pkgJson={parsedPackageJson} />;
}

export default function (props: FileBlockProps) {
  const { context } = props;

  if (context.path !== "package.json")
    return <ErrorState>This block only works on package.json</ErrorState>;

  return (
    <SWRConfig
      value={{
        errorRetryCount: 0,
        refreshInterval: 0,
        revalidateOnMount: false,
        revalidateOnFocus: false,
      }}
    >
      <BlockInner {...props} />
    </SWRConfig>
  );
}
