import { Role } from "../../types";
import { User as UserPrisma } from '@prisma/client';

export class User {
    readonly id?: number;
    readonly email: string;
    readonly password: string;
    readonly role: Role;
    readonly username: string;

    constructor(user: {
        id?: number;
        username: string;
        email: string;
        password: string;
        role: Role;
    }) {
        this.id = user.id;
        this.email = user.email;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;

        // Validate fields
        this.validate();
    }

    private validate(): void {
        this.validateEmail();
        this.validatePassword();
        this.validateUsername();
        this.validateRole();
    }

    private validateEmail(): void {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(this.email)) {
            throw new Error('Invalid email format.');
        }
    }

    private validatePassword(): void {
        if (this.password.length < 8) {
            throw new Error('Password must be at least 8 characters long.');
        }
    }

    private validateUsername(): void {
        if (!this.username || this.username.trim().length === 0) {
            throw new Error('Username cannot be empty.');
        }
        if (this.username.length < 3) {
            throw new Error('Username must be at least 3 characters long.');
        }
    }

    private validateRole(): void {
        const validRoles: Role[] = ['admin', 'user', 'moderator'];
        if (!validRoles.includes(this.role)) {
            throw new Error('Invalid role.');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getRole(): Role {
        return this.role;
    }

    equals(other: User): boolean {
        return this.email === other.getEmail();
    }

    static from({ id, email, password, role, username }: UserPrisma): User {
        return new User({ id, email, password, username, role: role as Role });
    }
}
