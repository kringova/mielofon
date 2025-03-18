import React, { useState } from 'react';
import { Card, Button, Form, Row, Col, Badge } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

function RfcGenerator({ content, onGenerateDocumentation }) {
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [saved, setSaved] = useState(false);
  const [issues, setIssues] = useState([]);

  const handleEdit = () => {
    setEditMode(true);
    setSaved(false);
  };

  const handleSave = () => {
    setEditMode(false);
    setSaved(true);
    
    // Анализ RFC на наличие проблем
    const newIssues = [];
    
    // Проверка на наличие секций
    const sections = ['Проблем', 'Решени', 'Техническ', 'План', 'Риск', 'Следующие шаги'];
    sections.forEach(section => {
      if (!editedContent.toLowerCase().includes(section.toLowerCase())) {
        newIssues.push({
          type: 'warning',
          message: `Отсутствует секция "${section}"`
        });
      }
    });
    
    // Проверка на длину RFC
    if (editedContent.length < 500) {
      newIssues.push({
        type: 'warning',
        message: 'RFC слишком короткий, рекомендуется добавить больше деталей'
      });
    }
    
    // Проверка на наличие списков
    if (!editedContent.includes('- ') && !editedContent.includes('1. ')) {
      newIssues.push({
        type: 'info',
        message: 'Рекомендуется использовать списки для лучшей структуризации'
      });
    }
    
    setIssues(newIssues);
    
    // Имитация сохранения на сервере
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
  };

  // Определяем тип RFC для стилизации
  const getRfcType = () => {
    const contentLower = content.toLowerCase();
    if (contentLower.includes('архитектур')) return 'architecture';
    if (contentLower.includes('исследован') || contentLower.includes('research')) return 'research';
    return 'feature';
  };
  
  const rfcType = getRfcType();
  
  // Определяем цвет и иконку для типа RFC
  const rfcTypeInfo = {
    'feature': { color: '#0d6efd', icon: 'add_circle', label: 'Новая функциональность' },
    'architecture': { color: '#6f42c1', icon: 'architecture', label: 'Архитектура' },
    'research': { color: '#fd7e14', icon: 'science', label: 'Исследование' }
  }[rfcType];

  return (
    <Card className="mb-4 rfc-card">
      <Card.Header className="d-flex justify-content-between align-items-center" style={{ backgroundColor: `${rfcTypeInfo.color}20` }}>
        <div className="d-flex align-items-center">
          <span className="material-icons me-2" style={{ color: rfcTypeInfo.color }}>
            {rfcTypeInfo.icon}
          </span>
          <h5 className="mb-0">RFC</h5>
          <Badge 
            pill 
            className="ms-2" 
            style={{ backgroundColor: rfcTypeInfo.color }}
          >
            {rfcTypeInfo.label}
          </Badge>
        </div>
        <div>
          {editMode ? (
            <Button 
              variant="success" 
              size="sm" 
              onClick={handleSave}
              className="d-flex align-items-center"
            >
              <span className="material-icons me-1">save</span>
              Сохранить
            </Button>
          ) : (
            <Button 
              variant="outline-primary" 
              size="sm" 
              onClick={handleEdit}
              className="d-flex align-items-center"
            >
              <span className="material-icons me-1">edit</span>
              Редактировать
            </Button>
          )}
        </div>
      </Card.Header>
      <Card.Body>
        {editMode ? (
          <Form.Control
            as="textarea"
            value={editedContent}
            onChange={handleContentChange}
            style={{ height: '500px', fontFamily: 'monospace' }}
            className="mb-3"
          />
        ) : (
          <div className="rfc-content">
            <ReactMarkdown>{editedContent}</ReactMarkdown>
          </div>
        )}
        
        {saved && (
          <div className="alert alert-success mt-3 d-flex align-items-center">
            <span className="material-icons me-2">check_circle</span>
            RFC успешно сохранен
          </div>
        )}
        
        {issues.length > 0 && !editMode && (
          <div className="mt-3">
            <h6>Рекомендации по улучшению:</h6>
            {issues.map((issue, index) => (
              <div 
                key={index} 
                className={`alert alert-${issue.type === 'warning' ? 'warning' : 'info'} d-flex align-items-center py-2 px-3 mb-2`}
              >
                <span className="material-icons me-2" style={{ fontSize: '18px' }}>
                  {issue.type === 'warning' ? 'warning' : 'info'}
                </span>
                <small>{issue.message}</small>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-4 text-center">
          <Button 
            variant="dark" 
            size="lg" 
            onClick={onGenerateDocumentation}
            className="px-4 py-3"
          >
            <div className="d-flex align-items-center">
              <span className="material-icons me-2">article</span>
              <span>Перейти к генерации документации</span>
            </div>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default RfcGenerator; 