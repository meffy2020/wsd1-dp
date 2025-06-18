const Command = require('./Command');

/**
 * AttackCommand 클래스는 커맨드 패턴(Command Pattern)에서 구체적인 명령 역할을 한다.
 * - execute()로 공격 명령을 수행하며, 전략 패턴을 활용해 다양한 공격 방식을 적용할 수 있다.
 * 활용 맥락:
 *   - 플레이어의 공격 명령을 캡슐화하여, 실행 시점에 전략을 교체할 수 있다.
 *   - 예: FireAttack, WaterAttack 등 다양한 전략을 적용한 공격 명령 실행.
 */
class AttackCommand extends Command {
    constructor(strategy) {
        super();
        this.strategy = strategy;
    }

    execute(attacker, target) {
        this.strategy.attack(attacker, target);
    }
}

module.exports = AttackCommand;