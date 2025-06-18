// === Attack Strategy (Strategy Pattern) ===
/*
AttackStrategy는 추상 클래스이며, attack 메서드는 하위 클래스에서 반드시 구현해야 한다.
각 공격 클래스(FireAttack, WaterAttack 등)는 AttackStrategy를 상속받아 서로 다른 공격 알고리즘을 제공한다.
Monster 클래스는 attackStrategy 객체를 참조하고 있으며, 전략(algorithm)을 실행 중에 교체할 수 있도록 설계되어 있다.
이 구조를 통해 알고리즘을 캡슐화하고, 새로운 공격 전략을 기존 코드 수정 없이 쉽게 추가할 수 있다.
이는 OCP(개방-폐쇄 원칙)를 만족하며, 다양한 전투 상황에 유연하게 대응할 수 있는 설계를 가능하게 한다.

*/

//모듈화 필수 
class AttackStrategy {
    // 공격 전략의 핵심 메서드로, 하위 클래스에서 반드시 구현해야 합니다.
    // attacker: 공격자 객체, target: 공격 대상 객체
    attack(attacker, target) {
        throw new Error("Must override attack()");
    }
}

// NormalAttack은 AttackStrategy를 상속받아 일반 공격을 구현한 클래스입니다.
// attack() 메서드는 공격자(attacker)가 대상(target)에게 고정 데미지를 입히는 동작을 수행합니다.
class NormalAttack extends AttackStrategy {
    // 일반 공격을 수행하며, 고정 데미지(10)를 대상의 체력에서 차감합니다.
    attack(attacker, target) {
        const damage = 10;
        target.hp -= damage;
        console.log(`${attacker.name}이(가) 일반 공격으로 ${target.name}에게 ${damage}의 피해를 입혔습니다.`);
    }
}

// FireAttack은 AttackStrategy를 상속받아 불꽃 공격을 구현한 클래스입니다.
// attack() 메서드는 공격자(attacker)가 대상(target)에게 더 높은 데미지를 입히는 동작을 수행합니다.
class FireAttack extends AttackStrategy {
    // 불꽃 공격을 수행하며, 고정 데미지(15)를 대상의 체력에서 차감합니다.
    attack(attacker, target) {
        const damage = 15;
        target.hp -= damage;
        console.log(`${attacker.name}이(가) 불꽃 공격으로 ${target.name}에게 ${damage}의 피해를 입혔습니다.`);
    }
}

// WaterAttack은 AttackStrategy를 상속받아 물 공격을 구현한 클래스입니다.
class WaterAttack extends AttackStrategy {
    // 물 공격을 수행하며, 고정 데미지(13)를 대상의 체력에서 차감합니다.
    attack(attacker, target) {
        const damage = 13;
        target.hp -= damage;
        console.log(`${attacker.name}이(가) 물 공격으로 ${target.name}에게 ${damage}의 피해를 입혔습니다.`);
    }
}

// GrassAttack은 AttackStrategy를 상속받아 풀 공격을 구현한 클래스입니다.
class GrassAttack extends AttackStrategy {
    // 풀 공격을 수행하며, 고정 데미지(12)를 대상의 체력에서 차감합니다.
    attack(attacker, target) {
        const damage = 12;
        target.hp -= damage;
        console.log(`${attacker.name}이(가) 풀 공격으로 ${target.name}에게 ${damage}의 피해를 입혔습니다.`);
    }
}

// === Command Pattern ===
/*
Command는 추상 클래스이며, execute 메서드는 하위 클래스에서 반드시 구현해야 한다.
AttackCommand는 Command를 상속받아 공격 전략을 실행하는 명령 객체를 구현한다.
BattleContext 클래스는 명령(Command 객체)을 받아 저장하고, executeCommand 메서드로 해당 명령을 실행한다.
이 구조는 명령 발신자와 실행자를 분리하며, 명령을 캡슐화하여 실행 흐름을 동적으로 설정할 수 있게 한다.
이는 SRP(단일 책임 원칙)과 OCP(개방-폐쇄 원칙)를 만족하는 구조이다.

*/
class Command {
    // 명령 실행의 핵심 메서드로, 하위 클래스에서 반드시 구현해야 합니다.
    execute() {
        throw new Error("Must implement execute()");
    }
}

// AttackCommand는 Command를 상속받아 공격 명령을 구현한 클래스입니다.
// 생성자에서 공격 전략(strategy)을 받아 저장하며, execute() 메서드에서 해당 전략을 실행합니다.
class AttackCommand extends Command {
    constructor(strategy) {
        super();
        this.strategy = strategy; // 공격 전략(예: 불, 물, 일반 등)
    }

    // execute는 실제로 공격을 실행합니다.
    // attacker: 공격자 객체, target: 공격 대상 객체
    execute(attacker, target) {
        this.strategy.attack(attacker, target);
    }
}

// === Battle Context ===
// BattleContext는 명령을 저장하고 실행하는 역할을 담당합니다.
// [SRP] BattleContext는 명령 실행만 책임짐
// [OCP] 새로운 명령이 추가되어도 BattleContext는 수정할 필요 없음
class BattleContext {
    constructor() {
        this.command = null; // 현재 명령을 저장합니다.
    }

