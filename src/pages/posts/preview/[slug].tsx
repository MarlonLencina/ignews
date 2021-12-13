import { GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { RichText } from "prismic-dom";
import { useEffect } from "react";
import { getPrismicClient } from "../../../services/prismic";
import styles from "../style.module.scss";

interface postPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updated_at: string;
  };
}

export default function PostPreview({ post }: postPreviewProps) {
  const [session] = useSession();
  const Router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      Router.push(`/posts/${post.slug}`);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>{post.title} | ignews</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updated_at}</time>
          <div
            className={`${styles.post__content} ${styles.preview__content}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
          <div className={styles.continue__reading}>
            Wanna continue reading?
            <Link href="/">
              <a>Subscribe now</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();
  const response = await prismic.getByUID("posts", String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.text.splice(0, 2)),
    updated_at: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: { post },
    redirect: 60 * 30,
  };
};
