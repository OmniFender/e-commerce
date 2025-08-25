import Link from "next/link";
import Image from "next/image";

import { nunito } from "@/utils/fonts";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { BESTSELLER_PRODUCTSResult } from "@/sanity/types";
import {
  BESTSELLER_PRODUCTS,
  HERO_SECTION_SETTINGS,
} from "@/sanity/lib/queries";

import classes from "./hero-section.module.scss";

async function HeroSection() {
  let heroSettings = null;
  let bestSellerSlider: BESTSELLER_PRODUCTSResult = [];

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
          "Discover the pieces everyone’s adding to their cart and join thousands of fashion lovers who know what’s trending before it hits the streets.",
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
      bestSellerSlider = [];
    }
  }

  return (
    <section className={classes["hero-section"]}>
      <h2 className={classes["hero-section__heading-text"]}>
        {heroSettings.heroHeadingText || "Style That Sells Itself"}
      </h2>
      <div className={classes["hero-section__details"]}>
        <p className={classes["hero-section__heading-description"]}>
          {heroSettings.heroHeadingDescription ||
            "Discover the pieces everyone’s adding to their cart and join thousands of fashion lovers who know what’s trending before it hits the streets."}
        </p>
        <div className={classes["hero-section__controls"]}>
          <Link href="/shop">Shop Now</Link>
        </div>
      </div>
      <div className={classes["hero-section__products"]}>
        {bestSellerSlider && (
          <>
            <div className={classes["hero-section__products-slider"]}>
              {bestSellerSlider.map((product) => (
                <Link
                  href={`shop/${product.slug}`}
                  key={product._id}
                  className={classes["hero-section__products-slider-cards"]}
                >
                  {product.productImage?.asset?.url && (
                    <Image
                      className={
                        classes["hero-section__products-slider-cards-image"]
                      }
                      src={urlFor(product.productImage)
                        .width(400)
                        .quality(100)
                        .format("webp")
                        .url()}
                      alt={
                        product.productImage?.caption ||
                        `Product ${product.title} and its price is ${product.price}`
                      }
                      width={400}
                      height={450}
                      quality={100}
                    />
                  )}
                  <div
                    className={
                      classes["hero-section__products-slider-cards-details"]
                    }
                  >
                    <h3>{product.title}</h3>
                    <p>{`${product.price} $`}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className={classes["hero-section__products-slider"]}>
              {bestSellerSlider.map((product) => (
                <Link
                  href={`shop/${product.slug}`}
                  key={product._id}
                  className={classes["hero-section__products-slider-cards"]}
                >
                  {product.productImage?.asset?.url && (
                    <Image
                      className={
                        classes["hero-section__products-slider-cards-image"]
                      }
                      src={urlFor(product.productImage)
                        .width(400)
                        .quality(100)
                        .format("webp")
                        .url()}
                      alt={
                        product.productImage?.caption ||
                        `Product ${product.title} and its price is ${product.price}`
                      }
                      width={400}
                      height={450}
                      quality={100}
                    />
                  )}
                  <div
                    className={
                      classes["hero-section__products-slider-cards-details"]
                    }
                  >
                    <h3>{product.title}</h3>
                    <div>
                      <p>{`${product.price} $`}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <p
              className={`${classes["hero-section__products-bestseller"]} ${nunito.className}`}
            >
              Bestsellers for the week
            </p>
          </>
        )}
      </div>
    </section>
  );
}

export default HeroSection;