    // setCommand는 실행할 명령(Command 객체)을 설정합니다.
    // command: 실행할 명령 객체
    setCommand(command) {
        this.command = command;
    }

    // executeCommand는 설정된 명령을 실행합니다.
    // attacker: 공격자 객체, target: 공격 대상 객체
    executeCommand(attacker, target) {
        if (this.command) {
            this.command.execute(attacker, target);
        }
    }
}

// === State Pattern ===
/*
MonsterState는 추상 클래스이며, handle 은 하위 추상 메서드
AttackState, DefendState, StunnedState는 MonsterState를 상속받아 상태별 행동을 정의함.
Monster는 상태(state)를 필드로 가지고 있으며, 체력 변화에 따라 자동으로 상태가 전이됨.
상태에 따라 서로 다른 행동(공격, 반격, 행동 불가)을 수행할 수 있다.
이 구조는 객체의 내부 상태 변화에 따라 행동이 바뀌는 상황에 적합하며, State 패턴의 전형적인 구조임.

*/
class MonsterState {
    handle(monster, target) {
        throw new Error("Must implement handle()");
    }

    getName() {
        throw new Error("Must implement getName()");
    }
}

class AttackState extends MonsterState {
    handle(monster, target) {
        monster.attackStrategy.attack(monster, target);
    }

    getName() {
        return "공격 상태";
    }
}

class DefendState extends MonsterState {
    handle(monster, target) {
        const reducedDamage = 5;
        target.hp -= reducedDamage;
        console.log(`${monster.name}은(는) 방어 상태이지만 ${target.name}에게 반격으로 ${reducedDamage}의 피해를 입혔습니다.`);
    }

    getName() {
        return "방어 상태";
    }
}

class StunnedState extends MonsterState {
    handle(monster, target) {
        console.log(`${monster.name}은(는) 기절하여 공격할 수 없습니다!`);
    }

    getName() {
        return "기절 상태";
    }
}

// === Monster + Factory (Abstract Factory Pattern) ===
/*
MonsterFactory는 몬스터 생성을 담당하는 추상 팩토리 역할을 한다.
몬스터 타입에 따라 서로 다른 전략과 초기 체력을 가진 Monster 객체를 생성한다.
이 구조는 객체 생성을 중앙화하여 관리하며, 새로운 몬스터 타입이 추가되어도 기존 생성 코드를 수정하지 않는다.
이는 OCP(개방-폐쇄 원칙)를 만족하고, 객체 생성을 위한 일관된 인터페이스를 제공한다.

*/
class Monster {
    constructor(name, hp, attackStrategy) {
        this.name = name;
        this.hp = hp;
        this.attackStrategy = attackStrategy;
        this.state = new AttackState(); // 기본 상태는 공격 상태
    }

    takeDamage(dmg) {
        this.hp -= dmg;
        if (this.hp <= 0) {
            this.setState(new StunnedState());
        } else if (this.hp < 30) {
            this.setState(new DefendState());
        } else {
            this.setState(new AttackState());
        }
    }

    updateState() {
        if (this.hp <= 0) {
            this.setState(new StunnedState());
        } else if (this.hp < 30) {
            this.setState(new DefendState());
        } else {
            this.setState(new AttackState());
        }
    }

    // performAttack은 몬스터가 대상(target)을 공격하는 동작을 수행합니다.
    // target: 공격 대상 객체
    performAttack(target) {
        this.updateState(); // 체력 기반 상태 자동 갱신
        this.state.handle(this, target);
    }

    // setStrategy는 몬스터의 공격 전략을 동적으로 변경합니다.
    // strategy: 새로운 공격 전략 객체
    setStrategy(strategy) {
        this.attackStrategy = strategy;
    }

    setState(state) {
        this.state = state;
        console.log(`${this.name}의 상태가 [${state.getName()}]로 변경됨`);
    }

    getState() {
        return this.state;
    }
}

// MonsterFactory는 몬스터 객체 생성을 관리하는 추상 팩토리 역할을 합니다.
// create(type)은 몬스터 타입에 따라 적절한 몬스터 객체를 생성하여 반환합니다.
class MonsterFactory {
    static create(type) {
        let monster;
        switch(type) {
            case "Charmander":
                monster = new Monster("망나뇽", 100, new FireAttack());
                break;
            case "Squirtle":
                monster = new Monster("꼬부기", 105, new WaterAttack());
                break;
            case "Bulbasaur":
                monster = new Monster("붐버맨", 110, new GrassAttack());
                break;
            default:
                throw new Error("Invalid monster type");
        }
        console.log(`[팩토리] ${monster.name} 몬스터가 생성되었습니다! 체력: ${monster.hp}`);
        return monster;
    }
}

