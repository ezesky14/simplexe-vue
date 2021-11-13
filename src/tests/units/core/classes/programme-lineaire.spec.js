import ProgrammeLineaire from "./../../../../core/classes/programme-lineaire";
import { SimplexeType } from "./../../../../core/enum/simplexe-type.enum";

let programmeLineaire;
let roundNumber;
let type;
describe("programme-lineaire avec maximisation a trois variables", () => {
  type = SimplexeType.MAXI_TROIS_VARIABLES;
  roundNumber = 2;
  
  beforeEach(() => {
    programmeLineaire = new ProgrammeLineaire(type, roundNumber);
  });

  afterEach(() => {});

  test("getVDBValues", () => {
    const values = programmeLineaire.getVDBValues("3", "5", "6");
    expect(values).toEqual(["3", "5", "6"]);
  });

  test("getPValues", () => {
    const test1 = programmeLineaire.getPValues(0);
    expect(test1).toEqual([1, 0, 0]);

    const test2 = programmeLineaire.getPValues(1);
    expect(test2).toEqual([0, 1, 0]);

    const test3 = programmeLineaire.getPValues(2);
    expect(test3).toEqual([0, 0, 1]);
  });

  test("addOtherValues", () => {
    const vhbValues = programmeLineaire.getVDBValues("3", "5", "6");
    const pValues = programmeLineaire.getPValues(0);

    const result = programmeLineaire.addOtherValues(vhbValues, pValues, 400);
    expect(result).toEqual({
      0: "3",
      1: "5",
      2: "6",
      3: 1,
      4: 0,
      5: 0,
      6: 400,
      7: 0,
    });
  });

  test("pushEquationValues", () => {
    const vdbValues = programmeLineaire.getVDBValues("3", "5", "6");
    const pValues = programmeLineaire.getPValues(0);

    const r = programmeLineaire.addOtherValues(vdbValues, pValues, 400);

    programmeLineaire.pushEquationValues(r);
    expect(programmeLineaire.allEquationValues).toEqual([
      "3",
      "5",
      "6",
      1,
      0,
      0,
      400,
      0,
    ]);
  });

  test("pushEquationValues", () => {
    const vdbValues = programmeLineaire.getVDBValues("3", "5", "6");

    programmeLineaire.pushEquationValuesWithoutPValues(vdbValues);
    expect(programmeLineaire.equationValuesWithoutPValues).toEqual([
      "3",
      "5",
      "6",
    ]);
  });

  test("getAllEquationValues", () => {
    programmeLineaire = new ProgrammeLineaire(type, roundNumber);
    programmeLineaire.setEquation1("2", "0.5", "2", "280");
    programmeLineaire.setEquation2("0", "1", "4", "400");
    programmeLineaire.setEquation3("2", "3", "0", "600");
    programmeLineaire.setzEquation("350", "280", "300");
    const colonnes = programmeLineaire.getAllEquationValues();
    expect(colonnes).toEqual([
      "2",
      "0.5",
      "2",
      1,
      0,
      0,
      "280",
      0,
      "0",
      "1",
      "4",
      0,
      1,
      0,
      "400",
      0,
      "2",
      "3",
      "0",
      0,
      0,
      1,
      "600",
      0,
      "350",
      "280",
      "300",
      0,
      0,
      0,
      0,
      0,
    ]);
  });
});
