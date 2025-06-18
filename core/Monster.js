class Monster {
    constructor(name, type, hp, attack, defense) {
        this.name = name;
        this.type = type;
        this.maxHp = hp;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.state = null;
        this.observers = [];
    }

    takeDamage(damage) {
        const actualDamage = Math.max(1, damage - this.defense);
        this.hp = Math.max(0, this.hp - actualDamage);
        this.notifyObservers(`${this.name}이(가) ${actualDamage}의 피해를 입었습니다!`);
        return actualDamage;
    }

    heal(amount) {
        const actualHeal = Math.min(this.maxHp - this.hp, amount);
        this.hp += actualHeal;
        this.notifyObservers(`${this.name}이(가) ${actualHeal}만큼 회복했습니다!`);
        return actualHeal;
    }

    isAlive() {
        return this.hp > 0;
    }

    setState(state) {
        this.state = state;
        this.notifyObservers(`${this.name}의 상태가 ${state.constructor.name}로 변경되었습니다!`);
    }

    // Observer pattern implementation
    addObserver(observer) {
        this.observers.push(observer);
    }

    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notifyObservers(message) {
        this.observers.forEach(observer => observer.update(message));
    }
}

module.exports = Monster;
