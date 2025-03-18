import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Spinner } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

function DocumentationGenerator({ summary, rfcContent }) {
  const [loading, setLoading] = useState(true);
  const [documentation, setDocumentation] = useState({
    developers: '',
    administrators: '',
    users: ''
  });
  const [activeTab, setActiveTab] = useState('developers');
  const [format, setFormat] = useState('markdown');

  useEffect(() => {
    // Имитация генерации документации
    setTimeout(() => {
      const devDocumentation = generateMockDocumentation('developers', summary, rfcContent);
      const adminDocumentation = generateMockDocumentation('administrators', summary, rfcContent);
      const userDocumentation = generateMockDocumentation('users', summary, rfcContent);
      
      setDocumentation({
        developers: devDocumentation,
        administrators: adminDocumentation,
        users: userDocumentation
      });
      
      setLoading(false);
    }, 2000);
  }, [summary, rfcContent]);

  const generateMockDocumentation = (audience, summary, rfcContent) => {
    // Генерация моковой документации в зависимости от целевой аудитории
    if (audience === 'developers') {
      return `# Техническая документация: ${summary.title}

## Обзор
${summary.content}

## Технические детали
${rfcContent ? extractTechnicalDetails(rfcContent) : 'Технические детали не указаны в RFC.'}

## Архитектура
${rfcContent ? extractArchitecture(rfcContent) : 'Архитектура не описана в RFC.'}

## API
${generateMockApi(summary)}

## Требования к разработке
- Следовать принципам чистого кода
- Писать модульные и интеграционные тесты
- Документировать публичные API
- Следовать стандартам кодирования команды

## Дополнительные ресурсы
- [Репозиторий проекта](https://github.com/example/project)
- [Документация по API](https://api.example.com/docs)
- [Внутренняя Wiki](https://wiki.example.com)`;
    } else if (audience === 'administrators') {
      return `# Руководство администратора: ${summary.title}

## Обзор системы
${summary.content}

## Требования к инфраструктуре
${rfcContent ? extractInfrastructureRequirements(rfcContent) : 'Требования к инфраструктуре не указаны в RFC.'}

## Установка и настройка
1. Клонировать репозиторий
2. Настроить переменные окружения
3. Запустить скрипт установки
4. Проверить работоспособность системы

## Мониторинг и обслуживание
- Настроить алерты для критических метрик
- Регулярно проверять логи на наличие ошибок
- Выполнять резервное копирование данных
- Обновлять зависимости по мере необходимости

## Устранение неполадок
- Проверить подключение к базе данных
- Убедиться в доступности внешних сервисов
- Проверить права доступа к файлам
- Перезапустить сервисы при необходимости`;
    } else if (audience === 'users') {
      return `# Руководство пользователя: ${summary.title}

## Введение
${summary.content}

## Начало работы
1. Зарегистрируйтесь в системе
2. Заполните профиль
3. Ознакомьтесь с основными функциями

## Основные функции
- Создание и редактирование контента
- Управление настройками
- Взаимодействие с другими пользователями
- Экспорт и импорт данных

## Часто задаваемые вопросы
**Вопрос:** Как сбросить пароль?
**Ответ:** Нажмите на ссылку "Забыли пароль" на странице входа.

**Вопрос:** Как связаться с поддержкой?
**Ответ:** Отправьте письмо на support@example.com или воспользуйтесь формой обратной связи.

## Советы и рекомендации
- Регулярно обновляйте информацию
- Используйте фильтры для быстрого поиска
- Настройте уведомления для важных событий`;
    }
  };

  const extractTechnicalDetails = (rfcContent) => {
    // Извлечение технических деталей из RFC
    if (rfcContent.includes('## Технический дизайн') || rfcContent.includes('## Технические детали')) {
      const lines = rfcContent.split('\n');
      let inTechnicalSection = false;
      let technicalDetails = [];
      
      for (const line of lines) {
        if (line.startsWith('## Технический дизайн') || line.startsWith('## Технические детали')) {
          inTechnicalSection = true;
          continue;
        }
        
        if (inTechnicalSection && line.startsWith('## ')) {
          break;
        }
        
        if (inTechnicalSection) {
          technicalDetails.push(line);
        }
      }
      
      return technicalDetails.join('\n');
    }
    
    return 'Технические детали не найдены в RFC.';
  };

  const extractArchitecture = (rfcContent) => {
    // Извлечение архитектуры из RFC
    if (rfcContent.includes('## Архитектура') || rfcContent.includes('## Предлагаемая архитектура')) {
      const lines = rfcContent.split('\n');
      let inArchitectureSection = false;
      let architecture = [];
      
      for (const line of lines) {
        if (line.startsWith('## Архитектура') || line.startsWith('## Предлагаемая архитектура')) {
          inArchitectureSection = true;
          continue;
        }
        
        if (inArchitectureSection && line.startsWith('## ')) {
          break;
        }
        
        if (inArchitectureSection) {
          architecture.push(line);
        }
      }
      
      return architecture.join('\n');
    }
    
    return 'Архитектура не найдена в RFC.';
  };

  const extractInfrastructureRequirements = (rfcContent) => {
    // Извлечение требований к инфраструктуре из RFC
    if (rfcContent.includes('## Требования к инфраструктуре') || rfcContent.includes('## Инфраструктура')) {
      const lines = rfcContent.split('\n');
      let inInfraSection = false;
      let infrastructure = [];
      
      for (const line of lines) {
        if (line.startsWith('## Требования к инфраструктуре') || line.startsWith('## Инфраструктура')) {
          inInfraSection = true;
          continue;
        }
        
        if (inInfraSection && line.startsWith('## ')) {
          break;
        }
        
        if (inInfraSection) {
          infrastructure.push(line);
        }
      }
      
      return infrastructure.join('\n');
    }
    
    // Если секция не найдена, попробуем извлечь информацию из технических деталей
    const technicalDetails = extractTechnicalDetails(rfcContent);
    if (technicalDetails && technicalDetails !== 'Технические детали не найдены в RFC.') {
      return `На основе технических деталей, рекомендуемые требования к инфраструктуре:

- Сервер с минимум 4 ядрами CPU и 8 ГБ RAM
- Дисковое пространство: минимум 50 ГБ SSD
- Операционная система: Linux (рекомендуется Ubuntu 20.04 LTS)
- Сетевое подключение: минимум 100 Мбит/с
- Доступ к внешним сервисам и API

${technicalDetails}`;
    }
    
    return 'Требования к инфраструктуре не указаны в RFC.';
  };

  const generateMockApi = (summary) => {
    // Генерация моковой документации API на основе содержимого саммари
    const content = summary.content.toLowerCase();
    
    if (content.includes('rest') || content.includes('api')) {
      return `### REST API

#### Аутентификация
\`\`\`
POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
\`\`\`

#### Получение данных
\`\`\`
GET /api/v1/data
Authorization: Bearer {token}
\`\`\`

#### Создание ресурса
\`\`\`
POST /api/v1/resources
Content-Type: application/json
Authorization: Bearer {token}

{
  "name": "string",
  "description": "string",
  "type": "string"
}
\`\`\``;
    } else if (content.includes('graphql')) {
      return `### GraphQL API

#### Запрос данных
\`\`\`graphql
query {
  getResource(id: "123") {
    id
    name
    description
    createdAt
    updatedAt
  }
}
\`\`\`

#### Мутация
\`\`\`graphql
mutation {
  createResource(input: {
    name: "New Resource",
    description: "Description of the resource",
    type: "TYPE_A"
  }) {
    id
    name
    createdAt
  }
}
\`\`\``;
    } else {
      return `### API

API документация будет добавлена после разработки интерфейсов.`;
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleFormatChange = (newFormat) => {
    setFormat(newFormat);
  };

  const handleDownload = () => {
    const content = documentation[activeTab];
    const fileName = `${summary.title.replace(/\s+/g, '_')}_${activeTab}_documentation.${format === 'markdown' ? 'md' : 'txt'}`;
    
    const element = document.createElement('a');
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getAudienceTitle = (audience) => {
    switch(audience) {
      case 'developers': return 'Для разработчиков';
      case 'administrators': return 'Для администраторов';
      case 'users': return 'Для пользователей';
      default: return '';
    }
  };

  const getAudienceIcon = (audience) => {
    switch(audience) {
      case 'developers': return 'code';
      case 'administrators': return 'admin_panel_settings';
      case 'users': return 'people';
      default: return 'article';
    }
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header className="bg-white border-bottom">
        <div className="d-flex align-items-center">
          <span className="material-icons me-2" style={{ color: '#212529', fontSize: '24px' }}>
            description
          </span>
          <div>
            <Card.Title className="mb-0">Документация</Card.Title>
            <Card.Subtitle className="text-muted mt-1" style={{ fontSize: '0.9rem' }}>
              Сгенерированная документация для разных целевых аудиторий
            </Card.Subtitle>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" variant="primary" />
            <p className="mt-3">Генерация документации...</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="btn-group">
                  {['developers', 'administrators', 'users'].map((audience) => (
                    <Button
                      key={audience}
                      variant={activeTab === audience ? 'primary' : 'outline-primary'}
                      onClick={() => handleTabChange(audience)}
                      className="d-flex align-items-center"
                    >
                      <span className="material-icons me-1" style={{ fontSize: '18px' }}>
                        {getAudienceIcon(audience)}
                      </span>
                      {getAudienceTitle(audience)}
                    </Button>
                  ))}
                </div>
                <div className="d-flex align-items-center">
                  <div className="me-2">
                    <select 
                      className="form-select"
                      value={format}
                      onChange={(e) => handleFormatChange(e.target.value)}
                    >
                      <option value="markdown">Markdown</option>
                      <option value="text">Текст</option>
                    </select>
                  </div>
                  <Button 
                    variant="outline-dark"
                    onClick={handleDownload}
                    className="d-flex align-items-center"
                  >
                    <span className="material-icons me-1" style={{ fontSize: '18px' }}>
                      download
                    </span>
                    Скачать
                  </Button>
                </div>
              </div>
              
              <div className="documentation-content bg-light p-4 rounded">
                {format === 'markdown' ? (
                  <ReactMarkdown>{documentation[activeTab]}</ReactMarkdown>
                ) : (
                  <pre>{documentation[activeTab]}</pre>
                )}
              </div>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default DocumentationGenerator; 