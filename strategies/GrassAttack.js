const AttackStrategy = require('./AttackStrategy');

class GrassAttack extends AttackStrategy {
    constructor() {
        super();
        this.type = 'grass';
        this.baseDamage = 14;
    }

    calculateDamage(attacker, target) {
        let damage = this.baseDamage + attacker.attack;
        
        // Type effectiveness
        if (target.type === 'water') {
            damage *= 2; // Super effective
        } else if (target.type === 'fire') {
            damage *= 0.5; // Not very effective
        }

        // Random variation (±20%)
        const variation = 0.8 + Math.random() * 0.4;
        return Math.floor(damage * variation);
    }

    getAttackMessage(attacker, target, damage) {
        return `${attacker.name} used Grass Attack! ${target.name} took ${damage} damage!`;
    }
}

module.exports = GrassAttack;
