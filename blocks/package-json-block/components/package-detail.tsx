import { Tab } from "@headlessui/react";
import { Avatar, AvatarStack } from "@primer/react";
import { Disclosure } from "@headlessui/react";

// @ts-ignore
import Embed from "react-runkit";

import { Sparklines, SparklinesLine } from "react-sparklines";
import { tw } from "twind";

import React from "react";
import { PackageDetailResponse, PackageJson } from "../types";
import { Label } from "./label";
import {
  ClockIcon,
  CommandLineIcon,
  InformationCircleIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";
import { useRegistryDetails } from "../hooks";
import { ErrorState } from "./error-state";

interface PackageDetailProps {
  pkgJson: PackageJson;
  details: PackageDetailResponse;
}

function RunkitEmbed({ pkgJson }: PackageDetailProps) {
  return (
    <div className={tw`pl-8 pr-4 py-4 bg-gray-50`}>
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
          <span
            className={tw`inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800`}
          >
            {details.collected.metadata.version}
          </span>
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

function CustomTab(props: {
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <Tab as={React.Fragment}>
      {({ selected }) => (
        <button
          className={tw(
            `py-2 px-4 text-sm border-b-2 inline-flex items-center`,
            {
              "text-blue-600 font-medium border-blue-600": selected,
              "text-gray-600 border-transparent": !selected,
            }
          )}
        >
          <span className={tw`flex-shrink-0 w-5 mr-2`}>{props.icon}</span>
          <span>{props.children}</span>
        </button>
      )}
    </Tab>
  );
}

function BundleComposition(props: PackageDetailProps) {
  return (
    <iframe
      className={tw`w-full h-full h-[400px]`}
      frameBorder={0}
      src={`https://bundlephobia.com/package/${encodeURIComponent(
        props.pkgJson.name
      )}@${props.pkgJson.version}`}
    />
  );
}

function Versions({ pkgJson }: PackageDetailProps) {
  const { data, error } = useRegistryDetails(pkgJson.name);
  console.log(data);

  if (!data)
    return (
      <div className={tw`p-4`}>
        <p className={tw`animate-pulse text-gray-600 text-sm`}>
          Loading version history...
        </p>
      </div>
    );

  if (error) return <ErrorState>Failed to load version history.</ErrorState>;

  return (
    <div className={tw`divide-y flex flex-col`}>
      {Object.keys(data.versions).map((versionNumber) => {
        return (
          <Disclosure>
            <Disclosure.Button className={tw`p-2 text-left text-sm font-mono`}>
              {versionNumber}
            </Disclosure.Button>
            <Disclosure.Panel className={tw`bg-gray-50 p-4 text-sm`}>
              <div className={tw`flex flex-wrap gap-4`}>
                <div>
                  <Label>Date</Label>
                  <p className={tw`font-mono text-sm mt-1`}>
                    {new Date(
                      data.versionsToTimestamps[versionNumber]
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Label>SHA</Label>
                  <p className={tw`font-mono text-sm mt-1`}>
                    {data.versions[versionNumber].dist.shasum}
                  </p>
                </div>
                <div>
                  <Label>File Count</Label>
                  <p className={tw`font-mono text-sm mt-1`}>
                    {data.versions[versionNumber].dist.fileCount}
                  </p>
                </div>
              </div>
            </Disclosure.Panel>
          </Disclosure>
        );
      })}
    </div>
  );
}

export function PackageDetail(props: PackageDetailProps) {
  return (
    <Tab.Group>
      <Tab.List className={tw`border-b flex`}>
        <CustomTab icon={<InformationCircleIcon />}>Details</CustomTab>
        <CustomTab icon={<ClockIcon />}>Versions</CustomTab>
        <CustomTab icon={<CommandLineIcon />}>RunKit</CustomTab>
        <CustomTab icon={<Squares2X2Icon />}>Bundle Composition</CustomTab>
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
          <Versions {...props} />
        </Tab.Panel>
        <Tab.Panel>
          <RunkitEmbed {...props} />
        </Tab.Panel>
        <Tab.Panel>
          <BundleComposition {...props} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
