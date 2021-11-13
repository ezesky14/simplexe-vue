import { SimplexeType } from "../enum/simplexe-type.enum";

export default class ProgrammeLineaire {
  id = null;
  zEquation;
  zEquationValues;
  equation1;
  equation1Values;
  equation2;
  equation2Values;
  equation3;
  equation3Values;
  type;
  allEquationValues = [];
  equationValuesWithoutPValues = [];
  colList = [];
  nbTableau = 0;
  roundNumber = -1;

  constructor(type, roundNumber) {
    this.id = `PL-${Math.floor(Math.random() * 10)}`;
    this.roundNumber = roundNumber;
    this.type = type;
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getNbTableau() {
    return this.nbTableau;
  }

  setNbTableau(nbTableau) {
    this.nbTableau = nbTableau;
  }

  getColList() {
    return this.colList;
  }

  getRoundNumber() {
    return this.roundNumber;
  }

  setRoundNumber(roundNumber) {
    this.roundNumber = roundNumber;
  }

  getType() {
    return this.type;
  }

  setType(type) {
    this.type = type;
  }

  getAllEquationValues() {
    return this.allEquationValues;
  }

  setAllEquationValues(allEquationValues) {
    this.allEquationValues = allEquationValues;
  }

  pushEquationValues(values) {
    Object.values(values).forEach((v) => {
      this.allEquationValues.push(v);
    });
  }

  getzEquationValues() {
    return this.zEquationValues;
  }

  setzEquationValues(zEquationValues) {
    this.zEquationValues = zEquationValues;
  }

  getEquation1Values() {
    return this.equation1Values;
  }

  setEquation1Values(equation1Values) {
    this.equation1Values = equation1Values;
  }

  getEquation2Values() {
    return this.equation2Values;
  }

  setEquation2Values(equation2Values) {
    this.equation2Values = equation2Values;
  }

  getEquation3Values() {
    return this.equation3Values;
  }

  setEquation3Values(equation3Values) {
    this.equation3Values = equation3Values;
  }

  getzEquation() {
    return this.zEquation;
  }

  getEquationValuesWithoutPValues() {
    return this.equationValuesWithoutPValues;
  }

  setEquationValuesWithoutPValues(equationValuesWithoutPValues) {
    this.equationValuesWithoutPValues = equationValuesWithoutPValues;
  }

  pushEquationValuesWithoutPValues(values) {
    // A revoir
    this.equationValuesWithoutPValues = values;
  }

  getSign() {
    //Definir les signes si >= ou <=
    if (
      this.type == SimplexeType.MAXI_TROIS_VARIABLES ||
      this.type == SimplexeType.MAXI_DEUX_VARIABLES
    ) {
      return ">=";
    } else {
      return "<=";
    }
  }

  getInconnuVariable(number) {
    // Definir les signes si >= ou <=
    if (
      this.type == SimplexeType.MAXI_TROIS_VARIABLES ||
      this.type == SimplexeType.MAXI_DEUX_VARIABLES
    ) {
      return "x" + number;
    } else {
      return "y" + number;
    }
  }

  getEquation2() {
    return this.equation2;
  }

  getPValues(vdbIndex) {
    let values = [];
    for (let a = 0; a < 3; a++) {
      values[a] = a === vdbIndex ? 1 : 0;
    }

    return values;
  }

  addOtherValues(vhbValues, pValues, b) {
    // float[] r = {x1, x2, x3, 0, 0, 0, 0, 0};
    let init = {};
    let a = 0;

    vhbValues.forEach((v) => {
      init[a] = v;
      a++;
    });

    pValues.forEach((v) => {
      init[a] = v;
      a++;
    });

    // Pour Z
    if (b == -1) {
      init[a] = 0;
      init[a + 1] = 0;
    } else {
      init[a] = b;
      init[a + 1] = 0;
    }

    return init;
  }

  getVDBValues(x1, x2, x3) {
    let v = [x1, x2];
    if (this.type == SimplexeType.MAXI_TROIS_VARIABLES) {
      v.push(x3);
    }
    return v;
  }

  setEquation1(x1, x2, x3, b) {
    const init = this.getVDBValues(x1, x2, x3);
    const pValues = this.getPValues(0);
    const r = this.addOtherValues(init, pValues, b);
    init.push(b);
    this.pushEquationValues(r);
    this.pushEquationValuesWithoutPValues(init);
    this.equation1Values = r;
    // this.equation1 = x1 + getInconnuVariable("1") + " + " + x2 + getInconnuVariable("2") + " + " + x3 + getInconnuVariable("3") + " " + getSign() + " " + b;
  }

  setEquation2(x1, x2, x3, b) {
    const init = this.getVDBValues(x1, x2, x3);
    const pValues = this.getPValues(1);
    const r = this.addOtherValues(init, pValues, b);
    init.push(b);
    this.pushEquationValues(r);
    this.pushEquationValuesWithoutPValues(init);
    this.equation2Values = r;
    // this.equation2 = x1 + getInconnuVariable("1") + " + " + x2 + getInconnuVariable("2") + " + " + x3 + getInconnuVariable("3") + " " + getSign() + " " + b;
  }

  setEquation3(x1, x2, x3, b) {
    const init = this.getVDBValues(x1, x2, x3);
    let pValues = this.getPValues(2);
    let r = this.addOtherValues(init, pValues, b);
    init.push(b);
    this.pushEquationValues(r);
    this.pushEquationValuesWithoutPValues(init);
    this.equation3Values = r;
    // this.equation3 = x1 + getInconnuVariable("1") + " + " + x2 + getInconnuVariable("2") + " + " + x3 + getInconnuVariable("3") + " " + getSign() + " " + b;
  }

  setzEquation(x1, x2, x3) {
    const init = this.getVDBValues(x1, x2, x3);
    let pValues = this.getPValues(-1);
    let r = this.addOtherValues(init, pValues, -1);
    this.pushEquationValues(r);
    this.pushEquationValuesWithoutPValues(init);
    this.zEquationValues = r;
    // this.zEquation = x1 + getInconnuVariable("1") + " + " + x2 + getInconnuVariable("2") + " + " + x3 + getInconnuVariable("3");
  }

  getColumnsNumberPerLine() {
    let res = 0;
    if (
      this.type === SimplexeType.MAXI_TROIS_VARIABLES ||
      this.type === SimplexeType.MINI_TROIS_VARIABLES
    ) {
      res = 8;
    }
    if (
      this.type === SimplexeType.MAXI_DEUX_VARIABLES ||
      this.type == SimplexeType.MINI_DEUX_VARIABLES
    ) {
      res = 7;
    }
    return res;
  }

  getNumberColumnPerTypeOfCalculation() {
    let res = 0;
    if (
      this.type === SimplexeType.MAXI_TROIS_VARIABLES ||
      this.type === SimplexeType.MINI_TROIS_VARIABLES
    ) {
      res = 31;
    }
    if (
      this.type === SimplexeType.MAXI_DEUX_VARIABLES ||
      this.type === SimplexeType.MINI_DEUX_VARIABLES
    ) {
      res = 27;
    }
    return res;
  }
}
