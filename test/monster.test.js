const Monster = require('../core/Monster');
const FireAttack = require('../strategies/FireAttack');
const WaterAttack = require('../strategies/WaterAttack');
const AttackState = require('../states/AttackState');
const DefendState = require('../states/DefendState');
const StunnedState = require('../states/StunnedState');

describe('Monster 클래스 테스트', () => {
    let fireMon, waterMon;
    beforeEach(() => {
        fireMon = new Monster('파이리', 'fire', 100, 20, 5);
        waterMon = new Monster('꼬부기', 'water', 120, 15, 10);
        fireMon.setState(new AttackState(fireMon));
        waterMon.setState(new AttackState(waterMon));
        fireMon.setStrategy(new FireAttack());
        waterMon.setStrategy(new WaterAttack());
    });

    test('공격 시 체력 감소', () => {
        const prevHp = waterMon.hp;
        fireMon.attackStrategy.attack(fireMon, waterMon);
        expect(waterMon.hp).toBeLessThan(prevHp);
    });

    test('상태 전이: 체력 0 이하면 StunnedState', () => {
        waterMon.hp = 1;
        fireMon.attackStrategy.attack(fireMon, waterMon);
        waterMon.setState(new StunnedState(waterMon));
        expect(waterMon.state instanceof StunnedState).toBe(true);
    });

    test('전략 변경 시 공격 방식 변경', () => {
        fireMon.setStrategy(new WaterAttack());
        expect(fireMon.attackStrategy instanceof WaterAttack).toBe(true);
    });

    test('방어 상태에서 피해 감소', () => {
        waterMon.setState(new DefendState(waterMon));
        const prevHp = waterMon.hp;
        fireMon.attackStrategy.attack(fireMon, waterMon);
        expect(waterMon.hp).toBeLessThan(prevHp);
    });
}); 