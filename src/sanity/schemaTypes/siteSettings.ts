import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  description: "Manage your website different sections",
  type: "document",
  icon: () => "⚙️",
  groups: [
    { name: "Hero Settings", title: "Hero Settings" },
    { name: "Announcement Bar Settings", title: "Announcement Bar Settings" },
  ],
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
    defineField({
      name: "announcementBar",
      title: "Announcement Bar",
      type: "boolean",
      description: "Do you need the announcement bar to be on?",
      group: "Announcement Bar Settings",
    }),
    defineField({
      name: "announcementBarText",
      title: "Announcement Bar Text",
      type: "string",
      description: "The text that will be shown in the announcement bar",
      placeholder: "Write a cool slogan, a good offer, or anything you want",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as
            | { announcementBar?: boolean }
            | undefined;
          return parent?.announcementBar === true && !value
            ? "This field is required for the announcement bar to work correctly, Please add your desired text"
            : true;
        }),
      group: "Announcement Bar Settings",
    }),
  ],
});
