/**
 * EmphasizedLogger 클래스는 데코레이터 패턴(Decorator Pattern)에서 로그 출력을 강조하는 역할을 한다.
 * - log(message): 강조된 형식으로 로그를 출력한다.
 * 활용 맥락:
 *   - 기본 로그 출력에 추가 효과(강조 등)를 부여할 때 사용한다.
 *   - 예: BattleLogger를 감싸서 로그를 강조.
 */
// EmphasizedLogger 클래스는 log() 메서드로 강조된 전투 로그를 출력한다.
class EmphasizedLogger {
    constructor(observer) {
        this.observer = observer; // observer는 Observer 인터페이스를 구현해야 함
    }

    update(message) {
        const emphasizedMessage = this.emphasizeMessage(message);
        this.observer.update(emphasizedMessage);
    }

    emphasizeMessage(message) {
        if (message.includes("won the battle") || message.includes("승리")) {
            return `🎉 ${message} 🎉`;
        } else if (message.includes("피해") || message.includes("damage")) {
            return `💥 ${message} 💥`;
        } else if (message.includes("회복") || message.includes("healed")) {
            return `💚 ${message} 💚`;
        } else if (message.includes("상태") || message.includes("is now in")) {
            return `✨ ${message} ✨`;
        }
        return message;
    }
}

module.exports = EmphasizedLogger;
