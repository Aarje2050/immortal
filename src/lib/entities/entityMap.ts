// src/lib/entities/entityMap.ts
// Entity mapping system for semantic SEO and knowledge graph optimization

import { BaseSchema } from '../schema/types';

/**
 * Entity types in the system
 */
export type EntityType = 'Service' | 'Industry' | 'Location' | 'Person' | 'Tool' | 'CaseStudy';

/**
 * Entity relationship types
 */
export type RelationshipType = 
  | 'relatedTo' 
  | 'partOf' 
  | 'offers' 
  | 'serves' 
  | 'locatedIn' 
  | 'authorOf' 
  | 'specializesIn'
  | 'provides'
  | 'targets';

/**
 * Entity definition
 */
export interface Entity {
  id: string;
  type: EntityType;
  name: string;
  url: string;
  description?: string;
  schema?: BaseSchema;
  relationships?: EntityRelationship[];
  attributes?: Record<string, any>;
}

/**
 * Entity relationship
 */
export interface EntityRelationship {
  targetEntityId: string;
  relationshipType: RelationshipType;
  strength?: 'strong' | 'medium' | 'weak';
  bidirectional?: boolean;
}

/**
 * Entity map - stores all entities and their relationships
 */
class EntityMap {
  private entities: Map<string, Entity> = new Map();
  private relationships: Map<string, EntityRelationship[]> = new Map();

  /**
   * Register an entity
   */
  registerEntity(entity: Entity): void {
    this.entities.set(entity.id, entity);
    if (entity.relationships) {
      this.relationships.set(entity.id, entity.relationships);
    }
  }

  /**
   * Get an entity by ID
   */
  getEntity(id: string): Entity | undefined {
    return this.entities.get(id);
  }

  /**
   * Get relationships for an entity
   */
  getRelationships(entityId: string): EntityRelationship[] {
    return this.relationships.get(entityId) || [];
  }

  /**
   * Get related entities
   */
  getRelatedEntities(entityId: string, relationshipType?: RelationshipType): Entity[] {
    const relationships = this.getRelationships(entityId);
    const filtered = relationshipType 
      ? relationships.filter(r => r.relationshipType === relationshipType)
      : relationships;
    
    return filtered
      .map(rel => this.getEntity(rel.targetEntityId))
      .filter((entity): entity is Entity => entity !== undefined);
  }

  /**
   * Get all entities of a type
   */
  getEntitiesByType(type: EntityType): Entity[] {
    return Array.from(this.entities.values()).filter(e => e.type === type);
  }

  /**
   * Find entities by name (fuzzy search)
   */
  findEntitiesByName(name: string): Entity[] {
    const lowerName = name.toLowerCase();
    return Array.from(this.entities.values()).filter(e => 
      e.name.toLowerCase().includes(lowerName)
    );
  }
}

// Create singleton instance
const entityMap = new EntityMap();

/**
 * Initialize entity map with services, industries, locations
 */
