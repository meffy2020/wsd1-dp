/**
 * AttackStrategy 클래스는 전략 패턴(Strategy Pattern)에서 추상 전략 역할을 한다.
 * - attack(attacker, target): 하위 클래스에서 다양한 공격 알고리즘을 구현한다.
 * 활용 맥락:
 *   - 공격 방식을 동적으로 교체하거나 확장할 때 사용한다.
 *   - 예: FireAttack, WaterAttack 등 다양한 공격 전략 적용.
 */
class AttackStrategy {
    // AttackStrategy 클래스는 attack() 메서드를 추상 메서드로 제공하며, 하위 클래스에서 다양한 공격 알고리즘을 구현한다.
    attack(attacker, target) {
        throw new Error("Must override attack()");
    }
}

module.exports = AttackStrategy;