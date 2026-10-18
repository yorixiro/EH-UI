import React, {createContext, useContext, useMemo, useState, type ReactNode} from "react";
import {Pressable, ScrollView, Text, TextInput, View, useWindowDimensions} from "react-native";
import {themes, type ThemeKey} from "../theme/themes";
import Starfield from "../components/chat/Starfield";
import EridaniOrbits from "../components/chat/EridaniOrbits";
import StaticOrbits from "../components/chat/StaticOrbits";
import ThemeBackground from "../components/decor/ThemeBackground";
import CelestialAtlas from "../components/achernar/CelestialAtlas";
import BlackHoleGrid from "../components/achernar/BlackHoleGrid";
import MiniGlyph from "../components/achernar/MiniGlyph";
import EmotionStar from "../components/achernar/EmotionStar";
import CornerBrackets from "../components/decor/CornerBrackets";
import CrtScanlines from "../components/decor/CrtScanlines";
import ThemeDivider from "../components/decor/ThemeDivider";
import {EhFrame, EhCut, EhWave, EhBarcode, EhDataRow, EhRadiation, EhGridCross, EhWindArcs, EhCompass, EhVoiceWave, EhHeartline, EhVoyBackdrop, EhRuler, EhDotMatrix, ehOutline, ehSlashes, ehBars, EhPixelSky} from "../components/decor/EhParts";
import HudHeader from "../components/chat/HudHeader";
import StatusStar from "../components/chat/StatusStar";
import TimeSeparator from "../components/chat/TimeSeparator";
import ThinkingIndicator from "../components/chat/ThinkingIndicator";
import MessageBubble from "../components/chat/MessageBubble";
import InputBar from "../components/chat/InputBar";
import UsageGauge from "../components/bridge/UsageGauge";

