export default class Interpretation {
  id=null;
  zmax;
  x2;
  x3;
  x1;
  e1;
  e2;
  e3;
  progLineaireId;

  constructor() {
    // this.id = `INT-${Math.floor(Math.random() * 10)}`;
  }

  setValue(colonneTableau, variableActivite, isVhb) {
    let value = 0;
    if (colonneTableau.getValue() > 0 || !isVhb) {
      value = colonneTableau.getValue();
    }

    if (variableActivite === "x1") {
      this.setX1(value);
    }
    if (variableActivite === "x2") {
      this.setX2(value);
    }

    if (variableActivite === "x3") {
      this.setX3(value);
    }

    if (variableActivite === "e1") {
      this.setE1(value);
    }

    if (variableActivite === "e2") {
      this.setE2(value);
    }

    if (variableActivite === "e3") {
      this.setE3(value);
    }
  }

  getId() {
    return this.id;
  }

  getX1() {
    return this.x1;
  }

  getX2() {
    return this.x2;
  }

  getX3() {
    return this.x3;
  }

  getE1() {
    return this.e1;
  }

  getE2() {
    return this.e2;
  }

  getE3() {
    return this.e3;
  }

  getZMAX() {
    return this.zmax;
  }

  getProgLineaireId() {
    return this.progLineaireId;
  }

  setProgLineaireId(progLineaireId) {
    this.progLineaireId = progLineaireId;
  }

  setZMAX(ZMAX) {
    this.zmax = ZMAX;
  }

  setX2(x2) {
    this.x2 = x2;
  }

  setX3(x3) {
    this.x3 = x3;
  }

  setX1(x1) {
    this.x1 = x1;
  }

  setE1(e1) {
    this. e1 = e1;
  }

  setE2(e2) {
    this.e2 = e2;
  }

  setE3(e3) {
    this.e3 = e3;
  }

  setId(id) {
    this.id = id;
  }
}
