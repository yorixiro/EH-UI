
import React,{useMemo,useState} from "react";
import {View,Text,Pressable,ScrollView,TextInput,useWindowDimensions} from "react-native";
import {AtlasThemeProvider} from "../hooks/useTheme";
import {themes,type ThemeKey} from "../theme/themes";
import Starfield from "../components/chat/Starfield";
import EridaniOrbits from "../components/chat/EridaniOrbits";
import StaticOrbits from "../components/chat/StaticOrbits";
import CelestialAtlas from "../components/achernar/CelestialAtlas";
import BlackHoleGrid from "../components/achernar/BlackHoleGrid";
import MiniGlyph from "../components/achernar/MiniGlyph";
import CornerBrackets from "../components/decor/CornerBrackets";
import CrtScanlines from "../components/decor/CrtScanlines";
import ThemeDivider from "../components/decor/ThemeDivider";
import {EhCut,EhWave,EhBarcode,EhDataRow,EhRadiation,EhGridCross,EhWindArcs,EhCompass,EhVoiceWave,EhHeartline,EhVoyBackdrop,EhRuler,EhDotMatrix,EhPixelSky,EhFrame,ehOutline,ehSlashes,ehBars} from "../components/decor/EhParts";
import MessageBubble from "../components/chat/MessageBubble";
import TimeSeparator from "../components/chat/TimeSeparator";
import ThinkingIndicator from "../components/chat/ThinkingIndicator";
import StatusStar from "../components/chat/StatusStar";
import UsageGauge from "../components/bridge/UsageGauge";
import EmotionStar from "../components/achernar/EmotionStar";
import InputBar from "../components/chat/InputBar";
import HudHeader from "../components/chat/HudHeader";

