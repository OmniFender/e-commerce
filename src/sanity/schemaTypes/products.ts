import { defineType, defineField } from "sanity";

export const products = defineType({
  name: "products",
  title: "Products",
  description: "Manage products for the website",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      description: "The title of the product",
      type: "string",
      placeholder: "Enter product title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "A brief description of the product",
      type: "text",
      placeholder: "Enter product description",
    }),
    defineField({
      name: "price",
      title: "Price",
      description: "The price of the product in USD",
      type: "number",
      placeholder: "Enter product price",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      description: "The tags associated with the product 'optional' ",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "category",
      title: "Category",
      description: "the category of the product from the categories available.",
      type: "reference",
      to: [{ type: "categories" }],
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Is this product featured?",
      initialValue: false,
    }),
    defineField({
      name: "bestSeller",
      title: "Best Seller",
      type: "boolean",
      description: "Is this product a best seller?",
      initialValue: false,
    }),
    defineField({
      name: "productImage",
      title: "Product image",
      description: "An image of the product",
      type: "image",
      options: {
        hotspot: true,
        accept: "image/*",
        metadata: ["lqip", "blurhash", "exif"],
      },
      fields: [
        defineField({
          name: "caption",
          title: "Alternative text",
          description: "Important for SEO and accessibility",
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
