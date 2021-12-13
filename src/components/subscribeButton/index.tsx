import styles from "./styles.module.scss";
import { signIn, useSession } from "next-auth/client";
import { api } from "../../pages/api/api";
import { getStripeJs } from "../../services/stripe-js";
import { useRouter } from "next/router";

interface SubscribeButtonProps {
  price_id: string;
}

export const SubscribeButton = ({ price_id }: SubscribeButtonProps) => {
  const [session] = useSession();
  const router = useRouter();
  async function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    if (session.activeSubscription) {
      return router.push("/posts");
    }

    try {
      const res = await api.post("/subscribe");
      const { sessionId } = res.data;
      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <button
      onClick={handleSubscribe}
      className={styles.button__container}
      type="button"
    >
      Subscribe Now
    </button>
  );
};
