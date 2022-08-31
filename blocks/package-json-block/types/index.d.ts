export interface PackageJson {
  name: string;
  version: string;
}

export interface PackageDetailResponse {
  analyzedAt: Date;
  collected: Collected;
  evaluation: Evaluation;
  score: Score;
  error?: {
    message: string;
  };
}

export interface Collected {
  metadata: Metadata;
  npm: Npm;
  github: Github;
  source: Source;
}

export interface Github {
  homepage: string;
  starsCount: number;
  forksCount: number;
  subscribersCount: number;
  issues: Issues;
  contributors: Contributor[];
  commits: Commit[];
  statuses: Status[];
}

export interface Commit {
  from: Date;
  to: Date;
  count: number;
}

export interface Contributor {
  username: string;
  commitsCount: number;
}

export interface Issues {
  count: number;
  openCount: number;
  distribution: { [key: string]: number };
  isDisabled: boolean;
}

export interface Status {
  context: string;
  state: string;
}

export interface Metadata {
  name: string;
  scope: string;
  version: string;
  description: string;
  keywords: string[];
  date: Date;
  publisher: Publisher;
  maintainers: Publisher[];
  repository: Repository;
  links: Links;
  license: string;
  dependencies: Dependencies;
  releases: Commit[];
  hasSelectiveFiles: boolean;
}

export interface Dependencies {
  looseEnvify: string;
}

export interface Links {
  npm: string;
  homepage: string;
  repository: string;
  bugs: string;
}

export interface Publisher {
  username: string;
  email: string;
}

export interface Repository {
  type: string;
  url: string;
  directory: string;
}

export interface Npm {
  downloads: Commit[];
  starsCount: number;
}

export interface Source {
  files: Files;
  badges: Badge[];
  linters: string[];
  coverage: number;
}

export interface Badge {
  urls: Urls;
  info: Info;
}

export interface Info {
  service: string;
  type: string;
  modifiers?: Modifiers;
}

export interface Modifiers {
  type: string;
}

export interface Urls {
  original: string;
  shields: string;
  content: string;
  service?: string;
}

export interface Files {
  readmeSize: number;
  testsSize: number;
  hasChangelog: boolean;
}

export interface Evaluation {
  quality: Quality;
  popularity: Popularity;
  maintenance: Maintenance;
}

export interface Maintenance {
  releasesFrequency: number;
  commitsFrequency: number;
  openIssues: number;
  issuesDistribution: number;
}

export interface Popularity {
  communityInterest: number;
  downloadsCount: number;
  downloadsAcceleration: number;
  dependentsCount: number;
}

export interface Quality {
  carefulness: number;
  tests: number;
  health: number;
  branding: number;
}

export interface Score {
  final: number;
  detail: Detail;
}

export interface Detail {
  quality: number;
  popularity: number;
  maintenance: number;
}
