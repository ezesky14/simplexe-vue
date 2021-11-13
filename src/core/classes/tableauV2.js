import ColonneTableau from "./colonne-tableau";
import KeyVal from "./key-val";

export default class TableauV2 {
  id;
  colonnes;
  min;
  max;
  pivot;
 
  colvEntrante;
  colvSortante;
  colPivot;
  
  positionPivot;
  positionVEntrante;
  positionVSortante;

  
  pivotColonnes;
  programmeLineaireId;

  vhbLabels;
  vdbLabels;

  isLast = false;
  roundNumber = -1;
  numberTotalcolPerLine;

  constructor(programeLineaire, tableauIndex) {
    if (programeLineaire) {
      this.roundNumber = programeLineaire.getRoundNumber();
      this.numberTotalcolPerLine = programeLineaire.getColumnsNumberPerLine();
      this.initLabels(this.numberTotalcolPerLine);
      this.colonnes = this.initTableau(
        programeLineaire.getAllEquationValues(),
        tableauIndex
      );
    }
  }

  getVdbLabels() {
    return this.vdbLabels;
  }

  setVdbLabels(vdbLabels) {
    this.vdbLabels = vdbLabels;
  }

  getColPivot() {
    return this.colPivot;
  }

  setColPivot(colPivot) {
    this.colPivot = colPivot;
  }

  getVhbLabels() {
    return this.vhbLabels;
  }

  // A revoir
  getLabelsToString(labels, regex) {
    return labels.join(regex);
  }

  setVhbLabels(vhbLabels) {
    this.vhbLabels = vhbLabels;
  }

