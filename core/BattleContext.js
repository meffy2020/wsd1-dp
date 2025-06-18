class BattleContext {
    constructor(player, enemy) {
        this.player = player;
        this.enemy = enemy;
        this.turnCount = 0;
        this.battleLog = [];
        this.observers = [];
    }

    startBattle() {
        this.turnCount = 0;
        this.battleLog = [];
        this.notifyObservers("전투가 시작되었습니다!");
        this.notifyObservers(`${this.player.name} vs ${this.enemy.name}`);
    }

    executeTurn(playerAction, enemyAction) {
        this.turnCount++;
        this.notifyObservers(`\n${this.turnCount}번째 턴`);

        // Player's turn
        if (this.player.activeMonster && this.player.activeMonster.isAlive()) {
            playerAction.execute(this.player.activeMonster, this.enemy.activeMonster);
        }

        // Enemy's turn
        if (this.enemy.activeMonster && this.enemy.activeMonster.isAlive()) {
            enemyAction.execute(this.enemy.activeMonster, this.player.activeMonster);
        }

        // Check battle end conditions
        if (this.checkBattleEnd()) {
            this.endBattle();
        }
    }

    checkBattleEnd() {
        const playerMonstersAlive = this.player.monsters.some(m => m.isAlive());
        const enemyMonstersAlive = this.enemy.monsters.some(m => m.isAlive());
        return !playerMonstersAlive || !enemyMonstersAlive;
    }

    endBattle() {
        const playerWon = this.enemy.monsters.every(m => !m.isAlive());
        const message = playerWon ? 
            `${this.player.name}이(가) 승리했습니다!` : 
            `${this.enemy.name}이(가) 승리했습니다!`;
        
        this.notifyObservers(message);
        this.notifyObservers("전투가 종료되었습니다!");
    }

    // Observer pattern implementation
    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers(message) {
        this.battleLog.push(message);
        this.observers.forEach(observer => observer.update(message));
    }
}

module.exports = BattleContext;
