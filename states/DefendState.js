const MonsterState = require('./MonsterState');

/**
 * DefendState 클래스는 상태 패턴(State Pattern)에서 방어 상태를 정의한다.
 * - handle()로 방어 상태에서의 행동을 구현한다.
 * 활용 맥락:
 *   - 몬스터가 방어 중일 때 사용한다.
 *   - 예: 방어 시 피해 감소 적용.
 */
class DefendState extends MonsterState {
    constructor(monster) {
        super(monster);
        this.defenseBonus = 2.0;
    }

    // DefendState 클래스는 handle() 메서드로 방어 상태에서의 행동을 정의한다.

    attack(target) {
        this.monster.setState(new AttackState(this.monster));
        return this.monster.state.attack(target);
    }

    defend() {
        this.monster.notifyObservers(`${this.monster.name} is already defending!`);
        return 0;
    }

    takeDamage(damage) {
        const reducedDamage = Math.floor(damage / this.defenseBonus);
        this.monster.hp = Math.max(0, this.monster.hp - reducedDamage);
        if (this.monster.hp === 0) {
            this.monster.notifyObservers(`${this.monster.name} fainted!`);
        }
        return reducedDamage;
    }

    heal(amount) {
        const actualHeal = Math.min(this.monster.maxHp - this.monster.hp, amount);
        this.monster.hp += actualHeal;
        this.monster.notifyObservers(`${this.monster.name} healed for ${actualHeal} HP!`);
        return actualHeal;
    }
}

module.exports = DefendState;
