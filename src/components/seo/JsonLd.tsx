// src/components/seo/JsonLd.tsx
import React from 'react';
import { BaseSchema } from '@/lib/schema/types';

type JsonLdProps = {
  data: BaseSchema | BaseSchema[] | Record<string, any>;
};

const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  // If data is an array, convert it to a schema graph
  const schemaData = Array.isArray(data) 
    ? { '@context': 'https://schema.org', '@graph': data }
    : data;
    
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default JsonLd;