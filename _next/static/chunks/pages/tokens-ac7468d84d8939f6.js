(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[64],{8801:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tokens",function(){return t(2490)}])},9218:function(e,n,t){"use strict";t.d(n,{$i:function(){return T},A8:function(){return N},Ai:function(){return h},Cy:function(){return c},LY:function(){return g},M7:function(){return f},Ms:function(){return d},Nv:function(){return u},Ny:function(){return s},Qj:function(){return o},S4:function(){return A},TS:function(){return y},VK:function(){return E},XP:function(){return i},YY:function(){return a},Zt:function(){return v},bp:function(){return r},cS:function(){return _},e0:function(){return m},ek:function(){return x},h6:function(){return p},pp:function(){return l},qY:function(){return w},ud:function(){return R},y2:function(){return k}});var r="REGISTER_SUCCESS",a="REGISTER_FAIL",c="USER_LOADED",s="AUTH_ERROR",i="LOGIN_SUCCESS",o="LOGIN_FAIL",u="LOGOUT",l="CLEAR_ERRORS",d="GET_READING_TYPES",f="READING_TYPES_ERROR",p="GENERATE_READING",m="READING_ERROR",h="GET_READINGS",g="GET_READING",x="CLEAR_READING",_="SET_LOADING",E="GET_TOKEN_PACKAGES",N="TOKEN_PACKAGES_ERROR",R="CREATE_PAYMENT_INTENT",y="PAYMENT_INTENT_ERROR",k="CONFIRM_PURCHASE",T="PURCHASE_ERROR",A="GET_TRANSACTIONS",w="TRANSACTIONS_ERROR",v="UPDATE_TOKEN_BALANCE"},2490:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return l}});var r=t(5893),a=(t(7294),t(6064)),c=t(7568),s=t(7582),i=t(9218),o=t(5559),u=(0,a.$j)((function(e){return{token:e.token,auth:e.auth}}),{getTokenPackages:function(){return function(){var e=(0,c.Z)((function(e){var n,t,r;return(0,s.__generator)(this,(function(a){switch(a.label){case 0:return a.trys.push([0,2,,3]),[4,o._u.getTokenPackages()];case 1:return n=a.sent(),e({type:i.VK,payload:n.data.packages}),[3,3];case 2:return t=a.sent(),console.warn("Error fetching token packages, using mock data:",t),r=[{id:"basic",name:"Basic",tokens:50,price:9.99,popular:!1},{id:"standard",name:"Standard",tokens:150,price:24.99,popular:!0},{id:"premium",name:"Premium",tokens:350,price:49.99,popular:!1}],e({type:i.VK,payload:r}),[3,3];case 3:return[2]}}))}));return function(n){return e.apply(this,arguments)}}()},createPaymentIntent:function(e){return function(){var n=(0,c.Z)((function(n){var t,r,a;return(0,s.__generator)(this,(function(c){switch(c.label){case 0:return c.trys.push([0,2,,3]),[4,o._u.createPaymentIntent(e)];case 1:return t=c.sent(),n({type:i.ud,payload:t.data}),[2,t.data];case 2:return r=c.sent(),console.warn("Error creating payment intent, using mock data:",r),a={clientSecret:"mock_client_secret_"+Date.now(),transactionId:"mock_transaction_"+Date.now()},n({type:i.ud,payload:a}),[2,a];case 3:return[2]}}))}));return function(e){return n.apply(this,arguments)}}()},confirmPurchase:function(e,n){return function(){var t=(0,c.Z)((function(t){var r,a,c;return(0,s.__generator)(this,(function(s){switch(s.label){case 0:return s.trys.push([0,2,,3]),[4,o._u.confirmPurchase(e,n)];case 1:return r=s.sent(),t({type:i.y2,payload:r.data}),t({type:i.Zt,payload:r.data.newBalance}),[2,r.data];case 2:return a=s.sent(),console.warn("Error confirming purchase, using mock data:",a),c={success:!0,transaction:{id:e,status:"completed",tokens:150},newBalance:150},t({type:i.y2,payload:c}),t({type:i.Zt,payload:c.newBalance}),[2,c];case 3:return[2]}}))}));return function(e){return t.apply(this,arguments)}}()}})((function(e){var n=e.token,t=e.auth,a=(e.getTokenPackages,e.createPaymentIntent,e.confirmPurchase,n.packages),c=n.loading,s=t.user;return(0,r.jsx)("div",{className:"min-h-screen bg-primary-dark py-12 px-4 sm:px-6 lg:px-8",children:(0,r.jsxs)("div",{className:"max-w-4xl mx-auto",children:[(0,r.jsxs)("div",{className:"text-center mb-12",children:[(0,r.jsx)("h1",{className:"text-4xl sm:text-5xl font-cinzel text-accent-gold mb-4",children:"Token Store"}),(0,r.jsx)("p",{className:"text-white/80 max-w-3xl mx-auto",children:"Purchase tokens to use for tarot readings"})]}),(0,r.jsxs)("div",{className:"bg-primary-medium rounded-xl shadow-xl p-6 mb-8",children:[(0,r.jsx)("h2",{className:"text-2xl font-cinzel text-accent-gold mb-4",children:"Your Balance"}),(0,r.jsxs)("div",{className:"flex items-center",children:[(0,r.jsx)("div",{className:"w-16 h-16 bg-accent-gold/20 rounded-full flex items-center justify-center mr-4",children:(0,r.jsx)("span",{className:"text-accent-gold text-2xl font-bold",children:s?s.tokenBalance:0})}),(0,r.jsx)("div",{children:(0,r.jsx)("p",{className:"text-white/80",children:"Available tokens"})})]})]}),(0,r.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6 mb-12",children:c?(0,r.jsx)("div",{className:"col-span-3 flex justify-center py-12",children:(0,r.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-gold"})}):a.map((function(e){return(0,r.jsxs)("div",{className:"bg-primary-medium rounded-xl shadow-xl p-6 text-center",children:[(0,r.jsx)("h2",{className:"text-xl font-cinzel text-accent-gold mb-2",children:e.name}),(0,r.jsx)("div",{className:"text-center mb-4",children:(0,r.jsxs)("span",{className:"text-3xl font-bold text-white",children:["$",e.price]})}),(0,r.jsx)("div",{className:"bg-primary-dark/50 rounded-lg p-4 mb-4",children:(0,r.jsxs)("div",{className:"flex justify-between items-center",children:[(0,r.jsx)("span",{className:"text-white/80",children:"Tokens:"}),(0,r.jsx)("span",{className:"text-white font-bold",children:e.tokens})]})}),(0,r.jsx)("button",{className:"btn-primary w-full py-2",children:"Purchase"})]},e.id)}))})]})})}));function l(){return(0,r.jsx)(u,{})}},5559:function(e,n,t){"use strict";t.d(n,{_u:function(){return i},bP:function(){return o},kv:function(){return s}});var r=t(7066),a=t(3454),c=r.Z.create({baseURL:a.env.NEXT_PUBLIC_API_URL||"https://api.askpsychicdrew.com/api",headers:{"Content-Type":"application/json"}});c.interceptors.request.use((function(e){var n=localStorage.getItem("token");return n&&(e.headers.Authorization="Bearer ".concat(n)),e}),(function(e){return Promise.reject(e)})),c.interceptors.response.use((function(e){return e}),(function(e){return e.response&&401===e.response.status&&(localStorage.removeItem("token"),localStorage.removeItem("user"),window.location.pathname.includes("/login")||(window.location.href="/login")),Promise.reject(e)}));var s={register:function(e){return c.post("/auth/register",e)},login:function(e){return c.post("/auth/login",e)},getCurrentUser:function(){return c.get("/auth/me")}},i={getTokenPackages:function(){return c.get("/tokens/packages")},createPaymentIntent:function(e){return c.post("/tokens/payment-intent",{packageId:e})},confirmPurchase:function(e,n){return c.post("/tokens/confirm-purchase",{transactionId:e,paymentIntentId:n})},getUserTransactions:function(){return c.get("/tokens/transactions")}},o={getReadingTypes:function(){return c.get("/readings/types")},generateReading:function(e){return c.post("/readings/generate",e)},getUserReadings:function(){return c.get("/readings")},getReadingById:function(e){return c.get("/readings/".concat(e))}}}},function(e){e.O(0,[502,914,774,888,179],(function(){return n=8801,e(e.s=n);var n}));var n=e.O();_N_E=n}]);