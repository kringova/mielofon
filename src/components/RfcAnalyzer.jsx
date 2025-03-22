import React, { useState } from 'react';
import { Row, Col, Card, Button, ProgressBar, Badge } from 'react-bootstrap';

const RfcAnalyzer = ({ rfc, analysis, onReset }) => {
  const [improvedContent, setImprovedContent] = useState(rfc.content);
  const [score, setScore] = useState(analysis.score);
  const [issues, setIssues] = useState(analysis.issues);

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
        try {
          const regex = new RegExp(escapeRegExp(issue.text), 'g');
          const className = 
            issue.type === 'critical' ? 'highlight danger' : 
            issue.type === 'warning' ? 'highlight warning' : 
            'highlight info';
          
          htmlContent = htmlContent.replace(regex, `<span class="${className}">$&</span>`);
        } catch (err) {
          console.error(`Error highlighting issue: ${err.message}`);
        }
      }
    });
    
    return htmlContent;
  };

  // Вспомогательная функция для экранирования спецсимволов в регулярных выражениях
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

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
              {issues.map((issue, index) => (
                <Card key={index} className="mb-2 issue-card">
                  <Card.Body className="p-2">
                    <div className="d-flex align-items-start">
                      <span className={`material-icons me-2 text-${
                        issue.type === 'critical' ? 'danger' : 
                        issue.type === 'warning' ? 'warning' : 
                        'info'
                      }`}>
                        {issue.type === 'critical' ? 'error' : 
                         issue.type === 'warning' ? 'warning' : 
                         'info'}
                      </span>
                      <div className="flex-grow-1">
                        <p className="mb-1"><strong>{issue.text}</strong></p>
                        {issue.description && (
                          <p className="text-muted small mb-0">{issue.description}</p>
                        )}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
              
              {issues.length === 0 && (
                <div className="text-center py-3">
                  <span className="material-icons text-success mb-2" style={{ fontSize: '48px' }}>check_circle</span>
                  <p>Проблем не обнаружено!</p>
                </div>
              )}
              
              {analysis.recommendations && (
                <div className="mt-4">
                  <h6>Рекомендации</h6>
                  <ul className="ps-3">
                    {analysis.recommendations.map((recommendation, index) => (
                      <li key={index} className="mb-2">{recommendation}</li>
                    ))}
                  </ul>
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