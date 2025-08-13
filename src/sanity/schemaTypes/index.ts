import { type SchemaTypeDefinition } from 'sanity';
import { footerInfo } from './footerInfo';
import { footerAdditionalSection } from './footerAdditionalSection';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [footerInfo, footerAdditionalSection],
};
