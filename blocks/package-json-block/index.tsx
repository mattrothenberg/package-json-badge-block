import { FileBlockProps } from "@githubnext/blocks";

import { ErrorState } from "./components/error-state";
import { LoadingState } from "./components/loading-state";
import { PackageDetail } from "./components/package-detail";
import { usePackageDetails, useRunkitScript } from "./hooks";
import "./index.css";
import { PackageJson } from "./types";

function BlockInner(props: FileBlockProps) {
  const { content } = props;
  const parsedPackageJson = JSON.parse(content) as PackageJson;
  const { data, error } = usePackageDetails(parsedPackageJson.name);
  useRunkitScript();

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

  return <BlockInner {...props} />;
}
