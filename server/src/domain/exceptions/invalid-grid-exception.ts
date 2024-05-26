export class InvalidGridException extends Error {
    public readonly status = 400;

    constructor(message: string) {
        super(message);
        this.name = InvalidGridException.name;
    }
}