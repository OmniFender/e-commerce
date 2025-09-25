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
      name: "productSlug",
      title: "Product's Slug",
      type: "slug",
      description:
        "Please Click 'Generate' after Writting the product's Name, The slug of the product will be used in the products page URL, e.g. /shop/'product-1'",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) =>
        Rule.required().error(
          "Products's slug is required, Please Click 'Generate'"
        ),
    }),
    defineField({
      name: "description",
      title: "Description",
      description:
        "A brief description of the product that will appear on the product page, please enter the description as bullet points for better readability",
      type: "text",
      placeholder:
        "enter the description as bullet points for better readability",
      validation: (Rule) =>
        Rule.required().error("Product description is required"),
    }),
    defineField({
      name: "badges",
      title: "Badges",
      description:
        "badges for the product like quality and fast shipping that will appear on the product page",
      type: "array",
      of: [
        {
          name: "badge",
          title: "Badge name",
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
        },
      ],
    }),
    defineField({
      name: "sizeGuide",
      title: "Size Guide",
      description: "A guide to the sizes available for the product",
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
    }),
    defineField({
      name: "price",
      title: "Price",
      description: "The price of the product in USD",
      type: "number",
      placeholder: "Enter product price",
      validation: (Rule) => Rule.required().error("Product price is required"),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      description: "The tags associated with the product 'optional' ",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      description: "Is the product in stock?",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "sizes",
      title: "Sizes",
      description: "the available sizes for the product",
      type: "array",
      of: [{ type: "reference", to: [{ type: "sizes" }] }],
      validation: (rule) => rule.required().error("Please select a size"),
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
      validation: (Rule) =>
        Rule.required().error("Featured product image is required"),
    }),
  ],
});
