/**
 * Command 클래스는 커맨드 패턴(Command Pattern)에서 추상 명령 역할을 한다.
 * - execute()는 하위 클래스에서 구체적인 명령을 구현하도록 강제한다.
 * 활용 맥락:
 *   - 명령 실행을 캡슐화하여, 실행자와 명령의 분리를 가능하게 한다.
 *   - 예: AttackCommand가 execute()로 공격 명령을 수행.
 */
class Command {
    constructor() {
        if (this.constructor === Command) {
            throw new Error("Cannot instantiate abstract class Command");
        }
    }

    // Command 클래스는 execute() 메서드를 추상 메서드로 제공하며, 하위 클래스에서 구체적인 명령을 구현한다.
    execute(attacker, target) {
        throw new Error("Method 'execute()' must be implemented");
    }

    undo() {
        throw new Error("Method 'undo()' must be implemented");
    }
}

module.exports = Command;
