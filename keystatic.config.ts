import { config, fields, collection } from "@keystatic/core";
export const markdocConfig = fields.markdoc.createMarkdocConfig({});

export default config({
  storage: {
    kind: "github",
    repo: "sonsalem/InkWaves",
  },

  ui: {
    brand: {
      name: "InkWaves",
    },
  },
  collections: {
    blogs: collection({
      label: "Blogs",
      entryLayout: "content",
      slugField: "title",
      path: "content/blogs/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        subTitle: fields.text({ label: "Sub Title" }),
        cover: fields.image({
          label: "Cover",
          directory: "public/blogs",
          publicPath: "/blogs",
        }),
        author: fields.relationship({
          label: "Author",
          collection: "authors",
          validation: {
            isRequired: true,
          },
        }),
        tags: fields.array(
          fields.object({
            label: fields.text({ label: "Tag Label" }),

            isMain: fields.checkbox({
              label: "Main Tag",
              description: "Mark this tag as the primary tag",
              defaultValue: false,
            }),

            color: fields.select({
              label: "Color",
              defaultValue: "#38bdf8",
              options: [
                { label: "Sky Blue", value: "#38bdf8" },
                { label: "Emerald", value: "#10b981" },
                { label: "Amber", value: "#f59e0b" },
                { label: "Rose", value: "#f43f5e" },
                { label: "Indigo", value: "#6366f1" },
                { label: "Teal", value: "#14b8a6" },
                { label: "Slate", value: "#64748b" },
                { label: "Lime", value: "#84cc16" },
              ],
            }),
          }),
          {
            label: "Tags",
            itemLabel: (item) => item.fields.label.value || "Unnamed tag",
          }
        ),

        content: fields.markdoc({ label: "Content" }),
      },
    }),
    authors: collection({
      label: "Authors",
      entryLayout: "content",
      slugField: "name",
      path: "content/authors/*",
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        image: fields.image({
          label: "Cover",
          directory: "public/authors",
          publicPath: "/authors",
        }),
        age: fields.number({ label: "Age" }),
        city: fields.text({ label: "City" }),
      },
    }),
  },
});
