/**
 * MonsterFactory는 몬스터 생성을 담당하는 추상 팩토리 역할을 한다.
 * 몬스터 타입에 따라 서로 다른 전략과 초기 체력을 가진 Monster 객체를 생성한다.
 * 이 구조는 객체 생성을 중앙화하여 관리하며, 새로운 몬스터 타입이 추가되어도 기존 생성 코드를 수정하지 않는다.
 * 이는 OCP(개방-폐쇄 원칙)를 만족하고, 객체 생성을 위한 일관된 인터페이스를 제공한다.
 */
const Monster = require('../core/Monster');

class MonsterFactory {
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
