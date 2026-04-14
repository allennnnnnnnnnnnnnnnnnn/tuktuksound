import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "網站設定",
  type: "document",
  fields: [
    defineField({ name: "studioName", title: "工作室名稱", type: "string" }),
    defineField({ name: "homepageTitle", title: "首頁主標題", type: "string" }),
    defineField({ name: "homepageSubtitle", title: "首頁副標題", type: "string" }),
    defineField({ name: "heroImage", title: "首頁背景圖片", type: "image", options: { hotspot: true } }),
    defineField({ name: "aboutTitle", title: "關於頁標題（姓名）", type: "string" }),
    defineField({ name: "aboutRole", title: "關於頁職稱", type: "string" }),
    defineField({ name: "aboutBody", title: "關於頁個人介紹", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "aboutLocation", title: "所在地", type: "string" }),
    defineField({ name: "aboutFormat", title: "混音格式", type: "string" }),
    defineField({ name: "aboutDaw", title: "DAW 軟體", type: "string" }),
    defineField({ name: "aboutExpertise", title: "專業技能標籤", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "aboutCredits",
      title: "作品年表 Credits",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "year", title: "年份", type: "string" },
          { name: "title", title: "作品名稱", type: "string" },
          { name: "role", title: "擔任角色", type: "string" },
        ],
        preview: {
          select: { title: "title", subtitle: "year" },
        },
      }],
    }),
    defineField({ name: "contactEmail", title: "聯絡 Email", type: "string" }),
    defineField({ name: "instagramUrl", title: "Instagram 網址", type: "url" }),
    defineField({ name: "imdbUrl", title: "IMDb 網址", type: "url" }),
    defineField({ name: "vimeoUrl", title: "Vimeo 網址", type: "url" }),
  ],
});
