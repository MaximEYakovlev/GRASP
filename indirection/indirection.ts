interface IDatabase {
    getUserById(id: number): string;
}

interface IUserRepository {
    getUser(id: number): string;
}

interface IUser {
    showUser(id: number): void;
}

class Database implements IDatabase {
    public getUserById(id: number): string {
        return `user with ID ${id} from database`;
    }
}

class UserRepository implements IUserRepository {
    private database: IDatabase;

    constructor(database: IDatabase) {
        this.database = database;
    }

    public getUser(id: number): string {
        return this.database.getUserById(id);
    }
}

class User implements IUser {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    public showUser(id: number): void {
        const userData = this.userRepository.getUser(id);
        console.log(userData);
    }
}

// use case
const database: IDatabase = new Database();
const userRepository: IUserRepository = new UserRepository(database);
const user: IUser = new User(userRepository);

user.showUser(1);