type C = {name:string; category:string; path:string; height?:number; render:()=>ReactNode};
const glyphs=["satellite","constellation-a","constellation-b","ripple","compass","timeline","hexnet","nebula"] as const;
const backdrops=["radiation","gauge","trace","causal","radar","wind","compassNav","sonar","pages","drift","beacon","shelf","bubbles","pulse"] as const;
const source="https://github.com/yorixiro/EH-UI/blob/main/";
const B="#60a8ff";
function Chat({role}:{role:"user"|"assistant"}) {
  return <View style={{width:"100%",paddingHorizontal:12}}><MessageBubble message={{
    id:"showcase-"+role,role,status:"sent",ts:"2026-10-18T10:10:00Z",
    text:role==="user"?"This is the ORIGINAL EH-UI message component.":"**SIGNAL RECEIVED**\n\n原版 MessageBubble.tsx，保留原始样式、排版与动效。"
  } as any}/></View>;
}
function Composer(){const [sent,setSent]=useState("");return <View style={{width:"100%"}}><InputBar onSend={setSent}/>{sent?<Text style={{fontSize:11,color:"#75d879",padding:10}}>已发送到本地演示：{sent}</Text>:null}</View>}
const stories:C[]=[
 {name:"Starfield · BLACKHOLE",category:"星场",path:"components/chat/Starfield.tsx",height:340,render:()=> <Starfield scene="blackhole"/>},
 {name:"Starfield · CURSA",category:"星场",path:"components/chat/Starfield.tsx",height:340,render:()=> <Starfield scene="cursa"/>},
 {name:"Starfield · HORIZON",category:"星场",path:"components/chat/Starfield.tsx",height:340,render:()=> <Starfield scene="horizon"/>},
 {name:"EridaniOrbits · 动态轨道",category:"星场",path:"components/chat/EridaniOrbits.tsx",height:320,render:()=> <EridaniOrbits/>},
 {name:"StaticOrbits · HOME",category:"星场",path:"components/chat/StaticOrbits.tsx",height:290,render:()=> <StaticOrbits side="right" theme="home"/>},
 {name:"StaticOrbits · CURSA",category:"星场",path:"components/chat/StaticOrbits.tsx",height:290,render:()=> <StaticOrbits side="left" theme="cursa"/>},
 {name:"ThemeBackground",category:"星场",path:"components/decor/ThemeBackground.tsx",height:290,render:()=> <ThemeBackground scene="blackhole" orbitSlot="static-right-home"/>},
 {name:"EhPixelSky · STANDARD",category:"星场",path:"components/decor/EhParts.tsx",height:280,render:()=> <EhPixelSky/>},
 {name:"EhPixelSky · RICH",category:"星场",path:"components/decor/EhParts.tsx",height:280,render:()=> <EhPixelSky rich/>},
 {name:"CelestialAtlas",category:"星场",path:"components/achernar/CelestialAtlas.tsx",height:230,render:()=> <CelestialAtlas width={400} height={230}/>},
 {name:"CelestialAtlas · MONO",category:"星场",path:"components/achernar/CelestialAtlas.tsx",height:230,render:()=> <CelestialAtlas width={400} height={230} mono/>},
 {name:"BlackHoleGrid",category:"星场",path:"components/achernar/BlackHoleGrid.tsx",height:220,render:()=> <BlackHoleGrid/>},
 ...glyphs.map((type):C=>({name:"MiniGlyph · "+type,category:"天文纹样",path:"components/achernar/MiniGlyph.tsx",height:210,render:()=> <MiniGlyph type={type}/> })),
 ...backdrops.map((type):C=>({name:"EhVoyBackdrop · "+type,category:"天文纹样",path:"components/decor/EhParts.tsx",height:200,render:()=> <View style={{width:"100%",height:"100%",position:"relative"}}><EhVoyBackdrop type={type}/></View>})),
 {name:"EhFrame + ehOutline",category:"装饰五金",path:"components/decor/EhParts.tsx",render:()=> <View style={{height:108,width:"82%",position:"relative",justifyContent:"center",alignItems:"center"}}><EhFrame draw={(w,h)=><><path d={ehOutline(w,h,{tl:11,tr:22,bl:17,br:11})} stroke="#b8cbe8" fill="none" strokeWidth={1}/>{ehSlashes(18,19,5)}{ehBars(40,w-20,h-15,6)}</>}/><Text style={{color:"#becadd",fontSize:12}}>FRAME / ORIGINAL</Text></View>},
 {name:"EhCut",category:"装饰五金",path:"components/decor/EhParts.tsx",render:()=> <View style={{position:"relative",width:220,height:88,borderColor:"#b0bacb",borderWidth:1}}><EhCut corner="tr" n={18}/></View>},
 {name:"CornerBrackets",category:"装饰五金",path:"components/decor/CornerBrackets.tsx",render:()=> <View style={{position:"relative",width:"76%",height:105}}><CornerBrackets size={20}/></View>},
 {name:"ThemeDivider · ORNATE",category:"装饰五金",path:"components/decor/ThemeDivider.tsx",render:()=> <View style={{width:"85%"}}><ThemeDivider variant="ornate"/></View>},
 {name:"ThemeDivider · LINE",category:"装饰五金",path:"components/decor/ThemeDivider.tsx",render:()=> <View style={{width:"85%"}}><ThemeDivider variant="line"/></View>},
 {name:"EhWave",category:"装饰五金",path:"components/decor/EhParts.tsx",render:()=> <EhWave bars={26} height={36} tint="#b7c8e8"/>},
 {name:"EhBarcode",category:"装饰五金",path:"components/decor/EhParts.tsx",render:()=> <EhBarcode width={220} height={42} tint="#b7c8e8"/>},
 {name:"EhDataRow",category:"装饰五金",path:"components/decor/EhParts.tsx",render:()=> <EhDataRow items={[["SIGNAL","OK"],["CHANNEL","010"],["SYNC","98.6%"]]}/>},
 {name:"EhRadiation",category:"装饰五金",path:"components/decor/EhParts.tsx",render:()=> <EhRadiation size={90} tint="#b7c8e8"/>},
 {name:"EhGridCross",category:"装饰五金",path:"components/decor/EhParts.tsx",render:()=> <EhGridCross size={84} tint="#b7c8e8"/>},
 {name:"EhWindArcs",category:"装饰五金",path:"components/decor/EhParts.tsx",render:()=> <EhWindArcs width={190} height={90} tint="#b7c8e8"/>},
 {name:"EhCompass",category:"装饰五金",path:"components/decor/EhParts.tsx",render:()=> <EhCompass size={92} tint="#b7c8e8"/>},
 {name:"EhVoiceWave",category:"装饰五金",path:"components/decor/EhParts.tsx",render:()=> <EhVoiceWave width={20} height={100} tint="#b7c8e8"/>},
 {name:"EhHeartline",category:"装饰五金",path:"components/decor/EhParts.tsx",render:()=> <EhHeartline width={220} height={48} tint="#b7c8e8"/>},
 {name:"EhRuler",category:"装饰五金",path:"components/decor/EhParts.tsx",render:()=> <EhRuler width={245} height={32} tint="#b7c8e8"/>},
 {name:"EhDotMatrix",category:"装饰五金",path:"components/decor/EhParts.tsx",render:()=> <EhDotMatrix cols={16} rows={9} dotSize={3} gap={4} tint="#b7c8e8"/>},
 {name:"CrtScanlines",category:"装饰五金",path:"components/decor/CrtScanlines.tsx",render:()=> <View style={{position:"relative",width:"92%",height:110,backgroundColor:"#0c1026",justifyContent:"center",alignItems:"center"}}><Text style={{color:"#a6c8ee",fontSize:13}}>CRT SCANLINES</Text><CrtScanlines enabled/></View>},
 {name:"MessageBubble · USER",category:"通信",path:"components/chat/MessageBubble.tsx",height:210,render:()=> <Chat role="user"/>},
 {name:"MessageBubble · ASSISTANT",category:"通信",path:"components/chat/MessageBubble.tsx",height:210,render:()=> <Chat role="assistant"/>},
 {name:"InputBar · 原版可输入",category:"通信",path:"components/chat/InputBar.tsx",height:190,render:()=> <Composer/>},
 {name:"ThinkingIndicator · EPSILON",category:"通信",path:"components/chat/ThinkingIndicator.tsx",height:160,render:()=> <ThinkingIndicator forceShow variant="epsilon"/>},
 {name:"ThinkingIndicator · CURSA",category:"通信",path:"components/chat/ThinkingIndicator.tsx",height:160,render:()=> <ThinkingIndicator forceShow variant="cursa"/>},
 {name:"TimeSeparator",category:"通信",path:"components/chat/TimeSeparator.tsx",height:120,render:()=> <TimeSeparator date="OCTOBER 18 · 2026"/>},
 {name:"HudHeader · EPSILON",category:"仪表",path:"components/chat/HudHeader.tsx",height:230,render:()=> <HudHeader connected variant="epsilon"/>},
 {name:"HudHeader · CURSA",category:"仪表",path:"components/chat/HudHeader.tsx",height:230,render:()=> <HudHeader connected variant="cursa"/>},
 {name:"StatusStar · ONLINE",category:"仪表",path:"components/chat/StatusStar.tsx",height:130,render:()=> <StatusStar connected/>},
 {name:"StatusStar · OFFLINE",category:"仪表",path:"components/chat/StatusStar.tsx",height:130,render:()=> <StatusStar connected={false}/>},
 {name:"UsageGauge · NORMAL",category:"仪表",path:"components/bridge/UsageGauge.tsx",height:175,render:()=> <UsageGauge label="Session" windowLabel="5 HOUR" utilization={44}/>},
 {name:"UsageGauge · WARNING",category:"仪表",path:"components/bridge/UsageGauge.tsx",height:175,render:()=> <UsageGauge label="Quota" windowLabel="1 WEEK" utilization={86}/>},
 {name:"EmotionStar · POSITIVE",category:"仪表",path:"components/achernar/EmotionStar.tsx",height:120,render:()=> <EmotionStar m={{importance:5,valence:.9,arousal:.8} as any} size={35}/>},
 {name:"EmotionStar · NEGATIVE",category:"仪表",path:"components/achernar/EmotionStar.tsx",height:120,render:()=> <EmotionStar m={{importance:4,valence:-.8,arousal:.25} as any} size={35}/>},
];
const cats=["全部","星场","天文纹样","装饰五金","通信","仪表"];
function Board(){const [themeKey,setThemeKey]=useState<ThemeKey>("eventHorizon");const [cat,setCat]=useState("全部");const [q,setQ]=useState("");const [page,setPage]=useState(0);const {width}=useWindowDimensions();const mobile=width<740;const t=themes[themeKey];const filtered=stories.filter(s=>(cat==="全部"||s.category===cat)&&(!q||[s.name,s.path].join(" ").toLowerCase().includes(q.toLowerCase())));const subset=filtered.slice(page*8,page*8+8);
const btn=(label:string,fn:()=>void,active=false)=><Pressable key={label} onPress={fn} style={{borderWidth:1,borderColor:active?t.primary:t.border,paddingVertical:10,paddingHorizontal:14,marginRight:7,marginBottom:9,backgroundColor:active?t.bgBubbleAssistant:t.bgCard}}><Text style={{color:active?t.primary:t.textDim,fontSize:11,letterSpacing:.7}}>{label}</Text></Pressable>;
return <View style={{flex:1,backgroundColor:t.bg,minHeight:"100%"}}>
 <ScrollView style={{flex:1}} contentContainerStyle={{paddingHorizontal:mobile?15:36,paddingTop:40,paddingBottom:75,maxWidth:1500,width:"100%",alignSelf:"center"}}>
 <Text style={{color:t.primary,fontSize:10,letterSpacing:3}}>ERI / ORIGINAL SOURCE COMPONENTS</Text>
 <Text style={{color:t.text,fontSize:mobile?25:38,fontWeight:"600",marginTop:12,letterSpacing:1}}>EH-UI · COMPONENT ATLAS</Text>
 <Text style={{color:t.textDim,fontSize:13,marginTop:10,lineHeight:22}}>直接挂载 yorixiro/EH-UI 的原始 TSX / React Native Web 组件。非 HTML 重绘。共 {stories.length} 个实例。</Text>
 <View style={{flexDirection:"row",flexWrap:"wrap",marginTop:24}}>{btn("EVENT HORIZON",()=>{setThemeKey("eventHorizon");setPage(0)},themeKey==="eventHorizon")}{btn("DEEP SPACE",()=>{setThemeKey("deepSpace");setPage(0)},themeKey==="deepSpace")}</View>
 <TextInput style={{backgroundColor:t.bgInput,borderWidth:1,borderColor:t.borderFocus,color:t.text,fontSize:14,padding:13,marginTop:9,marginBottom:19}} placeholder="搜索组件名称 / 源码路径…" placeholderTextColor={t.textMuted} value={q} onChangeText={v=>{setQ(v);setPage(0)}}/>
 <View style={{flexDirection:"row",flexWrap:"wrap"}}>{cats.map(x=>btn(x,()=>{setCat(x);setPage(0)},cat===x))}</View>
 <Text style={{color:t.textMuted,fontSize:11,marginVertical:16}}>RESULTS {filtered.length} · PAGE {page+1} / {Math.max(1,Math.ceil(filtered.length/8))}</Text>
 <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"space-between"}}>
 {subset.map((s,i)=><View key={s.name} style={{width:mobile?"100%":"49%",marginBottom:16,borderWidth:1,borderColor:t.border,backgroundColor:t.bgCard}}>
 <View style={{padding:15}}><Text style={{color:t.text,fontSize:13,fontWeight:"600"}}>{s.name}</Text><Text style={{color:t.textMuted,fontSize:9,marginTop:7}}>{s.path}</Text></View>
 <View style={{borderTopWidth:1,borderTopColor:t.border,height:s.height??160,position:"relative",overflow:"hidden",justifyContent:"center",alignItems:"center"}}>{s.render()}</View>
 </View>)}</View>
 <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:14}}>{btn("← PREVIOUS",()=>setPage(p=>Math.max(0,p-1)),false)}{btn("NEXT →",()=>setPage(p=>Math.min(Math.ceil(filtered.length/8)-1,p+1)),false)}</View>
 <Text style={{color:t.textMuted,fontSize:11,marginTop:23,lineHeight:20}}>原始 SVG、动效、主题令牌都来自仓库源码；部分组件依赖演示数据。 AGPL-3.0.</Text>
 </ScrollView>
 </View>;
}
export default function OriginalAtlas(){return <Board/>;}
