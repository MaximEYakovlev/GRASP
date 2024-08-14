interface INotificationStrategy {
    send(message: string): void;
}

interface INotificationManager {
    setStrategy(strategy: INotificationStrategy): void;
    notify(message: string): void;
}

class EmailNotification implements INotificationStrategy {
    public send(message: string): void {
        console.log(`sending email: ${message}`);
    }
}

class SlackNotification implements INotificationStrategy {
    public send(message: string): void {
        console.log(`sending slack message: ${message}`);
    }
}

class NotificationManager implements INotificationManager {
    private strategy: INotificationStrategy;

    constructor(strategy: INotificationStrategy) {
        this.strategy = strategy;
    }

    public setStrategy(strategy: INotificationStrategy): void {
        this.strategy = strategy;
    }

    public notify(message: string): void {
        this.strategy.send(message);
    }
}

// use case
const emailNotification: INotificationStrategy = new EmailNotification();
const slackNotification: INotificationStrategy = new SlackNotification();

const notificationManager = new NotificationManager(emailNotification);
notificationManager.notify("this is an email notification");

notificationManager.setStrategy(slackNotification);
notificationManager.notify("this is a slack notification");



