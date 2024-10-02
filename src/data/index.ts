export type MatchDataType = {
  time?: string;
  building?: string;
  number?: string;
  league?: string;
  home?: string;
  guest?: string;
  isHomeMatch?: boolean;
};

export type MatchGroupType = {
  day: string;
  date: string;
  matches: MatchDataType[];
};

export enum MatchType {
  "ALL" = "all",
  "HOME" = "home",
  "GUEST" = "guest",
}
export enum MatchDate {
  "ALL" = "all",
  "CURRENT" = "current",
}
export enum MatchDay {
  "SA" = "sa",
  "SO" = "so",
}
