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
