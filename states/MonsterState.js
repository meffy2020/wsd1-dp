/**
 * MonsterState 클래스는 상태 패턴(State Pattern)에서 추상 상태 역할을 한다.
 * - handle()은 하위 클래스에서 상태별 행동을 구현하도록 강제한다.
 * 활용 맥락:
 *   - 객체의 내부 상태에 따라 행동이 달라져야 할 때 사용한다.
 *   - 예: AttackState, DefendState, StunnedState 등에서 각기 다른 행동 정의.
 */
class MonsterState {
    constructor(monster) {
        this.monster = monster;
    }

    attack(target) {
        throw new Error("Method 'attack()' must be implemented");
    }

    defend() {
        throw new Error("Method 'defend()' must be implemented");
    }

    takeDamage(damage) {
        throw new Error("Method 'takeDamage()' must be implemented");
    }

    heal(amount) {
        throw new Error("Method 'heal()' must be implemented");
    }

    handle(monster, target) {
        throw new Error("Must implement handle()");
    }

    getName() {
        throw new Error("Must implement getName()");
    }
}

module.exports = MonsterState;
