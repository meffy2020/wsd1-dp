/**
 * BattleLogger 클래스는 데코레이터 패턴(Decorator Pattern)에서 기본 전투 로그 출력을 담당한다.
 * - log(message): 전투 로그를 출력한다.
 * 활용 맥락:
 *   - 전투 상황을 기록하거나, 로그 출력을 확장할 때 사용한다.
 *   - 예: EmphasizedLogger로 로그를 강조하여 출력.
 */
class BattleLogger {
    constructor(battleContext) {
        this.battleContext = battleContext;
        this.logs = [];
    }

    update(message) {
        this.logBattleEvent(message);
    }

    logBattleEvent(event) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            event,
            turn: this.battleContext ? this.battleContext.turnCount : null
        };
        this.logs.push(logEntry);
        return logEntry;
    }

    getBattleLogs() {
        return this.logs;
    }

    getLogsByTurn(turn) {
        return this.logs.filter(log => log.turn === turn);
    }

    clearLogs() {
        this.logs = [];
    }
}

module.exports = BattleLogger;
