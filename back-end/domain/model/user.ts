import {Role} from "../../types";
import { User as UserPrisma } from '@prisma/client';


export class User {
    readonly id?: number;
    readonly email: string;
    readonly password: string;
    readonly role: Role;
    readonly username: string;



    constructor(user: {
        id?: number
        username: string;
        email: string;
        password: string;
        role:Role;

    }) {
        this.id = user.id;
        this.email = user.email;
        this.username = user.username;
        this.password = user.password;
        this.role= user.role;
    }


    getId(): number | undefined {
        return this.id
    }

    getUsername(): string {
        return this.username
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
    static from({id, email, password, role, username}: UserPrisma) {
        return new User({id, email, password,username, role: role as Role})
    }
}