const MonsterState = require('./MonsterState');

class DefendState extends MonsterState {
    constructor(monster) {
        super(monster);
        this.defenseBonus = 2.0;
    }

    attack(target) {
        this.monster.setState(new AttackState(this.monster));
        return this.monster.state.attack(target);
    }

    defend() {
        this.monster.notifyObservers(`${this.monster.name} is already defending!`);
        return 0;
    }

    takeDamage(damage) {
        const reducedDamage = Math.floor(damage / this.defenseBonus);
        this.monster.hp = Math.max(0, this.monster.hp - reducedDamage);
        if (this.monster.hp === 0) {
            this.monster.notifyObservers(`${this.monster.name} fainted!`);
        }
        return reducedDamage;
    }

    heal(amount) {
        const actualHeal = Math.min(this.monster.maxHp - this.monster.hp, amount);
        this.monster.hp += actualHeal;
        this.monster.notifyObservers(`${this.monster.name} healed for ${actualHeal} HP!`);
        return actualHeal;
    }
}

module.exports = DefendState;
