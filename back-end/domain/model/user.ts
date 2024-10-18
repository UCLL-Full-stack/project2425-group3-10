import {Role} from "../../types";

export class User {
    private id?: number;
    private email: string;
    private password: string;
    private role: Role;

    constructor(user: {
        id?: number
        email: string;
        password: string;
        role:Role;
    }) {
        this.id = user.id;
        this.email = user.email;
        this.password = user.password;
        this.role= user.role
    }

    getId(): number | undefined {
        return this.id
    }

    getEmail(): string {
        return this.email
    }

    getPassword(): string{
        return this.password
    }

    getRole(): Role{
        return this.role
    }

    equals(other:User):boolean{
        return(
            this.email === other.getEmail()
        )
    }
}