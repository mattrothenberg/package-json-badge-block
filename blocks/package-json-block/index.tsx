import { FileBlockProps } from "@githubnext/blocks";
import { tw } from "twind";
import { ErrorState } from "./components/error-state";
import "./index.css";

function BlockInner(props: FileBlockProps) {
  return <div>Stuff goes here</div>;
}

export default function (props: FileBlockProps) {
  const { context, content, metadata, onUpdateMetadata } = props;
  if (context.path !== "package.json") return <ErrorState />;
  return <div>You made it </div>;
}
