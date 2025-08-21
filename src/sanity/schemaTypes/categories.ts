import { defineField, defineType } from "sanity";

export const categories = defineType({
  name: "categories",
  title: "Categories",
  description: "Manage categories for the website",
  type: "document",
  fields: [
    defineField({
      name: "categories",
      title: "Categories",
      type: "string",
      description: "add a category for the website",
    }),
  ],
});
