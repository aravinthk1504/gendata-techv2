import { redirect } from "next/navigation";
import { currentAdmin } from "../../../lib/admin-auth";
import { db } from "../../../lib/firebase-admin";
import AdminDashboard from "../../../components/admin/AdminDashboard";

export const dynamic="force-dynamic";
export const metadata={title:"GenData Tech | Admin",robots:{index:false,follow:false}};

export default async function AdminPage({params}) {
  const {lang}=await params;
  const user=await currentAdmin();
  if(!user) redirect(`/${lang}/admin/login`);
  const snap=await db.collection("enquiries").orderBy("createdAt","desc").limit(250).get();
  const enquiries=snap.docs.map(doc=>{
    const d=doc.data();
    return {
      id:doc.id,name:String(d.name||""),email:String(d.email||""),
      phone:String(d.phone||""),category:String(d.category||""),
      offering:String(d.offering||""),message:String(d.message||""),
      status:String(d.status||"new"),
      createdAt:d.createdAt?.toDate?.()?.toISOString()||null
    };
  });
  return <AdminDashboard enquiries={enquiries} lang={lang} adminEmail={user.email||""}/>;
}
