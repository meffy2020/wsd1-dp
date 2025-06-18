import Command from './Command.js';

class AttackCommand extends Command {
    constructor(strategy) {
        super();
        this.strategy = strategy;
    }

    execute(attacker, target) {
        this.strategy.attack(attacker, target);
    }
}

export default AttackCommand;