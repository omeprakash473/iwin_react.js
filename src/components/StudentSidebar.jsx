import React,{useState} from 'react';
import Link from './Link.jsx';
const navigation=[
 ['90d04.svg','Dashboard','/dashboard'],['126d0.svg','My Assessments','/dashboard#dashboard-assessments'],['76fd4.svg','My Reports',null],
 ['ce9cd.svg','Career Explorer','/career-guidance'],['4c147.svg','Courses & Colleges','/guidance-for-higher-studies'],['a4757.svg','Entrance Exams','/competitive-exam-preparation'],
 ['d1710.svg','My Development Plan','/skills-development-programs'],['8f18b.svg','Career Counselling','/contact'],['b9165.svg','Events & Workshops','/dashboard#dashboard-events'],['e9f24.svg','Parent Connect','/parents-concerns'],['2de9f.svg','Settings','/profile'],
];
export default function StudentSidebar({onReports, activeItem='My Assessments', compact=false}) {
 const [open,setOpen]=useState(false);
 const items=compact?navigation.slice(0,4):navigation;
 return <><button type="button" className="student-sidebar-toggle" aria-expanded={open} aria-controls="student-sidebar" onClick={()=>setOpen(value=>!value)}>☰ Student menu</button>
 <aside id="student-sidebar" className={'student-sidebar'+(open?' is-open':'')}><nav aria-label="Student navigation">{items.map(([icon,label,href])=>href?<Link className={label===activeItem?'active':''} href={href} key={label} onClick={()=>setOpen(false)} aria-current={label===activeItem?'page':undefined}><img src={import.meta.env.BASE_URL+'assets/dashboard/'+icon} alt=""/>{label}</Link>:<button type="button" key={label} onClick={()=>{setOpen(false);onReports?.();}}><img src={import.meta.env.BASE_URL+'assets/dashboard/'+icon} alt=""/>{label}</button>)}</nav></aside></>;
}
