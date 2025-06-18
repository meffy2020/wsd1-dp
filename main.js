const MonsterFactory = require('./factories/MonsterFactory');
const Player = require('./observer/Player');
const BattleContext = require('./core/BattleContext');
const ConsoleLogger = require('./observer/ConsoleLogger');
const EmphasizedLogger = require('./decorators/EmphasizedLogger');
const AttackCommand = require('./commands/AttackCommand');
const FireAttack = require('./strategies/FireAttack');
const WaterAttack = require('./strategies/WaterAttack');
const GrassAttack = require('./strategies/GrassAttack');
const NormalAttack = require('./strategies/NormalAttack');
const AttackState = require('./states/AttackState');
const DefendState = require('./states/DefendState');
const StunnedState = require('./states/StunnedState');

// 플레이어 및 몬스터 생성
const player1 = new Player('Ash');
const player2 = new Player('Misty');
const fireMon = MonsterFactory.createMonster('fire', 5);
const waterMon = MonsterFactory.createMonster('water', 5);
const grassMon = MonsterFactory.createMonster('grass', 5);
const normalMon = MonsterFactory.createMonster('normal', 5);

player1.addMonster(fireMon);
player1.addMonster(grassMon);
player2.addMonster(waterMon);
player2.addMonster(normalMon);

player1.setActiveMonster(fireMon);
player2.setActiveMonster(waterMon);

// 옵저버/로거 등록
const consoleLogger = new ConsoleLogger();
const emphasizedLogger = new EmphasizedLogger(consoleLogger);
fireMon.addObserver(emphasizedLogger);
waterMon.addObserver(emphasizedLogger);
player1.update = consoleLogger.update.bind(consoleLogger);
player2.update = consoleLogger.update.bind(consoleLogger);

// 전투 컨텍스트 생성
const battle = new BattleContext(player1, player2);
battle.addObserver(emphasizedLogger);

// 전투 시작
battle.startBattle();

// 1턴: 플레이어1이 불 공격, 플레이어2가 물 공격
console.log('\n=== 1턴 ===');
let cmd1 = new AttackCommand(new FireAttack());
let cmd2 = new AttackCommand(new WaterAttack());
player1.activeMonster.setState(new AttackState(player1.activeMonster));
player2.activeMonster.setState(new AttackState(player2.activeMonster));
battle.executeCommand(cmd1, true);
battle.executeCommand(cmd2, false);
battle.nextTurn();

// 2턴: 플레이어1이 풀 공격(전략 변경), 플레이어2가 방어 상태로 전환
console.log('\n=== 2턴 ===');
cmd1 = new AttackCommand(new GrassAttack());
cmd2 = new AttackCommand(new NormalAttack());
player1.activeMonster.setState(new AttackState(player1.activeMonster));
player2.activeMonster.setState(new DefendState(player2.activeMonster));
battle.executeCommand(cmd1, true);
battle.executeCommand(cmd2, false);
battle.nextTurn();

// 3턴: 플레이어2가 기절 상태로 전환, 플레이어1은 일반 공격
console.log('\n=== 3턴 ===');
cmd1 = new AttackCommand(new NormalAttack());
player2.activeMonster.setState(new StunnedState(player2.activeMonster));
battle.executeCommand(cmd1, true);
battle.nextTurn();

// 전투 결과 출력
console.log('\n=== 전투 결과 ===');
console.log(`플레이어1의 ${player1.activeMonster.name}: ${player1.activeMonster.hp}/${player1.activeMonster.maxHp} HP`);
console.log(`플레이어2의 ${player2.activeMonster.name}: ${player2.activeMonster.hp}/${player2.activeMonster.maxHp} HP`);