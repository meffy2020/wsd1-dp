# PokeRougue

객체지향 프로그래밍과 디자인 패턴을 학습하기 위한 포켓몬 로그라이크 게임 프로젝트입니다.

## 프로젝트 구조

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
│   ├── Player.js
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
├── main.js          # 메인 실행 파일
└── package.json     # 프로젝트 설정
```

## 사용된 디자인 패턴

1. **전략 패턴 (Strategy Pattern)**

   - 공격 방식을 캡슐화하여 교체 가능하게 함
   - 예: `FireAttack`, `WaterAttack` 등

2. **상태 패턴 (State Pattern)**

   - 몬스터의 상태에 따른 행동을 캡슐화
   - 예: `AttackState`, `DefendState`, `StunnedState`

3. **옵저버 패턴 (Observer Pattern)**

   - 전투 로그 출력, 상태 변화 알림
   - 예: `ConsoleLogger`, `EmphasizedLogger`

4. **데코레이터 패턴 (Decorator Pattern)**

   - 로그 출력 기능을 동적으로 확장
   - 예: `EmphasizedLogger`

5. **팩토리 패턴 (Factory Pattern)**
   - 몬스터 생성 로직을 캡슐화
   - 예: `MonsterFactory`

## 실행 방법

```bash
# 의존성 설치
npm install

# 게임 실행
npm start
```

## 학습 목표

- 객체지향 프로그래밍의 4가지 특징 이해

  - 캡슐화 (Encapsulation)
  - 상속 (Inheritance)
  - 다형성 (Polymorphism)
  - 추상화 (Abstraction)

- SOLID 원칙 적용
  - 단일 책임 원칙 (SRP)
  - 개방-폐쇄 원칙 (OCP)
  - 리스코프 치환 원칙 (LSP)
  - 인터페이스 분리 원칙 (ISP)
  - 의존성 역전 원칙 (DIP)

## 라이선스

MIT License
