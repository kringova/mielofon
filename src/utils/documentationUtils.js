// Вспомогательные функции для генерации документации
export function extractProblem(content) {
  return 'Текущая реализация не обеспечивает необходимый уровень функциональности и производительности.';
}

export function extractSolution(content) {
  return 'Создание нового компонента с улучшенной архитектурой и оптимизированной производительностью.';
}

export function extractTechnicalDetails(content) {
  return `- Язык программирования: Go
- База данных: PostgreSQL
- Контейнеризация: Docker`;
}

export function extractCurrentState(content) {
  return 'Текущая система представляет собой монолитное приложение с ограниченными возможностями масштабирования.';
}

export function extractProblems(content) {
  return '- Сложность масштабирования\n- Проблемы с производительностью\n- Высокая связность компонентов';
}

export function extractGoal(content) {
  return 'Определить оптимальный подход к решению текущих проблем и выбрать наиболее подходящие технологии.';
}

export function extractTechnologies(content) {
  return `1. **Языки программирования**
   - Go
   - Python
   - Java

2. **Базы данных**
   - PostgreSQL
   - MongoDB
   - Redis`;
}

export function determineAudiences(content) {
  return {
    developers: true,
    administrators: true,
    users: true
  };
}

export function determineProjectType(content) {
  return 'service';
}

export function extractTechnologiesFromText(content) {
  return ['Go', 'PostgreSQL', 'Docker'];
}

export function generateDevDocumentation(title, summaryContent, rfcContent, technologies, projectType) {
  return `# Документация для разработчиков: ${title}

## Архитектура
Сервис построен с использованием ${technologies.join(', ')}. Основные компоненты:
- API слой для обработки запросов
- Слой бизнес-логики
- Слой доступа к данным

## API
### POST /api/v1/data
Отправка данных на обработку

\`\`\`json
{
  "data": "string",
  "priority": "high|medium|low",
  "callback_url": "string"
}
\`\`\`

### GET /api/v1/status/{id}
Получение статуса обработки

\`\`\`json
{
  "id": "string",
  "status": "pending|processing|completed|failed",
  "result": "object|null",
  "error": "string|null"
}
\`\`\`

## Обработка ошибок
Все ошибки API возвращаются в формате:

\`\`\`json
{
  "code": 400,
  "message": "Bad Request",
  "details": "Invalid data format"
}
\`\`\`

## Развертывание
Для локальной разработки используйте Docker Compose:

\`\`\`bash
docker-compose up -d
\`\`\`
`;
}

export function generateAdminDocumentation(title, summaryContent, rfcContent, technologies, projectType) {
  return `# Руководство администратора: ${title}

## Требования к системе
- Go 1.16+
- PostgreSQL 12+
- Docker 20.10+
- Docker Compose 1.29+

## Установка
1. Клонируйте репозиторий:
\`\`\`bash
git clone https://github.com/company/${title.toLowerCase().replace(/\s+/g, '-')}.git
cd ${title.toLowerCase().replace(/\s+/g, '-')}
\`\`\`

2. Создайте файл .env с необходимыми переменными окружения:
\`\`\`bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
\`\`\`

3. Запустите сервис с помощью Docker Compose:
\`\`\`bash
docker-compose up -d
\`\`\`

## Конфигурация
Основные параметры конфигурации:

| Параметр | Описание | Значение по умолчанию |
|----------|----------|------------------------|
| PORT | Порт для HTTP сервера | 8080 |
| LOG_LEVEL | Уровень логирования | info |
| DB_HOST | Хост базы данных | localhost |
| DB_PORT | Порт базы данных | 5432 |
| DB_USER | Пользователь базы данных | postgres |
| DB_PASSWORD | Пароль базы данных | password |
| DB_NAME | Имя базы данных | app |
`;
}

export function generateUserDocumentation(title, summaryContent, rfcContent, projectType) {
  return `# Руководство пользователя: ${title}

## Введение
${title} - это сервис, который позволяет обрабатывать данные и получать результаты в удобном формате.

## Начало работы
Для начала работы с сервисом вам потребуется API ключ. Обратитесь к администратору системы для получения ключа.

## Основные функции
### Работа с данными
Приложение позволяет просматривать, создавать, редактировать и удалять данные. Для этого:

1. Перейдите в раздел "Данные"
2. Используйте кнопки и формы для работы с данными
3. Сохраняйте изменения, нажимая кнопку "Сохранить"

### Аналитика и отчеты
Для получения аналитической информации:

1. Перейдите в раздел "Отчеты"
2. Выберите тип отчета из списка
3. Настройте параметры отчета
4. Нажмите "Сформировать отчет"

Отчеты доступны в форматах PDF, Excel и CSV.

## Часто задаваемые вопросы
### Как сбросить пароль?
Для сброса пароля нажмите на ссылку "Забыли пароль?" на странице входа и следуйте инструкциям.

### Как изменить настройки уведомлений?
Перейдите в раздел "Настройки" и выберите вкладку "Уведомления". Там вы можете настроить типы уведомлений и способы их доставки.

## Поддержка
При возникновении проблем обращайтесь в службу поддержки:

- Email: support@example.com
- Телефон: +7 (123) 456-78-90
- Время работы: Пн-Пт с 9:00 до 18:00
`;
} 