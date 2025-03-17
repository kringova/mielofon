import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, Alert, Accordion } from 'react-bootstrap';

function SummaryInput({ onSubmit, loading, setLoading, generateRfc, setGenerateRfc }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [participants, setParticipants] = useState('');
  const [error, setError] = useState('');
  const [showExamples, setShowExamples] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setError('Пожалуйста, заполните название и содержание саммари');
      return;
    }
    
    setError('');
    
    const summaryData = {
      title,
      content,
      participants: participants.split(',').map(p => p.trim()).filter(p => p),
      useMockData: true // Всегда используем моковые данные
    };
    
    onSubmit(summaryData);
  };

  // Расширенный набор примеров саммари
  const examples = [
    {
      category: 'Разработка',
      items: [
        {
          id: 'microservice',
          title: 'Микросервис для аналитики данных',
          content: 'Обсудили необходимость создания отдельного микросервиса для обработки аналитических данных. Основные требования: масштабируемость до 10 млн запросов в день, отказоустойчивость с SLA 99.9%, возможность обработки больших объемов данных (до 5 ТБ) в реальном времени. Решили использовать Go для бэкенда из-за высокой производительности и низкого потребления памяти, ClickHouse для хранения аналитических данных из-за колоночного хранения и высокой скорости агрегации. Для очередей сообщений выбрали Kafka с 3 брокерами. Необходимо подготовить детальный дизайн API с использованием REST и gRPC для внутренних сервисов, а также план интеграции с существующими системами через API Gateway на базе Kong. Для мониторинга будем использовать Prometheus + Grafana, для логирования - ELK Stack.',
          participants: 'Иван Петров (Tech Lead), Мария Сидорова (Backend Developer), Алексей Иванов (Data Engineer), Ольга Смирнова (Product Manager)',
          targetAudiences: ['developers', 'administrators']
        },
        {
          id: 'frontend',
          title: 'Редизайн пользовательского интерфейса личного кабинета',
          content: 'Обсудили необходимость обновления UI личного кабинета для улучшения пользовательского опыта. Основные проблемы текущего интерфейса: несогласованность дизайна между разными разделами (разные стили кнопок, форм, таблиц), низкая производительность на мобильных устройствах (время загрузки страницы > 5 секунд на 3G), отсутствие поддержки темной темы, недостаточная доступность для пользователей с ограниченными возможностями (не соответствует WCAG 2.1 AA). Решили использовать React 18 с TypeScript для фронтенда, новую дизайн-систему на базе Material UI v5, Redux Toolkit для управления состоянием, React Query для кэширования данных. Для улучшения производительности будем использовать code splitting, lazy loading, оптимизацию изображений через next/image. Необходимо подготовить прототипы основных экранов в Figma (дашборд, настройки профиля, история операций, аналитика), провести юзабилити-тестирование с 5-7 реальными пользователями и составить план миграции со старого интерфейса с возможностью переключения между версиями.',
          participants: 'Анна Козлова (UX Designer), Дмитрий Смирнов (Frontend Lead), Елена Новикова (Frontend Developer), Сергей Иванов (Product Owner)',
          targetAudiences: ['developers', 'users']
        },
        {
          id: 'api',
          title: 'Разработка публичного API для партнерской программы',
          content: 'Обсудили создание публичного API для интеграции с партнерскими сервисами. Ключевые требования: безопасность (OAuth 2.0 с поддержкой scope, rate limiting, защита от CSRF/XSS атак), версионирование API (семантическое версионирование в URL /v1/, /v2/), исчерпывающая документация (OpenAPI 3.0, интерактивная документация на Swagger UI), ограничение нагрузки (не более 1000 запросов в минуту на партнера с возможностью увеличения лимита). Решили использовать REST с JSON:API спецификацией для стандартизации ответов и обработки ошибок, с возможностью перехода на GraphQL для определенных эндпоинтов в будущем. Для аутентификации будем использовать OAuth 2.0 с поддержкой Authorization Code Flow и Client Credentials Flow. Для мониторинга API - Datadog APM. Необходимо разработать спецификацию API с детальным описанием всех эндпоинтов, моделей данных и кодов ответа, а также план тестирования включающий функциональное, нагрузочное и пенетрационное тестирование.',
          participants: 'Петр Смирнов (API Architect), Ольга Иванова (Security Engineer), Сергей Кузнецов (Backend Developer), Андрей Соколов (Integration Specialist)',
          targetAudiences: ['developers', 'administrators', 'users']
        },
        {
          id: 'ml',
          title: 'Внедрение системы рекомендаций на основе машинного обучения',
          content: 'Обсудили разработку и внедрение системы персонализированных рекомендаций для пользователей на основе их поведения и предпочтений. Основные требования: точность рекомендаций (метрика nDCG@10 > 0.7), скорость генерации рекомендаций (< 100 мс), возможность A/B тестирования разных алгоритмов, объяснимость рекомендаций для пользователей. Решили использовать гибридный подход, сочетающий коллаборативную фильтрацию (matrix factorization с использованием PyTorch) и контентную фильтрацию (с использованием BERT для анализа текстовых описаний). Для обработки данных выбрали Apache Spark, для хранения векторных эмбеддингов - Pinecone, для оркестрации пайплайнов ML - Airflow. Модели будут обучаться раз в сутки на исторических данных и дообучаться в режиме онлайн. Для инференса будет использоваться отдельный микросервис на FastAPI с кэшированием результатов в Redis. Необходимо подготовить план сбора и предобработки данных, разработать прототип с базовыми алгоритмами, настроить мониторинг качества моделей (drift detection) и провести A/B тестирование на 10% пользователей.',
          participants: 'Михаил Волков (ML Engineer), Наталья Морозова (Data Scientist), Артем Соколов (Backend Developer), Ирина Петрова (Product Manager)',
          targetAudiences: ['developers', 'administrators']
        }
      ]
    },
    {
      category: 'Инфраструктура',
      items: [
        {
          id: 'kubernetes',
          title: 'Миграция инфраструктуры на Kubernetes',
          content: 'Обсудили план миграции инфраструктуры с виртуальных машин на Kubernetes. Текущие проблемы: сложность масштабирования (ручное добавление новых инстансов), отсутствие автоматического восстановления после сбоев (MTTR > 30 минут), неэффективное использование ресурсов (средняя утилизация CPU < 20%), сложность с обновлением приложений (даунтайм > 10 минут). Решили использовать managed Kubernetes в AWS EKS с 3 нодами для production и 2 для staging, с автоскейлингом на основе метрик CPU и памяти. Для CI/CD выбрали GitLab CI с автоматическим деплоем через Helm чарты. Для мониторинга - Prometheus + Grafana + Alert Manager, для логирования - EFK stack (Elasticsearch, Fluentd, Kibana). Сетевой уровень будет построен на Calico, для Ingress будем использовать NGINX Ingress Controller с сертификатами от Let\'s Encrypt через cert-manager. Хранение данных - через AWS EBS для PostgreSQL и S3 для статических файлов. Необходимо подготовить Helm-чарты для всех сервисов (15+ микросервисов), настроить CI/CD пайплайны, разработать стратегию миграции с минимальным даунтаймом (blue-green deployment) и провести нагрузочное тестирование новой инфраструктуры.',
          participants: 'Алексей Кузнецов (DevOps Lead), Ирина Соколова (SRE), Максим Волков (Backend Developer), Дмитрий Новиков (CTO)',
          targetAudiences: ['administrators', 'developers']
        },
        {
          id: 'monitoring',
          title: 'Улучшение системы мониторинга и алертинга',
          content: 'Обсудили необходимость улучшения системы мониторинга и алертинга. Текущие проблемы: отсутствие единой системы сбора метрик (разные сервисы используют разные инструменты), много ложных срабатываний (> 30% алертов не требуют вмешательства), отсутствие автоматизации при реагировании на инциденты (все действия выполняются вручную), недостаточная видимость бизнес-метрик. Решили внедрить Prometheus (с Thanos для долгосрочного хранения) для сбора метрик со всех сервисов, Grafana для визуализации с набором преднастроенных дашбордов (инфраструктура, сервисы, бизнес-метрики), Loki для централизованного сбора логов, Alertmanager для управления алертами с интеграцией в PagerDuty и Slack. Для трейсинга выбрали Jaeger с 1% семплированием в production и 100% в staging. Для автоматизации реагирования на инциденты будем использовать Rundeck с преднастроенными playbook\'ами для типовых ситуаций. Необходимо разработать дашборды для всех критичных сервисов (SLI/SLO, latency, error rate, saturation), настроить правила алертинга с учетом бизнес-приоритетов (P1/P2/P3), документировать процедуры реагирования на инциденты и провести обучение команды.',
          participants: 'Дмитрий Иванов (SRE), Светлана Петрова (DevOps Engineer), Андрей Сидоров (Backend Lead), Елена Козлова (Product Manager)',
          targetAudiences: ['administrators']
        },
        {
          id: 'security',
          title: 'Усиление безопасности инфраструктуры и приложений',
          content: 'Обсудили необходимость усиления безопасности инфраструктуры и приложений после недавнего аудита. Выявленные проблемы: отсутствие систематического управления секретами (хардкодинг в конфигурациях), недостаточная сегментация сети (все сервисы в одной VPC), отсутствие сканирования уязвимостей в CI/CD, неполное логирование событий безопасности, отсутствие IDS/IPS. Решили внедрить HashiCorp Vault для централизованного управления секретами с интеграцией в CI/CD и Kubernetes, перепроектировать сетевую архитектуру с использованием нескольких VPC и Security Groups в AWS, добавить OWASP ZAP и Trivy в CI/CD для сканирования уязвимостей в коде и контейнерах, настроить AWS GuardDuty и Security Hub для мониторинга безопасности, внедрить AWS WAF перед API Gateway для защиты от атак на уровне приложения. Для управления доступом будем использовать AWS IAM с принципом наименьших привилегий и MFA для всех пользователей. Необходимо разработать план внедрения изменений с минимальным влиянием на работу сервисов, обновить политики безопасности и провести обучение команды разработки по secure coding practices.',
          participants: 'Сергей Морозов (Security Engineer), Ольга Петрова (DevOps), Дмитрий Сидоров (CTO), Анна Иванова (Compliance Manager)',
          targetAudiences: ['administrators', 'developers']
        }
      ]
    },
    {
      category: 'Продукт',
      items: [
        {
          id: 'mobile',
          title: 'Разработка мобильного приложения для iOS и Android',
          content: 'Обсудили разработку мобильного приложения для iOS и Android с целью увеличения вовлеченности пользователей и расширения каналов взаимодействия. Основные функции: просмотр статистики и аналитики в реальном времени, получение push-уведомлений о важных событиях, управление аккаунтом и настройками, офлайн-режим с синхронизацией при появлении сети. Целевая аудитория: существующие пользователи веб-версии (около 100 000 человек), 70% iOS / 30% Android по аналитике веб-версии. Решили использовать React Native (с TypeScript) для кроссплатформенной разработки с целью ускорения выхода на рынок, Redux для управления состоянием, React Navigation для навигации, Realm для локального хранения данных. Для аналитики будем использовать Firebase Analytics, для push-уведомлений - Firebase Cloud Messaging. Дизайн будет следовать нативным гайдлайнам каждой платформы (Material Design для Android, Human Interface Guidelines для iOS) с сохранением общего брендинга. Необходимо подготовить дизайн ключевых экранов (не менее 15 экранов), определить MVP функциональность для первого релиза (авторизация, просмотр основных метрик, настройки профиля, push-уведомления) и составить план релизов на 6 месяцев с двухнедельными итерациями.',
          participants: 'Максим Волков (Mobile Lead), Наталья Морозова (UX Designer), Артем Соколов (Backend Developer), Екатерина Смирнова (Product Manager)',
          targetAudiences: ['developers', 'users']
        },
        {
          id: 'analytics',
          title: 'Внедрение продвинутой аналитики пользовательского поведения',
          content: 'Обсудили внедрение продвинутой аналитики для лучшего понимания поведения пользователей и оптимизации продукта. Текущие проблемы: ограниченные данные о пользовательских сессиях (только базовые метрики), отсутствие когортного анализа, невозможность отслеживания полной воронки конверсии, отсутствие данных о пользовательском пути. Решили внедрить комбинацию Google Analytics 4 и собственной системы на базе ClickHouse для хранения и анализа событий. Для сбора данных будем использовать единый JavaScript SDK на клиентской стороне, который будет отправлять события как в GA4, так и в нашу систему. Ключевые метрики для отслеживания: retention (удержание пользователей), conversion rate (конверсия по ключевым действиям), user journey (путь пользователя), feature adoption (использование функций), churn prediction (прогнозирование оттока). Для визуализации данных выбрали Tableau с интеграцией с ClickHouse. Необходимо разработать план сбора данных (определить все события и свойства), настроить ETL процессы для обогащения данных, создать дашборды для продуктовой команды и настроить автоматические отчеты для руководства.',
          participants: 'Елена Смирнова (Data Analyst), Игорь Козлов (Backend Developer), Анна Иванова (Product Manager), Дмитрий Петров (CTO)',
          targetAudiences: ['users', 'administrators']
        },
        {
          id: 'payments',
          title: 'Интеграция новых платежных методов',
          content: 'Обсудили расширение платежных опций для пользователей с целью увеличения конверсии и выхода на новые рынки. Текущие ограничения: поддержка только банковских карт (Visa/Mastercard), отсутствие локальных платежных методов для разных стран, высокие комиссии текущего платежного провайдера (2.9% + $0.30 за транзакцию). Решили интегрировать Stripe в качестве основного платежного процессора с поддержкой следующих методов: банковские карты (Visa, Mastercard, American Express, JCB), Apple Pay, Google Pay, банковские переводы (ACH, SEPA), локальные методы для ключевых рынков (Alipay для Китая, iDEAL для Нидерландов, Boleto для Бразилии). Также будет добавлена поддержка подписок с различными периодами (месяц, квартал, год) и автоматическим продлением. Для снижения риска мошенничества будем использовать Stripe Radar с кастомными правилами. Необходимо разработать новый интерфейс оплаты с учетом всех методов, обновить бэкенд для работы с API Stripe, настроить вебхуки для обработки событий (успешная оплата, отмена подписки, неудачная попытка списания), разработать систему отчетности по платежам и интегрировать с существующей системой учета.',
          participants: 'Алексей Морозов (Backend Lead), Ольга Смирнова (Frontend Developer), Сергей Иванов (Financial Manager), Мария Петрова (Product Owner)',
          targetAudiences: ['developers', 'administrators', 'users']
        }
      ]
    }
  ];

  const fillExampleData = (exampleId) => {
    // Поиск примера по ID
    for (const category of examples) {
      const example = category.items.find(item => item.id === exampleId);
      if (example) {
        setTitle(example.title);
        setContent(example.content);
        setParticipants(example.participants);
        return;
      }
    }
  };

  // Базовые примеры для быстрого доступа
  const basicExamples = [
    {
      id: 'microservice',
      title: 'Микросервис для аналитики',
      content: 'Обсудили необходимость создания отдельного микросервиса для обработки аналитических данных. Основные требования: масштабируемость, отказоустойчивость, возможность обработки больших объемов данных в реальном времени. Решили использовать Go для бэкенда и ClickHouse для хранения данных. Необходимо подготовить детальный дизайн API и план интеграции с существующими системами.',
      participants: 'Иван Петров, Мария Сидорова, Алексей Иванов'
    },
    {
      id: 'frontend',
      title: 'Редизайн пользовательского интерфейса',
      content: 'Обсудили необходимость обновления UI для улучшения пользовательского опыта. Основные проблемы текущего интерфейса: несогласованность дизайна между разными частями приложения, низкая производительность на мобильных устройствах, отсутствие поддержки темной темы. Решили использовать React с TypeScript и новую дизайн-систему. Необходимо подготовить прототипы основных экранов и план миграции.',
      participants: 'Анна Козлова, Дмитрий Смирнов, Елена Новикова'
    },
    {
      id: 'api',
      title: 'Разработка публичного API',
      content: 'Обсудили создание публичного API для интеграции с партнерскими сервисами. Ключевые требования: безопасность, версионирование, документация, ограничение нагрузки. Решили использовать REST с возможностью перехода на GraphQL в будущем. Для аутентификации будем использовать OAuth 2.0. Необходимо разработать спецификацию API и план тестирования.',
      participants: 'Петр Смирнов, Ольга Иванова, Сергей Кузнецов'
    },
    {
      id: 'mobile',
      title: 'Планирование мобильного приложения',
      content: 'Обсудили разработку мобильного приложения для iOS и Android. Основные функции: просмотр статистики, получение уведомлений, базовое управление аккаунтом. Решили использовать React Native для кроссплатформенной разработки. Необходимо подготовить дизайн ключевых экранов, определить MVP функциональность и составить план релизов.',
      participants: 'Максим Волков, Наталья Морозова, Артем Соколов'
    }
  ];

  const fillBasicExampleData = (type) => {
    const example = basicExamples.find(ex => ex.id === type);
    if (example) {
      setTitle(example.title);
      setContent(example.content);
      setParticipants(example.participants);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Введите информацию о встрече</Card.Title>
        <Card.Subtitle className="mb-4 text-muted">
          Загрузите саммари встречи для анализа
        </Card.Subtitle>
        
        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Название встречи</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: Обсуждение нового микросервиса"
              disabled={loading}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Содержание саммари</Form.Label>
            <Form.Control
              as="textarea"
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Вставьте текст саммари встречи..."
              disabled={loading}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Участники (через запятую)</Form.Label>
            <Form.Control
              type="text"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              placeholder="Например: Иван Иванов, Петр Петров"
              disabled={loading}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Check 
              type="checkbox"
              id="generate-rfc"
              label="Сгенерировать RFC на основе саммари"
              checked={generateRfc}
              onChange={() => setGenerateRfc(!generateRfc)}
              disabled={loading}
            />
            <Form.Text className="text-muted">
              RFC (Request for Comments) - документ с описанием проблемы, предлагаемого решения и технических деталей
            </Form.Text>
          </Form.Group>
          
          <Form.Group className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <Form.Label className="mb-0">Примеры саммари:</Form.Label>
              <Button 
                variant="link" 
                onClick={() => setShowExamples(!showExamples)}
                size="sm"
              >
                {showExamples ? 'Скрыть все примеры' : 'Показать все примеры'}
              </Button>
            </div>
            
            <div className="mb-3">
              <Button 
                variant="outline-dark" 
                onClick={() => fillBasicExampleData('microservice')}
                disabled={loading}
                className="me-2 mb-2"
              >
                Микросервис для аналитики
              </Button>
              
              <Button 
                variant="outline-dark" 
                onClick={() => fillBasicExampleData('frontend')}
                disabled={loading}
                className="me-2 mb-2"
              >
                Редизайн UI
              </Button>
              
              <Button 
                variant="outline-dark" 
                onClick={() => fillBasicExampleData('api')}
                disabled={loading}
                className="me-2 mb-2"
              >
                Публичный API
              </Button>
              
              <Button 
                variant="outline-dark" 
                onClick={() => fillBasicExampleData('mobile')}
                disabled={loading}
                className="me-2 mb-2"
              >
                Мобильное приложение
              </Button>
            </div>
            
            {showExamples && (
              <Accordion>
                {examples.map((category, index) => (
                  <Accordion.Item eventKey={index.toString()} key={index}>
                    <Accordion.Header>{category.category}</Accordion.Header>
                    <Accordion.Body>
                      <Row>
                        {category.items.map(example => (
                          <Col md={6} key={example.id} className="mb-2">
                            <Card>
                              <Card.Body>
                                <Card.Title>{example.title}</Card.Title>
                                <Card.Text className="text-truncate">
                                  {example.content.substring(0, 100)}...
                                </Card.Text>
                                <div className="mb-2">
                                  <small className="text-muted">
                                    Участники: {example.participants}
                                  </small>
                                </div>
                                <div className="mb-2">
                                  <small className="text-muted">
                                    Целевая аудитория: {example.targetAudiences.map(audience => {
                                      switch(audience) {
                                        case 'developers': return 'Разработчики';
                                        case 'administrators': return 'Администраторы';
                                        case 'users': return 'Пользователи';
                                        default: return audience;
                                      }
                                    }).join(', ')}
                                  </small>
                                </div>
                                <Button 
                                  variant="dark" 
                                  size="sm" 
                                  onClick={() => fillExampleData(example.id)}
                                >
                                  Использовать
                                </Button>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            )}
          </Form.Group>
          
          <Button 
            variant="dark" 
            type="submit" 
            disabled={loading} 
            className="w-100"
          >
            {loading ? 'Анализ...' : 'Отправить на анализ'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default SummaryInput; 