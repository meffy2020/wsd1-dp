class BattleLogger {
    constructor(battleContext) {
        this.battleContext = battleContext;
        this.logs = [];
    }

    logBattleEvent(event) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            event,
            turn: this.battleContext.turnCount
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
