import classes from "./page.module.scss";

async function page({ params }: { params: Promise<{ productPage: string }> }) {
  const { productPage } = await params;

  return (
    <>
      <section className={classes["product-page"]}>
        <h1>This is product: {productPage}</h1>
      </section>
    </>
  );
}

export default page;