type Item={name:string;group:string;height?:number;render:()=>React.ReactNode;source:string};
const items:Item[]=[
 {name:"Starfield / BLACKHOLE",group:"星场",height:310,source:"components/chat/Starfield.tsx",render:()=> <Starfield scene="blackhole"/>},
 {name:"Starfield / CURSA",group:"星场",height:310,source:"components/chat/Starfield.tsx",render:()=> <Starfield scene="cursa"/>},
 {name:"Starfield / HORIZON",group:"星场",height:310,source:"components/chat/Starfield.tsx",render:()=> <Starfield scene="horizon"/>},
 {name:"EridaniOrbits / DYNAMIC",group:"轨道",height:300,source:"components/chat/EridaniOrbits.tsx",render:()=> <EridaniOrbits/>},
 ...(["home","cursa"] as const).map((type):Item=>({name:"StaticOrbits / "+type.toUpperCase(),group:"轨道",height:270,source:"components/chat/StaticOrbits.tsx",render:()=> <StaticOrbits side={type==="home"?"right":"left"} theme={type}/> })),
 {name:"CelestialAtlas / GOLD",group:"轨道",height:250,source:"components/achernar/CelestialAtlas.tsx",render:()=> <CelestialAtlas width={340} height={220}/>},
 {name:"CelestialAtlas / MONO",group:"轨道",height:250,source:"components/achernar/CelestialAtlas.tsx",render:()=> <CelestialAtlas width={340} height={220} mono/>},
 {name:"BlackHoleGrid",group:"轨道",height:220,source:"components/achernar/BlackHoleGrid.tsx",render:()=> <BlackHoleGrid/>},
 ...(["satellite","constellation-a","constellation-b","ripple","compass","timeline","hexnet","nebula"] as const).map((type):Item=>({name:"MiniGlyph / "+type,group:"矢量纹样",height:220,source:"components/achernar/MiniGlyph.tsx",render:()=> <MiniGlyph type={type}/> })),
 {name:"EhPixelSky / GHOST",group:"星场",height:280,source:"components/decor/EhParts.tsx",render:()=> <EhPixelSky/>},
 {name:"EhPixelSky / RICH",group:"星场",height:280,source:"components/decor/EhParts.tsx",render:()=> <EhPixelSky rich/>},
 {name:"EhFrame / BEVELLED",group:"组件五金",height:190,source:"components/decor/EhParts.tsx",render:()=> <View style={{position:"relative",width:"88%",height:125,justifyContent:"center",alignItems:"center"}}><EhFrame draw={(w,h)=><><path d={ehOutline(w,h,{tl:12,tr:18,bl:8,br:14})} fill="none" stroke="rgba(255,255,255,.68)"/>{ehSlashes(18,20,5)}{ehBars(45,w-35,h-15,5)}</>}/><Text style={{color:"#dae3f5",fontSize:12}}>ORIGINAL VECTOR PANEL</Text></View>},
 {name:"EhCut / TOP RIGHT",group:"组件五金",source:"components/decor/EhParts.tsx",render:()=> <View style={{position:"relative",height:100,width:"75%",borderWidth:1,borderColor:"#8195ab"}}><EhCut corner="tr" n={18}/></View>},
 {name:"CornerBrackets",group:"组件五金",source:"components/decor/CornerBrackets.tsx",render:()=> <View style={{position:"relative",height:100,width:"75%"}}><CornerBrackets size={20}/></View>},
 {name:"ThemeDivider / ORNATE",group:"组件五金",source:"components/decor/ThemeDivider.tsx",render:()=> <View style={{width:"85%"}}><ThemeDivider/></View>},
 {name:"ThemeDivider / LINE",group:"组件五金",source:"components/decor/ThemeDivider.tsx",render:()=> <View style={{width:"85%"}}><ThemeDivider variant="line"/></View>},
 {name:"CrtScanlines",group:"组件五金",source:"components/decor/CrtScanlines.tsx",render:()=> <CrtScanlines enabled/>},
 ...(["radiation","gauge","trace","causal","radar","wind","compassNav","sonar","pages","drift","beacon","shelf","bubbles","pulse"] as const).map((type):Item=>({name:"EhVoyBackdrop / "+type,group:"矢量纹样",height:185,source:"components/decor/EhParts.tsx",render:()=> <View style={{width:190,height:160,position:"relative"}}><EhVoyBackdrop type={type}/></View> })),
 {name:"EhWave",group:"数据仪表",source:"components/decor/EhParts.tsx",render:()=> <EhWave bars={26} height={30}/>},
 {name:"EhBarcode",group:"数据仪表",source:"components/decor/EhParts.tsx",render:()=> <EhBarcode width={140} height={30}/>},
 {name:"EhDataRow",group:"数据仪表",source:"components/decor/EhParts.tsx",render:()=> <EhDataRow items={[[ "SIGNAL","LOCKED" ],["DEPTH","019.4"],["CORE","OK"]]}/>},
 {name:"EhRadiation",group:"矢量纹样",source:"components/decor/EhParts.tsx",render:()=> <EhRadiation size={80}/>},
 {name:"EhGridCross",group:"矢量纹样",source:"components/decor/EhParts.tsx",render:()=> <EhGridCross size={90}/>},
 {name:"EhWindArcs",group:"矢量纹样",source:"components/decor/EhParts.tsx",render:()=> <EhWindArcs width={150} height={95}/>},
 {name:"EhCompass",group:"矢量纹样",source:"components/decor/EhParts.tsx",render:()=> <EhCompass size={100}/>},
 {name:"EhVoiceWave",group:"数据仪表",source:"components/decor/EhParts.tsx",render:()=> <EhVoiceWave width={15} height={100}/>},
 {name:"EhHeartline",group:"数据仪表",source:"components/decor/EhParts.tsx",render:()=> <EhHeartline width={210} height={42}/>},
 {name:"EhRuler",group:"数据仪表",source:"components/decor/EhParts.tsx",render:()=> <EhRuler width={170} height={24}/>},
 {name:"EhDotMatrix",group:"数据仪表",source:"components/decor/EhParts.tsx",render:()=> <EhDotMatrix cols={16} rows={5} dotSize={3}/>},
 ...(["user","assistant"] as const).map((role):Item=>({name:"MessageBubble / "+role,group:"聊天",height:240,source:"components/chat/MessageBubble.tsx",render:()=> <View style={{width:"100%",paddingHorizontal:10}}><MessageBubble message={{id:"preview-"+role,role,status:"sent",text:role==="user"?"测试一下，信号已发送。":"收到。**原生组件正在渲染**。",ts:"2026-10-18T12:00:00Z"} as any}/></View>})),
 {name:"TimeSeparator",group:"聊天",source:"components/chat/TimeSeparator.tsx",render:()=> <TimeSeparator date="2026 / OCT / 18"/>},
 {name:"ThinkingIndicator",group:"聊天",source:"components/chat/ThinkingIndicator.tsx",render:()=> <ThinkingIndicator forceShow/>},
 {name:"StatusStar",group:"数据仪表",source:"components/chat/StatusStar.tsx",render:()=> <StatusStar connected/>},
 {name:"UsageGauge",group:"数据仪表",source:"components/bridge/UsageGauge.tsx",render:()=> <UsageGauge label="SIGNAL" utilization={52} windowLabel="5H"/>},
 {name:"EmotionStar",group:"矢量纹样",source:"components/achernar/EmotionStar.tsx",render:()=> <EmotionStar m={{valence:0.8,arousal:0.7,importance:5} as any} size={44}/>},
 {name:"HudHeader",group:"数据仪表",height:260,source:"components/chat/HudHeader.tsx",render:()=> <HudHeader connected/>},
 {name:"InputBar",group:"聊天",height:190,source:"components/chat/InputBar.tsx",render:()=> <View style={{width:"100%"}}><InputBar onSend={()=>{}}/></View>},
];
const groups=["全部","星场","轨道","矢量纹样","组件五金","数据仪表","聊天"];
function Button({text,onPress,active}:{text:string;onPress:()=>void;active?:boolean}) {return <Pressable onPress={onPress} style={{paddingVertical:12,paddingHorizontal:15,backgroundColor:active?"rgba(96,168,255,.2)":"rgba(110,135,180,.06)",borderWidth:1,borderColor:active?"#60a8ff":"rgba(150,165,195,.2)",marginRight:9,marginBottom:9}}><Text style={{fontSize:11,color:active?"#a3cdff":"#bcc4d8"}}>{text}</Text></Pressable>}
export default function OriginalAtlas(){
 const [theme,setTheme]=useState<ThemeKey>("eventHorizon");
 const [category,setCategory]=useState("全部");const [q,setQ]=useState("");const [show,setShow]=useState(12);
 const {width}=useWindowDimensions();const t=themes[theme];
 const filtered=useMemo(()=>items.filter(x=>(category==="全部"||x.group===category)&&(!q||[x.name,x.source,x.group].join(" ").toLowerCase().includes(q.toLowerCase()))),[category,q]);
 return <View style={{flex:1,backgroundColor:t.bg}}><ScrollView contentContainerStyle={{padding:width<600?16:40,paddingBottom:100}}>
  <Text style={{color:t.textMuted,fontSize:11,letterSpacing:3,marginBottom:12}}>ERIDANUS / SOURCE-GROUNDED SHOWCASE</Text>
  <Text style={{color:t.text,fontSize:width<500?25:39,fontWeight:"700",letterSpacing:2,marginBottom:10}}>ORIGINAL COMPONENT ATLAS</Text>
  <Text style={{color:t.textDim,fontSize:12,lineHeight:22,marginBottom:25}}>直接渲染作者的 React Native Web / Expo TSX 模块，非手绘 HTML。原组件源码未作修改。仅展示所选组件；复杂的语音、服务与整页功能仍属于原应用。</Text>
  <View style={{flexDirection:"row",flexWrap:"wrap",marginBottom:15}}><Button text="EVENT HORIZON" active={theme==="eventHorizon"} onPress={()=>setTheme("eventHorizon")}/><Button text="DEEP SPACE" active={theme==="deepSpace"} onPress={()=>setTheme("deepSpace")}/></View>
  <TextInput style={{borderWidth:1,borderColor:t.border,padding:13,color:t.text,marginBottom:20,fontSize:15}} value={q} onChangeText={v=>{setQ(v);setShow(12)}} placeholder="搜索原版组件" placeholderTextColor={t.textMuted}/>
  <View style={{flexDirection:"row",flexWrap:"wrap",marginBottom:20}}>{groups.map(x=><Button key={x} text={x} active={category===x} onPress={()=>{setCategory(x);setShow(12)}}/>)}</View>
  <Text style={{fontSize:10,color:t.textMuted,marginBottom:16}}>{filtered.length} ORIGINAL STORIES / {theme.toUpperCase()}</Text>
  <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"space-between"}}>{filtered.slice(0,show).map((item,i)=><View key={item.name+i} style={{width:width>900?"48.5%":"100%",borderWidth:1,borderColor:t.border,backgroundColor:t.bgCard,marginBottom:17}}>
    <Text style={{color:t.text,fontSize:13,letterSpacing:1,padding:15}}>{item.name}</Text>
    <AtlasThemeProvider themeKey={theme}><View style={{height:item.height??165,position:"relative",overflow:"hidden",alignItems:"center",justifyContent:"center",borderTopWidth:1,borderColor:t.border}}>{item.render()}</View></AtlasThemeProvider>
    <Text selectable style={{color:t.textMuted,fontSize:9,padding:11}}>{item.source}</Text></View>)}</View>
  {show<filtered.length?<Button text={"SHOW MORE / "+show+" OF "+filtered.length} onPress={()=>setShow(v=>v+12)}/>:null}
  <Text style={{color:t.textMuted,fontSize:10,marginTop:38}}>SOURCE: github.com/yorixiro/EH-UI  ·  AGPL-3.0</Text>
 </ScrollView></View>
}
