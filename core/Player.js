const Subject = require('../observer/Subject');

/**
 * Player 클래스는 플레이어의 팀과 행동을 관리한다.
 * - 옵저버 패턴(Observer Pattern)에서 옵저버 역할을 하며, update()로 알림을 받는다.
 * 주요 메서드:
 *   - addMonster(monster): 팀에 몬스터를 추가한다.
 *   - removeMonster(monster): 팀에서 몬스터를 제거한다.
 *   - setActiveMonster(monster): 현재 사용할 몬스터를 지정한다.
 *   - update(message): 알림을 받아 처리한다.
 * 사용 예시:
 *   - 전투 중 몬스터가 추가/제거될 때 addMonster(), removeMonster()가 호출된다.
 *   - 상태 변화 등 알림이 필요할 때 update()가 호출된다.
 */
class Player extends Subject {
    constructor(name) {
        super();
        this.name = name;
        this.monsters = [];
        this.activeMonster = null;
    }

    // Player 클래스는 addMonster()로 팀에 몬스터를 추가하고, removeMonster()로 제거할 수 있다.
    addMonster(monster) {
        this.monsters.push(monster);
        monster.addObserver(this);
        this.notifyObservers(`${monster.name}이(가) 당신의 팀에 합류했습니다!`);
    }

    removeMonster(monster) {
        this.monsters = this.monsters.filter(m => m !== monster);
        monster.removeObserver(this);
        this.notifyObservers(`${monster.name}이(가) 팀을 떠났습니다!`);
    }

    setActiveMonster(monster) {
        if (this.monsters.includes(monster)) {
            this.activeMonster = monster;
            this.notifyObservers(`${monster.name}이(가) 현재 활성화된 몬스터가 되었습니다!`);
        }
    }

    switchMonster(monster) {
        if (this.monsters.includes(monster) && monster.isAlive()) {
            this.setActiveMonster(monster);
            return true;
        }
        return false;
    }

    // Observer pattern implementation
    update(message) {
        console.log(`[플레이어 ${this.name}] ${message}`);
    }
}

module.exports = Player;
