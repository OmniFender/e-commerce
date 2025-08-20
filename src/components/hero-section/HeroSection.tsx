import { sanityFetch } from "@/sanity/lib/live";
import {
  BESTSELLER_PRODUCTS,
  HERO_SECTION_SETTINGS,
} from "@/sanity/lib/queries";

import classes from "./hero-section.module.scss";

async function HeroSection() {
  let heroSettings = null;
  let bestSellerSlider = null;

  try {
    const { data: fetchedHeroSettings } = await sanityFetch({
      query: HERO_SECTION_SETTINGS,
    });
    if (fetchedHeroSettings) {
      heroSettings = fetchedHeroSettings[0];
    }
  } catch (error) {
    console.error("Error fetching hero settings data: ", error);
  } finally {
    if (!heroSettings) {
      heroSettings = {
        heroHeadingDescription:
          "Discover the pieces everyone’s adding to their cart.",
        heroHeadingText: "Style That Sells Itself",
      };
    }
  }

  try {
    const { data: fetchedBestsellerProducts } = await sanityFetch({
      query: BESTSELLER_PRODUCTS,
    });
    if (fetchedBestsellerProducts) {
      bestSellerSlider = fetchedBestsellerProducts;
    }
  } catch (error) {
    console.error("Error fetching hero settings data: ", error);
  } finally {
    if (!bestSellerSlider) {
      bestSellerSlider = {};
    }
  }

  return (
    <section className={classes["hero-section"]}>
      <h2 className={classes["hero-section__heading-text"]}></h2>
      <p className={classes["hero-section__heading-description"]}></p>
      <div className={classes["hero-section__slider"]}></div>
      <div className={classes["hero-section__controls"]}></div>
    </section>
  );
}

export default HeroSection;
