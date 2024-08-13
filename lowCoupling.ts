interface IEmailService {
    sendEmail(to: string, body: string): void;
}

interface IUser {
    notify(message: string): void;
}

class EmailService implements IEmailService {
    public sendEmail(to: string, body: string): void {
        console.log(`Email sent to ${to}: ${body}`);
    }
}

class User implements IUser {
    private email: string;
    private emailService: IEmailService;

    constructor(email: string, emailService: IEmailService) {
        this.email = email;
        this.emailService = emailService;
    }

    public notify(message: string): void {
        this.emailService.sendEmail(this.email, message);
    }
}

// use case
const emailService: IEmailService = new EmailService();
const user: IUser = new User("user@example.com", emailService);
user.notify("Hello, User!");
