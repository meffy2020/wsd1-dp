class EmphasizedLogger {
    constructor(logger) {
        this.logger = logger;
    }

    update(message) {
        const emphasizedMessage = this.emphasizeMessage(message);
        this.logger.update(emphasizedMessage);
    }

    emphasizeMessage(message) {
        // Add emphasis to important battle events
        if (message.includes("won the battle")) {
            return `🎉 ${message} 🎉`;
        } else if (message.includes("took") && message.includes("damage")) {
            return `💥 ${message} 💥`;
        } else if (message.includes("healed")) {
            return `💚 ${message} 💚`;
        } else if (message.includes("is now in")) {
            return `✨ ${message} ✨`;
        }
        return message;
    }
}

module.exports = EmphasizedLogger;
