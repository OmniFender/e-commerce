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
    sectionList[]{
      itemName,
      _key,
      url,
    },
    sectionTitle
}`);
