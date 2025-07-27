"use client";

import Image from "next/image";
import Tag from "@/components/Tag";
import Link from "next/link";
import Pagination from "../Pagination";
import keystaticConfig from "@/keystatic.config";
import { Entry } from "@keystatic/core/reader";
import { useSearchParams } from "next/navigation";

type BlogItem = {
  slug: string;
  entry: Omit<
    Entry<(typeof keystaticConfig)["collections"]["blogs"]>,
    "content"
  >;
};

type AuthorItem = {
  slug: string;
  entry: Entry<(typeof keystaticConfig)["collections"]["authors"]>;
};

export default function HomePage({
  blogs,
  authors,
}: {
  blogs: BlogItem[];
  authors: AuthorItem[];
}) {
  const authorMap = new Map(
    authors.map((author) => [author.slug, author.entry])
  );
  const blogsPerPage = 3;
  const searchParams = useSearchParams();
  const page = searchParams.get("page")
    ? parseInt(searchParams.get("page")!)
    : 1;

  const startIndex = (page - 1) * blogsPerPage;
  const endIndex = page * blogsPerPage;

  const pageBlogs = blogs.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col py-8 gap-6 px-4 sm:px-8 md:px-20 lg:px-40">
      {pageBlogs.map((blog, i) => {
        const author = authorMap.get(blog.entry.author);
        return (
          <div key={i} className="flex flex-col sm:flex-row gap-4">
            <div className="image min-w-[250px] min-h-[250px]">
              <Image
                src={`${blog.entry.cover}`}
                alt="cover"
                width={250}
                height={250}
                className="object-cover rounded-md cursor-pointer mx-auto h-full"
              />
            </div>
            <div className="text">
              <h1 className="text-2xl lg:text-3xl font-bold mb-2 hover:underline cursor-pointer text-center sm:text-start">
                <Link href={`/blogs/${blog.slug}`}>{blog.entry.title}</Link>
              </h1>
              <p className="text-xs text-gray-400 mb-4 text-center sm:text-start">
                {blog.entry.subTitle}
              </p>
              <div className="mb-4 flex items-center gap-2 justify-center sm:justify-start">
                <Image
                  src={`${author?.image}`}
                  alt="Author"
                  width={30}
                  height={30}
                  className="rounded-full min-w-[30px] min-h-[30px] object-cover"
                />
                <Link href={`/authors/${blog.entry.author}`}>
                  <p className="text-sm hover:underline">{author?.name}</p>
                </Link>
              </div>
              <div className="flex justify-center sm:justify-start">
                <Tag tags={blog.entry.tags} />
              </div>
            </div>
          </div>
        );
      })}
      <Pagination totalBlogs={blogs.length} blogPerPage={blogsPerPage} />
    </div>
  );
}