  initLabels(numberTotalcolPerLine) {
    this.setVdbLabels(["e1", "e2", "e3"]);
    let vhbLabels = ["x1", "x2", "x3", ".", ".", "."];
    if (numberTotalcolPerLine == 7) {
      vhbLabels = ["x1", "x2", ".", ".", "."];
    }
    this.setVhbLabels(vhbLabels);
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getColvEntrante() {
    return this.colvEntrante;
  }

  setColvEntrante(colvEntrante) {
    this.colvEntrante = colvEntrante;
  }

  getColvSortante() {
    return this.colvSortante;
  }

  setColvSortante(colvSortante) {
    this.colvSortante = colvSortante;
  }

  getProgrammeLineaireId() {
    return this.programmeLineaireId;
  }

  setProgrammeLineaireId(programmeLineaireId) {
    this.programmeLineaireId = programmeLineaireId;
  }

  getNumberTotalcolPerLine() {
    return this.numberTotalcolPerLine;
  }

  setNumberTotalcolPerLine(numberTotalcolPerLine) {
    this.numberTotalcolPerLine = numberTotalcolPerLine;
  }

  getPivotColonnes() {
    return this.pivotColonnes;
  }

  getLignePivotValues() {
    return this.toFloat(this.pivotColonnes);
  }

  setPivotColonnes(pivotColonnes) {
    this.pivotColonnes = pivotColonnes;
  }

  setColonnes(colonnes) {
    this.colonnes = colonnes;
  }

  getMin() {
    return this.min;
  }

  setMin(min) {
    this.min = min;
  }

  getMax() {
    return this.max;
  }

  setMax(max) {
    this.max = max;
  }

  getPivot() {
    return this.pivot;
  }

  setPivot(pivot) {
    this.pivot = pivot;
  }

  getPositionPivot() {
    return this.positionPivot;
  }

  setPositionPivot(positionPivot) {
    this.positionPivot = positionPivot;
  }

  getPositionVEntrante() {
    return this.positionVEntrante;
  }

  setPositionVEntrante(positionVEntrante) {
    this.positionVEntrante = positionVEntrante;
  }

  getPositionVSortante() {
    return this.positionVSortante;
  }

  setPositionVSortante(positionVSortante) {
    this.positionVSortante = positionVSortante;
  }

  isLast() {
    return this.isLast;
  }

  setLast(last) {
    this.isLast = last;
  }

  /* e1, e2, e3, z
       x1,x2,x3 ,point1, point2, point3 , B , R
     */
  vdbList2() {
    return this.convertToMap(["e1", "e2", "e3", "Z"]);
  }

  vhbList2() {
    return this.convertToMap(["x1", "x2", "x3", "p1", "p2", "p3", "B", "R"]);
  }

  convertToMap(list) {
    let myMap = {};
    let a = 0;
    list.forEach((label) => {
      myMap[label] = a;
      a++;
    });

    return myMap;
  }

  vdbList() {
    return ["e1", "e2", "e3", "Z"];
  }

  vhbList() {
    let res = ["x1", "x2", "x3", "p1", "p2", "p3", "B", "R"];

    if (this.numberTotalcolPerLine == 7) {
      res = ["x1", "x2", "p1", "p2", "p3", "B", "R"];
    }
    return res;
  }

  addColumn(vhbKeyVal, vdbKeyVal, id, tableauIndex) {
    let col = new ColonneTableau(this.roundNumber);
    col.setId(id);
    col.setTableauIndex(tableauIndex);
    col.setVhbPosition(vhbKeyVal.getKey());
    col.setVhbValue(vhbKeyVal.getValue());
    col.setVdbPosition(vdbKeyVal.getKey());
    col.setVdbValue(vdbKeyVal.getValue());
    col.setPositionValue(vdbKeyVal.getValue() + "" + vhbKeyVal.getValue());
    col.setCalculated(true);
    return col;
  }

  addColumnWithData(vhbKeyVal, vdbKeyVal, data, id, tableauIndex) {
    let col = this.addColumn(vhbKeyVal, vdbKeyVal, id, tableauIndex);
    col.setValue(data);
    return col;
  }

  getColumnsOfTable(data, tableauIndex) {
    let list = [];
    let vdbPos = 0;
    let dataIndex = 0;

    for (const vdb of this.vdbList()) {
      let vhbPos = 0;
      for (const vhb of this.vhbList()) {
        let col;
        const vhbKeyVal = new KeyVal(vhbPos, vhb);
        const vdbKeyVal = new KeyVal(vdbPos, vdb);

        if (data) {
          col = this.addColumnWithData(
            vhbKeyVal,
            vdbKeyVal,
            data[dataIndex],
            dataIndex,
            tableauIndex
          );
        } else {
          col = this.addColumn(vhbKeyVal, vdbKeyVal, dataIndex, tableauIndex);
        }

        list.push(col);
        vhbPos++;
        dataIndex++;
      }
      vdbPos++;
    }

    return list;
  }

  initTableau(data, tableauIndex) {
    let tableList = this.getColumnsOfTable(data, tableauIndex);
    // La derniere colonne n'est pas calculable
    tableList[tableList.length - 1].setCalculated(false);
    return tableList;
  }

  getCol(vdbPosition, lignePosition) {
    const res = this.numberTotalcolPerLine * vdbPosition + lignePosition;
    return this.colonnes[res];
  }

  getValue(vdbValue, lignePosition) {
    const vdbPosition = this.vdbList2()[vdbValue];
    return this.getCol(vdbPosition, lignePosition).getValue();
  }

  getColonnes(queries) {
    if (queries) {
      const colonnes = [];
      Object.keys(queries).forEach((vdbPosition) => {
        const lignePosition = queries[vdbPosition];
        colonnes.push(this.getCol(vdbPosition, lignePosition));
      });

      return colonnes;
    } else {
      return this.colonnes;
    }
  }

  // a revoir

  /*
  Retourne la ligne associee a la vdbValue
   
  */
  getLine(vdbValue) {
    // return tb_Z[0], tb_Z[1], tb_Z[2], tb_Z[3], tb_Z[4], tb_Z[5]
    const index = this.numberTotalcolPerLine - 1;
    const vdbPosition = this.vdbList2()[vdbValue];
    const start = index * vdbPosition + vdbPosition;
    return this.colonnes.slice(start, start + index + 1);
  }

  // a revoir
  setLine(list, vdbValue) {
    const index = this.numberTotalcolPerLine - 1;
    const vdbPosition = this.vdbList2()[vdbValue];
    const start = index * vdbPosition + vdbPosition;
    let b = 0;
    for (let a = start; a <= start + index; a++) {
      this.colonnes[a] = list[b];
      b++;
    }
  }

  getLineValues(vdbValue) {
    const index = this.numberTotalcolPerLine - 1;
    const vdbPosition = this.vdbList2()[vdbValue];
    const start = index * vdbPosition + vdbPosition;
    return this.toFloat(this.colonnes.slice(start, start + index + 1));
  }

  verifyTable() {
    let nbPositif = 0;
    for (let i = 0; i < this.numberTotalcolPerLine; i++) {
      const val = this.getValue("Z", i);
      if (val > 0) {
        nbPositif++;
      }
    }
    this.isLast = nbPositif === 0;
  }

  toFloat(list) {
    let res = [];
    let a = 0;
    list.forEach((colonneTableau) => {
      res[a] = colonneTableau.getValue();
      a++;
    });

    return res;
  }

  isPValue(value) {
    return ["p1,p2,p3"].includes(value);
  }
}
