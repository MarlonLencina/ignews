import { GetStaticProps } from "next";
import { getPrismicClient } from "../../services/prismic";
import styles from "./style.module.scss";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";
import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  expect: string;
  updated_at: string;
}

interface PostsProps {
  posts: Post[];
}

const Pages = ({ posts }: PostsProps) => {
  return (
    <>
      <head>
        <title>Posts | ignews</title>
      </head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => {
            return (
              <Link key={post.title} href={`/posts/${post.slug}`}>
                <a href="">
                  <time>{post.updated_at}</time>
                  <strong>{post.title}</strong>
                  <p>{post.expect}</p>
                </a>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Pages;

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const res = await prismic.query(
    Prismic.Predicates.at("document.type", "posts"),
    {
      fetch: ["Posts.Title", "Posts.Text"],
      pageSize: 100,
    }
  );

  const posts = res.results.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      expect:
        post.data.text.find((content) => content.type === "paragraph")?.text ??
        "",
      updated_at: new Date(post.last_publication_date).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      ),
    };
  });

  console.log(posts);

  return {
    props: {
      posts,
    },
  };
};
