import { notFound } from "next/navigation";
import { getPublishedBlog } from "../../../../lib/public-blogs";
import PublicBlogArticle from "../../../../components/blog/PublicBlogArticle";
export const dynamic = "force-dynamic";
export default async function BlogDetailsPage({params}){
 const {lang,slug}=await params;
 const post=await getPublishedBlog(lang,slug);
 if(!post)notFound();
 return <PublicBlogArticle post={post} lang={lang}/>;
}
export async function generateMetadata({params}){
 const {lang,slug}=await params;
 const post=await getPublishedBlog(lang,slug);
 if(!post)return {title:"Article not found"};
 return {title:post.seoTitle||post.title,description:post.seoDescription||post.excerpt};
}
