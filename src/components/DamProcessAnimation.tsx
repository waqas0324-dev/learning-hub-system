import React,{useEffect,useState}from'react';
import{Pause,Play,RotateCcw}from'lucide-react';
import{useApp}from'../contexts/AppContext';
const steps=[
 ['Reservoir','ذخیرہ','Rain and river water collect behind the dam wall.'],
 ['Intake + penstock','پانی کا راستہ','Gates control the intake; water moves through a pressure pipe.'],
 ['Turbine','ٹربائن','Fast-moving water pushes turbine blades and turns the shaft.'],
 ['Generator','جنریٹر','The spinning shaft drives a generator that converts mechanical energy into electricity.'],
 ['Tailrace','واپسی کا بہاؤ','Water leaves the turbine and continues downstream.']
];
function T({en,ur}:{en:string;ur:string}){const{language}=useApp();if(language==='ur')return <span className="font-urdu" dir="rtl">{ur}</span>;if(language==='both')return <><span>{en}</span><span className="block font-urdu mt-1" dir="rtl">{ur}</span></>;return <span>{en}</span>}
export function DamProcessAnimation(){
 const{language}=useApp();const[step,setStep]=useState(0);const[playing,setPlaying]=useState(true);
 useEffect(()=>{if(!playing)return;const id=window.setInterval(()=>setStep(s=>(s+1)%steps.length),2400);return()=>clearInterval(id)},[playing]);
 return <section className="dam-lab-card">
  <div className="dam-lab-head"><div><div className="dam-kicker">ENGINEERING LAB • DAM → HYDROPOWER</div><h2><T en="Watch water become electricity" ur="دیکھیں پانی بجلی میں کیسے بدلتا ہے"/></h2><p><T en="Follow the complete path: reservoir → intake → penstock → turbine → generator → river." ur="مکمل راستہ دیکھیں: ذخیرہ → intake → penstock → ٹربائن → جنریٹر → دریا۔"/></p></div><span>{step+1}/5</span></div>
  <div className={`dam-scene dam-step-${step}`}>
   <div className="dam-sky"/><div className="dam-mountain m1"/><div className="dam-mountain m2"/>
   <div className="dam-reservoir"><div className="dam-wave w1"/><div className="dam-wave w2"/><b>RESERVOIR</b></div>
   <div className="dam-wall"><div className="dam-spillway"/><div className="dam-intake"/><div className="dam-pipe"/><div className="dam-turbine"><i/><i/><i/></div></div>
   <div className="dam-powerhouse"><div className="dam-generator"><i/></div><strong>GENERATOR</strong></div>
   <div className="dam-tailrace"><div className="dam-flow"/></div>
   <div className="dam-electricity"><i/><i/><i/><span>⚡ GRID / POWER</span></div>
   <div className="dam-water-particles">{Array.from({length:12}).map((_,i)=><i key={i} style={{'--i':i}as React.CSSProperties}/>)}</div>
   <div className="dam-scene-label"><T en={steps[step][0]} ur={steps[step][1]}/></div>
  </div>
  <div className="dam-controls"><button onClick={()=>setPlaying(v=>!v)}>{playing?<Pause size={17}/>:<Play size={17}/>}<T en={playing?'Pause':'Play'} ur={playing?'روکیں':'چلائیں'}/></button><button onClick={()=>{setStep(0);setPlaying(false)}}><RotateCcw size={17}/><T en="Reset" ur="دوبارہ"/></button><div className="dam-dots">{steps.map((s,i)=><button key={i} onClick={()=>{setStep(i);setPlaying(false)}} className={i===step?'active':''}>{i+1}</button>)}</div></div>
  <div className="dam-lesson"><b>{step+1}</b><div><h3><T en={steps[step][0]} ur={steps[step][1]}/></h3><p>{steps[step][2]}</p></div></div>
 </section>
}
