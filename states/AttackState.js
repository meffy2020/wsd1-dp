const MonsterState = require('./MonsterState');

class AttackState extends MonsterState {
    constructor(monster) {
        super(monster);
        this.attackBonus = 1.5;
    }

    attack(target) {
        const damage = Math.floor(this.monster.attack * this.attackBonus);
        target.takeDamage(damage);
        return damage;
    }

    defend() {
        this.monster.setState(new DefendState(this.monster));
        return 0;
    }

    takeDamage(damage) {
        this.monster.hp = Math.max(0, this.monster.hp - damage);
        if (this.monster.hp === 0) {
            this.monster.notifyObservers(`${this.monster.name} fainted!`);
        }
        return damage;
    }

    heal(amount) {
        const actualHeal = Math.min(this.monster.maxHp - this.monster.hp, amount);
        this.monster.hp += actualHeal;
        this.monster.notifyObservers(`${this.monster.name} healed for ${actualHeal} HP!`);
        return actualHeal;
    }
}

module.exports = AttackState;
