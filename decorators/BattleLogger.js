/**
 * BattleLogger 클래스는 데코레이터 패턴(Decorator Pattern)에서 기본 전투 로그 출력을 담당한다.
 * - log(message): 전투 로그를 출력한다.
 * 활용 맥락:
 *   - 전투 상황을 기록하거나, 로그 출력을 확장할 때 사용한다.
 *   - 예: EmphasizedLogger로 로그를 강조하여 출력.
 */
const fs = require('fs');
const path = require('path');

class BattleLogger {
    constructor(filename = 'battle.log') {
        this.filename = path.resolve(__dirname, '..', 'logs', filename);
        // 로그 파일 초기화
        fs.writeFileSync(this.filename, '', 'utf8');
    }

    update(message) {
        this.logBattleEvent(message);
    }

    logBattleEvent(event) {
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] ${event}\n`;
        fs.appendFileSync(this.filename, logEntry, 'utf8');
    }

    getBattleLogs() {
        return fs.readFileSync(this.filename, 'utf8');
    }

    clearLogs() {
        fs.writeFileSync(this.filename, '', 'utf8');
    }
}

module.exports = BattleLogger;
