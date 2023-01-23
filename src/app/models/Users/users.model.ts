export class Users {
    id: number | null;
    email: string;
    username: string;
    accountCreatedOn: Date;
    constructor(
        id: number | null,
        email: string,
        username: string,
        accountCreatedOn: Date
    ) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.accountCreatedOn = accountCreatedOn;
    }
}
