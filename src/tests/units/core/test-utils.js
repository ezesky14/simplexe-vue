import ProgrammeLineaire from "./../../../core/classes/programme-lineaire";
import { SimplexeType } from "./../../../core/enum/simplexe-type.enum";

export const getProgrammeLineaireMock = (type, roundNumber) => {
  const programmeLineaire = new ProgrammeLineaire(type, roundNumber);

  if (type === SimplexeType.MAXI_TROIS_VARIABLES) {
    return setMaxi3Variable(programmeLineaire);
  } else if (type === SimplexeType.MAXI_DEUX_VARIABLES) {
    return setMaxi2Variable(programmeLineaire);
  }
};

export const setMaxi3Variable = (programmeLineaire) => {
  programmeLineaire.setEquation1("2", "0.5", "2", "280");
  programmeLineaire.setEquation2("0", "1", "4", "400");
  programmeLineaire.setEquation3("2", "3", "0", "600");
  programmeLineaire.setzEquation("350", "280", "300");

  return programmeLineaire;
};

const setMaxi2Variable = (programmeLineaire) => {
  programmeLineaire.setEquation1("2", "2", 0, "500");
  programmeLineaire.setEquation2("6", "4", 0, "1200");
  programmeLineaire.setEquation3("10", "2", 0, "1800");
  programmeLineaire.setzEquation("2500", "2000", 0);

  return programmeLineaire;
};
