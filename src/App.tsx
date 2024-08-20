import { MatchDate, MatchGroupType, MatchType } from "./data";

import live from "./data/live.json";
import { useEffect, useState } from "react";
import { getAge, getDateFromString, getWeekDay } from "./utils";

const data: MatchGroupType[] = live as unknown as MatchGroupType[];

const App = () => {
  const [matchType, setMatchType] = useState<MatchType>(MatchType.ALL);
  const [matchDate, setMatchDate] = useState<MatchDate>(MatchDate.ALL);

  const [weekStart, setWeekStart] = useState<Date>();
  const [weekEnd, setWeekEnd] = useState<Date>();

  useEffect(() => {
    const search = window.location.search;
    if (search) {
      const params = new URLSearchParams(search);
      setMatchType(params.get("matchType") as MatchType);
      setMatchDate(params.get("matchDate") as MatchDate);
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
        <div className="flex flex-col col-span-6 gap-2">
          <h1 className="text-dark-green text-4xl font-bold">
            {matchType === MatchType.HOME
              ? "Unsere Heimspiele"
              : matchType === MatchType.GUEST
                ? "Unsere Auswärtsspiele"
                : "Alle Spiele"}
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
          className="col-span-2 w-full max-w-40 ml-auto"
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
                  .map(({ time, home, guest, league }) => (
                    <section
                      key={`${day}${date}${time}${home}${guest}`}
                      className="bg-light-green p-2 rounded"
                    >
                      <div className="flex justify-between">
                        <span className="text-sm font-bold">
                          {getAge(league).toUpperCase()}
                        </span>
                        <span className="text-sm font-bold">{time} Uhr</span>
                      </div>
                      <p className="text-lg">
                        {home} vs. {guest}
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
