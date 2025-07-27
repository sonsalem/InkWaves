import { reader } from "../../../reader";
import Image from "next/image";

export default async function AuthorPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const author = await reader.collections.authors.read(slug);

  if (!author) {
    return <div className="px-4 py-8 text-center">Author not found.</div>;
  }

  return (
    <div className="px-4 sm:px-8 md:px-20 lg:px-40 py-8 gap-8 flex items-center">
      <Image
        src={author.image || "/authors/default.jpg"}
        alt={author.name}
        width={150}
        height={150}
        className="rounded-md object-cover mb-4 w-[300px] h-[300px]"
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold mb-2">{author.name}</h1>
        <p className="text-gray-500 mb-1">Age: {author.age ?? "N/A"}</p>
        <p className="text-gray-500">City: {author.city || "Unknown"}</p>
      </div>
    </div>
  );
}
