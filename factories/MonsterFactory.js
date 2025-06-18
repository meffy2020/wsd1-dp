/**
 * MonsterFactory 클래스는 팩토리 패턴(Factory Pattern)에서 몬스터 객체 생성을 담당한다.
 * - createMonster(type, level): 몬스터 타입과 레벨에 따라 객체를 생성한다.
 * - getBaseStats(type): 몬스터 타입별 기본 능력치를 반환한다.
 * - generateName(type): 몬스터의 이름을 생성한다.
 * 활용 맥락:
 *   - 몬스터 생성 로직을 중앙 집중화하여, 새로운 몬스터 타입 추가 시 코드 변경을 최소화한다.
 *   - 예: 게임 내 다양한 몬스터를 일관된 방식으로 생성.
 */
const Monster = require('../core/Monster');

class MonsterFactory {
    // MonsterFactory 클래스는 createMonster()로 몬스터 객체를 생성하며, getBaseStats()와 generateName()으로 몬스터의 기본 능력치와 이름을 설정한다.
    static createMonster(type, level = 1) {
        const baseStats = this.getBaseStats(type);
        const levelMultiplier = 1 + (level - 1) * 0.1;

        const monster = new Monster(
            this.generateName(type),
            type,
            Math.floor(baseStats.hp * levelMultiplier),
            Math.floor(baseStats.attack * levelMultiplier),
            Math.floor(baseStats.defense * levelMultiplier)
        );

        console.log(`[팩토리] ${monster.name} 몬스터가 생성되었습니다! 체력: ${monster.hp}`);
        return monster;
    }

    static getBaseStats(type) {
        const stats = {
            fire: { hp: 100, attack: 15, defense: 10 },
            water: { hp: 120, attack: 12, defense: 15 },
            grass: { hp: 90, attack: 14, defense: 12 },
            normal: { hp: 110, attack: 13, defense: 13 }
        };
        return stats[type] || stats.normal;
    }

    static generateName(type) {
        const prefixes = {
            fire: ['블레이즈', '플레임', '인페르노'],
            water: ['웨이브', '타이드', '오션'],
            grass: ['리프', '바인', '포레스트'],
            normal: ['와일드', '페럴', '내추럴']
        };

        const suffixes = ['몬', '드라', '곤', '이트', '츄'];
        const prefix = prefixes[type][Math.floor(Math.random() * prefixes[type].length)];
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

        return prefix + suffix;
    }
}

module.exports = MonsterFactory;
