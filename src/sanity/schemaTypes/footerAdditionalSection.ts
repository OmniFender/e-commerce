import { defineField, defineType } from "sanity";

export const footerAdditionalSection = defineType({
  name: "footerAdditionalSection",
  title: "New section footer",
  type: "document",
  description: "add new section to footer component",
  fields: [
    defineField({
      name: "sectionTitle",
      title: "Section title",
      type: "string",
      description: "title for the new section.",
    }),
    defineField({
      name: "sectionList",
      title: "Section list",
      description: "list of items in the new section",
      type: "array",
      of: [
        defineField({
          name: "sectionList",
          title: "Section list",
          description: "list of items in the new section",
          type: "object",
          fields: [
            defineField({
              name: "itemName",
              title: "Item name",
              description: "name of the item in the list.",
              type: "string",
              placeholder: "e.g. terms of policy",
            }),
            defineField({
              name: "url",
              title: "Item url",
              description: "link of the list item",
              type: "url",
              placeholder: "https://www.example.com",
            }),
          ],
        }),
      ],
    }),
  ],
});