// === Template Pattern ===
/*
BattleLogTemplate은 전투 로그 출력 흐름의 틀(템플릿)을 정의합니다.
logStart(), logEnd()는 공통 동작이며, logAction()만 하위 클래스에서 정의하도록 합니다.
SimpleBattleLog는 이 구조를 상속받아 실제 전략 공격을 수행하며 로그를 출력합니다.
*/
class BattleLogTemplate {
    logStart() {
        console.log("=== 전투 시작 ===");
    }
    logAction(attacker, target, strategy) {
        throw new Error("Must override logAction()");
    }
    logEnd() {
        console.log("=== 전투 종료 ===");
    }

    execute(attacker, target, strategy) {
        this.logStart();
        this.logAction(attacker, target, strategy);
        this.logEnd();
    }
}

class SimpleBattleLog extends BattleLogTemplate {
    logAction(attacker, target, strategy) {
        console.log(`[${attacker.name}]이(가) [${target.name}]에게 ${strategy.constructor.name.replace('Attack', '')} 공격을 사용합니다.`);
        strategy.attack(attacker, target);
    }
}

// === Observer Pattern (옵저버 패턴) ===
/*
Observer 클래스는 추상 클래스이며, update 메서드는 하위 클래스에서 반드시 구현해야 한다.
Player 클래스는 주체 클래스(Subject)로, 옵서버를 등록하고, 해지하고, 알림을 전달하는 역할을 한다.
ConsoleLogger 클래스는 구체적인 옵서버(Observer)로, 알림을 수신하는 역할을 한다.
subscribe() 메서드로 옵저버를 등록하고, unsubscribe() 메서드로 옵저버를 해지할 수 있다.
takeDamage() 메서드로 플레이어의 상태가 변경되면 notifyObservers()를 통해 등록된 모든 옵저버에게 알림을 전달한다.
이 코드 구조를 통해 다양한 객체들이 주체 객체의 상태 변화를 감지하고, 이에 반응할 수 있는 유연한 시스템을 구축할 수 있다.
*/
  
// Subject 클래스는 관찰 대상 역할을 하며, 옵저버를 등록/해제하고 상태 변화를 알립니다.
class Subject {
    constructor() {
        this.observers = []; // 관찰자(옵저버) 목록을 저장하는 배열
    }

    // subscribe는 새로운 옵저버를 등록합니다.
    // observer: 등록할 옵저버 객체
    subscribe(observer) {
        this.observers.push(observer);
    }

    // unsubscribe는 기존 옵저버를 해제합니다.
    // observer: 해제할 옵저버 객체
    unsubscribe(observer) {
        this.observers = this.observers.filter(o => o !== observer);
    }

    // notify는 상태 변화가 있을 때 모든 옵저버에게 알림을 전달합니다.
    // data: 전달할 데이터(상태 변화 정보)
    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}

// Player 클래스는 Subject를 상속받아, 상태 변화(예: 데미지 받음)를 옵저버에게 알립니다.
class Player extends Subject {
    constructor(name, hp) {
        super();
        this.name = name; // 플레이어 이름
        this.hp = hp;     // 플레이어 체력
    }

    // takeDamage는 플레이어가 데미지를 받을 때 호출됩니다.
    // dmg: 입은 데미지 값
    takeDamage(dmg) {
        this.hp -= dmg;
        this.notify(`${this.name}이(가) ${dmg}의 피해를 입었습니다! 남은 체력: ${this.hp}`);
    }
}

// ConsoleLogger는 Observer 역할을 하며, Subject로부터 알림을 받아 콘솔에 메시지를 출력합니다.
class ConsoleLogger {
    // update는 Subject가 notify()를 호출할 때 실행됩니다.
    // data: 전달받은 상태 변화 정보
    update(data) {
        console.log(`[로그] ${data}`);
    }
}

// === Decorator Pattern ===
/*
BattleLogger는 기본 로그를 출력하는 클래스입니다.
EmphasizedLogger는 BattleLogger를 감싸서 강조된 로그를 출력하도록 합니다.
이 구조는 기존 기능은 유지하면서 부가 기능을 추가할 수 있게 해줍니다.
*/
class BattleLogger {
    log(msg) {
        console.log(msg);
    }
}

class EmphasizedLogger {
    constructor(logger) {
        this.logger = logger;
    }

    log(msg) {
        this.logger.log(`💥 ${msg} 💥`);
    }
}

// === 사용 예시 ===
// 플레이어와 몬스터 생성
const player = new Player("피카츄", 100);
const enemy = MonsterFactory.create("Charmander");

// 옵저버 등록
const logger = new ConsoleLogger();
player.subscribe(logger);

// 전투 컨텍스트 생성 및 명령 실행
const context = new BattleContext();
context.setCommand(new AttackCommand(new NormalAttack()));
context.executeCommand(player, enemy);

// 몬스터의 반격
enemy.performAttack(player);

// 플레이어가 데미지를 받음
player.takeDamage(14);

// === Template & Decorator 사용 예시 ===
const logTemplate = new SimpleBattleLog();
logTemplate.execute(player, enemy, new NormalAttack());

const baseLogger = new BattleLogger();
const fancyLogger = new EmphasizedLogger(baseLogger);
fancyLogger.log("강력한 일격입니다!");