interface IEmailService {
    sendEmail(to: string, body: string): void;
}

interface IUserNotificationService {
    notify(message: string): void;
}

class EmailService implements IEmailService {
    public sendEmail(to: string, body: string): void {
        console.log(`email sent to ${to}: ${body}`);
    }
}

class UserNotificationService implements IUserNotificationService {
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
const userNotificationService: IUserNotificationService = new UserNotificationService("user@example.com", emailService);
userNotificationService.notify("hello, user!");
