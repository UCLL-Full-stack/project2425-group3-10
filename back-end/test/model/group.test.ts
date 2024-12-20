import { Group } from "../../domain/model/group";

const validGroup: Group = new Group({
    id: 1,
    maxPlayers: 10,
    currentPlayers: 5,
    name: 'Group A',
    activityId: 100
});

test('given valid values for a group, when: group is created, then: group is created with those values', () => {
    const newGroup: Group = new Group({
        id: 1,
        maxPlayers: 10,
        currentPlayers: 5,
        name: 'Group A',
        activityId: 100
    });
    expect(newGroup.getId()).toEqual(validGroup.getId());
    expect(newGroup.getMaxPlayers()).toEqual(validGroup.getMaxPlayers());
    expect(newGroup.getCurrentPlayers()).toEqual(validGroup.getCurrentPlayers());
    expect(newGroup.getName()).toEqual(validGroup.getName());
    expect(newGroup.getActivityId()).toEqual(validGroup.getActivityId());
});

test('given valid values for a group, when: group name is compared, then: they are equal', () => {
    const newGroup: Group = new Group({
        id: 1,
        maxPlayers: 10,
        currentPlayers: 5,
        name: 'Group A',
        activityId: 100
    });
    expect(newGroup.equals(validGroup)).toBeTruthy();
});

test('given empty group name, when: group is created, then: it throws error', () => {
    expect(() => {
        new Group({
            id: 1,
            maxPlayers: 10,
            currentPlayers: 5,
            name: '',
            activityId: 100
        });
    }).toThrow('Group name cannot be empty.');
});

test('given invalid max players, when: group is created, then: it throws error', () => {
    expect(() => {
        new Group({
            id: 1,
            maxPlayers: -1,
            currentPlayers: 5,
            name: 'Group A',
            activityId: 100
        });
    }).toThrow('Max players must be greater than 0.');
});

test('given invalid current players (greater than max players), when: group is created, then: it throws error', () => {
    expect(() => {
        new Group({
            id: 1,
            maxPlayers: 10,
            currentPlayers: 15,
            name: 'Group A',
            activityId: 100
        });
    }).toThrow('Current players must be between 0 and max players.');
});

test('given invalid current players (negative), when: group is created, then: it throws error', () => {
    expect(() => {
        new Group({
            id: 1,
            maxPlayers: 10,
            currentPlayers: -1,
            name: 'Group A',
            activityId: 100
        });
    }).toThrow('Current players must be between 0 and max players.');
});

test('given invalid activity id, when: group is created, then: it throws error', () => {
    expect(() => {
        new Group({
            id: 1,
            maxPlayers: 10,
            currentPlayers: 5,
            name: 'Group A',
            activityId: 0
        });
    }).toThrow('Activity ID must be a positive number.');
});
