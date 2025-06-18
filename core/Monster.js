/**
 * Monster 클래스는 게임 내 몬스터의 속성과 행동을 정의한다.
 * - 상태 패턴(State Pattern)을 적용하여, 몬스터의 상태(공격/방어/기절)에 따라 행동이 동적으로 바뀐다.
 * - 전략 패턴(Strategy Pattern)을 활용해 다양한 공격 방식을 유연하게 교체할 수 있다.
 * 주요 메서드:
 *   - takeDamage(damage): 피해를 받아 체력이 감소하며, 상태 변화가 발생할 수 있다.
 *   - heal(amount): 체력을 회복한다.
 *   - setState(state): 몬스터의 상태(AttackState, DefendState, StunnedState 등)를 변경한다.
 *   - attack(target): 현재 설정된 공격 전략에 따라 공격을 수행한다.
 * 사용 예시:
 *   - 몬스터가 공격을 받으면 takeDamage()가 호출되고, 체력에 따라 자동으로 상태가 변경된다.
 *   - 공격 시 attack()이 호출되어, 현재 전략(FireAttack, WaterAttack 등)에 따라 피해량이 달라진다.
 */
class Monster {
    constructor(name, type, hp, attack, defense) {
        this.name = name;
        this.type = type;
        this.maxHp = hp;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.state = null;
        this.observers = [];
    }

    // Monster 클래스는 takeDamage()로 피해를 받고, heal()로 체력을 회복한다.
    // setState()로 상태를 변경하며, attack()으로 현재 전략에 따라 공격을 수행한다.

    takeDamage(damage) {
        const actualDamage = Math.max(1, damage - this.defense);
        this.hp = Math.max(0, this.hp - actualDamage);
        this.notifyObservers(`${this.name}이(가) ${actualDamage}의 피해를 입었습니다!`);
        return actualDamage;
    }

    heal(amount) {
        const actualHeal = Math.min(this.maxHp - this.hp, amount);
        this.hp += actualHeal;
        this.notifyObservers(`${this.name}이(가) ${actualHeal}만큼 회복했습니다!`);
        return actualHeal;
    }

    isAlive() {
        return this.hp > 0;
    }

    setState(state) {
        this.state = state;
        this.notifyObservers(`${this.name}의 상태가 ${state.constructor.name}로 변경되었습니다!`);
    }

    // Observer pattern implementation
    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers(message) {
        this.observers.forEach(observer => observer.update(message));
    }
}

module.exports = Monster;
