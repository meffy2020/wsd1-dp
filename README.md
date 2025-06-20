# PokeRougue

**포켓몬 배틀을 객체지향적으로 구현한 콘솔 게임!**

- 다양한 디자인 패턴(State, Strategy, Command, Observer, Decorator, Factory, Template) 적용
- 확장성과 유지보수성이 뛰어난 구조

---

## 🏃‍♂️ 실행 방법

```bash
npm install
node main.js
```

---

## 🧪 테스트 실행

```bash
npm test
```

---

## 📦 프로젝트 구조

```
PokeRougue/
├── core/               # 핵심 게임 로직
│   ├── BattleContext.js
│   ├── Monster.js
│   └── Player.js
├── commands/          # 명령 패턴
│   ├── AttackCommand.js
│   └── Command.js
├── decorators/        # 데코레이터 패턴
│   ├── BattleLogger.js
│   └── EmphasizedLogger.js
├── factories/         # 팩토리 패턴
│   └── MonsterFactory.js
├── observer/          # 옵저버 패턴
│   ├── ConsoleLogger.js
│   └── Subject.js
├── states/           # 상태 패턴
│   ├── AttackState.js
│   ├── DefendState.js
│   ├── MonsterState.js
│   └── StunnedState.js
├── strategies/       # 전략 패턴
│   ├── AttackStrategy.js
│   ├── FireAttack.js
│   ├── GrassAttack.js
│   ├── NormalAttack.js
│   └── WaterAttack.js
├── logs/            # 로그 관련
│   ├── BattleLogTemplate.js
│   └── SimpleBattleLog.js
├── test/            # 단위 테스트
│   └── monster.test.js
├── main.js          # 메인 실행 파일
└── package.json     # 프로젝트 설정
```

---

## 🗺️ 클래스 다이어그램

```mermaid
classDiagram
    class Player {
        - name: String
        - monsters: Monster[]
        + addMonster(monster: Monster)
        + removeMonster(monster: Monster)
        + setActiveMonster(monster: Monster)
        + update(message)
    }
    class Monster {
        - name: String
        - type: String
        - hp: Number
        - attack: Number
        - defense: Number
        - state: MonsterState
        - attackStrategy: AttackStrategy
        + setState(state: MonsterState)
        + setStrategy(strategy: AttackStrategy)
        + takeDamage(damage)
        + heal(amount)
        + addObserver(observer)
        + removeObserver(observer)
        + notifyObservers(message)
    }
    ... (생략, 전체 구조는 코드 참고)
```

---

## 🧩 사용된 디자인 패턴 & 실제 예시

- **State Pattern**  
  몬스터의 상태(공격/방어/기절)에 따라 행동이 달라짐  
  → `AttackState`, `DefendState`, `StunnedState`

- **Strategy Pattern**  
  몬스터의 공격 방식(불, 물, 풀, 일반 등)을 동적으로 교체  
  → `FireAttack`, `WaterAttack`, `NormalAttack` 등

- **Command Pattern**  
  플레이어의 명령(공격 등)을 객체로 캡슐화  
  → `AttackCommand`

- **Observer/Decorator Pattern**  
  전투 로그를 콘솔/파일/강조 등 다양한 방식으로 동시에 기록  
  → `ConsoleLogger`, `BattleLogger`, `EmphasizedLogger`

- **Factory Pattern**  
  몬스터 생성 로직을 일원화  
  → `MonsterFactory`

- **Template Pattern**  
  전투 로그 출력의 공통 흐름을 정의  
  → `BattleLogTemplate`, `SimpleBattleLog`

---

## 💡 확장성/유지보수성

- 새로운 공격 전략, 몬스터 상태, 명령, 로그 방식 등  
  각 패턴의 인터페이스/추상 클래스만 상속하면 손쉽게 추가 가능
- 각 역할이 명확히 분리되어 있어 코드 수정이 용이

---

## 📝 실행 예시

```
=== 1턴 ===
파이리이(가) 꼬부기에게 20의 피해를 입혔습니다.
...
🎉 Ash이(가) 승리했습니다! 🎉
```

---

## 🧪 테스트

- `test/monster.test.js`에서 몬스터의 공격, 상태 전이, 전략 변경 등 단위 테스트 제공

---

## 📜 라이선스

MIT License
