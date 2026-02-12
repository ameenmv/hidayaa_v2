// Global Filters/Formatters

/**
 * Format Arabic numbers to Eastern Arabic numerals
 */
export const toArabicNumerals = (num) => {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
  return String(num).replace(/\d/g, (digit) => arabicNumerals[digit])
}

/**
 * Format duration in seconds to MM:SS
 */
export const formatDuration = (seconds) => {
  if (!seconds || isNaN(seconds)) return '00:00'
  
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

/**
 * Format duration in seconds to HH:MM:SS
 */
export const formatLongDuration = (seconds) => {
  if (!seconds || isNaN(seconds)) return '00:00:00'
  
  const hours = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  
  return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

/**
 * Truncate text with ellipsis
 */
export const truncate = (text, length = 50) => {
  if (!text) return ''
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

/**
 * Format date to readable string
 */
export const formatDate = (date, locale = 'ar-EG') => {
  if (!date) return ''
  
  const d = new Date(date)
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Format time to readable string
 */
export const formatTime = (date, locale = 'ar-EG') => {
  if (!date) return ''
  
  const d = new Date(date)
  return d.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Format number with thousands separator
 */
export const formatNumber = (num, locale = 'ar-EG') => {
  if (!num && num !== 0) return ''
  return new Intl.NumberFormat(locale).format(num)
}

/**
 * Capitalize first letter
 */
export const capitalize = (text) => {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * Convert to title case
 */
export const titleCase = (text) => {
  if (!text) return ''
  return text.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

export default {
  toArabicNumerals,
  formatDuration,
  formatLongDuration,
  truncate,
  formatDate,
  formatTime,
  formatNumber,
  capitalize,
  titleCase
}
