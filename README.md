# LeanFork — Платформа розгалуженого мислення ШІ

Проєкт розробляється в межах дисципліни «Основи програмної інженерії». LeanFork вирішує проблему стандартних відповідей ШІ шляхом покращення їх якості за допомогою розгалуженої структури діалогів.

## 👤 Команда проєкту (група ПЗПІ)
- **Андрій Лозовий** — Frontend Developer
- Волошин, Колесник, Карнаух

## 🛠 Технології та інструменти
- **IDE:** Visual Studio Code 1.110
- **Мова:** JavaScript (ES6+)
- **VCS:** Git 2.47 + GitHub
- **AI-асистент:** GitHub Copilot Student

## 📋 Реалізація вимог (згідно з SRS)
У цій роботі реалізовано частину функціоналу згідно зі специфікацією вимог:
- **FR-05 [Must]**: Система зберігає API-ключ та імітує показ історії чатів.
- **NFR-S-01**: Базовий захист (кодування) API-ключів користувачів.
- **C-01**: Дотримання технологічного стеку (JavaScript).

# Проєкт LeanFork — Лабораторна робота №2
**Тема:** Моделювання програмної системи засобами UML

## Крок 2. Функціональні вимоги (FR)
Ці вимоги є основою для побудови системи "Дерева мислення" в LeanFork.

| ID | Функціональна вимога | Пріоритет |
| :--- | :--- | :--- |
| **FR-01** | Реєстрація та авторизація користувачів (Google/Email). | Високий |
| **FR-02** | Створення чату з можливістю вибору AI-агента. | Високий |
| **FR-03** | Побудова розгалуженого діалогу ("Дерево мислення"). | Високий |
| **FR-04** | Збереження API-ключів та історії чатів для Premium користувачів. | Середній |
| **FR-05** | Обробка платежів через Stripe для активації підписки. | Середній |
| **FR-06** | Можливість видалення та редагування гілок чату. | Середній |

---

## Крок 3. Діаграма прецедентів (Use Case Diagram)
Відображає взаємодію акторів із системою.

```mermaid
graph LR
    Guest((Гость))
    User((Користувач))
    Premium((Преміум))
    AI_API[[AI API Service]]

    subgraph LeanFork_System
        UC1(Авторизація)
        UC2(Створення чату)
        UC3(Вибір AI-агента)
        UC4(Ветвлення Дерево мислення)
        UC5(Оплата Stripe)
        UC6(Історія чатів)
    end

    Guest --> UC1
    User --> UC2
    User --> UC3
    User --> UC4
    User --> UC5
    Premium -- Спадкування --> User
    Premium --> UC6
    UC4 --- AI_API
    UC2 -. include .-> UC3


 Крок 4
classDiagram
    class User {
        +int id
        +string email
        +string role
        +string apiKey
        +login()
        +upgrade()
    }
    class ChatTree {
        +int treeId
        +string title
        +dateTime createdAt
        +createBranch()
    }
    class Node {
        +int nodeId
        +int parentId
        +string userMsg
        +string aiResp
        +fork()
    }
    class AIAgent {
        +string modelName
        +string provider
        +generate()
    }
    class Subscription {
        +int subId
        +string planType
        +bool isActive
        +processPayment()
    }

    User "1" -- "1" Subscription
    User "1" -- "*" ChatTree
    ChatTree "1" -- "*" Node
    Node "1" -- "*" Node
    Node --> AIAgent


## Крок 5
sequenceDiagram
    autonumber
    actor U as Користувач
    participant F as Frontend
    participant B as Backend
    participant DB as Database
    participant AI as AI Service

    U->>F: Запит на нову гілку
    F->>B: POST /api/chat/fork
    B->>DB: Перевірка API-ключів
    DB-->>B: Ключ валідний
    B->>AI: Запит до нейромережі
    AI-->>B: Текст відповіді ШІ
    B->>DB: Збереження нового Node
    B-->>F: Дані оновленого дерева
    F-->>U: Візуалізація нової гілки
---

## Крок 6. Матриця трасовності (Traceability Matrix)
Ця таблиця пов'язує функціональні вимоги (FR) з елементами UML-моделі, підтверджуючи повне покриття проєкту.

| Вимога (ID) | Прецедент (Use Case) | Класи (Classes) | Діаграма послідовності (Sequence) |
| :--- | :--- | :--- | :--- |
| **FR-01** | UC-01 (Авторизація) | User, Subscription | — |
| **FR-02** | UC-02 (Створення чату) | User, ChatTree, AIAgent | — |
| **FR-03** | UC-04 (Ветвлення) | ChatTree, Node, AIAgent | **SD-01 (Сценарій ветвлення)** |
| **FR-04** | UC-03 (Вибір агента) | AIAgent, Node | — |
| **FR-05** | UC-05 (Оплата Stripe) | User, Subscription | — |
| **FR-06** | UC-02, UC-04 | ChatTree, Node | — |

**Примітка:** Усі функціональні вимоги, визначені на Кроці 2, успішно відображені в архітектурі системи через відповідні прецеденти та класи.

## 🚀 Встановлення та запуск
1. Клонуйте репозиторій:
   ```bash
   git clone [https://github.com/AndrewLozovoy/bse-lr1-lozovoy.git](https://github.com/AndrewLozovoy/bse-lr1-lozovoy.git)