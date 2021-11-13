import SimplexeV2 from "./../../../../core/classes/simplexe";
import { SimplexeType } from "./../../../../core/enum/simplexe-type.enum";
import TableauV2 from "./../../../../core/classes/tableauV2";
import { getProgrammeLineaireMock } from "../test-utils";


describe("simplexe for SimplexeType.MAXI_TROIS_VARIABLES", () => {
    let programmeLineaire;
    const roundNumber = 2;
    let type, simplexeV2;
    type = SimplexeType.MAXI_TROIS_VARIABLES;

  beforeEach(() => {
    programmeLineaire = getProgrammeLineaireMock(type, roundNumber);
    simplexeV2 = new SimplexeV2(programmeLineaire);
  });

  afterAll(() => {
    programmeLineaire = null;
    simplexeV2 = null;
    type = null;

  });

  test("initFirstTable", () => {
    const simplexe = new SimplexeV2();
    simplexe.initFirstTable(programmeLineaire, 0);

    const tableauV2 = new TableauV2(programmeLineaire, 0);
    expect(simplexe.tableauList[0]).toEqual(tableauV2);
  });

  test("max", () => {
    const tableauV2 = simplexeV2.tableauList[0];
    const colonnes = tableauV2.getLine("Z");
    const max = simplexeV2.max(colonnes);
    expect(max).toEqual({
      id: 24,
      isCalculated: true,
      lignePosition: 0,
      positionValue: "Zx1",
      roundNumber: 2,
      value: 350,
      vdbPosition: 3,
      vdbValue: "Z",
      vhbPosition: 0,
      vhbValue: "x1",
      tableauIndex: 0
    });
  });

  test("min", () => {
    const tableauV2 = simplexeV2.tableauList[0];

    const _colonnes = tableauV2.getLine("Z");
    const colVEntrant = simplexeV2.max(_colonnes);

    const tbWithRValues = simplexeV2.calculerR(tableauV2, colVEntrant);
    const colonnes = tbWithRValues.getColonnes({
      0: 7,
      1: 7,
      2: 7,
    });
    const min = simplexeV2.min(colonnes);
    expect(min).toEqual({
      id: 7,
      isCalculated: true,
      lignePosition: 0,
      positionValue: "e1R",
      roundNumber: 2,
      value: 140,
      vdbPosition: 0,
      vdbValue: "e1",
      vhbPosition: 7,
      vhbValue: "R",
      tableauIndex: 0
    });
  });

  test("calculerR", () => {
    const tableauV2 = simplexeV2.tableauList[0];

    const _colonnes = tableauV2.getLine("Z");
    const colVEntrant = simplexeV2.max(_colonnes);

    const tbWithRValues = simplexeV2.calculerR(tableauV2, colVEntrant);
    expect(tbWithRValues.colonnes[7].value).toEqual(140);
    expect(tbWithRValues.colonnes[15].value).toEqual(Infinity);
    expect(tbWithRValues.colonnes[23].value).toEqual(300);
  });

  test("getVsortante", () => {
    const tableauV2 = simplexeV2.tableauList[0];

    const _colonnes = tableauV2.getLine("Z");
    const colVEntrant = simplexeV2.max(_colonnes);

    const tbWithRValues = simplexeV2.calculerR(tableauV2, colVEntrant);

    const colVsorante = simplexeV2.getVsortante(tbWithRValues, 7);
    expect(colVsorante).toEqual({
      id: 7,
      isCalculated: true,
      lignePosition: 0,
      positionValue: "e1R",
      roundNumber: 2,
      value: 140,
      vdbPosition: 0,
      vdbValue: "e1",
      vhbPosition: 7,
      vhbValue: "R",
      tableauIndex: 0
    });
  });

  test("determinerPivot", () => {
    const tableauV2 = simplexeV2.tableauList[0];
    const tb2 = simplexeV2.determinerPivot(tableauV2);

    /*
    Verifier si les colonnes pour R ont ete calucler
        - realPosZ : id de la colonne entrante
        - si le max a ete defini
        - si le min a ete defini
        - si la colonne vEntrante a ete  definie
        - si la colonne sortante a ete defini 
        - si la position pivot a ete definie
        - si la colonne pivot a ete definie 
        - si lindice a ete definie
     */

    expect(tb2.colvEntrante).toBeTruthy();
    expect(tb2.max).toBeTruthy();
    expect(tb2.min).toBeTruthy();
    expect(tb2.colvEntrante).toBeTruthy();
    expect(tb2.colvSortante).toBeTruthy();
    expect(tb2.pivot).toBeTruthy();
    expect(tb2.positionPivot).toBeTruthy();
    expect(tb2.colPivot).toBeTruthy();
  });


  
  test("applyReglePivot", () => {
    const tableauV2 = simplexeV2.tableauList[0];
    const tb2 = simplexeV2.determinerPivot(tableauV2);
    let resultTb = simplexeV2.calculateNextTableLine(tb2, 1);
    resultTb = simplexeV2.applyReglePivot(resultTb, tableauV2);

    expect(resultTb.vdbLabels).toEqual(["x1", "e2", "e3"]);
    expect(resultTb.vhbLabels).toEqual([".", "x2", "x3", "e1", ".", "."]);
  }); 

  test("calculateNextTableLine", () => {
    const tableauV2 = simplexeV2.tableauList[0];
    const tb2 = simplexeV2.determinerPivot(tableauV2);
    const resultTb = simplexeV2.calculateNextTableLine(tb2, 1);
    const expectedValues = [
      1, 0.25, 1, 0.5, 0, 0, 140, 0,
      0, 1, 4, 0, 1, 0, 400, 0,
        0, 2.5, -2, -1, 0, 1, 320, 0,
         0, 192.5, -50, -175, 0, 0, -49000, 0
    ];

    expectedValues.forEach((exectedValue, index) => {
      expect(resultTb.colonnes[index].tableauIndex).toEqual(1);
      expect(resultTb.colonnes[index].value).toEqual(exectedValue);
    });
  });

  test("genererProchainTableau", () => {
    const tableauV2 = simplexeV2.tableauList[0];
    const tb2 = simplexeV2.determinerPivot(tableauV2);
    const resultTb = simplexeV2.genererProchainTableau(tb2, 1);
    const expectedValues = [
      1, 0.25, 1, 0.5, 0, 0, 140, 0,
      0, 1, 4, 0, 1, 0, 400, 0,
        0, 2.5, -2, -1, 0, 1, 320, 0,
         0, 192.5, -50, -175, 0, 0, -49000, 0
    ];

    expectedValues.forEach((exectedValue, index) => {
      expect(resultTb.colonnes[index].tableauIndex).toEqual(1);
      expect(resultTb.colonnes[index].value).toEqual(exectedValue);
    });
  });


});





