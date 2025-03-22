(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[204],{9204:function(e,t,r){"use strict";r.r(t);var a=r(5893),s=r(7294),i=r(6064),n=r(1896),o=r(5697),l=r.n(o),c=r(1163),d=r(1417),u=r(1664),h=r.n(u);let Login=e=>{let{login:t,isAuthenticated:r}=e,[i,n]=(0,s.useState)({email:"",password:""}),[o,l]=(0,s.useState)(!1),[u,m]=(0,s.useState)(""),p=(0,c.useRouter)(),{email:g,password:x}=i,onChange=e=>n({...i,[e.target.name]:e.target.value}),onSubmit=async e=>{e.preventDefault(),l(!0),m("");try{await t(g,x)}catch(e){var r,a;m((null===(a=e.response)||void 0===a?void 0:null===(r=a.data)||void 0===r?void 0:r.message)||"Login failed. Please check your credentials."),l(!1)}};s.useEffect(()=>{r&&p.push("/dashboard")},[r,p]);let y={hidden:{y:20,opacity:0},visible:{y:0,opacity:1,transition:{duration:.5}}};return(0,a.jsxs)("div",{className:"min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-primary-dark to-primary-darker",children:[(0,a.jsxs)("div",{className:"absolute inset-0 overflow-hidden",children:[(0,a.jsx)("div",{className:"absolute top-1/4 left-10 w-20 h-20 opacity-10",children:(0,a.jsxs)("svg",{viewBox:"0 0 100 100",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,a.jsx)("circle",{cx:"50",cy:"50",r:"45",stroke:"#FFD700",strokeWidth:"2"}),(0,a.jsx)("path",{d:"M50 5L50 95",stroke:"#FFD700",strokeWidth:"1"}),(0,a.jsx)("path",{d:"M5 50L95 50",stroke:"#FFD700",strokeWidth:"1"})]})}),(0,a.jsx)("div",{className:"absolute bottom-1/4 right-10 w-32 h-32 opacity-10",children:(0,a.jsxs)("svg",{viewBox:"0 0 100 100",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,a.jsx)("circle",{cx:"50",cy:"50",r:"45",stroke:"#FFD700",strokeWidth:"2"}),(0,a.jsx)("circle",{cx:"50",cy:"50",r:"30",stroke:"#FFD700",strokeWidth:"1"}),(0,a.jsx)("circle",{cx:"50",cy:"50",r:"15",stroke:"#FFD700",strokeWidth:"1"})]})})]}),(0,a.jsxs)(d.E.div,{className:"glass-panel w-full max-w-md p-8 md:p-10",variants:{hidden:{opacity:0},visible:{opacity:1,transition:{duration:.6,when:"beforeChildren",staggerChildren:.2}}},initial:"hidden",animate:"visible",children:[(0,a.jsx)(d.E.div,{variants:y,children:(0,a.jsx)("h2",{className:"text-3xl md:text-4xl font-cinzel font-bold mb-6 text-center",children:"Return to Your Path"})}),u&&(0,a.jsx)(d.E.div,{className:"bg-red-500/20 border border-red-500/50 text-white p-3 rounded-lg mb-6",initial:{opacity:0,y:-10},animate:{opacity:1,y:0},children:u}),(0,a.jsxs)(d.E.form,{onSubmit:onSubmit,variants:y,children:[(0,a.jsxs)("div",{className:"mb-6",children:[(0,a.jsx)("label",{className:"block font-cinzel text-accent-gold mb-2",htmlFor:"email",children:"Email Address"}),(0,a.jsx)("input",{type:"email",id:"email",name:"email",value:g,onChange:onChange,required:!0,className:"w-full bg-white/5 border border-accent-gold/30 rounded-lg focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/50",placeholder:"Enter your email"})]}),(0,a.jsxs)("div",{className:"mb-8",children:[(0,a.jsx)("label",{className:"block font-cinzel text-accent-gold mb-2",htmlFor:"password",children:"Password"}),(0,a.jsx)("input",{type:"password",id:"password",name:"password",value:x,onChange:onChange,required:!0,className:"w-full bg-white/5 border border-accent-gold/30 rounded-lg focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/50",placeholder:"Enter your password"})]}),(0,a.jsx)(d.E.button,{type:"submit",className:"btn-primary w-full flex justify-center items-center",disabled:o,whileHover:{scale:1.03},whileTap:{scale:.98},children:o?(0,a.jsxs)("svg",{className:"animate-spin h-5 w-5 text-primary-dark",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[(0,a.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,a.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}):"Enter the Portal"})]}),(0,a.jsx)(d.E.div,{className:"mt-8 text-center text-white/80",variants:y,children:(0,a.jsxs)("p",{children:["Need to begin your journey?"," ",(0,a.jsx)(h(),{href:"/register",children:(0,a.jsx)("a",{className:"text-accent-gold hover:text-accent-gold-light transition-colors",children:"Sign up here"})})]})})]})]})};Login.propTypes={login:l().func.isRequired,isAuthenticated:l().bool},t.default=(0,i.$j)(e=>{var t;return{isAuthenticated:null===(t=e.auth)||void 0===t?void 0:t.isAuthenticated}},{login:n.x4})(Login)},1896:function(e,t,r){"use strict";r.d(t,{kS:function(){return logout},x4:function(){return login},z2:function(){return register}});let login=(e,t)=>async t=>{try{let r={data:{token:"sample-token",user:{email:e}}};return localStorage.setItem("token",r.data.token),t({type:"LOGIN_SUCCESS",payload:r.data}),!0}catch(e){return t({type:"LOGIN_FAIL"}),!1}},register=(e,t,r)=>async r=>{try{let a={data:{token:"sample-token",user:{name:e,email:t}}};return localStorage.setItem("token",a.data.token),r({type:"REGISTER_SUCCESS",payload:a.data}),!0}catch(e){return r({type:"REGISTER_FAIL"}),!1}},logout=()=>e=>{localStorage.removeItem("token"),e({type:"LOGOUT"})}},1163:function(e,t,r){e.exports=r(9974)}}]);