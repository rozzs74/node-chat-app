const expect = require('expect');

const { Users } = require('./users');



describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: '1',
                name: 'John',
                room: 'Node Course'
            },
            {
                id: '2',
                name: 'Royce',
                room: 'Angular Course'
            },
            {
                id: '3',
                name: 'Robot Royce',
                room: 'Node Course'
            }
        ];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Royce',
            room: 'Office fans'
        };
        var res = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var userId= '1';
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        var userId= '132';
        var user = users.removeUser(userId);
        expect(user).toNotExist();        
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var userId = '1';
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);

    });

    it('should not find user', () => {
        var userId = '99';
        var user = users.getUser(userId);
        expect(user).toBeA('undefined');
        expect(user).toNotExist();
    });

    it('should return names for Node course', () => {
        var userList = users.getUserList('Node Course');
        expect(userList).toEqual(['John', 'Robot Royce']);
    });

    it('should return names for Angular course', () => {
        var userList = users.getUserList('Angular Course');
        expect(userList).toEqual(['Royce']);
    });
});