describe("simplexe for SimplexeType.MAXI_DEUX_VARIABLES", () => {
    let programmeLineaire;
    const roundNumber = 2;
    let type, simplexeV2;
    type = SimplexeType.MAXI_DEUX_VARIABLES;
  
    beforeEach(() => {
      programmeLineaire = getProgrammeLineaireMock(type, roundNumber);
      simplexeV2 = new SimplexeV2(programmeLineaire);
    });
  
    afterAll(() => {
        programmeLineaire = null;
        simplexeV2 = null;
        type = null;
    });
  
    test("initFirstTable", () => {
      const simplexe = new SimplexeV2();
      simplexe.initFirstTable(programmeLineaire, 0);
  
      const tableauV2 = new TableauV2(programmeLineaire, 0);
      expect(simplexe.tableauList[0]).toEqual(tableauV2);
    });
  
    test("max", () => {
      const tableauV2 = simplexeV2.tableauList[0];
      const colonnes = tableauV2.getLine("Z");
      const max = simplexeV2.max(colonnes);
      expect(max).toEqual({
        id: 21,
        isCalculated: true,
        lignePosition: 0,
        positionValue: "Zx1",
        roundNumber: 2,
        value: 2500,
        vdbPosition: 3,
        vdbValue: "Z",
        vhbPosition: 0,
        vhbValue: "x1",
        tableauIndex: 0
      });
    });
  
    test("min", () => {
      const tableauV2 = simplexeV2.tableauList[0];
  
      const _colonnes = tableauV2.getLine("Z");
      const colVEntrant = simplexeV2.max(_colonnes);
  
      const tbWithRValues = simplexeV2.calculerR(tableauV2, colVEntrant);
      const colonnes = tbWithRValues.getColonnes({
        0: 6,
        1: 6,
        2: 6,
      });
      const min = simplexeV2.min(colonnes);
      expect(min).toEqual({
        id: 20,
        isCalculated: true,
        lignePosition: 2,
        positionValue: "e3R",
        roundNumber: 2,
        value: 180,
        vdbPosition: 2,
        vdbValue: "e3",
        vhbPosition: 6,
        vhbValue: "R",
        tableauIndex: 0
      });
    });
  
    test("calculerR", () => {
      const tableauV2 = simplexeV2.tableauList[0];
  
      const _colonnes = tableauV2.getLine("Z");
      const colVEntrant = simplexeV2.max(_colonnes);
  
      const tbWithRValues = simplexeV2.calculerR(tableauV2, colVEntrant);
      expect(tbWithRValues.colonnes[6].value).toEqual(250);
      expect(tbWithRValues.colonnes[13].value).toEqual(200);
      expect(tbWithRValues.colonnes[20].value).toEqual(180);
    });
  
    test("getVsortante", () => {
      const tableauV2 = simplexeV2.tableauList[0];
  
      const _colonnes = tableauV2.getLine("Z");
      const colVEntrant = simplexeV2.max(_colonnes);
  
      const tbWithRValues = simplexeV2.calculerR(tableauV2, colVEntrant);
  
      const colVsorante = simplexeV2.getVsortante(tbWithRValues, 6);
      expect(colVsorante).toEqual({
        id: 20,
        isCalculated: true,
        lignePosition: 2,
        positionValue: "e3R",
        roundNumber: 2,
        value: 180,
        vdbPosition: 2,
        vdbValue: "e3",
        vhbPosition: 6,
        vhbValue: "R",
        tableauIndex: 0
      });
    });
  
    test("determinerPivot", () => {
      const tableauV2 = simplexeV2.tableauList[0];
      const tb2 = simplexeV2.determinerPivot(tableauV2);
  
      /*
      Verifier si les colonnes pour R ont ete calucler
          - realPosZ : id de la colonne entrante
          - si le max a ete defini
          - si le min a ete defini
          - si la colonne vEntrante a ete  definie
          - si la colonne sortante a ete defini 
          - si la position pivot a ete definie
          - si la colonne pivot a ete definie 
          - si lindice a ete definie
       */
  
      expect(tb2.colvEntrante).toBeTruthy();
      expect(tb2.max).toBeTruthy();
      expect(tb2.min).toBeTruthy();
      expect(tb2.colvEntrante).toBeTruthy();
      expect(tb2.colvSortante).toBeTruthy();
      expect(tb2.pivot).toBeTruthy();
      expect(tb2.positionPivot).toBeTruthy();
      expect(tb2.colPivot).toBeTruthy();
    });
  
  
    
    test("applyReglePivot", () => {
      const tableauV2 = simplexeV2.tableauList[0];
      const tb2 = simplexeV2.determinerPivot(tableauV2);
      let resultTb = simplexeV2.calculateNextTableLine(tb2, 1);
      resultTb = simplexeV2.applyReglePivot(resultTb, tableauV2);
  
      expect(resultTb.vdbLabels).toEqual(["e1", "e2", "x1"]);
      expect(resultTb.vhbLabels).toEqual([".", "x2", ".", ".", "e3"]);
    }); 
  
    test("calculateNextTableLine", () => {
      const tableauV2 = simplexeV2.tableauList[0];
      const tb2 = simplexeV2.determinerPivot(tableauV2);
      const resultTb = simplexeV2.calculateNextTableLine(tb2, 1);
      const expectedValues = [
        0, 1.6, 1, 0, -0.2, 140, 0,
        0, 2.8, 0, 1, -0.6, 120, 0,
          1, 0.2, 0, 0, 0.1, 180, 0,
           0, 1500, 0, 0, -250, -450000, 0
      ];
  
      expectedValues.forEach((exectedValue, index) => {
        expect(resultTb.colonnes[index].tableauIndex).toEqual(1);
        expect(resultTb.colonnes[index].value).toEqual(exectedValue);
      });
    });
  
    test("genererProchainTableau", () => {
      const tableauV2 = simplexeV2.tableauList[0];
      const tb2 = simplexeV2.determinerPivot(tableauV2);
      const resultTb = simplexeV2.genererProchainTableau(tb2, 1);
      const expectedValues = [
        0, 1.6, 1, 0, -0.2, 140, 0,
        0, 2.8, 0, 1, -0.6, 120, 0,
          1, 0.2, 0, 0, 0.1, 180, 0,
           0, 1500, 0, 0, -250, -450000, 0
      ];
  
      expectedValues.forEach((exectedValue, index) => {
        expect(resultTb.colonnes[index].tableauIndex).toEqual(1);
        expect(resultTb.colonnes[index].value).toEqual(exectedValue);
      });
    });
  
  
  
    test("interpreteSolu", () => {
      expect(true).toBeTruthy();
    });
  
  });