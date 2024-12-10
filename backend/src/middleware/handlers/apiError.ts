export default class ApiError extends Error {
    public status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, ApiError.prototype); // Required to extend Error in TS
    }
}
