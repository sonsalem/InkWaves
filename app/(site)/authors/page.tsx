import { reader } from "../../reader";
import Image from "next/image";
import Link from "next/link";

export default async function AuthorsPage() {
  const authorsRaw = await reader.collections.authors.all();
  const authors = authorsRaw.map((author) => ({
    slug: author.slug,
    entry: {
      name: author.entry.name,
      image: author.entry.image,
      age: author.entry.age,
      city: author.entry.city,
    },
  }));

  return (
    <div className="px-4 sm:px-8 md:px-20 lg:px-40 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Authors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {authors.map((author) => (
          <Link
            key={author.slug}
            href={`/authors/${author.slug}`}
            className="flex flex-col items-center p-6 border rounded-lg hover:shadow-lg transition"
          >
            <Image
              src={author.entry.image || "/authors/default.jpg"}
              alt={author.entry.name}
              width={100}
              height={100}
              className="rounded-full object-cover mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{author.entry.name}</h2>
            <p className="text-gray-500 mb-1">
              Age: {author.entry.age ?? "N/A"}
            </p>
            <p className="text-gray-500">
              City: {author.entry.city || "Unknown"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
