/**
 * AttackStrategy는 추상 클래스이며, attack 메서드는 하위 클래스에서 반드시 구현해야 한다.
 * 각 공격 클래스(FireAttack, WaterAttack 등)는 AttackStrategy를 상속받아 서로 다른 공격 알고리즘을 제공한다.
 * Monster 클래스는 attackStrategy 객체를 참조하고 있으며, 전략(algorithm)을 실행 중에 교체할 수 있도록 설계되어 있다.
 * 이 구조를 통해 알고리즘을 캡슐화하고, 새로운 공격 전략을 기존 코드 수정 없이 쉽게 추가할 수 있다.
 * 이는 OCP(개방-폐쇄 원칙)를 만족하며, 다양한 전투 상황에 유연하게 대응할 수 있는 설계를 가능하게 한다.
 */
class AttackStrategy {
    attack(attacker, target) {
        throw new Error("Must override attack()");
    }
}

module.exports = AttackStrategy;