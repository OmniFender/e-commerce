import { defineField, defineType } from "sanity";

import PhoneNumberInput from "./components/phonenumber-input/PhoneNumberInput";

export const footerInfo = defineType({
  name: "footerInfo",
  title: "Footer Info",
  type: "document",
  description: "Edit the footer information",
  fields: [
    defineField({
      name: "footer",
      title: "footer",
      type: "string",
      description: "default name for this document.",
      initialValue: "footer information",
      readOnly: true,
    }),
    defineField({
      name: "description",
      title: "footer description",
      type: "text",
      description: "description about the site in the footer section",
      placeholder: "description...",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "url",
      description:
        "your bussiness physical address for easy arrive, please make it location link",
    }),
    defineField({
      name: "emailAddress",
      title: "E-mail address",
      description: "bussiness email address for contact purposes",
      type: "email",
      placeholder: "example123@text.com",
    }),
    defineField({
      name: "phoneNumber",
      title: "Phone Number",
      description: "your region code followed by your bussiness phone number  ",
      type: "string",
      placeholder: "+201234567891",
      components: {
        input: PhoneNumberInput,
      },
    }),
  ],
});
