import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Badge, Button, ProgressBar, Tab, Nav } from 'react-bootstrap';
import { meetings } from '../data/meetings';
import { tickets } from '../data/tickets';
import { wiki } from '../data/wiki';
import { similarityService } from '../utils/similarityService';

const SimilarItems = ({ selectedSummary, onGenerateRfc }) => {
  const [similarMeetings, setSimilarMeetings] = useState([]);
  const [relatedTickets, setRelatedTickets] = useState([]);
  const [relatedWiki, setRelatedWiki] = useState([]);
  const [relevantPeople, setRelevantPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('meetings');

  useEffect(() => {
    // Имитация запроса к сервису для нахождения похожих материалов
    if (selectedSummary) {
      setIsLoading(true);
      
      // Имитация асинхронного запроса
      setTimeout(() => {
        // Находим похожие встречи (исключая выбранную)
        const meetingsResult = similarityService.findSimilarMeetings(
          selectedSummary.id, 
          meetings
        );
        setSimilarMeetings(meetingsResult);
        
        // Находим связанные тикеты
        const ticketsResult = similarityService.findRelatedTickets(
          selectedSummary.id, 
          tickets
        );
        setRelatedTickets(ticketsResult);
        
        // Находим связанные вики-страницы
        const wikiResult = similarityService.findRelatedWiki(
          selectedSummary.id, 
          wiki
        );
        setRelatedWiki(wikiResult);
        
        // Находим людей, которые могут помочь
        const peopleResult = similarityService.findRelevantPeople(
          selectedSummary, 
          [...meetingsResult, ...ticketsResult, ...wikiResult]
        );
        setRelevantPeople(peopleResult);
        
        setIsLoading(false);
      }, 1000);
    }
  }, [selectedSummary]);

  const handleGenerateRfc = () => {
    // Проверки на наличие данных
    if (!selectedSummary) {
      console.error("Ошибка: отсутствует выбранное саммари");
      return;
    }
    
    // Создаем RFC на основе выбранного саммари и связанных материалов
    const rfc = {
      title: `RFC: ${selectedSummary.summary.title}`,
      author: "Текущий пользователь",
      date: new Date().toISOString(),
      content: `# ${selectedSummary.summary.title}

## 1. Введение
${selectedSummary.summary.content}

## 2. Обоснование
На основании проведённой встречи и анализа существующих материалов, предлагается реализовать описанные выше решения для повышения эффективности работы команды и продукта.

## 3. Предлагаемые решения
${selectedSummary.summary.decisions.map(decision => `- ${decision}`).join('\n')}

## 4. Технические детали
${relatedTickets.length > 0 ? 
  `В процессе реализации необходимо учесть следующие задачи:
${relatedTickets.map(ticket => `- ${ticket.title} (${ticket.status})`).join('\n')}` 
  : 'Технические детали будут проработаны в процессе реализации.'}

## 5. Метрики успеха
*Данный раздел не заполнен*

## 6. Риски и план отката
*Данный раздел не заполнен*

## 7. Ссылки на дополнительные материалы
${relatedWiki.length > 0 ? 
  relatedWiki.map(w => `- [${w.title}](${w.url})`).join('\n') 
  : 'Дополнительные материалы отсутствуют.'}
`
    };
    
    // Вызываем обработчик с готовым RFC
    onGenerateRfc(rfc);
  };
  
  // Функция для генерации документации (отдельная от RFC)
  const handleGenerateDocumentation = () => {
    if (!selectedSummary) {
      console.error("Ошибка: отсутствует выбранное саммари");
      return;
    }
    
    // Создаем документацию на основе выбранного саммари и связанных материалов
    const documentation = {
      title: `Документация: ${selectedSummary.summary.title}`,
      author: "Текущий пользователь",
      date: new Date().toISOString(),
      type: "documentation", // Добавляем тип для обработки в App.jsx
      content: `# Документация: ${selectedSummary.summary.title}

## Общая информация
**Тип встречи**: ${selectedSummary.type === 'technical' ? 'Техническая' : 
                   selectedSummary.type === 'product' ? 'Продуктовая' : 'Организационная'}
**Дата**: ${new Date(selectedSummary.date).toLocaleDateString()}
**Участники**: ${selectedSummary.participants.map(p => p.name).join(', ')}

## Содержание саммари
${selectedSummary.summary.content}

## Принятые решения
${selectedSummary.summary.decisions.map(decision => `- ${decision}`).join('\n')}

## Связанные материалы

### Тикеты
${relatedTickets.length > 0 ? 
  relatedTickets.map(ticket => `- **${ticket.title}** (${ticket.status}, ${ticket.priority}): ${ticket.description.substring(0, 100)}...`).join('\n') 
  : 'Связанные тикеты отсутствуют.'}

### Вики-страницы
${relatedWiki.length > 0 ? 
  relatedWiki.map(w => `- [${w.title}](${w.url}): ${w.summary.substring(0, 100)}...`).join('\n') 
  : 'Связанные вики-страницы отсутствуют.'}

## Люди для консультации
${relevantPeople.length > 0 ?
  relevantPeople.map(person => `- **${person.name}** (${person.role})`).join('\n')
  : 'Рекомендации по консультациям отсутствуют.'}
`
    };
    
    // Вызываем тот же обработчик, но с объектом документации
    onGenerateRfc(documentation);
  };

  // Отображение состояния загрузки
  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="mielofon-loader"></div>
        <p className="mt-3 text-muted">Анализируем похожие материалы...</p>
      </div>
    );
  }

  return (
    <div>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title className="d-flex align-items-center">
                <span className="material-icons text-primary me-2">fact_check</span>
                Выбранная встреча
              </Card.Title>
              <h5 className="mt-3">{selectedSummary.title}</h5>
              <p className="text-muted">{selectedSummary.summary.title}</p>
              <div className="mt-3">
                <Badge bg="primary" className="me-2">
                  {selectedSummary.type === 'technical' ? 'Техническая' : 
                   selectedSummary.type === 'product' ? 'Продуктовая' : 'Организационная'}
                </Badge>
                <Badge bg="secondary">
                  {selectedSummary.participants.length} участников
                </Badge>
              </div>
            </Card.Body>
          </Card>
          
          {/* Добавляем блок с кнопками, в которой обе кнопки */}
          <div className="d-grid gap-2 mb-4">
            <Button 
              variant="primary"
              size="lg"
              onClick={handleGenerateRfc}
              className="d-flex align-items-center justify-content-center mb-2"
            >
              <span className="material-icons me-2">description</span>
              Создать RFC
            </Button>
            
            <Button 
              variant="success"
              size="lg"
              onClick={handleGenerateDocumentation}
              className="d-flex align-items-center justify-content-center"
            >
              <span className="material-icons me-2">auto_stories</span>
              Создать документацию
            </Button>
          </div>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title className="d-flex align-items-center">
                <span className="material-icons text-primary me-2">group</span>
                Люди с опытом
              </Card.Title>
              {relevantPeople.map((person, index) => (
                <div key={index} className="d-flex align-items-center mt-3">
                  <div className="bg-light rounded-circle p-2 me-3">
                    <span className="material-icons">person</span>
                  </div>
                  <div>
                    <div className="fw-bold">{person.name}</div>
                    <div className="text-muted small">{person.role}</div>
                  </div>
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    className="ms-auto"
                  >
                    <span className="material-icons" style={{ fontSize: '1rem' }}>mail</span>
                  </Button>
                </div>
              ))}
            </Card.Body>
          </Card>
          
          {/* Удаляем старую кнопку */}
        </Col>

        <Col md={8}>
          <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
            <Nav variant="tabs" className="mb-3">
              <Nav.Item>
                <Nav.Link eventKey="meetings">
                  Похожие встречи <Badge bg="secondary">{similarMeetings.length}</Badge>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tickets">
                  Связанные задачи <Badge bg="secondary">{relatedTickets.length}</Badge>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="wiki">
                  Документация <Badge bg="secondary">{relatedWiki.length}</Badge>
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              <Tab.Pane eventKey="meetings">
                {similarMeetings.map((meeting) => (
                  <Card key={meeting.id} className="similar-card mb-3">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <Card.Title>{meeting.title}</Card.Title>
                          <p className="text-muted">
                            {meeting.summary.content.substring(0, 150)}...
                          </p>
                        </div>
                        <Badge bg="info" className="ms-2">
                          {Math.round(meeting.similarity * 100)}% схожесть
                        </Badge>
                      </div>
                      
                      <div className="similarity-bar mt-2">
                        <div 
                          className="similarity-fill" 
                          style={{ width: `${meeting.similarity * 100}%` }}
                        ></div>
                      </div>
                      
                      <div className="d-flex mt-3">
                        <small className="text-muted me-3">
                          <span className="material-icons me-1" style={{ fontSize: '1rem', verticalAlign: 'middle' }}>
                            person
                          </span>
                          {meeting.participants.length} участников
                        </small>
                        <small className="text-muted">
                          <span className="material-icons me-1" style={{ fontSize: '1rem', verticalAlign: 'middle' }}>
                            check_circle
                          </span>
                          {meeting.summary.decisions.length} решений
                        </small>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
                {similarMeetings.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-muted">Похожих встреч не найдено</p>
                  </div>
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="tickets">
                {relatedTickets.map((ticket) => (
                  <Card key={ticket.id} className="similar-card mb-3">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <Card.Title>{ticket.title}</Card.Title>
                          <div className="mb-2">
                            <Badge 
                              bg={ticket.status === 'open' ? 'secondary' : 
                                  ticket.status === 'in-progress' ? 'primary' : 
                                  ticket.status === 'resolved' ? 'success' : 'info'}
                              className="me-2"
                            >
                              {ticket.status}
                            </Badge>
                            <Badge 
                              bg={ticket.priority === 'high' ? 'danger' : 
                                  ticket.priority === 'medium' ? 'warning' : 'info'}
                            >
                              {ticket.priority}
                            </Badge>
                          </div>
                          <p className="text-muted">
                            {ticket.description.substring(0, 150)}...
                          </p>
                        </div>
                        <Badge bg="info" className="ms-2">
                          {Math.round(ticket.relevance * 100)}% релевантность
                        </Badge>
                      </div>
                      
                      <div className="similarity-bar mt-2">
                        <div 
                          className="similarity-fill" 
                          style={{ width: `${ticket.relevance * 100}%` }}
                        ></div>
                      </div>
                      
                      <div className="d-flex mt-3 align-items-center">
                        <small className="text-muted">
                          <span className="material-icons me-1" style={{ fontSize: '1rem', verticalAlign: 'middle' }}>
                            person
                          </span>
                          {ticket.assignee.name}
                        </small>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
                {relatedTickets.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-muted">Связанных задач не найдено</p>
                  </div>
                )}
              </Tab.Pane>

              <Tab.Pane eventKey="wiki">
                {relatedWiki.map((wiki) => (
                  <Card key={wiki.id} className="similar-card mb-3">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <Card.Title>{wiki.title}</Card.Title>
                          <p className="text-muted">
                            {wiki.summary.substring(0, 150)}...
                          </p>
                        </div>
                        <Badge bg="info" className="ms-2">
                          {Math.round(wiki.relevance * 100)}% релевантность
                        </Badge>
                      </div>
                      
                      <div className="similarity-bar mt-2">
                        <div 
                          className="similarity-fill" 
                          style={{ width: `${wiki.relevance * 100}%` }}
                        ></div>
                      </div>
                      
                      <div className="d-flex mt-3 justify-content-between">
                        <small className="text-muted">
                          <span className="material-icons me-1" style={{ fontSize: '1rem', verticalAlign: 'middle' }}>
                            update
                          </span>
                          Обновлено: {new Date(wiki.updated).toLocaleDateString()}
                        </small>
                        <a href="#" className="text-decoration-none">
                          <small className="d-flex align-items-center">
                            Открыть
                            <span className="material-icons ms-1" style={{ fontSize: '1rem' }}>
                              open_in_new
                            </span>
                          </small>
                        </a>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
                {relatedWiki.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-muted">Связанной документации не найдено</p>
                  </div>
                )}
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </div>
  );
};

export default SimilarItems; 