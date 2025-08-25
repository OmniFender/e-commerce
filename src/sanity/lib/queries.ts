import { defineQuery } from "next-sanity";

export const FOOTER_INFO = defineQuery(`
*[_type == "footerInfo"]{
  _id,
  _type,
  address,
    description,
    emailAddress,
    footer,
    phoneNumber,
}`);

export const FOOTER_NEW_SECTION = defineQuery(`
*[_type == "footerAdditionalSection"]{
  _id,
  _createdAt,
    sectionList[]{
      itemName,
      _key,
      url,
    },
    sectionTitle
} | order(_createdAt asc)`);

export const FEATURED_PRODUCTS_CARDS = defineQuery(`
*[_type == "products" && featured == true][0...8]{
  _id,
  _createdAt,
  title,
  tags,
  price,
  "slug": productSlug.current,
  productImage{
    asset->{
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        },
        lqip
      }
    },
    caption,
  }
} | order(_createdAt desc)
  `);

export const PRODUCTS = defineQuery(`
*[_type == "products"]{
  _id,
  _createdAt,
  title,
  tags[],
  price,
  "slug": productSlug.current,
  productImage{
    asset->{
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        },
        lqip
      }
    },
    caption,
  }
} | order(_createdAt desc)
  `);

export const HERO_SECTION_SETTINGS = defineQuery(`
*[_type == "siteSettings"]{
  _id,
  heroHeadingDescription,
  heroHeadingText,
}`);

export const BESTSELLER_PRODUCTS = defineQuery(`
*[_type == "products" && bestSeller == true] {
  _id,
  title,
  price,
  "slug": productSlug.current,
  productImage {
    asset->{
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        },
        lqip
      }
    },
    caption
  }
}`);

export const ANNOUNCEMENT_BAR_SETTIGNS = defineQuery(`
*[_type == "siteSettings"]{
  _id,
  announcementBar,
  announcementBarText
}`);