export async function initializeEntityMap(): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.immortalseo.com';
  
  // Load services
  try {
    const servicesPath = require('path').join(process.cwd(), 'src', 'data', 'services.json');
    const servicesData = require('fs').readFileSync(servicesPath, 'utf8');
    const services = JSON.parse(servicesData);
    
    Object.entries(services).forEach(([slug, service]: [string, any]) => {
      entityMap.registerEntity({
        id: `service:${slug}`,
        type: 'Service',
        name: service.name,
        url: `${baseUrl}/services/${slug}`,
        description: service.shortDescription,
        attributes: {
          category: service.category,
          keywords: service.primaryKeywords || [],
        },
        relationships: [
          // Link to related services in same category
          ...(service.relatedServices || []).map((relatedSlug: string) => ({
            targetEntityId: `service:${relatedSlug}`,
            relationshipType: 'relatedTo' as RelationshipType,
            strength: 'medium' as const,
            bidirectional: true,
          })),
        ],
      });
    });
  } catch (error) {
    console.error('Error loading services for entity map:', error);
  }

  // Load industries
  try {
    const industriesPath = require('path').join(process.cwd(), 'src', 'data', 'industries');
    const industriesFiles = require('fs').readdirSync(industriesPath);
    
    industriesFiles
      .filter((file: string) => file.endsWith('.json'))
      .forEach((file: string) => {
        const filePath = require('path').join(industriesPath, file);
        const industryData = JSON.parse(require('fs').readFileSync(filePath, 'utf8'));
        const slug = file.replace('.json', '');
        
        entityMap.registerEntity({
          id: `industry:${slug}`,
          type: 'Industry',
          name: industryData.name,
          url: `${baseUrl}/industries/${slug}`,
          description: industryData.metaDescription,
          attributes: {
            keyPhrases: industryData.keyPhrases || [],
            relatedServices: industryData.relatedServices || [],
          },
          relationships: [
            // Link to related services
            ...(industryData.relatedServices || []).map((serviceName: string) => {
              // Find service by name
              const serviceSlug = findServiceSlugByName(serviceName);
              if (serviceSlug) {
                return {
                  targetEntityId: `service:${serviceSlug}`,
                  relationshipType: 'provides' as RelationshipType,
                  strength: 'strong' as const,
                };
              }
              return null;
            }).filter(Boolean) as EntityRelationship[],
          ],
        });
      });
  } catch (error) {
    console.error('Error loading industries for entity map:', error);
  }

  // Load locations
  try {
    const locationsPath = require('path').join(process.cwd(), 'src', 'data', 'locations');
    const countries = ['canada', 'usa', 'india'];
    
    countries.forEach(country => {
      const countryPath = require('path').join(locationsPath, country, 'cities.json');
      if (require('fs').existsSync(countryPath)) {
        const locationsData = JSON.parse(require('fs').readFileSync(countryPath, 'utf8'));
        
        Object.entries(locationsData).forEach(([slug, location]: [string, any]) => {
          entityMap.registerEntity({
            id: `location:${slug}`,
            type: 'Location',
            name: location.name,
            url: `${baseUrl}/locations/${slug}`,
            description: location.metaDescription,
            attributes: {
              country: location.country,
              state: location.state || location.province,
              keyIndustries: location.keyIndustries || [],
            },
          });
        });
      }
    });
  } catch (error) {
    console.error('Error loading locations for entity map:', error);
  }

  // Add team members
  entityMap.registerEntity({
    id: 'person:rajesh-jat',
    type: 'Person',
    name: 'Rajesh Jat',
    url: `${baseUrl}/about#rajesh-jat`,
    description: 'Co-Founder & SEO Strategist at ImmortalSEO',
    attributes: {
      jobTitle: 'Co-Founder & SEO Strategist',
      expertise: ['Keyword Research', 'Competitive Analysis', 'AI SEO', 'Semantic SEO'],
    },
    relationships: [
      {
        targetEntityId: 'service:technical-seo',
        relationshipType: 'specializesIn',
        strength: 'strong',
      },
      {
        targetEntityId: 'service:semantic-seo',
        relationshipType: 'specializesIn',
        strength: 'strong',
      },
      {
        targetEntityId: 'service:ai-enhanced-seo',
        relationshipType: 'specializesIn',
        strength: 'strong',
      },
    ],
  });

  entityMap.registerEntity({
    id: 'person:manish-lamrod',
    type: 'Person',
    name: 'Manish Lamrod',
    url: `${baseUrl}/about#manish-lamrod`,
    description: 'Co-Founder & Off-Page SEO Expert at ImmortalSEO',
    attributes: {
      jobTitle: 'Co-Founder & Off-Page SEO Expert',
      expertise: ['Link Building', 'Off-Page SEO', 'Digital PR', 'Authority Building'],
    },
    relationships: [
      {
        targetEntityId: 'service:off-page-seo',
        relationshipType: 'specializesIn',
        strength: 'strong',
      },
    ],
  });
}

/**
 * Helper to find service slug by name
 */
function findServiceSlugByName(serviceName: string): string | null {
  try {
    const servicesPath = require('path').join(process.cwd(), 'src', 'data', 'services.json');
    const servicesData = require('fs').readFileSync(servicesPath, 'utf8');
    const services = JSON.parse(servicesData);
    
    for (const [slug, service] of Object.entries(services)) {
      if ((service as any).name === serviceName || (service as any).name.includes(serviceName)) {
        return slug;
      }
    }
  } catch (error) {
    // Silently fail
  }
  return null;
}

/**
 * Get entity map instance
 */
export function getEntityMap(): EntityMap {
  return entityMap;
}

/**
 * Get related entities for semantic linking
 */
export function getRelatedEntitiesForLinking(
  entityId: string, 
  limit: number = 5
): Entity[] {
  const related = entityMap.getRelatedEntities(entityId);
  return related.slice(0, limit);
}

/**
 * Get entities for a service page
 */
export function getEntitiesForService(serviceSlug: string): {
  service: Entity | undefined;
  relatedServices: Entity[];
  relevantIndustries: Entity[];
  teamMembers: Entity[];
} {
  const serviceId = `service:${serviceSlug}`;
  const service = entityMap.getEntity(serviceId);
  
  const relatedServices = entityMap.getRelatedEntities(serviceId, 'relatedTo');
  const relevantIndustries = entityMap
    .getEntitiesByType('Industry')
    .filter(industry => 
      industry.attributes?.relatedServices?.some((s: string) => 
        s.toLowerCase().includes(service?.name.toLowerCase() || '')
      )
    );
  
  const teamMembers = entityMap
    .getEntitiesByType('Person')
    .filter(person => 
      person.relationships?.some(rel => 
        rel.targetEntityId === serviceId && rel.relationshipType === 'specializesIn'
      )
    );
  
  return {
    service,
    relatedServices,
    relevantIndustries,
    teamMembers,
  };
}

export default entityMap;
