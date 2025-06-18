/**
 * Subject 클래스는 옵저버 패턴(Observer Pattern)에서 '주체' 역할을 한다.
 * - subscribe(observer): 옵저버를 등록한다.
 * - unsubscribe(observer): 옵저버 등록을 해지한다.
 * - notifyObservers(message): 등록된 모든 옵저버에게 알림을 전달한다.
 * 활용 맥락:
 *   - 상태 변화, 이벤트 발생 시 여러 객체에게 동시에 알림이 필요할 때 사용한다.
 *   - 예: BattleContext가 전투 로그를 여러 Logger(옵저버)에게 동시에 전달.
 */
// Subject 클래스는 옵서버를 등록하고 해지하며, notifyObservers()로 등록된 모든 옵서버에게 알림을 전달한다.
// observers 배열에 옵서버를 저장하고, subscribe(), unsubscribe(), notifyObservers() 메서드를 제공한다.
class Subject {
    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
        }
    }

    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers(message) {
        this.observers.forEach(observer => {
            if (typeof observer.update === 'function') {
                observer.update(message);
            }
        });
    }
}

module.exports = Subject;
