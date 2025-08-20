import { defineField, defineType } from "sanity";
//categories that can be referenced in products section for filtering them

export const categories = defineType({
  name: "categories",
  title: "Categories",
  description: "Manage categories for the website",
  type: "document",
  fields: [
    defineField({
      name: "categories",
      type: "string",
      description: "add a category for the website",
    }),
  ],
});
