const AttackStrategy = require('./AttackStrategy');

class WaterAttack extends AttackStrategy {
    constructor() {
        super();
        this.type = 'water';
        this.baseDamage = 12;
    }

    calculateDamage(attacker, target) {
        let damage = this.baseDamage + attacker.attack;
        
        // Type effectiveness
        if (target.type === 'fire') {
            damage *= 2; // Super effective
        } else if (target.type === 'grass') {
            damage *= 0.5; // Not very effective
        }

        // Random variation (±20%)
        const variation = 0.8 + Math.random() * 0.4;
        return Math.floor(damage * variation);
    }

    getAttackMessage(attacker, target, damage) {
        return `${attacker.name} used Water Attack! ${target.name} took ${damage} damage!`;
    }
}

module.exports = WaterAttack;
