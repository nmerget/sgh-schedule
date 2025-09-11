import { MatchDate, MatchDay, MatchGroupType, MatchType } from "./data";

import live from "./data/live.json";
import { Fragment, useEffect, useState } from "react";
import { getAge, getBuilding, getDateFromString, getWeekDay } from "./utils";

const data: MatchGroupType[] = live as unknown as MatchGroupType[];

const App = () => {
  const [matchType, setMatchType] = useState<MatchType>(MatchType.ALL);
  const [matchDate, setMatchDate] = useState<MatchDate>(MatchDate.ALL);
  const [matchDay, setMatchDay] = useState<MatchDay | null>();
  const [site, setSite] = useState<number | null>();

  const [weekStart, setWeekStart] = useState<Date>();
  const [weekEnd, setWeekEnd] = useState<Date>();

  useEffect(() => {
    const search = window.location.search;
    if (search) {
      const params = new URLSearchParams(search);
      setMatchType(params.get("matchType") as MatchType);
      setMatchDate(params.get("matchDate") as MatchDate);
      setMatchDay(params.get("matchDay") as MatchDay);
      setSite(Number(params.get("site")));
    }
  }, []);

  useEffect(() => {
    if (matchDate === MatchDate.CURRENT) {
      setWeekStart(getWeekDay(1));
      setWeekEnd(getWeekDay(7));
    }
  }, [matchDate]);

  return (
    <div className="flex flex-col p-4">
      <header className="grid grid-cols-8">
        <div className="flex flex-col col-span-6 gap-2 self-center md:self-auto">
          <h1 className="text-dark-green text-4xl md:text-5xl font-bold">
            {matchType === MatchType.HOME ? (
              <Fragment>
                Unsere <br /> Heimspiele
              </Fragment>
            ) : matchType === MatchType.GUEST ? (
              <Fragment>
                Unsere <br /> Auswärtsspiele
              </Fragment>
            ) : (
              "Alle Spiele"
            )}
          </h1>
          {matchType === MatchType.ALL && (
            <div className="flex gap-2">
              <a
                className="text-light-blue underline"
                href="/sgh-schedule?matchType=home"
              >
                Unsere Heimspiele
              </a>
              <a
                className="text-light-blue underline"
                href="/sgh-schedule?matchType=guest"
              >
                Unsere Auswärtsspiele
              </a>
            </div>
          )}
          {matchDate === MatchDate.ALL && (
            <a
              className="text-light-blue underline"
              href="/sgh-schedule?matchDate=current"
            >
              Aktuelle Woche
            </a>
          )}
        </div>
        <img
          className="col-span-2 w-full max-w-24 md:max-w-40 ml-auto"
          alt="SGH Logo"
          src="/sgh-schedule/app-icon.png"
        />
      </header>
      <main className="flex flex-col gap-4">
        {data
          .filter((group) => {
            let isValid = true;
            if (
              isValid &&
              matchDate === MatchDate.CURRENT &&
              weekStart &&
              weekEnd
            ) {
              const date = getDateFromString(group.date);
              isValid = date ? date >= weekStart && date <= weekEnd : false;
            }

            if (isValid && matchDay) {
              if (matchDay === MatchDay.SA) {
                isValid = group.day === "Sa.";
              } else if (matchDay === MatchDay.SO) {
                isValid = group.day === "So.";
              }
            }

            if (isValid && matchType === MatchType.HOME) {
              isValid = group.matches.some((match) => match.isHomeMatch);
            }

            if (isValid && matchType === MatchType.GUEST) {
              isValid = group.matches.some((match) => !match.isHomeMatch);
            }

            return isValid;
          })
          .map(({ day, date, matches }) => (
            <div key={date} className="flex-col flex gap-2">
              <h2 className="text-dark-green font-bold">
                {day} {date}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                {matches
                  ?.filter((match) => {
                    let isValid = true;

                    if (isValid && matchType === MatchType.HOME) {
                      isValid = !!match.isHomeMatch;
                    }

                    if (isValid && matchType === MatchType.GUEST) {
                      isValid = !match.isHomeMatch;
                    }

                    return isValid;
                  })
                  .filter((_, index) => {
                    if (site && site > 0) {
                      const min = (site - 1) * 5;
                      const max = site * 5;
                      return index >= min && index < max;
                    }

                    return true;
                  })
                  .map(({ time, home, guest, league, building }) => (
                    <section
                      key={`${day}${date}${time}${home}${guest}`}
                      className="bg-light-green p-2 rounded-sm flex flex-col"
                    >
                      <div className="flex justify-between">
                        <span className="text-sm font-bold">
                          {getAge(league).toUpperCase()}
                        </span>
                        <span className="text-sm font-bold">{time} Uhr</span>
                      </div>
                      <p className="text-lg">
                        {home} <i>vs.</i> {guest}
                      </p>
                      <p className="flex justify-end text-sm">
                        <i>{getBuilding(building)}</i>
                      </p>
                    </section>
                  ))}
              </div>
            </div>
          ))}
      </main>
    </div>
  );
};

export default App;
