const AttackStrategy = require('./AttackStrategy');

/**
 * NormalAttack 클래스는 전략 패턴(Strategy Pattern)에서 일반 공격 알고리즘을 구현한다.
 * - attack(attacker, target): 일반 피해를 계산하여 적용한다.
 * 활용 맥락:
 *   - 속성에 상관없이 모든 몬스터의 기본 공격에 사용한다.
 *   - 예: 추가 효과 없이 기본 피해만 적용.
 *
 * The NormalAttack class implements a normal attack algorithm in the Strategy Pattern.
 * - attack(attacker, target): Calculates and applies normal damage.
 * Usage context:
 *   - Used for basic attacks by any monster regardless of type.
 *   - Example: Applies only base damage without extra effects.
 */
class NormalAttack extends AttackStrategy {
    constructor() {
        super();
        this.type = 'normal';
        this.baseDamage = 13;
    }

    calculateDamage(attacker, target) {
        let damage = this.baseDamage + attacker.attack;
        
        // Normal attacks have no type effectiveness
        // Random variation (±20%)
        const variation = 0.8 + Math.random() * 0.4;
        return Math.floor(damage * variation);
    }

    getAttackMessage(attacker, target, damage) {
        return `${attacker.name} used Normal Attack! ${target.name} took ${damage} damage!`;
    }

    attack(attacker, target) {
        const damage = this.calculateDamage(attacker, target);
        target.takeDamage(damage);
        const message = this.getAttackMessage(attacker, target, damage);
        if (attacker.notifyObservers) {
            attacker.notifyObservers(message);
        } else {
            console.log(message);
        }
    }
}

module.exports = NormalAttack;
