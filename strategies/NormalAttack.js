const AttackStrategy = require('./AttackStrategy');

class NormalAttack extends AttackStrategy {
    constructor() {
        super();
        this.type = 'normal';
        this.baseDamage = 13;
    }

    calculateDamage(attacker, target) {
        let damage = this.baseDamage + attacker.attack;
        
        // Normal attacks have no type effectiveness
        // Random variation (±20%)
        const variation = 0.8 + Math.random() * 0.4;
        return Math.floor(damage * variation);
    }

    getAttackMessage(attacker, target, damage) {
        return `${attacker.name} used Normal Attack! ${target.name} took ${damage} damage!`;
    }
}

module.exports = NormalAttack;
