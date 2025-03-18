import React, { useState } from 'react';
import { Card, Button, Row, Col, Alert, Tabs, Tab, Badge } from 'react-bootstrap';

// Каталог моков саммари по категориям
const MOCK_SUMMARIES_BY_CATEGORY = {
  "Разработка": [
    {
      id: 'microservice',
      title: 'Разработка микросервиса для обработки платежей',
      content: 'Обсудили архитектуру нового микросервиса для обработки платежей. Решили использовать Go для бэкенда и PostgreSQL для хранения данных. Основные требования: высокая производительность, отказоустойчивость и масштабируемость. Сервис должен обрабатывать до 1000 транзакций в секунду. Для очереди сообщений будем использовать RabbitMQ.',
      participants: ['Иван Петров', 'Мария Сидорова', 'Алексей Иванов']
    },
    {
      id: 'frontend',
      title: 'Редизайн пользовательского интерфейса',
      content: 'Обсудили редизайн пользовательского интерфейса. Решили использовать React и TypeScript. Основные требования: адаптивный дизайн, доступность (a11y) и поддержка темной темы. Для управления состоянием будем использовать Redux Toolkit.',
      participants: ['Анна Козлова', 'Дмитрий Смирнов', 'Елена Новикова']
    },
    {
      id: 'api',
      title: 'Разработка публичного API',
      content: 'Обсудили требования к новому публичному API. Решили использовать REST с возможностью перехода на GraphQL в будущем. Основные требования: безопасность, производительность и версионирование. Для аутентификации будем использовать OAuth 2.0 с JWT.',
      participants: ['Сергей Иванов', 'Ольга Петрова', 'Михаил Сидоров']
    },
    {
      id: 'mobile',
      title: 'Разработка мобильного приложения',
      content: 'Обсудили разработку нового мобильного приложения. Решили использовать React Native для кроссплатформенной разработки. Основные требования: офлайн-режим, push-уведомления и интеграция с существующим API. Для управления состоянием будем использовать MobX.',
      participants: ['Павел Николаев', 'Екатерина Смирнова', 'Андрей Козлов']
    }
  ],
  "Инфраструктура": [
    {
      id: 'infrastructure',
      title: 'Миграция на Kubernetes',
      content: 'Обсудили план миграции сервисов на Kubernetes. Решили использовать Google Kubernetes Engine (GKE) для хостинга кластера. Основные требования: минимальное время простоя, автоматическое масштабирование и мониторинг. Для CI/CD будем использовать GitLab CI. Для мониторинга - Prometheus и Grafana.',
      participants: ['Алексей Петров', 'Иван Сидоров', 'Мария Иванова']
    },
    {
      id: 'devops',
      title: 'Внедрение DevOps практик',
      content: 'Обсудили внедрение DevOps практик в команде. Решили использовать GitLab CI/CD для автоматизации сборки и деплоя. Основные требования: автоматические тесты, статический анализ кода, автоматический деплой в разные окружения. Для мониторинга будем использовать ELK стек.',
      participants: ['Дмитрий Кузнецов', 'Анна Смирнова', 'Игорь Соколов']
    },
    {
      id: 'security',
      title: 'Аудит безопасности инфраструктуры',
      content: 'Провели аудит безопасности инфраструктуры. Выявили несколько уязвимостей в конфигурации сетевых компонентов. Решили внедрить HashiCorp Vault для управления секретами, настроить WAF и улучшить мониторинг безопасности с помощью SIEM системы.',
      participants: ['Сергей Морозов', 'Ольга Иванова', 'Алексей Петров']
    }
  ],
  "Продукт": [
    {
      id: 'research',
      title: 'Исследование технологий машинного обучения',
      content: 'Обсудили применение машинного обучения для анализа пользовательского поведения. Рассмотрели различные библиотеки и фреймворки: TensorFlow, PyTorch, scikit-learn. Решили начать с простых моделей и постепенно усложнять. Для обработки данных будем использовать Apache Spark.',
      participants: ['Наталья Кузнецова', 'Владимир Соколов', 'Татьяна Морозова']
    },
    {
      id: 'product-roadmap',
      title: 'Планирование продуктовой дорожной карты',
      content: 'Обсудили продуктовую дорожную карту на следующий квартал. Приоритизировали фичи на основе пользовательских исследований и бизнес-целей. Основные направления: улучшение UX, оптимизация производительности и добавление новых интеграций с внешними сервисами.',
      participants: ['Мария Петрова', 'Иван Соколов', 'Елена Иванова', 'Дмитрий Смирнов']
    },
    {
      id: 'user-research',
      title: 'Результаты пользовательских исследований',
      content: 'Проанализировали результаты пользовательских исследований. Выявили основные проблемы в текущем интерфейсе: сложная навигация, неочевидные действия, отсутствие обратной связи. Разработали план улучшений на основе методологии Jobs-to-be-Done.',
      participants: ['Анна Морозова', 'Дмитрий Иванов', 'Елена Петрова']
    }
  ]
};

