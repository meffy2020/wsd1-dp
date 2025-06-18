/**
 * Command는 추상 클래스이며, execute 메서드는 하위 클래스에서 반드시 구현해야 한다.
 * AttackCommand는 Command를 상속받아 공격 전략을 실행하는 명령 객체를 구현한다.
 * BattleContext 클래스는 명령(Command 객체)을 받아 저장하고, executeCommand 메서드로 해당 명령을 실행한다.
 * 이 구조는 명령 발신자와 실행자를 분리하며, 명령을 캡슐화하여 실행 흐름을 동적으로 설정할 수 있게 한다.
 * 이는 SRP(단일 책임 원칙)과 OCP(개방-폐쇄 원칙)를 만족하는 구조이다.
 */
class Command {
    constructor() {
        if (this.constructor === Command) {
            throw new Error("Cannot instantiate abstract class Command");
        }
    }

    execute(attacker, target) {
        throw new Error("Method 'execute()' must be implemented");
    }

    undo() {
        throw new Error("Method 'undo()' must be implemented");
    }
}

module.exports = Command;
