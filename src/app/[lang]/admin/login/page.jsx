import { redirect } from "next/navigation";
import { currentAdmin } from "../../../../lib/admin-auth";
import AdminLogin from "../../../../components/admin/AdminLogin";
export const dynamic="force-dynamic";
export const metadata={title:"GenData Tech | Admin Login",robots:{index:false,follow:false}};
export default async function Page({params}){
  const {lang}=await params;
  if(await currentAdmin()) redirect(`/${lang}/admin`);
  return <AdminLogin lang={lang}/>;
}
