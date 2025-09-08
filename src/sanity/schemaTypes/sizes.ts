import { defineField, defineType } from "sanity";

export const sizes = defineType({
  name: "sizes",
  title: "Sizes",
  description: "Manage sizes for a product",
  type: "document",
  fields: [
    defineField({
      name: "sizes",
      title: "Sizes",
      type: "string",
      description: "add a size for the product",
    }),
  ],
});
