import React, { useState } from 'react';
import { Row, Col, Card, Button, ProgressBar, Badge } from 'react-bootstrap';

const RfcAnalyzer = ({ rfc, analysis, onReset }) => {
  const [improvedContent, setImprovedContent] = useState(rfc.content);
  const [score, setScore] = useState(analysis.score);
  const [issues, setIssues] = useState(analysis.issues);
  const [fixedIssues, setFixedIssues] = useState([]);

  const handleFixIssue = (issue) => {
    // Имитация исправления проблемы
    const updatedIssues = issues.filter(i => i.id !== issue.id);
    setIssues(updatedIssues);
    setFixedIssues([...fixedIssues, issue]);
    setScore(score + (issue.severity === 'high' ? 10 : issue.severity === 'medium' ? 5 : 2));
  };

  // Функция для выделения проблемных мест в тексте
  const getHighlightedContent = () => {
    // Преобразуем Markdown к HTML с сохранением форматирования
    let htmlContent = improvedContent
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/\n- (.*)/gim, '<ul><li>$1</li></ul>')
      .replace(/<\/ul><ul>/gim, '')
      .replace(/\n/gim, '<br>');

    // Выделяем проблемные места
    issues.forEach(issue => {
      if (issue && issue.text) {
        const regex = new RegExp(issue.text, 'g');
        const className = 
          issue.severity === 'high' ? 'highlight danger' : 
          issue.severity === 'medium' ? 'highlight warning' : 
          'highlight info';
        
        htmlContent = htmlContent.replace(regex, `<span class="${className}">$&</span>`);
      }
    });
    
    return htmlContent;
  };

  return (
    <div>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Анализ RFC</h5>
              <div>
                <Badge bg={
                  score < 40 ? 'danger' : 
                  score < 70 ? 'warning' : 
                  'success'
                }>
                  Качество: {score}/100
                </Badge>
              </div>
            </Card.Header>
            <Card.Body>
              <ProgressBar 
                now={score} 
                variant={
                  score < 40 ? 'danger' : 
                  score < 70 ? 'warning' : 
                  'success'
                }
                className="mb-4"
              />
              
              <h6>Обнаруженные проблемы ({issues.length})</h6>
              {issues.map((issue) => (
                <Card key={issue.id} className="mb-2 issue-card">
                  <Card.Body className="p-2">
                    <div className="d-flex align-items-start">
                      <span className={`material-icons me-2 text-${
                        issue.severity === 'high' ? 'danger' : 
                        issue.severity === 'medium' ? 'warning' : 
                        'info'
                      }`}>
                        {issue.severity === 'high' ? 'error' : 
                         issue.severity === 'medium' ? 'warning' : 
                         'info'}
                      </span>
                      <div className="flex-grow-1">
                        <p className="mb-1"><strong>{issue.title}</strong></p>
                        <p className="text-muted small mb-2">{issue.description}</p>
                        <Button 
                          size="sm" 
                          variant="outline-primary"
                          onClick={() => handleFixIssue(issue)}
                        >
                          Исправить
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
              
              {issues.length === 0 && (
                <div className="text-center py-3">
                  <span className="material-icons text-success mb-2" style={{ fontSize: '48px' }}>check_circle</span>
                  <p>Все проблемы устранены!</p>
                </div>
              )}
              
              {fixedIssues.length > 0 && (
                <div className="mt-4">
                  <h6>Исправленные проблемы ({fixedIssues.length})</h6>
                  {fixedIssues.map((issue) => (
                    <div key={issue.id} className="d-flex align-items-center mb-2">
                      <span className="material-icons text-success me-2">check_circle</span>
                      <span className="text-muted">{issue.title}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="d-grid gap-2 mt-4">
                <Button 
                  variant="outline-secondary"
                  onClick={onReset}
                >
                  Вернуться
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={8}>
          <Card className="rfc-card">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">{rfc.title}</h5>
            </Card.Header>
            <Card.Body>
              <div className="rfc-content markdown-body" dangerouslySetInnerHTML={{ __html: getHighlightedContent() }}></div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RfcAnalyzer; 