// Получаем иконку для категории
const getCategoryIcon = (category) => {
  switch(category) {
    case 'Разработка': return 'code';
    case 'Инфраструктура': return 'cloud';
    case 'Продукт': return 'insights';
    default: return 'article';
  }
};

function SummaryInput({ onSubmit, loading, setLoading, generateRfc, setGenerateRfc }) {
  const [selectedSummary, setSelectedSummary] = useState(null);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('Разработка');

  const handleSubmit = () => {
    if (!selectedSummary) {
      setError('Пожалуйста, выберите саммари из каталога');
      return;
    }
    
    setError('');
    
    const summaryData = {
      ...selectedSummary,
      useMockData: true
    };
    
    onSubmit(summaryData);
  };

  const handleSelectSummary = (summary) => {
    setSelectedSummary(summary);
    setError('');
  };

  return (
    <div className="crystal-bg">
      <Card className="crystal-card">
        <Card.Header>
          <div className="d-flex align-items-center">
            <span className="material-icons me-2" style={{ color: 'var(--primary-crystal)', fontSize: '24px' }}>
              summarize
            </span>
            <div>
              <Card.Title className="mb-0">Выберите саммари встречи</Card.Title>
              <Card.Subtitle className="mt-1">
                Выберите саммари из каталога для анализа
              </Card.Subtitle>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          {error && (
            <Alert variant="danger" className="mb-4 d-flex align-items-center">
              <span className="material-icons me-2">error</span>
              {error}
            </Alert>
          )}
          
          <Row className="mb-4">
            <Col md={8}>
              <div className="mb-3">
                <Tabs
                  activeKey={activeCategory}
                  onSelect={(k) => setActiveCategory(k)}
                  className="mb-3"
                >
                  {Object.keys(MOCK_SUMMARIES_BY_CATEGORY).map((category) => (
                    <Tab 
                      key={category} 
                      eventKey={category} 
                      title={
                        <span className="d-flex align-items-center">
                          <span className="material-icons me-1" style={{ fontSize: '18px' }}>
                            {getCategoryIcon(category)}
                          </span>
                          {category} <Badge className="ms-2 crystal-badge">{MOCK_SUMMARIES_BY_CATEGORY[category].length}</Badge>
                        </span>
                      }
                    >
                      <Row>
                        {MOCK_SUMMARIES_BY_CATEGORY[category].map((summary) => (
                          <Col md={6} key={summary.id} className="mb-3">
                            <Card 
                              className={`h-100 summary-card ${selectedSummary?.id === summary.id ? 'selected' : ''}`}
                              onClick={() => handleSelectSummary(summary)}
                              style={{ cursor: 'pointer' }}
                            >
                              <Card.Body>
                                <Card.Title>{summary.title}</Card.Title>
                                <Card.Text className="text-truncate">{summary.content}</Card.Text>
                                <div className="d-flex align-items-center">
                                  <span className="material-icons me-1" style={{ fontSize: '16px', color: 'var(--gray)' }}>
                                    people
                                  </span>
                                  <small className="text-muted">
                                    {summary.participants.join(', ')}
                                  </small>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Tab>
                  ))}
                </Tabs>
              </div>
            </Col>
            <Col md={4}>
              <Card className="h-100 preview-card">
                <Card.Header>
                  <div className="d-flex align-items-center">
                    <span className="material-icons me-2" style={{ color: 'var(--primary-crystal)', fontSize: '18px' }}>
                      visibility
                    </span>
                    <h5 className="mb-0">Предпросмотр</h5>
                  </div>
                </Card.Header>
                <Card.Body>
                  {selectedSummary ? (
                    <>
                      <h5>{selectedSummary.title}</h5>
                      <p>{selectedSummary.content}</p>
                      <div className="mt-3">
                        <h6 className="d-flex align-items-center">
                          <span className="material-icons me-1" style={{ fontSize: '18px', color: 'var(--gray)' }}>
                            people
                          </span>
                          Участники:
                        </h6>
                        <ul>
                          {selectedSummary.participants.map((participant, index) => (
                            <li key={index}>{participant}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-muted py-5">
                      <span className="material-icons" style={{ fontSize: '48px', color: 'var(--primary-crystal-light)' }}>
                        preview
                      </span>
                      <p className="mt-3">Выберите саммари для предпросмотра</p>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <Button 
            variant="primary" 
            size="lg"
            onClick={handleSubmit} 
            disabled={loading || !selectedSummary} 
            className="w-100 d-flex align-items-center justify-content-center"
          >
            {loading ? (
              <>
                <div className="crystal-spinner me-2" style={{ width: '20px', height: '20px' }}></div>
                Анализ...
              </>
            ) : (
              <>
                <span className="material-icons me-2">send</span>
                Отправить на анализ
              </>
            )}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SummaryInput; 