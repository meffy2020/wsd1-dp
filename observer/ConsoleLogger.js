/**
 * ConsoleLogger 클래스는 옵저버 패턴(Observer Pattern)에서 옵저버 역할을 한다.
 * - update(message): 주체(Subject)로부터 알림을 받아 콘솔에 출력한다.
 * 활용 맥락:
 *   - 상태 변화, 이벤트 발생 시 로그를 출력해야 할 때 사용한다.
 *   - 예: BattleContext에서 전투 로그를 받아 콘솔에 출력.
 */
class ConsoleLogger {
    constructor() {
        this.logs = [];
    }

    update(message) {
        console.log(message);
    }

    getLogs() {
        return this.logs;
    }

    clearLogs() {
        this.logs = [];
    }
}

module.exports = ConsoleLogger;
