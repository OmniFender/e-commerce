import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  description: "Manage your website different sections",
  type: "document",
  icon: () => "⚙️",
  groups: [{ name: "Hero Settings", title: "Hero Settings" }],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "This is the default settings document. Do not delete.",
      initialValue: "Default Settings",
      readOnly: true,
      validation: (Rule) => Rule.required().error("Name is required"),
    }),
    defineField({
      name: "heroHeadingText",
      title: "Hero Heading Text",
      type: "string",
      description: "The heading text shown in the hero section",
      placeholder: "Write something catchy",
      validation: (Rule) =>
        Rule.required().error("Hero heading text is required"),
      group: "Hero Settings",
    }),
    defineField({
      name: "heroHeadingDescription",
      title: "Hero Heading Description",
      type: "string",
      description: "The heading Description shown in the hero section",
      placeholder: "Write a cool slogan or something",
      validation: (Rule) =>
        Rule.required().error("Hero heading description is required"),
      group: "Hero Settings",
    }),
  ],
});
