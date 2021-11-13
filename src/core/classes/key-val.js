export default class KeyVal {
  key;
  value;

  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  getKey() {
    return this.key;
  }

  setKey(key) {
    this.key = key;
  }

  getValue() {
    return this.value;
  }

  setValue(value) {
    this.value = value;
  }
}
