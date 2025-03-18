// Вспомогательные функции

/**
 * Форматирует дату в локализованную строку
 * @param {string} dateString - Строка с датой в формате ISO
 * @returns {string} Отформатированная дата
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric'
  });
};

/**
 * Получает иконку для типа материала
 * @param {string} type - Тип материала
 * @returns {string} Название иконки из Material Icons
 */
export const getIconForType = (type) => {
  switch (type) {
    case 'meeting': return 'groups';
    case 'ticket': return 'task';
    case 'wiki': return 'description';
    case 'technical': return 'code';
    case 'product': return 'view_quilt';
    case 'organizational': return 'people';
    default: return 'article';
  }
};

/**
 * Получает название категории на русском
 * @param {string} category - Категория на английском
 * @returns {string} Категория на русском
 */
export const getCategoryName = (category) => {
  const categories = {
    'technical': 'Техническая',
    'product': 'Продуктовая',
    'organizational': 'Организационная',
    'high': 'Высокий',
    'medium': 'Средний',
    'low': 'Низкий',
    'open': 'Открыт',
    'in-progress': 'В работе',
    'resolved': 'Решено',
    'closed': 'Закрыт'
  };
  
  return categories[category] || category;
};

/**
 * Обрезает текст до определенной длины с добавлением многоточия
 * @param {string} text - Исходный текст
 * @param {number} length - Максимальная длина
 * @returns {string} Обрезанный текст
 */
export const truncateText = (text, length = 150) => {
  if (!text) return '';
  return text.length > length ? `${text.substring(0, length)}...` : text;
}; 