/**
 * Player 클래스는 옵저버 패턴(Observer Pattern)에서 옵저버 역할을 한다.
 * - update(message): 주체(Subject)로부터 알림을 받아 처리한다.
 * 활용 맥락:
 *   - 상태 변화, 이벤트 발생 시 알림을 받아 반응해야 할 때 사용한다.
 *   - 예: BattleContext에서 전투 로그를 받아 출력.
 */
// Player 클래스는 Observer의 역할을 하며, update() 메서드를 통해 알림을 받는다.

class Player {
    constructor(name) {
        this.name = name;
        this.monsters = [];
        this.activeMonster = null;
    }

    addMonster(monster) {
        this.monsters.push(monster);
        if (!this.activeMonster) {
            this.activeMonster = monster;
        }
    }

    removeMonster(monster) {
        this.monsters = this.monsters.filter(m => m !== monster);
        if (this.activeMonster === monster) {
            this.activeMonster = this.monsters[0] || null;
        }
    }

    setActiveMonster(monster) {
        if (this.monsters.includes(monster)) {
            this.activeMonster = monster;
        }
    }

    update(message) {
        // 알림을 받아 처리 (예: 콘솔 출력)
        console.log(`[플레이어 ${this.name}] ${message}`);
    }
}

module.exports = Player;
