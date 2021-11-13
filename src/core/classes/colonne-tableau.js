export default class ColonneTableau {
  id;
  vhbValue;
  vdbValue;
  vhbPosition;
  vdbPosition;
  positionValue;
  value = 0;
  lignePosition;
  roundNumber = -1;
  isCalculated = false;
  tableauIndex;

  constructor(roundNumber, value) {
    if (value) {
      this.value = value;
    }

    if (roundNumber) {
      this.roundNumber = roundNumber;
    }
  }

  setTableauIndex(id) {
    this.tableauIndex = id;
  }

  getRoundNumber() {
    return this.roundNumber;
  }

  setRoundNumber(roundNumber) {
    this.roundNumber = roundNumber;
  }

  getLignePosition() {
    return this.lignePosition;
  }

  setLignePosition(lignePosition) {
    this.lignePosition = lignePosition;
  }

  isCalculated() {
    return this.isCalculated;
  }

  setCalculated(calculated) {
    this.isCalculated = calculated;
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getVhbValue() {
    return this.vhbValue;
  }

  setVhbValue(vhbValue) {
    this.vhbValue = vhbValue;
  }

  getVdbValue() {
    return this.vdbValue;
  }

  setVdbValue(vdbValue) {
    this.vdbValue = vdbValue;
  }

  getVhbPosition() {
    return this.vhbPosition;
  }

  setVhbPosition(vhbPosition) {
    this.vhbPosition = vhbPosition;
  }

  getVdbPosition() {
    return this.vdbPosition;
  }

  setVdbPosition(vdbPosition) {
    this.vdbPosition = vdbPosition;
  }

  getPositionValue() {
    return this.positionValue;
  }

  setPositionValue(positionValue) {
    this.positionValue = positionValue;
  }

  getValue() {
    return this.value;
  }

  // a revoir
  setValue(value) {
    if (this.roundNumber !== -1) {
      this.value = Number(parseFloat(value).toFixed(this.roundNumber));
    } else {
      this.value = value;
    }
  }
}
