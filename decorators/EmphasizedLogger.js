/**
 * EmphasizedLogger 클래스는 데코레이터 패턴(Decorator Pattern)에서 로그 출력을 강조하는 역할을 한다.
 * - log(message): 강조된 형식으로 로그를 출력한다.
 * 활용 맥락:
 *   - 기본 로그 출력에 추가 효과(강조 등)를 부여할 때 사용한다.
 *   - 예: BattleLogger를 감싸서 로그를 강조.
 */
// EmphasizedLogger 클래스는 log() 메서드로 강조된 전투 로그를 출력한다.
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

    log(message) {
        console.log(`💥 ${message} 💥`);
    }
}

module.exports = EmphasizedLogger;
