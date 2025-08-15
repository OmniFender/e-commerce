import { type SchemaTypeDefinition } from "sanity";
import { footerInfo } from "./footerInfo";
import { footerAdditionalSection } from "./footerAdditionalSection";
import { categories } from "./categories";
import { products } from "./products";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [footerInfo, footerAdditionalSection, categories, products],
};
