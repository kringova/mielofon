import React, { useState } from 'react';
import { Row, Col, Card, Button, ProgressBar, Badge } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

const RfcAnalyzer = ({ rfc, analysis, onReset }) => {
  const [improvedContent, setImprovedContent] = useState(rfc.content);
  const [score, setScore] = useState(analysis.score);
  const [issues, setIssues] = useState(analysis.issues);
  const [fixedIssues, setFixedIssues] = useState([]);

  // Определение цвета прогресс-бара на основе оценки
  const getProgressVariant = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'info';
    if (score >= 40) return 'warning';
    return 'danger';
  };

  // Исправление проблемы в RFC
  const handleFixIssue = (issue) => {
    let newContent = improvedContent;
    let fixedScore = score;
    
    // Заготовленные исправления для демонстрации
    if (issue.type === 'critical' && issue.text.includes('миграции данных')) {
      newContent = newContent.replace(
        '## 4. Технические детали',
        `## 4. Технические детали

### 4.1 Стратегия миграции данных
Для безопасной миграции данных предлагается использовать подход "Blue-Green Deployment":
1. Создание новой схемы данных без нарушения текущей
2. Использование инструментов ETL для переноса данных
3. Тестирование на копии боевых данных
4. Внедрение механизма отката в случае проблем
5. Постепенный переход на новую схему с возможностью мгновенного отката`
      );
      fixedScore += 8;
    } else if (issue.type === 'warning' && issue.text.includes('метрики')) {
      newContent = newContent.replace(
        '## 5. Метрики успеха\n*Данный раздел не заполнен*',
        `## 5. Метрики успеха
1. Сокращение времени отклика API на 30%
2. Увеличение отказоустойчивости системы до 99.95%
3. Сокращение времени развертывания на 50%
4. Снижение нагрузки на базу данных на 40%
5. Улучшение масштабируемости системы (способность обрабатывать в 2 раза больше запросов)`
      );
      fixedScore += 5;
    } else if (issue.type === 'warning' && issue.text.includes('ответственные')) {
      newContent = newContent.replace(
        '## 3. Предлагаемые решения',
        `## 3. Предлагаемые решения и ответственные

| Решение | Ответственный | Роль |
|---------|---------------|------|
| Выделение сервиса авторизации | Мария Иванова | Senior Backend Developer |
| Настройка GraphQL для фасада к микросервисам | Алексей Петров | Tech Lead |
| Внедрение постепенной миграции | Екатерина Смирнова | Architect |`
      );
      fixedScore += 5;
    } else if (issue.type === 'critical' && issue.text.includes('рисков')) {
      newContent = newContent.replace(
        '## 6. Риски и план отката\n*Данный раздел не заполнен*',
        `## 6. Риски и план отката

### 6.1 Потенциальные риски
1. Нарушение работы существующих интеграций при миграции
2. Временное снижение производительности во время миграции
3. Несовместимость с существующими клиентами API
4. Увеличение нагрузки на DevOps команду

### 6.2 План отката
1. Сохранение полной копии текущей архитектуры перед миграцией
2. Создание скриптов автоматического отката
3. Определение критериев принятия решения об откате
4. Тестирование процедуры отката перед внедрением`
      );
      fixedScore += 10;
    }
    
    // Обновляем состояние
    setImprovedContent(newContent);
    setScore(Math.min(fixedScore, 100));
    setFixedIssues([...fixedIssues, issue]);
    setIssues(issues.filter(i => i !== issue));
  };

  // Форматирование содержимого RFC с выделением проблемных мест
  const getHighlightedContent = () => {
    let content = improvedContent;
    
    // Заменяем проблемные места на <span> с подсветкой
    issues.forEach(issue => {
      if (issue.location === 'section-4' && issue.type === 'critical') {
        content = content.replace(
          /## 4\. Технические детали([\s\S]*?)(?=##|$)/,
          `## 4. Технические детали<span class="highlight ${issue.type}" title="${issue.text}">$1</span>`
        );
      } else if (issue.location === 'section-5' && issue.text.includes('метрики')) {
        content = content.replace(
          /## 5\. Метрики успеха\n\*Данный раздел не заполнен\*/,
          `## 5. Метрики успеха\n<span class="highlight ${issue.type}" title="${issue.text}">*Данный раздел не заполнен*</span>`
        );
      } else if (issue.location === 'section-3' && issue.text.includes('ответственные')) {
        content = content.replace(
          /## 3\. Предлагаемые решения([\s\S]*?)(?=##|$)/,
          `## 3. Предлагаемые решения<span class="highlight ${issue.type}" title="${issue.text}">$1</span>`
        );
      } else if (issue.location === 'section-6' && issue.text.includes('рисков')) {
        content = content.replace(
          /## 6\. Риски и план отката\n\*Данный раздел не заполнен\*/,
          `## 6. Риски и план отката\n<span class="highlight ${issue.type}" title="${issue.text}">*Данный раздел не заполнен*</span>`
        );
      }
    });
    
    return content;
  };

  return (
    <div>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title className="d-flex align-items-center">
                <span className="material-icons text-primary me-2">analytics</span>
                Оценка качества RFC
              </Card.Title>
              <div className="mt-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Общий рейтинг:</span>
                  <span className={`fw-bold text-${getProgressVariant(score)}`}>{score}/100</span>
                </div>
                <ProgressBar 
                  now={score} 
                  variant={getProgressVariant(score)} 
                  className="mb-3"
                />
                <div className="d-flex justify-content-between small text-muted">
                  <span>Требует доработки</span>
                  <span>Отлично</span>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title className="d-flex align-items-center mb-3">
                <span className="material-icons text-primary me-2">report_problem</span>
                Найденные проблемы
              </Card.Title>
              
              {issues.length > 0 ? (
                <div className="issues-list">
                  {issues.map((issue, index) => (
                    <div key={index} className={`issue-item ${issue.type}`}>
                      <span className="material-icons me-2">
                        {issue.type === 'critical' ? 'error' : 
                         issue.type === 'warning' ? 'warning' : 'info'}
                      </span>
                      <div className="flex-grow-1">
                        <div>{issue.text}</div>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="p-0 mt-1" 
                          onClick={() => handleFixIssue(issue)}
                        >
                          Исправить автоматически
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-3">
                  <span className="material-icons text-success" style={{ fontSize: '3rem' }}>
                    check_circle
                  </span>
                  <p className="mt-2">Все проблемы исправлены!</p>
                </div>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title className="d-flex align-items-center mb-3">
                <span className="material-icons text-primary me-2">lightbulb</span>
                Рекомендации
              </Card.Title>
              <ul className="ps-3">
                {analysis.recommendations.map((rec, index) => (
                  <li key={index} className="mb-2">{rec}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>

          <div className="d-grid gap-2">
            <Button 
              variant="primary"
              onClick={onReset}
              className="d-flex align-items-center justify-content-center"
            >
              <span className="material-icons me-2">restart_alt</span>
              Начать заново
            </Button>
          </div>
        </Col>

        <Col md={8}>
          <Card className="rfc-card">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-0">{rfc.title}</h5>
                <small className="text-muted">
                  Автор: {rfc.author} | Дата: {new Date(rfc.date).toLocaleDateString()}
                </small>
              </div>
              <div>
                <Badge 
                  bg={getProgressVariant(score)} 
                  className="me-2"
                >
                  Рейтинг: {score}/100
                </Badge>
                <Button variant="outline-primary" size="sm">
                  <span className="material-icons me-1" style={{ fontSize: '1rem' }}>download</span>
                  Скачать
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="rfc-content" dangerouslySetInnerHTML={{ __html: getHighlightedContent() }}></div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RfcAnalyzer; 