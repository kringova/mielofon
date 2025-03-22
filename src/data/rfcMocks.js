const rfcMocks = {
  "summary1": {
    title: "RFC: Implementing a New Authentication System",
    content: `
# RFC: Implementing a New Authentication System

## Introduction
This document proposes the implementation of a new authentication system to enhance security and user experience.

## Background
The current authentication system has several limitations, including outdated encryption methods and lack of support for multi-factor authentication.

## Proposal
- Implement OAuth 2.0 for secure authorization.
- Integrate multi-factor authentication using SMS and email.
- Update password encryption to use bcrypt.

## Impact
- Improved security for user accounts.
- Enhanced user experience with faster login times.
- Compliance with modern security standards.

## Timeline
- Phase 1: Research and planning (2 weeks)
- Phase 2: Development and testing (4 weeks)
- Phase 3: Deployment and monitoring (2 weeks)

## Participants
- Alice (Project Manager)
- Bob (Lead Developer)

## Related Items
- Task 1: Research OAuth 2.0
- Wiki Page 1: Security Standards
    `,
    participants: ["Alice", "Bob"],
    relatedItems: ["Task 1", "Wiki Page 1"]
  },
  "summary2": {
    title: "RFC: Redesigning the User Interface",
    content: `
# RFC: Redesigning the User Interface

## Introduction
This document outlines the plan to redesign the user interface to improve usability and accessibility.

## Background
The current UI has received feedback regarding its complexity and lack of accessibility features.

## Proposal
- Simplify navigation by consolidating menus.
- Implement responsive design for mobile compatibility.
- Add accessibility features such as keyboard navigation and screen reader support.

## Impact
- Increased user satisfaction and engagement.
- Broader accessibility for users with disabilities.
- Modernized look and feel of the application.

## Timeline
- Phase 1: Design mockups (3 weeks)
- Phase 2: Development and testing (5 weeks)
- Phase 3: User feedback and iteration (2 weeks)

## Participants
- Charlie (UI/UX Designer)
- Dave (Frontend Developer)

## Related Items
- Task 2: Create design mockups
- Wiki Page 2: UI Design Guidelines
    `,
    participants: ["Charlie", "Dave"],
    relatedItems: ["Task 2", "Wiki Page 2"]
  },
  "summary3": {
    title: "RFC: Enhancing the Data Analytics Platform",
    content: `
# RFC: Enhancing the Data Analytics Platform

## Introduction
This document proposes enhancements to the data analytics platform to support real-time data processing and advanced analytics.

## Background
The current platform lacks real-time processing capabilities and advanced analytics features.

## Proposal
- Integrate Apache Kafka for real-time data streaming.
- Implement machine learning models for predictive analytics.
- Upgrade the data storage solution to support larger datasets.

## Impact
- Real-time insights for decision-making.
- Improved accuracy of analytics with predictive models.
- Scalability to handle increased data volume.

## Timeline
- Phase 1: Infrastructure setup (4 weeks)
- Phase 2: Model development and testing (6 weeks)
- Phase 3: Deployment and optimization (3 weeks)

## Participants
- Eve (Data Scientist)
- Frank (DevOps Engineer)

## Related Items
- Task 3: Set up Apache Kafka
- Wiki Page 3: Data Analytics Architecture
    `,
    participants: ["Eve", "Frank"],
    relatedItems: ["Task 3", "Wiki Page 3"]
  },
  "meeting1": {
    title: "RFC: Масштабирование микросервисной архитектуры",
    content: `
# RFC: Масштабирование микросервисной архитектуры

## Введение
Этот документ описывает план масштабирования нашей текущей микросервисной архитектуры для обеспечения роста пользовательской базы и улучшения производительности системы.

## Предпосылки
С ростом числа пользователей наша текущая микросервисная архитектура испытывает проблемы с производительностью в периоды пиковой нагрузки. Необходимо оптимизировать систему для обработки большего объема запросов.

## Предложение
- Внедрить Kubernetes для оркестрации контейнеров
- Реализовать горизонтальное масштабирование для критических сервисов
- Оптимизировать схему базы данных и добавить шардирование
- Внедрить кэширование с использованием Redis

## Влияние
- Повышение стабильности системы при пиковых нагрузках
- Уменьшение времени отклика API на 40%
- Более эффективное использование ресурсов

## Временные рамки
- Фаза 1: Настройка Kubernetes (3 недели)
- Фаза 2: Оптимизация баз данных (4 недели)
- Фаза 3: Внедрение кэширования (2 недели)
- Фаза 4: Тестирование и оптимизация (3 недели)

## Участники
- Алексей Петров (DevOps инженер)
- Екатерина Смирнова (Архитектор)
- Иван Соколов (Разработчик баз данных)

## Связанные материалы
- Задача: Исследование решений для оркестрации контейнеров
- Вики: Архитектура микросервисов
- Встреча: Обсуждение масштабирования инфраструктуры
    `,
    participants: ["Алексей Петров", "Екатерина Смирнова", "Иван Соколов"],
    relatedItems: ["Задача: Исследование решений для оркестрации контейнеров", "Вики: Архитектура микросервисов"]
  },
  "meeting2": {
    title: "RFC: Внедрение методологии непрерывной интеграции и доставки (CI/CD)",
    content: `
# RFC: Внедрение методологии непрерывной интеграции и доставки (CI/CD)

## Введение
Данный документ описывает план внедрения методологии непрерывной интеграции и доставки для ускорения и улучшения качества процесса разработки.

## Предпосылки
Текущий процесс развертывания приложений слишком медленный и подвержен ошибкам из-за ручных операций. Необходима автоматизация процессов сборки, тестирования и доставки.

## Предложение
- Внедрить Jenkins для непрерывной интеграции
- Настроить автоматические тесты (unit, integration, e2e)
- Создать конвейеры доставки для различных окружений
- Внедрить инфраструктуру как код с использованием Terraform

## Влияние
- Сокращение времени доставки новых функций
- Повышение качества кода через автоматизированное тестирование
- Снижение количества ошибок при развертывании

## Временные рамки
- Фаза 1: Настройка Jenkins и базовых пайплайнов (2 недели)
- Фаза 2: Внедрение автоматических тестов (3 недели)
- Фаза 3: Реализация инфраструктуры как кода (3 недели)
- Фаза 4: Обучение команды и оптимизация процессов (2 недели)

## Участники
- Дмитрий Волков (DevOps специалист)
- Мария Козлова (QA инженер)
- Олег Новиков (Tech Lead)

## Связанные материалы
- Задача: Настройка пайплайнов CI/CD
- Вики: Лучшие практики DevOps
- Встреча: Обсуждение автоматизации процессов разработки
    `,
    participants: ["Дмитрий Волков", "Мария Козлова", "Олег Новиков"],
    relatedItems: ["Задача: Настройка пайплайнов CI/CD", "Вики: Лучшие практики DevOps"]
  },
  "meeting3": {
    title: "RFC: Модернизация фронтенд-архитектуры",
    content: `
# RFC: Модернизация фронтенд-архитектуры

## Введение
Документ описывает план модернизации фронтенд-архитектуры для улучшения производительности, поддерживаемости и пользовательского опыта.

## Предпосылки
Существующий фронтенд построен на устаревших технологиях, что затрудняет разработку новых функций и негативно влияет на скорость загрузки страниц.

## Предложение
- Переход с jQuery на React
- Внедрение компонентного подхода
- Реализация серверного рендеринга для улучшения SEO
- Внедрение GraphQL для оптимизации запросов к API
- Использование CSS-in-JS для упрощения стилизации

## Влияние
- Улучшение пользовательского опыта через более быстрое взаимодействие
- Сокращение времени загрузки страниц на 50%
- Упрощение поддержки и добавления новых функций
- Улучшение показателей SEO

## Временные рамки
- Фаза 1: Исследование и прототипирование (3 недели)
- Фаза 2: Реализация компонентной библиотеки (4 недели)
- Фаза 3: Переработка основных разделов приложения (6 недель)
- Фаза 4: Оптимизация и тестирование (3 недели)

## Участники
- Анна Белова (Frontend разработчик)
- Павел Морозов (UX/UI дизайнер)
- Сергей Ковалев (Tech Lead)

## Связанные материалы
- Задача: Исследование современных фронтенд-фреймворков
- Вики: Архитектура фронтенд-приложений
- Встреча: Обсуждение пользовательского опыта
    `,
    participants: ["Анна Белова", "Павел Морозов", "Сергей Ковалев"],
    relatedItems: ["Задача: Исследование современных фронтенд-фреймворков", "Вики: Архитектура фронтенд-приложений"]
  }
};

export default rfcMocks; 