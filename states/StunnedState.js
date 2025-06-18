const MonsterState = require('./MonsterState');
const AttackState = require('./AttackState');

/**
 * StunnedState 클래스는 상태 패턴(State Pattern)에서 기절 상태를 정의한다.
 * - handle()로 기절 상태에서의 행동을 구현한다.
 * 활용 맥락:
 *   - 몬스터가 행동 불능 상태일 때 사용한다.
 *   - 예: 공격, 방어 등 모든 행동 불가.
 */
class StunnedState extends MonsterState {
    constructor(monster) {
        super(monster);
        this.turnsLeft = 2;
    }

    // StunnedState 클래스는 handle() 메서드로 기절 상태에서의 행동을 정의한다.

    attack(target) {
        this.monster.notifyObservers(`${this.monster.name} is stunned and cannot attack!`);
        this.turnsLeft--;
        if (this.turnsLeft <= 0) {
            this.monster.setState(new AttackState(this.monster));
            this.monster.notifyObservers(`${this.monster.name} is no longer stunned!`);
        }
        return 0;
    }

    defend() {
        this.monster.notifyObservers(`${this.monster.name} is stunned and cannot defend!`);
        this.turnsLeft--;
        if (this.turnsLeft <= 0) {
            this.monster.setState(new AttackState(this.monster));
            this.monster.notifyObservers(`${this.monster.name} is no longer stunned!`);
        }
        return 0;
    }

    takeDamage(damage) {
        const increasedDamage = Math.floor(damage * 1.5); // Stunned monsters take more damage
        this.monster.hp = Math.max(0, this.monster.hp - increasedDamage);
        if (this.monster.hp === 0) {
            this.monster.notifyObservers(`${this.monster.name} fainted!`);
        }
        return increasedDamage;
    }

    heal(amount) {
        const actualHeal = Math.min(this.monster.maxHp - this.monster.hp, amount);
        this.monster.hp += actualHeal;
        this.monster.notifyObservers(`${this.monster.name} healed for ${actualHeal} HP!`);
        return actualHeal;
    }
}

module.exports = StunnedState;
