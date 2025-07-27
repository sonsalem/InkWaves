import { reader } from "@/app/reader";
import Tag from "@/components/Tag";
import { markdocConfig } from "@/keystatic.config";
import Markdoc from "@markdoc/markdoc";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const blog = await reader.collections.blogs.read(slug);

  if (!blog) return <div>Not Found</div>;

  const author = await reader.collections.authors.read(`${blog.author}`);
  const { node } = await blog.content();

  const errors = Markdoc.validate(node, markdocConfig);
  if (errors.length) {
    console.error(errors);
    throw new Error("Invalid content");
  }

  const renderable = Markdoc.transform(node, markdocConfig);

  return (
    <div className="flex flex-col gap-8 py-8 px-4 sm:px-8 md:px-20 lg:px-40">
      <div className="flex gap-10 justify-between items-center">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl lg:text-5xl mb-4 font-bold">
            {blog.title}
          </h1>
          <p className="text-gray-400 mb-4 text-center sm:text-start">
            {blog.subTitle}
          </p>
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              {author?.image && (
                <Image
                  src={author.image}
                  alt="Author"
                  width={50}
                  height={50}
                  className="rounded-full min-w-[50px] min-h-[50px] object-cover"
                />
              )}
              <Link href={`/authors/${blog.author}`}>
                <p className="text-sm hover:underline">{author?.name}</p>
              </Link>
            </div>
            {blog.tags && <Tag tags={blog.tags} />}
          </div>
        </div>
        {blog.cover && (
          <div className="relative h-[400px] w-[500px]">
            <Image
              src={blog.cover}
              alt="Cover"
              fill
              className="object-cover rounded-md"
            />
          </div>
        )}
      </div>
      {Markdoc.renderers.react(renderable, React)}
    </div>
  );
};

export default page;
