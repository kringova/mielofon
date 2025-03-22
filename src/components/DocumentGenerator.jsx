import React from 'react';

const DocumentGenerator = ({ rfc, onAnalyzeRfc, summary }) => {
  const documentToRender = rfc || summary;
  
  // Убедимся, что у нас есть что рендерить
  if (!documentToRender) {
    return <div>Нет данных для отображения</div>;
  }

  // Функция для преобразования простого Markdown в HTML
  const simpleMarkdownToHtml = (markdown) => {
    // Это очень базовое преобразование для заголовков и списков
    // Для полноценного Markdown понадобится библиотека
    if (!markdown) return '';
    
    let html = markdown
      // Преобразуем заголовки
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      // Преобразуем списки
      .replace(/^\- (.+)$/gm, '<li>$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
      // Преобразуем жирный и курсив
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    // Оборачиваем списки
    html = html.replace(/<li>(.+?)<\/li>\s*<li>/g, '<li>$1</li><li>');
    if (html.includes('<li>')) {
      html = '<ul>' + html + '</ul>';
    }
    
    return html;
  };

  // Вариант 1: Простое отображение текста в pre без обработки Markdown
  const renderSimpleText = () => (
    <pre style={{ 
      whiteSpace: 'pre-wrap', 
      fontFamily: 'inherit',
      margin: 0,
      padding: 0
    }}>
      {documentToRender.content}
    </pre>
  );

  // Вариант 2: Попытка базовой обработки Markdown без библиотеки
  const renderBasicHtml = () => (
    <div dangerouslySetInnerHTML={{ 
      __html: simpleMarkdownToHtml(documentToRender.content) 
    }} />
  );

  return (
    <div className="document-generator">
      <h2>{documentToRender.title}</h2>
      <div className="document-content markdown-content">
        {/* Выберите один из вариантов рендеринга */}
        {renderSimpleText()}
        {/* {renderBasicHtml()} */}
      </div>
      
      {onAnalyzeRfc && (
        <div className="mt-4">
          <button 
            className="btn btn-primary" 
            onClick={() => onAnalyzeRfc(documentToRender)}
          >
            Анализировать RFC
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentGenerator; 