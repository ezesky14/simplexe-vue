import TableauV2 from "./../../../../core/classes/tableauV2";
import { SimplexeType } from "./../../../../core/enum/simplexe-type.enum";
import KeyVal from "../../../../core/classes/key-val";
import { getProgrammeLineaireMock } from "../test-utils";

describe("tableauV2", () => {
  let tableau;
  let programmeLineaire;
  const type = SimplexeType.MAXI_TROIS_VARIABLES;
  const roundNumber = 2;

  beforeEach(() => {
    programmeLineaire = getProgrammeLineaireMock(type, roundNumber)
    tableau = new TableauV2(programmeLineaire, 0);
  });

  test("addColumn", () => {
    const vhbKeyVal = new KeyVal(1, "e1");
    const vdbKeyVal = new KeyVal(1, "x1");

    const col = tableau.addColumn(vhbKeyVal, vdbKeyVal, 0, 3);

    expect(col).toEqual({
      id: 0,
      isCalculated: true,
      lignePosition: undefined,
      positionValue: "x1e1",
      roundNumber: 2,
      value: 0,
      vdbPosition: 1,
      vdbValue: "x1",
      vhbPosition: 1,
      vhbValue: "e1",
      tableauIndex: 3
    });
  });


  test("addColumnWithData", () => {
    const vhbKeyVal = new KeyVal(1, "e1");
    const vdbKeyVal = new KeyVal(1, "x1");

    const col = tableau.addColumnWithData(vhbKeyVal, vdbKeyVal, "45.6755", 0, 0);

    expect(col).toEqual({
      id: 0,
      isCalculated: true,
      lignePosition: undefined,
      positionValue: "x1e1",
      roundNumber: 2,
      value: 45.68,
      vdbPosition: 1,
      vdbValue: "x1",
      vhbPosition: 1,
      vhbValue: "e1",
      tableauIndex: 0
    });
  });




  test('', () => {
      
  })
  afterEach(() => {});
});
