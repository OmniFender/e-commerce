import classes from "./hero-section.module.scss";

function HeroSection() {
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
