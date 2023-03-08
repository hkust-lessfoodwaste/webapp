import{S as f,a as h}from"./request-b42560de.js";import{f as p,u as x,o as w,j as y,k as b,w as S,R as c,$ as d,l as e,s as k,v as L}from"./vue-router.esm-bundler-f47d5b1d.js";import{_ as C}from"./plugin-vueexport-helper-c27b6911.js";import{m as I}from"./useConfigInject-968d6b94.js";import"./index-82d2d7d1.js";const u=o=>(k("data-v-83886e74"),o=o(),L(),o),R={class:"page"},T=u(()=>e("div",{class:"header flex text-center items-center"},[e("div",{class:"w-full text-3xl font-bold text-white"},"HKUST Smart Canteen")],-1)),V=u(()=>e("div",{class:"text-center text-2xl font-bold my-8"},"Login",-1)),B={__name:"Login",setup(o){const s=p(""),a=p(""),n=x(),l=p(!1),_=async()=>{if(s.value.length===0||a.value.length===0){I.error("Please complete all fields");return}l.value=!0;let r=await h("post","login",{itsc:s.value,password:a.value});if(l.value=!1,r.error===!1){let t=r.result;localStorage.setItem("food_minus_app",JSON.stringify({token:t,itsc:s.value})),n.push({name:"Home",params:{needReload:!0}})}},m=()=>{n.push({path:"/register"})},g=()=>{n.push({path:"/forget-password"})};return(r,t)=>{const v=f;return w(),y("div",R,[b(v,{spinning:l.value,tip:"Logging in"},{default:S(()=>[T,V,c(e("input",{type:"text",class:"input",placeholder:"ITSC","onUpdate:modelValue":t[0]||(t[0]=i=>s.value=i)},null,512),[[d,s.value]]),c(e("input",{type:"password",class:"input",placeholder:"password","onUpdate:modelValue":t[1]||(t[1]=i=>a.value=i)},null,512),[[d,a.value]]),e("span",{class:"text-btn color-primary",onClick:g},"Forget password?"),e("div",{class:"btn-group"},[e("div",{class:"btn primary-btn bg-color-primary font-bold",onClick:_}," Login "),e("div",{class:"btn secondary-btn color-primary font-bold",onClick:m}," Signup ")])]),_:1},8,["spinning"])])}}},D=C(B,[["__scopeId","data-v-83886e74"]]);export{D as default};
