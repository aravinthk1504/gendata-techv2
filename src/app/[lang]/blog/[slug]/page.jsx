import { notFound } from "next/navigation";
import { getPublishedBlog } from "../../../../lib/public-blogs";
import PublicBlogArticle from "../../../../components/blog/PublicBlogArticle";
import JsonLd from "../../../../components/seo/JsonLd";
import { articleSchema } from "../../../../lib/json-ld.mjs";
import { SITE_NAME, defaultShareImage, openGraphLocale } from "../../../../lib/site.mjs";
import { isValidLanguage } from "../../../../i18n/config";
// Rendered on first visit, then cached and refreshed in the background.
export const revalidate = 300;
// No pages are built ahead of time; returning an empty list opts into on-demand ISR.
export async function generateStaticParams(){return [];}
export default async function BlogDetailsPage({params}){
 const {lang,slug}=await params;
 if(!isValidLanguage(lang))notFound();
 const post=await getPublishedBlog(lang,slug);
 if(!post)notFound();
 return <>
  <JsonLd data={articleSchema({lang,slug:post.slug,title:post.seoTitle||post.title,description:post.seoDescription||post.excerpt,image:post.image,publishedDate:post.publishedDate,updatedAt:post.updatedAt})}/>
  <PublicBlogArticle post={post} lang={lang}/>
 </>;
}
export async function generateMetadata({params}){
 const {lang,slug}=await params;
 if(!isValidLanguage(lang))return {title:"Article not found",robots:{index:false}};
 const post=await getPublishedBlog(lang,slug);
 if(!post)return {title:"Article not found",robots:{index:false}};
 const title=post.seoTitle||post.title;
 const description=post.seoDescription||post.excerpt;
 const path=`/${lang}/blog/${post.slug}`;
 return {
  title,
  description,
  // Articles exist in one language, so only a self-canonical is set (no hreflang).
  alternates:{canonical:path},
  openGraph:{
   type:"article",
   siteName:SITE_NAME,
   title,
   description,
   url:path,
   locale:openGraphLocale(lang),
   ...(post.publishedDate?{publishedTime:post.publishedDate}:{}),
   images:[post.image?{url:post.image,alt:post.imageAlt||post.title}:defaultShareImage(lang)],
  },
  twitter:{card:"summary_large_image",title,description,images:[post.image||defaultShareImage(lang).url]},
 };
}
