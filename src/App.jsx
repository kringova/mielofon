import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import Header from './components/Header';
import SummaryInput from './components/SummaryInput';
import SimilarSummaries from './components/SimilarSummaries';
import RfcGenerator from './components/RfcGenerator';
import DocumentationGenerator from './components/DocumentationGenerator';

// Удалите неиспользуемые импорты или добавьте комментарий
// eslint-disable-next-line
import {
  extractProblem,
  extractSolution,
  extractTechnicalDetails,
  extractCurrentState,
  extractProblems,
  extractGoal,
  extractTechnologies,
  determineAudiences,
  determineProjectType,
  extractTechnologiesFromText,
  generateDevDocumentation,
  generateAdminDocumentation,
  generateUserDocumentation
} from './utils/documentationUtils';

function App() {
  const [summary, setSummary] = useState(null);
  const [similarSummaries, setSimilarSummaries] = useState([]);
  const [rfcContent, setRfcContent] = useState('');
  const [documentationContent, setDocumentationContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRfc, setShowRfc] = useState(false);
  const [showDocumentation, setShowDocumentation] = useState(false);
  const [generateRfc, setGenerateRfc] = useState(false);
  const [suggestedAudiences, setSuggestedAudiences] = useState({
    developers: true,
    administrators: true,
    users: true
  });

  const handleSummarySubmit = (summaryData) => {
    setLoading(true);
    setSummary(summaryData);
    
    // Имитация запроса к API
    setTimeout(() => {
      // Генерация похожих саммари
      const mockSimilarSummaries = [
        {
          id: 1,
          title: "Обсуждение архитектуры микросервисов",
          content: "Обсудили переход на микросервисную архитектуру. Решили использовать Docker и Kubernetes для оркестрации. Необходимо подготовить план миграции.",
          participants: ["Иван Петров", "Мария Сидорова", "Алексей Иванов"],
          similarity: 0.85,
          team: "Инфраструктурная команда",
          contact: "infra-team@company.com"
        },
        {
          id: 2,
          title: "Планирование нового API",
          content: "Обсудили дизайн нового API для интеграции с внешними системами. Решили использовать REST с возможностью перехода на GraphQL в будущем.",
          participants: ["Петр Смирнов", "Анна Козлова"],
          similarity: 0.72,
          team: "Команда бэкенда",
          contact: "backend-team@company.com"
        }
      ];
      
      setSimilarSummaries(mockSimilarSummaries);
      
      // Если пользователь выбрал генерацию RFC, генерируем его
      if (generateRfc) {
        // Генерация RFC на основе содержимого саммари
        let rfcTitle = summaryData.title;
        let rfcContent = '';
        
        // Определяем тип RFC на основе содержимого
        const summaryContent = summaryData.content.toLowerCase();
        let rfcType = 'feature';
        
        if (summaryContent.includes('архитектур') || summaryContent.includes('инфраструктур') || summaryContent.includes('kubernetes')) {
          rfcType = 'architecture';
        } else if (summaryContent.includes('исследован') || summaryContent.includes('анализ') || summaryContent.includes('ml') || summaryContent.includes('machine learning')) {
          rfcType = 'research';
        }
        
        // Генерируем RFC в зависимости от типа
        if (rfcType === 'feature') {
          rfcContent = `# RFC: ${rfcTitle}

## Проблема
Текущая реализация не обеспечивает необходимый уровень функциональности и производительности.

## Предлагаемое решение
Создание нового компонента с улучшенной архитектурой и оптимизированной производительностью.

## Технический дизайн
- Язык программирования: Go
- База данных: PostgreSQL
- Контейнеризация: Docker

## Потенциальные проблемы
- Необходимость интеграции с существующими системами
- Возможные проблемы с производительностью при высоких нагрузках

## Следующие шаги
1. Детальное проектирование API
2. Разработка прототипа
3. Тестирование с реальными данными`;
        } else if (rfcType === 'architecture') {
          rfcContent = `# RFC: ${rfcTitle}

## Текущая архитектура
Текущая система представляет собой монолитное приложение с ограниченными возможностями масштабирования.

## Проблемы текущей архитектуры
- Сложность масштабирования
- Проблемы с производительностью
- Высокая связность компонентов

## Предлагаемая архитектура
Создание нового компонента с улучшенной архитектурой и оптимизированной производительностью.

## Технические детали
- Язык программирования: Go
- База данных: PostgreSQL
- Контейнеризация: Docker

## План миграции
1. Разработка новых компонентов
2. Параллельная работа старой и новой систем
3. Постепенный переход на новую архитектуру
4. Отключение устаревших компонентов

## Риски и их митигация
- Риск простоя: использование стратегии постепенного перехода
- Риск потери данных: резервное копирование и валидация данных`;
        } else if (rfcType === 'research') {
          rfcContent = `# RFC: ${rfcTitle}

## Цель исследования
Определить оптимальный подход к решению текущих проблем и выбрать наиболее подходящие технологии.

## Текущее состояние
Текущая система представляет собой монолитное приложение с ограниченными возможностями масштабирования.

## Исследуемые технологии
1. **Языки программирования**
   - Go
   - Python
   - Java

2. **Базы данных**
   - PostgreSQL
   - MongoDB
   - Redis

## Критерии оценки
- Скорость разработки
- Производительность
- Масштабируемость
- Удобство использования
- Стоимость поддержки

## Методология исследования
1. Анализ существующих решений
2. Разработка прототипов
3. Бенчмаркинг производительности
4. Оценка удобства использования

## Ожидаемые результаты
Рекомендации по выбору оптимального решения с обоснованием.`;
        }
        
        setRfcContent(rfcContent);
        setShowRfc(true);
      }
      
      // Определяем целевую аудиторию на основе содержимого
      setSuggestedAudiences({
        developers: true,
        administrators: true,
        users: true
      });
      
      setLoading(false);
    }, 2000);
  };

  const handleGenerateDocumentation = () => {
    setLoading(true);
    setShowDocumentation(true);
    
    // Имитация запроса к API
    setTimeout(() => {
      // Генерируем документацию для разных аудиторий
      const devDocs = `# Документация для разработчиков: ${summary.title}

## Архитектура
Сервис построен с использованием Go, PostgreSQL, Docker. Основные компоненты:
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

      const adminDocs = `# Руководство администратора: ${summary.title}

## Требования к системе
- Go 1.16+
- PostgreSQL 12+
- Docker 20.10+
- Docker Compose 1.29+

## Установка
1. Клонируйте репозиторий:
\`\`\`bash
git clone https://github.com/company/${summary.title.toLowerCase().replace(/\s+/g, '-')}.git
cd ${summary.title.toLowerCase().replace(/\s+/g, '-')}
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

      const userDocs = `# Руководство пользователя: ${summary.title}

## Введение
${summary.title} - это сервис, который позволяет обрабатывать данные и получать результаты в удобном формате.

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
      
      setDocumentationContent({
        dev: devDocs,
        admin: adminDocs,
        user: userDocs
      });
      
      setLoading(false);
    }, 2000);
  };

  const resetFlow = () => {
    setSummary(null);
    setSimilarSummaries([]);
    setRfcContent('');
    setDocumentationContent('');
    setShowRfc(false);
    setShowDocumentation(false);
    setGenerateRfc(false);
  };

  return (
    <div className="app">
      <Header resetFlow={resetFlow} />
      <Container className="py-4">
        <SummaryInput 
          onSubmit={handleSummarySubmit} 
          loading={loading} 
          setLoading={setLoading}
          generateRfc={generateRfc}
          setGenerateRfc={setGenerateRfc}
        />
        
        {summary && similarSummaries.length > 0 && (
          <SimilarSummaries 
            summaries={similarSummaries} 
            onGenerateDocumentation={handleGenerateDocumentation}
            showRfc={showRfc}
            generateRfc={generateRfc}
          />
        )}
        
        {showRfc && rfcContent && (
          <RfcGenerator 
            content={rfcContent} 
            onGenerateDocumentation={handleGenerateDocumentation}
          />
        )}
        
        {showDocumentation && (
          <DocumentationGenerator 
            content={documentationContent} 
            onGenerate={handleGenerateDocumentation} 
            loading={loading}
            suggestedAudiences={suggestedAudiences}
          />
        )}
      </Container>
    </div>
  );
}

export default App; 