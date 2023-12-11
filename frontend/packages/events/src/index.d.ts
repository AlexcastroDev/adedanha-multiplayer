declare module "@internal/events" {
  export class IdentityEmitter {
    id: string;
    name: string;

    /**
     * Creates a new identity emitter.
     * @param {string} name - The name of the emitter.
     */
    constructor(name: string);

    /**
     * Gets the JSON representation of the emitter.
     * @returns {string} - The JSON string.
     */
    get payload(): string;

    /**
     * Parses the JSON data and updates the emitter's properties.
     * @param {string} data - The JSON string to parse.
     */
    static parse(data: string): identityEmitter;
  }
}
