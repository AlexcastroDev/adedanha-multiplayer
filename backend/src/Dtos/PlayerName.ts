export class PlayerName {
  value = "";

  constructor(name: any) {
    this.value = name ?? "";
  }

  get isValid() {
    if (this.value.length < 3 || this.value.length > 20) {
      return false;
    }

    return true;
  }
}
