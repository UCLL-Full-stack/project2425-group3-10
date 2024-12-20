import { User } from "../../domain/model/user";

const validUser: User = new User({
    id: 0,
    email: 'johndoe@gmail.com',
    password: 'johnpassword123',
    role: 'user',
    username: 'johndoe'
});

test('given valid values for a user, when: user is created, then: user is created with those values', () => {
    const newUser: User = new User({
        email: "johndoe@gmail.com",
        id: 0,
        password: "johnpassword123",
        role: 'user',
        username: 'johndoe'
    });
    expect(newUser.getEmail()).toEqual(validUser.getEmail());
    expect(newUser.getId()).toEqual(validUser.getId());
    expect(newUser.getPassword()).toEqual(validUser.getPassword());
    expect(newUser.getRole()).toEqual(validUser.getRole());
    expect(newUser.getUsername()).toEqual(validUser.getUsername());
});

test('given valid values for a user, when: email is compared, then: they are equal', () => {
    const newUser: User = new User({
        email: "johndoe@gmail.com",
        id: 0,
        password: "johnpassword123",
        role: 'user',
        username: 'johndoe'
    });
    expect(newUser.equals(validUser)).toBeTruthy();
});

test('given invalid email format, when: user is created, then: it throws error', () => {
    expect(() => {
        new User({
            email: "invalid-email",
            id: 0,
            password: "johnpassword123",
            role: 'user',
            username: 'johndoe'
        });
    }).toThrow('Invalid email format.');
});

test('given short password, when: user is created, then: it throws error', () => {
    expect(() => {
        new User({
            email: "johndoe@gmail.com",
            id: 0,
            password: "short",
            role: 'user',
            username: 'johndoe'
        });
    }).toThrow('Password must be at least 8 characters long.');
});

test('given empty username, when: user is created, then: it throws error', () => {
    expect(() => {
        new User({
            email: "johndoe@gmail.com",
            id: 0,
            password: "johnpassword123",
            role: 'user',
            username: ''
        });
    }).toThrow('Username cannot be empty.');
});


