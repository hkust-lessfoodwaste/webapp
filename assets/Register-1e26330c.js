import{S as h,a as w}from"./request-b42560de.js";import{f as l,u as y,o as S,j as b,k,w as R,R as p,$ as u,l as t,s as C,v as I}from"./vue-router.esm-bundler-f47d5b1d.js";import{_ as V}from"./plugin-vueexport-helper-c27b6911.js";import{m as v}from"./useConfigInject-968d6b94.js";import"./index-82d2d7d1.js";const _=n=>(C("data-v-e5d6b939"),n=n(),I(),n),U={class:"page"},N=_(()=>t("div",{class:"header flex text-center items-center"},[t("div",{class:"w-full text-3xl font-bold text-white"},"HKUST Smart Canteen")],-1)),T=_(()=>t("div",{class:"text-center text-2xl font-bold my-8"},"Sign up",-1)),B={__name:"Register",setup(n){const a=l(""),r=l(""),o=l(""),i=l(""),d=l(!1),f=async()=>{if(a.value.length===0||r.value.length===0||o.value.length===0||i.value.length===0){v.error("Please complete all fields");return}o.value!==i.value&&v.error("Passwords are not consistent"),d.value=!0;let c=await w("post","register",{itsc:a.value,name:r.value,password:o.value});if(d.value=!1,c.error===!1){let e=c.result;localStorage.setItem("food_minus_app",JSON.stringify({token:e,itsc:a.value})),m.push({name:"Home",params:{needReload:!0}})}},m=y(),g=()=>{m.push({path:"/login"})};return(c,e)=>{const x=h;return S(),b("div",U,[k(x,{spinning:d.value,tip:"Signing up"},{default:R(()=>[N,T,p(t("input",{type:"text",class:"input",placeholder:"ITSC","onUpdate:modelValue":e[0]||(e[0]=s=>a.value=s)},null,512),[[u,a.value]]),p(t("input",{type:"text",class:"input",placeholder:"Nickname","onUpdate:modelValue":e[1]||(e[1]=s=>r.value=s)},null,512),[[u,r.value]]),p(t("input",{type:"password",class:"input",placeholder:"Password","onUpdate:modelValue":e[2]||(e[2]=s=>o.value=s)},null,512),[[u,o.value]]),p(t("input",{type:"password",class:"input",placeholder:"Confirm password","onUpdate:modelValue":e[3]||(e[3]=s=>i.value=s)},null,512),[[u,i.value]]),t("span",{class:"text-btn color-primary",onClick:g},"Already have an account?"),t("div",{class:"btn-group"},[t("div",{class:"btn primary-btn bg-color-primary font-bold",onClick:f}," Signup ")])]),_:1},8,["spinning"])])}}},A=V(B,[["__scopeId","data-v-e5d6b939"]]);export{A as default};
