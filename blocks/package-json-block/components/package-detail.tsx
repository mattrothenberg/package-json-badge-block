import { Avatar, AvatarStack } from "@primer/react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { tw } from "twind";

import { PackageDetailResponse, PackageJson } from "../types";
import { Label } from "./label";

export function PackageDetail({
  pkgJson,
  details,
}: {
  pkgJson: PackageJson;
  details: PackageDetailResponse;
}) {
  return (
    <div className={tw`border-b`}>
      <div className={tw`p-2 border-b bg-gray-50`}>
        <span className="font-mono text-sm">{pkgJson.name}</span>
      </div>
      <div className={tw`flex divide-x`}>
        <div className={tw`flex-shrink-0 w-52 space-y-4 pr-4 p-4`}>
          <div>
            <Label>Latest Version</Label>
            <div className={tw`mt-2 flex items-center space-x-2`}>
              <p className={tw`text-sm font-mono`}>
                {details.collected.metadata.version}
              </p>
            </div>
          </div>
          <div>
            <Label>Links</Label>
            <div className={tw`mt-1`}>
              <ul className={tw`overflow-ellipsis truncate`}>
                <li className={tw`overflow-ellipsis truncate`}>
                  <a
                    className={tw`text-sm hover:underline overflow-ellipsis truncate`}
                    target="_blank"
                    href={`https://npmjs.com/package/${pkgJson.name}`}
                  >
                    https://npmjs.com/package/{pkgJson.name}
                  </a>
                </li>
                <li className={tw`overflow-ellipsis truncate`}>
                  <a
                    className={tw`text-sm hover:underline overflow-ellipsis truncate`}
                    target="_blank"
                    href={details.collected.github?.homepage}
                  >
                    {details.collected.github?.homepage}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={tw`flex-1 grid grid-cols-12 gap-6 p-4`}>
          <div className={tw`col-span-4`}>
            <Label>Downloads</Label>
            <div className={tw`mt-2`}>
              <p className={tw`text-sm font-mono`}>
                {details.evaluation.popularity.downloadsCount.toLocaleString()}
              </p>
            </div>
          </div>
          <div className={tw`col-span-4`}>
            <Label>Maintainers</Label>
            <div className={tw`mt-2 overflow-auto`}>
              <AvatarStack>
                {details.collected.metadata.maintainers
                  .slice(0, 6)
                  .map((maintainer) => {
                    return (
                      <Avatar
                        key={maintainer.username}
                        alt={maintainer.email}
                        src={`https://github.com/${maintainer.username}.png`}
                      ></Avatar>
                    );
                  })}
              </AvatarStack>
            </div>
          </div>
          <div className={tw`col-span-4 row-start-2`}>
            <Label>Downloads</Label>
            <Sparklines
              data={details.collected.npm.downloads.map((datum) => datum.count)}
              limit={details.collected.npm.downloads.length}
              height={40}
            >
              <SparklinesLine color="blue" />
            </Sparklines>
          </div>
          <div className={tw`col-span-4 row-start-2`}>
            <Label>Releases</Label>
            <Sparklines
              data={details.collected.metadata.releases.map(
                (datum) => datum.count
              )}
              limit={details.collected.metadata.releases.length}
              height={40}
            >
              <SparklinesLine color="blue" />
            </Sparklines>
          </div>
        </div>
      </div>
    </div>
  );
}
