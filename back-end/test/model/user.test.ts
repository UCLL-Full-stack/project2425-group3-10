import {User} from "../../model/user";

const validUser: User = new User({
    id: 0,
    email: 'johndoe@gmail.com',
    password: 'johnpassword123',
    role: 'user'
})

test('given valid values for a user, when: user is created, then: user is created with those values', () => {
    const newUser: User = new User({
        email: "johndoe@gmail.com", id: 0, password: "johnpassword123", role: 'user'
    })
    expect(newUser.getEmail()).toEqual(validUser.getEmail())
    expect(newUser.getId()).toEqual(validUser.getId())
    expect(newUser.getPassword()).toEqual(validUser.getPassword())
    expect(newUser.getRole()).toEqual(validUser.getRole())
})