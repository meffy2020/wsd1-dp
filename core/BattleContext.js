/**
 * BattleContext 클래스는 전투의 흐름과 턴을 관리한다.
 * - 커맨드 패턴(Command Pattern)을 적용하여 명령 실행을 캡슐화한다.
 * - 옵저버 패턴(Observer Pattern)으로 전투 로그 등 알림을 여러 객체에 전달한다.
 * 주요 메서드:
 *   - startBattle(): 전투를 시작한다.
 *   - executeCommand(command): 명령을 실행한다.
 *   - nextTurn(): 턴을 진행한다.
 *   - checkBattleEnd(): 전투 종료 여부를 판단한다.
 * 사용 예시:
 *   - 플레이어가 명령을 내리면 executeCommand()가 호출된다.
 *   - 턴이 끝날 때마다 nextTurn()이 호출되어 상태가 갱신된다.
 */
class BattleContext {
    constructor(player, enemy) {
        this.player = player;
        this.enemy = enemy;
        this.turnCount = 0;
        this.battleLog = [];
        this.observers = [];
    }

    // BattleContext 클래스는 startBattle()로 전투를 시작하고, executeCommand()로 명령을 실행한다.
    // nextTurn()으로 턴을 진행하며, checkBattleEnd()로 전투 종료 여부를 판단한다.

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

    nextTurn() {
        if (this.checkBattleEnd()) {
            throw new Error('BattleContext.nextTurn: 이미 전투가 종료되었습니다.');
        }
        this.turnCount++;
        this.notifyObservers(`\n${this.turnCount}번째 턴이 종료되었습니다.`);
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

    /**
     * executeCommand(command, isPlayer)
     * 플레이어 또는 적 몬스터가 명령(command)을 실행한다.
     * isPlayer=true면 player, false면 enemy가 명령을 실행한다.
     */
    executeCommand(command, isPlayer = true) {
        if (!command) throw new Error('BattleContext.executeCommand: command는 null/undefined일 수 없습니다.');
        if (isPlayer) {
            if (!this.player.activeMonster || !this.enemy.activeMonster) {
                throw new Error('BattleContext.executeCommand: 활성화된 몬스터가 없습니다.');
            }
            command.execute(this.player.activeMonster, this.enemy.activeMonster);
        } else {
            if (!this.enemy.activeMonster || !this.player.activeMonster) {
                throw new Error('BattleContext.executeCommand: 활성화된 몬스터가 없습니다.');
            }
            command.execute(this.enemy.activeMonster, this.player.activeMonster);
        }
    }
}

module.exports = BattleContext;
