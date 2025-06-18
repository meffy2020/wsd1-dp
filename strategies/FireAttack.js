const AttackStrategy = require('./AttackStrategy');

/**
 * FireAttack 클래스는 전략 패턴(Strategy Pattern)에서 불 속성 공격 알고리즘을 구현한다.
 * - attack(attacker, target): 불 속성 피해를 계산하여 적용한다.
 * 활용 맥락:
 *   - 불 속성 몬스터의 공격에 사용한다.
 *   - 예: GrassAttack에 비해 추가 피해 적용.
 */
class FireAttack extends AttackStrategy {
    constructor() {
        super();
        this.type = 'fire';
        this.baseDamage = 15;
    }

    calculateDamage(attacker, target) {
        let damage = this.baseDamage + attacker.attack;
        
        // Type effectiveness
        if (target.type === 'grass') {
            damage *= 2; // Super effective
        } else if (target.type === 'water') {
            damage *= 0.5; // Not very effective
        }

        // Random variation (±20%)
        const variation = 0.8 + Math.random() * 0.4;
        return Math.floor(damage * variation);
    }

    getAttackMessage(attacker, target, damage) {
        return `${attacker.name} used Fire Attack! ${target.name} took ${damage} damage!`;
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

module.exports = FireAttack;
