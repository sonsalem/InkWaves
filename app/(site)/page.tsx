import HomePage from "@/components/pages/Home";
import { reader } from "../reader";

export default async function Home() {
  const blogsRaw = await reader.collections.blogs.all();

  const blogs = blogsRaw.map((blog) => ({
    slug: blog.slug,
    entry: {
      title: blog.entry.title,
      subTitle: blog.entry.subTitle,
      cover: blog.entry.cover,
      tags: blog.entry.tags,
      author: blog.entry.author,
    },
  }));

  const authors = await reader.collections.authors.all();

  return <HomePage blogs={blogs} authors={authors} />;
}
