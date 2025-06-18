const Subject = require('../observer/Subject');

class Player extends Subject {
    constructor(name) {
        super();
        this.name = name;
        this.monsters = [];
        this.activeMonster = null;
    }

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
