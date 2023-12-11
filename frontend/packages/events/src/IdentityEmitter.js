export class IdentityEmitter {
  id;
  name;


   constructor(name) {
    this.name = name;
  }

  get payload() {
    return JSON.stringify({
      name: this.name,
    });
  }

  static parse(data) {
    const parsed = JSON.parse(data);

    return {
      id: parsed.id,
      name: parsed.name,
    }
  }
}
