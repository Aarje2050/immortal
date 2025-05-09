// src/lib/schema/utils.ts
import { BaseSchema } from '../../types/site';

/**
 * Adds an @id to a schema object
 */
export function addId<T extends BaseSchema>(schema: T, url: string): T {
  return {
    ...schema,
    '@id': url.includes('#') ? url : `${url}#${schema['@type'].toLowerCase()}`,
  };
}

/**
 * Creates a schema URL
 */
export function createSchemaUrl(path: string, baseUrl: string): string {
  const url = new URL(path, baseUrl);
  return url.href;
}

/**
 * Sanitizes text for use in schema
 */
export function sanitizeText(text: string): string {
  return text
    .replace(/(<([^>]+)>)/gi, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
    .trim();
}

/**
 * Truncates text to a specified length for schema headline properties
 */
export function truncateHeadline(text: string, maxLength = 110): string {
  const sanitized = sanitizeText(text);
  if (sanitized.length <= maxLength) return sanitized;
  return sanitized.substring(0, maxLength - 3) + '...';
}

/**
 * Formats a date string to ISO 8601 format
 */
export function formatDateForSchema(date: string | Date): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.toISOString();
}