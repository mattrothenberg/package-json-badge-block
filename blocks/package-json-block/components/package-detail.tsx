import { Tab } from "@headlessui/react";
import { Avatar, AvatarStack } from "@primer/react";

// @ts-ignore
import Embed from "react-runkit";

import { Sparklines, SparklinesLine } from "react-sparklines";
import { tw } from "twind";

import React from "react";
import { PackageDetailResponse, PackageJson } from "../types";
import { Label } from "./label";

interface PackageDetailProps {
  pkgJson: PackageJson;
  details: PackageDetailResponse;
}

function RunkitEmbed({ pkgJson }: PackageDetailProps) {
  return (
    <div className={tw`pl-8 pr-4 py-4`}>
      <Embed minHeight="200px" source={`require('${pkgJson.name}')`} />
    </div>
  );
}

function Details({ pkgJson, details }: PackageDetailProps) {
  return (
    <div className={tw`grid grid-cols-3 p-4 gap-8`}>
      <div>
        <Label>Latest Version</Label>
        <div className={tw`mt-2 flex items-center space-x-2`}>
          <p className={tw`text-sm font-mono`}>
            {details.collected.metadata.version}
          </p>
        </div>
      </div>
      <div>
        <Label>Downloads</Label>
        <div className={tw`mt-2`}>
          <p className={tw`text-sm font-mono`}>
            {details.evaluation.popularity.downloadsCount.toLocaleString()}
          </p>
        </div>
      </div>
      <div>
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
      <div>
        <Label>Downloads</Label>
        <Sparklines
          data={details.collected.npm.downloads.map((datum) => datum.count)}
          limit={details.collected.npm.downloads.length}
          height={40}
        >
          <SparklinesLine color="blue" />
        </Sparklines>
      </div>
      <div>
        <Label>Releases</Label>
        <Sparklines
          data={details.collected.metadata.releases.map((datum) => datum.count)}
          limit={details.collected.metadata.releases.length}
          height={40}
        >
          <SparklinesLine color="blue" />
        </Sparklines>
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
  );
}

function CustomTab(props: { children: React.ReactNode }) {
  return (
    <Tab as={React.Fragment}>
      {({ selected }) => (
        <button
          className={tw(`p-2 text-sm border-b-2`, {
            "text-blue-600 font-medium border-blue-600": selected,
            "text-gray-600 border-transparent": !selected,
          })}
        >
          {props.children}
        </button>
      )}
    </Tab>
  );
}

export function PackageDetail(props: PackageDetailProps) {
  return (
    <Tab.Group>
      <Tab.List className={tw`border-b flex`}>
        <CustomTab>Details</CustomTab>
        <CustomTab>RunKit</CustomTab>
        <div
          className={tw`p-2 bg-gray-50 inline-flex items-center justify-center border-l ml-auto`}
        >
          <span className="font-mono text-xs text-gray-600">
            {props.pkgJson.name}@{props.pkgJson.version}
          </span>
        </div>
      </Tab.List>
      <Tab.Panels className={tw`border-b`}>
        <Tab.Panel>
          <Details {...props} />
        </Tab.Panel>
        <Tab.Panel>
          <RunkitEmbed {...props} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
