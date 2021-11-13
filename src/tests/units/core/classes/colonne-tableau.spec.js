import ColonneTableau from "./../../../../core/classes/colonne-tableau";
describe("colonne-tableau", () => {
  let colonneTableau;
  beforeEach(() => {
    colonneTableau = new ColonneTableau(2, "4.555589");
  });

  afterEach(() => {
    colonneTableau = null;
  });

  test("setValue", () => {
    colonneTableau.setValue("4.6699564");
    expect(colonneTableau.value).toEqual(4.67);
  });


  test("setTableauIndex", () => {
    colonneTableau.setTableauIndex(3);
    expect(colonneTableau.tableauIndex).toEqual(3);
  });
});
