const MonsterFactory = require('./factories/MonsterFactory');
const Player = require('./core/Player');
const BattleContext = require('./core/BattleContext');
const ConsoleLogger = require('./observer/ConsoleLogger');
const EmphasizedLogger = require('./decorators/EmphasizedLogger');
const FireAttack = require('./strategies/FireAttack');
const WaterAttack = require('./strategies/WaterAttack');
const GrassAttack = require('./strategies/GrassAttack');

// 플레이어 생성
const player = new Player("Trainer");
const enemy = new Player("Enemy");

// 몬스터 생성
const playerMonster = MonsterFactory.createMonster('fire', 1);
const enemyMonster = MonsterFactory.createMonster('water', 1);

// 플레이어와 적에게 몬스터 추가
player.addMonster(playerMonster);
enemy.addMonster(enemyMonster);

// 활성 몬스터 설정
player.setActiveMonster(playerMonster);
enemy.setActiveMonster(enemyMonster);

// 로거 설정
const consoleLogger = new ConsoleLogger();
const emphasizedLogger = new EmphasizedLogger(consoleLogger);

// 전투 컨텍스트 생성
const battleContext = new BattleContext(player, enemy);

// 옵저버 등록
battleContext.addObserver(emphasizedLogger);
playerMonster.addObserver(emphasizedLogger);
enemyMonster.addObserver(emphasizedLogger);

// 전투 시작
battleContext.startBattle();

// 몇 턴의 전투 시뮬레이션
for (let i = 0; i < 3; i++) {
    console.log(`\n=== Turn ${i + 1} ===`);
    
    // 플레이어의 공격
    if (playerMonster.isAlive()) {
        playerMonster.setState(new (require('./states/AttackState'))(playerMonster));
        playerMonster.state.attack(enemyMonster);
    }

    // 적의 공격
    if (enemyMonster.isAlive()) {
        enemyMonster.setState(new (require('./states/AttackState'))(enemyMonster));
        enemyMonster.state.attack(playerMonster);
    }
}

// 전투 결과 출력
console.log("\n=== Battle Results ===");
console.log(`Player's ${playerMonster.name}: ${playerMonster.hp}/${playerMonster.maxHp} HP`);
console.log(`Enemy's ${enemyMonster.name}: ${enemyMonster.hp}/${enemyMonster.maxHp} HP`);