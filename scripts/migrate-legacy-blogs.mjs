// One-time migration of the six legacy blog summaries to Firestore as DRAFTS.
// Run locally with a valid GOOGLE_APPLICATION_CREDENTIALS and GOOGLE_CLOUD_PROJECT.
// Existing CMS documents are never overwritten. Review and complete each article before publishing.
import {initializeApp,applicationDefault} from "firebase-admin/app";
import {getFirestore,FieldValue} from "firebase-admin/firestore";
const records = [
  {
    "slug": "agentic-ai-beyond-chatbots",
    "category": "Agentic AI",
    "title": "Agentic AI: Moving Beyond Traditional AI Assistants",
    "excerpt": "Explore how autonomous AI agents can reason, use tools and execute multi-step workflows beyond traditional conversational AI."
  },
  {
    "slug": "ai-automation-modern-business",
    "category": "AI Automation",
    "title": "How AI Automation Is Changing Modern Business",
    "excerpt": "A practical look at how intelligent automation can connect information, decisions and actions across business workflows."
  },
  {
    "slug": "iot-intelligent-connected-systems",
    "category": "IoT",
    "title": "From Connected Devices to Intelligent IoT Systems",
    "excerpt": "Discover how sensors, cloud platforms, automation and AI can work together to create smarter connected systems."
  },
  {
    "slug": "custom-ai-models-business",
    "category": "Artificial Intelligence",
    "title": "When Does a Business Need a Custom AI Model?",
    "excerpt": "Understand where custom AI development makes sense and why one-size-fits-all AI solutions are not always enough."
  },
  {
    "slug": "building-scalable-digital-products",
    "category": "Development",
    "title": "What Makes a Digital Product Scalable?",
    "excerpt": "Architecture, APIs, data and user experience all play a role in building software capable of growing with a business."
  },
  {
    "slug": "ai-data-real-world-intelligence",
    "category": "Data & AI",
    "title": "Turning Data Into Real-World Intelligence",
    "excerpt": "How structured data, machine learning and intelligent systems can transform information into useful decisions."
  }
];
const app=initializeApp({credential:applicationDefault(),projectId:process.env.GOOGLE_CLOUD_PROJECT});
const db=getFirestore(app);
for(const post of records){
 const ref=db.collection("cmsBlogs").doc("en_"+post.slug);
 const data={...post,language:"en",status:"draft",content:post.excerpt+"\n\n[Complete this migrated article before publishing.]",seoTitle:"",seoDescription:"",image:"",imageAlt:"",createdAt:FieldValue.serverTimestamp(),updatedAt:FieldValue.serverTimestamp(),publishedAt:null,createdBy:"migration",updatedBy:"migration"};
 try{await ref.create(data);console.log("Migrated draft:",post.slug)}
 catch(error){if(error.code===6||error.code==="already-exists")console.log("Already exists:",post.slug);else throw error}
}
console.log("Legacy migration completed. Review and publish articles in the admin CMS.");
