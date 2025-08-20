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
*[_type == "products" && featured == true]{
  _id,
  title,
  tags,
  price,
  productImage{
    caption,
    asset->{
      _id,
      url
    }
  }
}
  `);

export const PRODUCTS = defineQuery(`
  *[_type == "products"]{
    _id,
    title,
    description,
    price,
    image{
      caption,
      asset->{
        _id,
        url
      }
    }
  }
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
