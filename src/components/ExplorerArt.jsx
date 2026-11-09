import React,{useLayoutEffect,useRef,useState} from 'react';
import artwork from '../data/explorerArt.json';
const base=import.meta.env.BASE_URL+'assets/career-explorer/';
// Each source SVG keeps its native root dimensions. Only its containing scene scales.
export default function ExplorerArt({name,width,className=''}) {
 const definition=artwork[name];const ref=useRef(null);const [scale,setScale]=useState(1);
 useLayoutEffect(()=>{
  if(!definition||!ref.current)return;
  const measure=()=>setScale(ref.current.getBoundingClientRect().width/definition.width);
  measure();const observer=new ResizeObserver(measure);observer.observe(ref.current);return()=>observer.disconnect();
 },[definition]);
 if(!definition)return null;
 return <span ref={ref} className={'explorer-art '+className} style={{width:width||definition.width,aspectRatio:definition.width/Math.max(definition.height,1)}} aria-hidden="true"><span style={{width:definition.width,height:definition.height,transform:`scale(${scale})`}}>{definition.layers.map((layer,index)=><img src={base+layer.file} key={index} alt="" style={{left:layer.x,top:layer.y}}/>)}</span></span>;
}
export function ExplorerIcon({file}) {return <img className="explorer-source-icon" src={base+file} alt=""/>;}
