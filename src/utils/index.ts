export const cleanTeamName = (team?: string | null) => {
  if (!team) {
    return "";
  }

  return team
    .replace(/-/g, "/")
    .replace("Hainhausen/Dietzenbach", "Hain./Diet.")
    .replace("SG Hainhausen", "SGH")
    .replace("(a.K.)", "")
    .replace("a.K.", "")
    .replace("()", "")
    .replace("  ", " ")
    .replace("  ", " ")
    .replace("II II", "II")
    .replace("III III", "III");
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

export const getBuilding = (building?: string): string => {
  if (!building) {
    return "";
  }

  if (building === "17153") {
    return "Sporthalle Hainhausen";
  }

  if (building === "17108") {
    return "Philipp-Fenn-Halle";
  }

  if (building === "17107") {
    return "Ernst-Reuter-Schule";
  }

  return building;
};

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
