const AttackStrategy = require('./AttackStrategy');

class FireAttack extends AttackStrategy {
    constructor() {
        super();
        this.type = 'fire';
        this.baseDamage = 15;
    }

    calculateDamage(attacker, target) {
        let damage = this.baseDamage + attacker.attack;
        
        // Type effectiveness
        if (target.type === 'grass') {
            damage *= 2; // Super effective
        } else if (target.type === 'water') {
            damage *= 0.5; // Not very effective
        }

        // Random variation (±20%)
        const variation = 0.8 + Math.random() * 0.4;
        return Math.floor(damage * variation);
    }

    getAttackMessage(attacker, target, damage) {
        return `${attacker.name} used Fire Attack! ${target.name} took ${damage} damage!`;
    }
}

module.exports = FireAttack;
