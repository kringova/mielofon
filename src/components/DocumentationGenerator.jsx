import React, { useState } from 'react';
import { Row, Col, Card, Button, Form, Tab, Nav } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

const DocumentationGenerator = ({ rfc, onAnalyzeRfc }) => {
  const [selectedAudience, setSelectedAudience] = useState('technical');
  const [showFullContent, setShowFullContent] = useState(false);
  
  // Генерация контента в зависимости от выбранной аудитории
  const getAudienceContent = () => {
    switch (selectedAudience) {
      case 'technical':
        return rfc.content;
      case 'management':
        return `# Резюме по ${rfc.title.replace('RFC: ', '')}

## Краткий обзор
${rfc.content.split('\n\n')[1]}

## Ключевые решения
${rfc.content.includes('## 3. Предлагаемые решения') ? 
  rfc.content.split('## 3. Предлагаемые решения')[1].split('##')[0] :
  'Информация о ключевых решениях отсутствует.'}

## Ожидаемый результат
Внедрение предложенных решений позволит повысить эффективность работы команды и улучшить качество продукта.

## Требуемые ресурсы
Для реализации потребуется работа команды разработки в течение следующего спринта.`;
      case 'team':
        return `# План реализации ${rfc.title.replace('RFC: ', '')}

## Что нам нужно сделать
${rfc.content.includes('## 3. Предлагаемые решения') ? 
  rfc.content.split('## 3. Предлагаемые решения')[1].split('##')[0] :
  'Список конкретных решений отсутствует.'}

## Задачи
${rfc.content.includes('## 4. Технические детали') ? 
  rfc.content.split('## 4. Технические детали')[1].split('##')[0] :
  'Список задач отсутствует.'}

## Кто над чем работает
- Задача 1: [Ответственный не назначен]
- Задача 2: [Ответственный не назначен]
- Задача 3: [Ответственный не назначен]

## Сроки реализации
Sprint 24 (2 недели)`;
      default:
        return rfc.content;
    }
  };

  // Обновляем обработчик для кнопки "Анализировать RFC"
  const handleAnalyzeClick = () => {
    // Проверяем, что функция onAnalyzeRfc передана как свойство
    if (typeof onAnalyzeRfc === 'function') {
      // Вызываем переданный обработчик
      onAnalyzeRfc();
      
      // Для отладки можно добавить лог
      console.log("Анализ RFC запущен");
    } else {
      console.error("Ошибка: функция onAnalyzeRfc не определена");
    }
  };

  return (
    <div>
      <Row>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title className="d-flex align-items-center">
                <span className="material-icons text-primary me-2">people</span>
                Целевая аудитория
              </Card.Title>
              <div className="mt-3">
                <Form.Check
                  type="radio"
                  label="Техническая команда"
                  name="audience"
                  id="audience-technical"
                  checked={selectedAudience === 'technical'}
                  onChange={() => setSelectedAudience('technical')}
                  className="mb-2"
                />
                <Form.Check
                  type="radio"
                  label="Менеджмент"
                  name="audience"
                  id="audience-management"
                  checked={selectedAudience === 'management'}
                  onChange={() => setSelectedAudience('management')}
                  className="mb-2"
                />
                <Form.Check
                  type="radio"
                  label="Команда разработки"
                  name="audience"
                  id="audience-team"
                  checked={selectedAudience === 'team'}
                  onChange={() => setSelectedAudience('team')}
                  className="mb-2"
                />
              </div>
            </Card.Body>
          </Card>

          <div className="d-grid gap-2">
            <Button 
              variant="primary"
              size="lg"
              onClick={handleAnalyzeClick}
              className="d-flex align-items-center justify-content-center"
            >
              <span className="material-icons me-2">analytics</span>
              Анализировать RFC
            </Button>
            <Form.Check
              type="switch"
              id="show-full-content"
              label="Показать полное содержание"
              checked={showFullContent}
              onChange={() => setShowFullContent(!showFullContent)}
              className="mt-3"
            />
          </div>
        </Col>

        <Col md={9}>
          <Card className="rfc-card">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-0">{rfc.title}</h5>
                <small className="text-muted">
                  Автор: {rfc.author} | Дата: {new Date(rfc.date).toLocaleDateString()}
                </small>
              </div>
              <Button variant="outline-primary" size="sm">
                <span className="material-icons me-1" style={{ fontSize: '1rem' }}>download</span>
                Скачать
              </Button>
            </Card.Header>
            <Card.Body>
              <div className="rfc-content">
                <ReactMarkdown>
                  {showFullContent ? rfc.content : getAudienceContent()}
                </ReactMarkdown>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DocumentationGenerator; 