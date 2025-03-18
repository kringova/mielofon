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
        
        // Извлекаем ключевые технологии из содержимого
        const technologies = [];
        if (summaryContent.includes('go')) technologies.push('Go');
        if (summaryContent.includes('react')) technologies.push('React');
        if (summaryContent.includes('typescript') || summaryContent.includes('ts')) technologies.push('TypeScript');
        if (summaryContent.includes('javascript') || summaryContent.includes('js')) technologies.push('JavaScript');
        if (summaryContent.includes('postgresql') || summaryContent.includes('postgres')) technologies.push('PostgreSQL');
        if (summaryContent.includes('mongodb') || summaryContent.includes('mongo')) technologies.push('MongoDB');
        if (summaryContent.includes('docker')) technologies.push('Docker');
        if (summaryContent.includes('kubernetes') || summaryContent.includes('k8s')) technologies.push('Kubernetes');
        if (summaryContent.includes('rabbitmq')) technologies.push('RabbitMQ');
        if (summaryContent.includes('kafka')) technologies.push('Kafka');
        if (summaryContent.includes('redis')) technologies.push('Redis');
        if (summaryContent.includes('graphql')) technologies.push('GraphQL');
        if (summaryContent.includes('rest')) technologies.push('REST API');
        if (summaryContent.includes('python')) technologies.push('Python');
        if (summaryContent.includes('java')) technologies.push('Java');
        if (summaryContent.includes('c#')) technologies.push('C#');
        if (summaryContent.includes('react native')) technologies.push('React Native');
        if (summaryContent.includes('flutter')) technologies.push('Flutter');
        if (summaryContent.includes('swift')) technologies.push('Swift');
        if (summaryContent.includes('kotlin')) technologies.push('Kotlin');
        
        // Если технологии не найдены, добавляем стандартные
        if (technologies.length === 0) {
          if (rfcType === 'architecture') {
            technologies.push('Kubernetes', 'Docker', 'PostgreSQL');
          } else if (rfcType === 'research') {
            technologies.push('TensorFlow', 'PyTorch', 'scikit-learn');
          } else {
            technologies.push('Go', 'PostgreSQL', 'Docker');
          }
        }
        
        // Генерируем проблемы на основе типа RFC и содержимого
        const problems = [];
        
        if (rfcType === 'feature') {
          problems.push('Текущая реализация не обеспечивает необходимый уровень функциональности');
          problems.push('Низкая производительность при обработке большого объема данных');
          problems.push('Отсутствие масштабируемости при увеличении нагрузки');
          problems.push('Сложность интеграции с существующими системами');
          
          if (summaryContent.includes('интерфейс') || summaryContent.includes('ui') || summaryContent.includes('ux')) {
            problems.push('Неудобный пользовательский интерфейс, снижающий эффективность работы');
            problems.push('Отсутствие адаптивности для мобильных устройств');
          }
          
          if (summaryContent.includes('api')) {
            problems.push('Отсутствие стандартизации API');
            problems.push('Недостаточная документация для интеграции');
          }
          
          if (summaryContent.includes('безопасн') || summaryContent.includes('security')) {
            problems.push('Уязвимости в системе безопасности');
            problems.push('Отсутствие механизмов аудита действий пользователей');
          }
        } else if (rfcType === 'architecture') {
          problems.push('Монолитная архитектура затрудняет масштабирование');
          problems.push('Высокая связность компонентов усложняет внесение изменений');
          problems.push('Отсутствие изоляции ошибок между компонентами');
          problems.push('Сложность развертывания и обновления системы');
          problems.push('Неэффективное использование ресурсов');
          
          if (summaryContent.includes('kubernetes') || summaryContent.includes('k8s')) {
            problems.push('Отсутствие автоматического масштабирования');
            problems.push('Сложность управления конфигурацией в распределенной среде');
          }
          
          if (summaryContent.includes('микросервис')) {
            problems.push('Сложность отладки распределенных транзакций');
            problems.push('Отсутствие централизованного мониторинга и логирования');
          }
        } else if (rfcType === 'research') {
          problems.push('Недостаточно данных для принятия обоснованных решений');
          problems.push('Отсутствие четких критериев оценки технологий');
          problems.push('Быстрое устаревание технологических решений');
          problems.push('Сложность прогнозирования долгосрочных последствий выбора технологий');
          
          if (summaryContent.includes('ml') || summaryContent.includes('machine learning')) {
            problems.push('Сложность интерпретации результатов моделей машинного обучения');
            problems.push('Высокие требования к качеству и объему обучающих данных');
          }
        }
        
        // Генерируем RFC в зависимости от типа
        if (rfcType === 'feature') {
          rfcContent = `# RFC: ${rfcTitle}

## Проблемы
${problems.map(p => `- ${p}`).join('\n')}

## Предлагаемое решение
Создание нового компонента с улучшенной архитектурой и оптимизированной производительностью.

## Технический дизайн
${technologies.map(tech => `- ${tech}`).join('\n')}

## Потенциальные риски
- Необходимость интеграции с существующими системами
- Возможные проблемы с производительностью при высоких нагрузках
- Увеличение сложности поддержки системы
- Необходимость дополнительного обучения команды

## Следующие шаги
1. Детальное проектирование API
2. Разработка прототипа
3. Тестирование с реальными данными
4. Постепенное внедрение в продакшн`;
        } else if (rfcType === 'architecture') {
          rfcContent = `# RFC: ${rfcTitle}

## Текущая архитектура
Текущая система представляет собой монолитное приложение с ограниченными возможностями масштабирования.

## Проблемы текущей архитектуры
${problems.map(p => `- ${p}`).join('\n')}

## Предлагаемая архитектура
Переход на микросервисную архитектуру с четким разделением ответственности между компонентами.

## Технические детали
${technologies.map(tech => `- ${tech}`).join('\n')}

## План миграции
1. Разработка новых компонентов
2. Параллельная работа старой и новой систем
3. Постепенный переход на новую архитектуру
4. Отключение устаревших компонентов

## Риски и их митигация
- Риск простоя: использование стратегии постепенного перехода
- Риск потери данных: резервное копирование и валидация данных
- Риск снижения производительности: тщательное тестирование перед внедрением
- Риск увеличения сложности: документирование и обучение команды`;
        } else if (rfcType === 'research') {
          rfcContent = `# RFC: ${rfcTitle}

## Цель исследования
Определить оптимальный подход к решению текущих проблем и выбрать наиболее подходящие технологии.

## Текущие проблемы
${problems.map(p => `- ${p}`).join('\n')}

## Исследуемые технологии
${technologies.map((tech, index) => `${index + 1}. **${tech}**`).join('\n')}

## Критерии оценки
- Скорость разработки
- Производительность
- Масштабируемость
- Удобство использования
- Стоимость поддержки
- Зрелость технологии
- Доступность специалистов на рынке

## Методология исследования
1. Анализ существующих решений
2. Разработка прототипов
3. Бенчмаркинг производительности
4. Оценка удобства использования
5. Анализ долгосрочных перспектив

## Ожидаемые результаты
Рекомендации по выбору оптимального решения с обоснованием и планом внедрения.`;
        }
        
        setRfcContent(rfcContent);
        setShowRfc(true);
      }
      
      setLoading(false);
    }, 2000);
  };

  const handleGenerateDocumentation = () => {
    setShowDocumentation(true);
  };

  const handleGenerateRfc = () => {
    setLoading(true);
    
    // Имитация запроса к API
    setTimeout(() => {
      // Генерация RFC на основе содержимого саммари
      let rfcTitle = summary.title;
      let rfcContent = '';
      
      // Определяем тип RFC на основе содержимого
      const summaryContent = summary.content.toLowerCase();
      let rfcType = 'feature';
      
      if (summaryContent.includes('архитектур') || summaryContent.includes('инфраструктур') || summaryContent.includes('kubernetes')) {
        rfcType = 'architecture';
      } else if (summaryContent.includes('исследован') || summaryContent.includes('анализ') || summaryContent.includes('ml') || summaryContent.includes('machine learning')) {
        rfcType = 'research';
      }
      
      // Извлекаем ключевые технологии из содержимого
      const technologies = [];
      if (summaryContent.includes('go')) technologies.push('Go');
      if (summaryContent.includes('react')) technologies.push('React');
      if (summaryContent.includes('typescript') || summaryContent.includes('ts')) technologies.push('TypeScript');
      if (summaryContent.includes('javascript') || summaryContent.includes('js')) technologies.push('JavaScript');
      if (summaryContent.includes('postgresql') || summaryContent.includes('postgres')) technologies.push('PostgreSQL');
      if (summaryContent.includes('mongodb') || summaryContent.includes('mongo')) technologies.push('MongoDB');
      if (summaryContent.includes('docker')) technologies.push('Docker');
      if (summaryContent.includes('kubernetes') || summaryContent.includes('k8s')) technologies.push('Kubernetes');
      if (summaryContent.includes('rabbitmq')) technologies.push('RabbitMQ');
      if (summaryContent.includes('kafka')) technologies.push('Kafka');
      if (summaryContent.includes('redis')) technologies.push('Redis');
      if (summaryContent.includes('graphql')) technologies.push('GraphQL');
      if (summaryContent.includes('rest')) technologies.push('REST API');
      if (summaryContent.includes('python')) technologies.push('Python');
      if (summaryContent.includes('java')) technologies.push('Java');
      if (summaryContent.includes('c#')) technologies.push('C#');
      if (summaryContent.includes('react native')) technologies.push('React Native');
      if (summaryContent.includes('flutter')) technologies.push('Flutter');
      if (summaryContent.includes('swift')) technologies.push('Swift');
      if (summaryContent.includes('kotlin')) technologies.push('Kotlin');
      
      // Если технологии не найдены, добавляем стандартные
      if (technologies.length === 0) {
        if (rfcType === 'architecture') {
          technologies.push('Kubernetes', 'Docker', 'PostgreSQL');
        } else if (rfcType === 'research') {
          technologies.push('TensorFlow', 'PyTorch', 'scikit-learn');
        } else {
          technologies.push('Go', 'PostgreSQL', 'Docker');
        }
      }
      
      // Генерируем проблемы на основе типа RFC и содержимого
      const problems = [];
      
      if (rfcType === 'feature') {
        problems.push('Текущая реализация не обеспечивает необходимый уровень функциональности');
        problems.push('Низкая производительность при обработке большого объема данных');
        problems.push('Отсутствие масштабируемости при увеличении нагрузки');
        problems.push('Сложность интеграции с существующими системами');
        
        if (summaryContent.includes('интерфейс') || summaryContent.includes('ui') || summaryContent.includes('ux')) {
          problems.push('Неудобный пользовательский интерфейс, снижающий эффективность работы');
          problems.push('Отсутствие адаптивности для мобильных устройств');
        }
        
        if (summaryContent.includes('api')) {
          problems.push('Отсутствие стандартизации API');
          problems.push('Недостаточная документация для интеграции');
        }
        
        if (summaryContent.includes('безопасн') || summaryContent.includes('security')) {
          problems.push('Уязвимости в системе безопасности');
          problems.push('Отсутствие механизмов аудита действий пользователей');
        }
      } else if (rfcType === 'architecture') {
        problems.push('Монолитная архитектура затрудняет масштабирование');
        problems.push('Высокая связность компонентов усложняет внесение изменений');
        problems.push('Отсутствие изоляции ошибок между компонентами');
        problems.push('Сложность развертывания и обновления системы');
        problems.push('Неэффективное использование ресурсов');
        
        if (summaryContent.includes('kubernetes') || summaryContent.includes('k8s')) {
          problems.push('Отсутствие автоматического масштабирования');
          problems.push('Сложность управления конфигурацией в распределенной среде');
        }
        
        if (summaryContent.includes('микросервис')) {
          problems.push('Сложность отладки распределенных транзакций');
          problems.push('Отсутствие централизованного мониторинга и логирования');
        }
      } else if (rfcType === 'research') {
        problems.push('Недостаточно данных для принятия обоснованных решений');
        problems.push('Отсутствие четких критериев оценки технологий');
        problems.push('Быстрое устаревание технологических решений');
        problems.push('Сложность прогнозирования долгосрочных последствий выбора технологий');
        
        if (summaryContent.includes('ml') || summaryContent.includes('machine learning')) {
          problems.push('Сложность интерпретации результатов моделей машинного обучения');
          problems.push('Высокие требования к качеству и объему обучающих данных');
        }
      }
      
      // Генерируем RFC в зависимости от типа
      if (rfcType === 'feature') {
        rfcContent = `# RFC: ${rfcTitle}

## Проблемы
${problems.map(p => `- ${p}`).join('\n')}

## Предлагаемое решение
Создание нового компонента с улучшенной архитектурой и оптимизированной производительностью.

## Технический дизайн
${technologies.map(tech => `- ${tech}`).join('\n')}

## Потенциальные риски
- Необходимость интеграции с существующими системами
- Возможные проблемы с производительностью при высоких нагрузках
- Увеличение сложности поддержки системы
- Необходимость дополнительного обучения команды

## Следующие шаги
1. Детальное проектирование API
2. Разработка прототипа
3. Тестирование с реальными данными
4. Постепенное внедрение в продакшн`;
      } else if (rfcType === 'architecture') {
        rfcContent = `# RFC: ${rfcTitle}

## Текущая архитектура
Текущая система представляет собой монолитное приложение с ограниченными возможностями масштабирования.

## Проблемы текущей архитектуры
${problems.map(p => `- ${p}`).join('\n')}

## Предлагаемая архитектура
Переход на микросервисную архитектуру с четким разделением ответственности между компонентами.

## Технические детали
${technologies.map(tech => `- ${tech}`).join('\n')}

## План миграции
1. Разработка новых компонентов
2. Параллельная работа старой и новой систем
3. Постепенный переход на новую архитектуру
4. Отключение устаревших компонентов

## Риски и их митигация
- Риск простоя: использование стратегии постепенного перехода
- Риск потери данных: резервное копирование и валидация данных
- Риск снижения производительности: тщательное тестирование перед внедрением
- Риск увеличения сложности: документирование и обучение команды`;
      } else if (rfcType === 'research') {
        rfcContent = `# RFC: ${rfcTitle}

## Цель исследования
Определить оптимальный подход к решению текущих проблем и выбрать наиболее подходящие технологии.

## Текущие проблемы
${problems.map(p => `- ${p}`).join('\n')}

## Исследуемые технологии
${technologies.map((tech, index) => `${index + 1}. **${tech}**`).join('\n')}

## Критерии оценки
- Скорость разработки
- Производительность
- Масштабируемость
- Удобство использования
- Стоимость поддержки
- Зрелость технологии
- Доступность специалистов на рынке

## Методология исследования
1. Анализ существующих решений
2. Разработка прототипов
3. Бенчмаркинг производительности
4. Оценка удобства использования
5. Анализ долгосрочных перспектив

## Ожидаемые результаты
Рекомендации по выбору оптимального решения с обоснованием и планом внедрения.`;
      }
      
      setRfcContent(rfcContent);
      setShowRfc(true);
      setGenerateRfc(true);
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
            onGenerateRfc={handleGenerateRfc}
          />
        )}
        
        {showRfc && (
          <RfcGenerator 
            content={rfcContent} 
            onGenerateDocumentation={handleGenerateDocumentation}
          />
        )}
        
        {showDocumentation && (
          <DocumentationGenerator 
            summary={summary}
            rfcContent={rfcContent}
          />
        )}
      </Container>
    </div>
  );
}

export default App; 