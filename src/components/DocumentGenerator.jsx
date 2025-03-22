import React from 'react';

const DocumentGenerator = ({ rfc, onAnalyzeRfc, summary }) => {
  const documentToRender = rfc || summary;
  
  // Убедимся, что у нас есть что рендерить
  if (!documentToRender) {
    return <div>Нет данных для отображения</div>;
  }

  return (
    <div className="document-generator">
      {/* Основной блок документа, который занимает всю ширину */}
      <div className="document-content-wrapper">
        <h2 className="mb-4">{documentToRender.title}</h2>
        <div 
          className="document-content markdown-content"
          style={{
            whiteSpace: 'pre-wrap',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}
        >
          <pre style={{ 
            whiteSpace: 'pre-wrap', 
            fontFamily: 'inherit',
            margin: 0,
            padding: 0,
            overflow: 'auto',
            maxHeight: 'none',
            lineHeight: '1.6'
          }}>
            {documentToRender.content}
          </pre>
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
    </div>
  );
};

export default DocumentGenerator; 