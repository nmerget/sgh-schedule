export const cleanTeamName = (team?: string | null) => {
  if (!team) {
    return "";
  }

  let cleanTeam = team
    .replace(/-/g, "/")
    .replace("Hainhausen/Obertshausen/Heusenstamm", "HOH")
    .replace("Hainhausen/Obertsh./Heusenst.", "HOH")
    .replace("SG Hainhausen", "SGH")
    .replace("(a.K.)", "")
    .replace("a.K.", "")
    .replace("()", "")
    .replace("  ", " ")
    .replace("  ", " ")
    .replace("II II", "II")
    .replace("III III", "III");

  if (cleanTeam.includes("HOH")) {
    const splitTeam = cleanTeam.split(" ");
    splitTeam[1] = "";
    cleanTeam = splitTeam.join(" ");
  }

  return cleanTeam;
};

export const getWeekDay = (day: number): Date => {
  const now = new Date();

  const currentDay = now.getDay() || 7;
  now.setHours(-24 * (currentDay - day));
  if (day === 1) {
    now.setHours(0, 0, 0);
  } else {
    now.setHours(23, 59, 59);
  }

  return now;
};
export const getDateFromString = (date: string): Date | undefined => {
  const now = new Date();

  const [day, month, year] = date.split(".");
  if (!day || !month || !year) {
    return undefined;
  }

  now.setFullYear(Number(year), Number(month) - 1, Number(day));

  return now;
};

const veJugend = "VE Jugend";
const ve = "Vereins-Event";

export const getAge = (league?: string): string => {
  if (!league) {
    return "";
  }

  if (league.startsWith(veJugend)) {
    return league.replace(veJugend, "Testpiel Gemischt");
  }

  if (league.startsWith(ve)) {
    return league.replace(ve, "Testpiel");
  }

  const [age] = league.split("-");
  if (age) {
    const [gender, youth] = age.split("J");
    if (!youth) {
      return gender === "M" ? "Herren" : "Damen";
    } else {
      return (
        `${gender === "M" ? "Männliche" : gender === "W" ? "Weibliche" : "Gemischte"} ` +
        `${youth}-Jugend`
      );
    }
  }
  return league;
};
export default { cleanTeamName, getWeekDay, getDateFromString, getAge };
