import React, { useState } from 'react';
import { Button, Form, Spinner, Card, Row, Col } from 'react-bootstrap';

function DocumentationGenerator({ content, onGenerate, loading, suggestedAudiences }) {
  const [selectedAudiences, setSelectedAudiences] = useState({
    developers: true,
    administrators: true,
    users: true
  });
  const [selectedFormat, setSelectedFormat] = useState('markdown');
  const [activeAudience, setActiveAudience] = useState('dev');

  // Обработчики событий
  const handleAudienceChange = (audience) => {
    setSelectedAudiences({
      ...selectedAudiences,
      [audience]: !selectedAudiences[audience]
    });
  };

  const handleFormatChange = (e) => {
    setSelectedFormat(e.target.value);
  };

  const handleGenerate = () => {
    onGenerate(selectedAudiences);
  };

  const handleAudienceSelect = (audience) => {
    setActiveAudience(audience);
  };

  // Простая функция для форматирования документации
  const formatDocumentation = (doc) => {
    if (selectedFormat === 'html') {
      return doc.replace(/\n/g, '<br>');
    }
    return doc;
  };

  // Расчет статистики
  const calculateStatistics = (text) => {
    if (!text) return { words: 0, chars: 0, readingTime: 0 };
    
    const words = text.split(/\s+/).length;
    const chars = text.length;
    const readingTime = Math.ceil(words / 200); // 200 слов в минуту
    
    return { words, chars, readingTime };
  };

  return (
    <div className="documentation-generator">
      {!content ? (
        <div>
          <h3>Генерация документации</h3>
          <p>Выберите целевую аудиторию для документации:</p>
          
          <Form>
            <Form.Group className="mb-3">
              <Form.Check 
                type="checkbox" 
                id="developers"
                label="Разработчики" 
                checked={selectedAudiences.developers}
                onChange={() => handleAudienceChange('developers')}
              />
              <Form.Text className="text-muted">
                Техническая документация для разработчиков, включая API, архитектуру и примеры кода.
              </Form.Text>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Check 
                type="checkbox" 
                id="administrators"
                label="Администраторы" 
                checked={selectedAudiences.administrators}
                onChange={() => handleAudienceChange('administrators')}
              />
              <Form.Text className="text-muted">
                Руководство по установке, настройке и обслуживанию системы.
              </Form.Text>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Check 
                type="checkbox" 
                id="users"
                label="Пользователи" 
                checked={selectedAudiences.users}
                onChange={() => handleAudienceChange('users')}
              />
              <Form.Text className="text-muted">
                Руководство пользователя с описанием основных функций и инструкций.
              </Form.Text>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Формат документации</Form.Label>
              <Form.Select value={selectedFormat} onChange={handleFormatChange}>
                <option value="markdown">Markdown</option>
                <option value="html">HTML</option>
              </Form.Select>
            </Form.Group>
            
            <Button 
              variant="primary" 
              onClick={handleGenerate}
              disabled={loading || (!selectedAudiences.developers && !selectedAudiences.administrators && !selectedAudiences.users)}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="ms-2">Генерация...</span>
                </>
              ) : 'Сгенерировать документацию'}
            </Button>
          </Form>
        </div>
      ) : (
        <div>
          <h3>Сгенерированная документация</h3>
          
          <div className="audience-tabs mb-4">
            <Row>
              {content.dev && (
                <Col>
                  <Button 
                    variant={activeAudience === 'dev' ? 'primary' : 'outline-primary'} 
                    onClick={() => handleAudienceSelect('dev')}
                    className="w-100"
                  >
                    Разработчики
                  </Button>
                </Col>
              )}
              {content.admin && (
                <Col>
                  <Button 
                    variant={activeAudience === 'admin' ? 'primary' : 'outline-primary'} 
                    onClick={() => handleAudienceSelect('admin')}
                    className="w-100"
                  >
                    Администраторы
                  </Button>
                </Col>
              )}
              {content.user && (
                <Col>
                  <Button 
                    variant={activeAudience === 'user' ? 'primary' : 'outline-primary'} 
                    onClick={() => handleAudienceSelect('user')}
                    className="w-100"
                  >
                    Пользователи
                  </Button>
                </Col>
              )}
            </Row>
          </div>
          
          {activeAudience && content[activeAudience] && (
            <div>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Статистика документации</Card.Title>
                  <Row>
                    <Col>
                      <Card.Text>Количество слов: {calculateStatistics(content[activeAudience]).words}</Card.Text>
                    </Col>
                    <Col>
                      <Card.Text>Количество символов: {calculateStatistics(content[activeAudience]).chars}</Card.Text>
                    </Col>
                    <Col>
                      <Card.Text>Время чтения: {calculateStatistics(content[activeAudience]).readingTime} мин.</Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              
              <div className="documentation-content p-3 border rounded">
                {selectedFormat === 'markdown' ? (
                  <pre style={{ whiteSpace: 'pre-wrap' }}>{content[activeAudience]}</pre>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: formatDocumentation(content[activeAudience]) }} />
                )}
              </div>
              
              <div className="mt-3">
                <Button variant="outline-secondary" onClick={() => onGenerate(selectedAudiences)}>
                  Сгенерировать заново
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DocumentationGenerator; 