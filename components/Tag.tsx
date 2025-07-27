import keystaticConfig from "@/keystatic.config";
import { Entry } from "@keystatic/core/reader";

type BlogEntry = Entry<(typeof keystaticConfig)["collections"]["blogs"]>;
type TagsProps = BlogEntry["tags"];

const Tag = ({ tags }: { tags: TagsProps }) => {
  return (
    <div className="flex gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="px-2 py-1 text-xs rounded-sm"
          style={{ backgroundColor: tag.color }}
        >
          {tag.label}
        </span>
      ))}
    </div>
  );
};

export default Tag;
