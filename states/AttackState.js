const MonsterState = require('./MonsterState');

/**
 * AttackState 클래스는 상태 패턴(State Pattern)에서 공격 상태를 정의한다.
 * - handle()로 공격 상태에서의 행동을 구현한다.
 * 활용 맥락:
 *   - 몬스터가 공격 가능한 상태일 때 사용한다.
 *   - 예: 공격 시 추가 피해를 적용.
 */
class AttackState extends MonsterState {
    constructor(monster) {
        super(monster);
        this.attackBonus = 1.5;
    }

    // AttackState 클래스는 handle() 메서드로 공격 상태에서의 행동을 정의한다.

    attack(target) {
        const damage = Math.floor(this.monster.attack * this.attackBonus);
        target.takeDamage(damage);
        return damage;
    }

    defend() {
        this.monster.setState(new DefendState(this.monster));
        return 0;
    }

    takeDamage(damage) {
        this.monster.hp = Math.max(0, this.monster.hp - damage);
        if (this.monster.hp === 0) {
            this.monster.notifyObservers(`${this.monster.name} fainted!`);
        }
        return damage;
    }

    heal(amount) {
        const actualHeal = Math.min(this.monster.maxHp - this.monster.hp, amount);
        this.monster.hp += actualHeal;
        this.monster.notifyObservers(`${this.monster.name} healed for ${actualHeal} HP!`);
        return actualHeal;
    }
}

module.exports = AttackState;
