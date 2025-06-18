/**
 * MonsterState는 추상 클래스이며, handle은 하위 추상 메서드
 * AttackState, DefendState, StunnedState는 MonsterState를 상속받아 상태별 행동을 정의함.
 * Monster는 상태(state)를 필드로 가지고 있으며, 체력 변화에 따라 자동으로 상태가 전이됨.
 * 상태에 따라 서로 다른 행동(공격, 반격, 행동 불가)을 수행할 수 있다.
 * 이 구조는 객체의 내부 상태 변화에 따라 행동이 바뀌는 상황에 적합하며, State 패턴의 전형적인 구조임.
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
