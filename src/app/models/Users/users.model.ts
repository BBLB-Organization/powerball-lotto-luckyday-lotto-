export class Users {
    constructor(
        public id: number | null,
        public username: string,
        public emailAddress: string,
        public password: string,
        public roles: string,
        public accessToken: string
    ) {}
}
