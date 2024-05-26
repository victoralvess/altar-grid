import { ClientException } from "./client-exception";

export class InvalidGridException extends ClientException {
    constructor(message: string) {
        super(message);
        this.name = InvalidGridException.name;
    }
}