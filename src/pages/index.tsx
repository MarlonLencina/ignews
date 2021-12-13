import Head from "next/head";
import styles from "./home.module.scss";
import { SubscribeButton } from "../components/subscribeButton";
import { GetStaticProps } from "next";
import { stripe } from "../services/stripe";

interface HomeProps {
  product: { price_id: string; amount: number };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.News</title>
      </Head>
      <main className={styles.content_container}>
        <section className={styles.hero}>
          <span>👏 Hey, Welcome</span>
          <h1>
            News about the <span>react</span> world
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton price_id={product.price_id} />
        </section>
        <img src="/images/avatar.svg" alt="" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1K3eeqHiQPb84FfDxOUONca9");

  const product = {
    price_id: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};

