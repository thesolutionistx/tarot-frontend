(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[491],{6664:function(e,t,n){!function(e,t){"use strict";function ownKeys(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function _objectSpread2(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(n),!0).forEach(function(t){_defineProperty(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function _objectWithoutProperties(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function _slicedToArray(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n,r,o=e&&("undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]);if(null!=o){var i=[],c=!0,s=!1;try{for(o=o.call(e);!(c=(n=o.next()).done)&&(i.push(n.value),!t||i.length!==t);c=!0);}catch(e){s=!0,r=e}finally{try{c||null==o.return||o.return()}finally{if(s)throw r}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(e,t)}}(e,t)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var n,r,o,i,c,s={exports:{}};s.exports=(function(){if(c)return i;c=1;var e=o?r:(o=1,r="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");function emptyFunction(){}function emptyFunctionWithReset(){}return emptyFunctionWithReset.resetWarningCache=emptyFunction,i=function(){function shim(t,n,r,o,i,c){if(c!==e){var s=Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw s.name="Invariant Violation",s}}function getShim(){return shim}shim.isRequired=shim;var t={array:shim,bool:shim,func:shim,number:shim,object:shim,string:shim,symbol:shim,any:shim,arrayOf:getShim,element:shim,elementType:shim,instanceOf:getShim,node:shim,objectOf:getShim,oneOf:getShim,oneOfType:getShim,shape:getShim,exact:getShim,checkPropTypes:emptyFunctionWithReset,resetWarningCache:emptyFunction};return t.PropTypes=t,t}})()();var u=(n=s.exports)&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n,useAttachEvent=function(e,n,r){var o=!!r,i=t.useRef(r);t.useEffect(function(){i.current=r},[r]),t.useEffect(function(){if(!o||!e)return function(){};var decoratedCb=function(){i.current&&i.current.apply(i,arguments)};return e.on(n,decoratedCb),function(){e.off(n,decoratedCb)}},[o,n,e,i])},usePrevious=function(e){var n=t.useRef(e);return t.useEffect(function(){n.current=e},[e]),n.current},isUnknownObject=function(e){return null!==e&&"object"===_typeof(e)},a="[object Object]",isEqual=function isEqual(e,t){if(!isUnknownObject(e)||!isUnknownObject(t))return e===t;var n=Array.isArray(e);if(n!==Array.isArray(t))return!1;var r=Object.prototype.toString.call(e)===a;if(r!==(Object.prototype.toString.call(t)===a))return!1;if(!r&&!n)return e===t;var o=Object.keys(e),i=Object.keys(t);if(o.length!==i.length)return!1;for(var c={},s=0;s<o.length;s+=1)c[o[s]]=!0;for(var u=0;u<i.length;u+=1)c[i[u]]=!0;var p=Object.keys(c);return p.length===o.length&&p.every(function(n){return isEqual(e[n],t[n])})},extractAllowedOptionsUpdates=function(e,t,n){return isUnknownObject(e)?Object.keys(e).reduce(function(r,o){var i=!isUnknownObject(t)||!isEqual(e[o],t[o]);return n.includes(o)?(i&&console.warn("Unsupported prop change: options.".concat(o," is not a mutable property.")),r):i?_objectSpread2(_objectSpread2({},r||{}),{},_defineProperty({},o,e[o])):r},null):null},p="Invalid prop `stripe` supplied to `Elements`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.",validateStripe=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:p;if(null===e||isUnknownObject(e)&&"function"==typeof e.elements&&"function"==typeof e.createToken&&"function"==typeof e.createPaymentMethod&&"function"==typeof e.confirmCardPayment)return e;throw Error(t)},parseStripeProp=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:p;if(isUnknownObject(e)&&"function"==typeof e.then)return{tag:"async",stripePromise:Promise.resolve(e).then(function(e){return validateStripe(e,t)})};var n=validateStripe(e,t);return null===n?{tag:"empty"}:{tag:"sync",stripe:n}},registerWithStripeJs=function(e){e&&e._registerWrapper&&e.registerAppInfo&&(e._registerWrapper({name:"react-stripe-js",version:"3.5.1"}),e.registerAppInfo({name:"react-stripe-js",version:"3.5.1",url:"https://stripe.com/docs/stripe-js/react"}))},l=t.createContext(null);l.displayName="ElementsContext";var parseElementsContext=function(e,t){if(!e)throw Error("Could not find Elements context; You need to wrap the part of your app that ".concat(t," in an <Elements> provider."));return e},Elements=function(e){var n=e.stripe,r=e.options,o=e.children,i=t.useMemo(function(){return parseStripeProp(n)},[n]),c=_slicedToArray(t.useState(function(){return{stripe:"sync"===i.tag?i.stripe:null,elements:"sync"===i.tag?i.stripe.elements(r):null}}),2),s=c[0],u=c[1];t.useEffect(function(){var e=!0,safeSetContext=function(e){u(function(t){return t.stripe?t:{stripe:e,elements:e.elements(r)}})};return"async"!==i.tag||s.stripe?"sync"!==i.tag||s.stripe||safeSetContext(i.stripe):i.stripePromise.then(function(t){t&&e&&safeSetContext(t)}),function(){e=!1}},[i,s,r]);var a=usePrevious(n);t.useEffect(function(){null!==a&&a!==n&&console.warn("Unsupported prop change on Elements: You cannot change the `stripe` prop after setting it.")},[a,n]);var p=usePrevious(r);return t.useEffect(function(){if(s.elements){var e=extractAllowedOptionsUpdates(r,p,["clientSecret","fonts"]);e&&s.elements.update(e)}},[r,p,s.elements]),t.useEffect(function(){registerWithStripeJs(s.stripe)},[s.stripe]),t.createElement(l.Provider,{value:s},o)};Elements.propTypes={stripe:u.any,options:u.object};var useElementsContextWithUseCase=function(e){return parseElementsContext(t.useContext(l),e)},ElementsConsumer=function(e){return(0,e.children)(useElementsContextWithUseCase("mounts <ElementsConsumer>"))};ElementsConsumer.propTypes={children:u.func.isRequired};var d=["on","session"],f=t.createContext(null);f.displayName="CheckoutSdkContext";var parseCheckoutSdkContext=function(e,t){if(!e)throw Error("Could not find CheckoutProvider context; You need to wrap the part of your app that ".concat(t," in an <CheckoutProvider> provider."));return e},m=t.createContext(null);m.displayName="CheckoutContext";var extractCheckoutContextValue=function(e,t){if(!e)return null;e.on,e.session;var n=_objectWithoutProperties(e,d);return t?Object.assign(t,n):Object.assign(e.session(),n)},CheckoutProvider=function(e){var n=e.stripe,r=e.options,o=e.children,i=t.useMemo(function(){return parseStripeProp(n,"Invalid prop `stripe` supplied to `CheckoutProvider`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.")},[n]),c=_slicedToArray(t.useState(null),2),s=c[0],u=c[1],a=_slicedToArray(t.useState(function(){return{stripe:"sync"===i.tag?i.stripe:null,checkoutSdk:null}}),2),p=a[0],l=a[1],safeSetContext=function(e,t){l(function(n){return n.stripe&&n.checkoutSdk?n:{stripe:e,checkoutSdk:t}})},d=t.useRef(!1);t.useEffect(function(){var e=!0;return"async"!==i.tag||p.stripe?"sync"===i.tag&&i.stripe&&!d.current&&(d.current=!0,i.stripe.initCheckout(r).then(function(e){e&&(safeSetContext(i.stripe,e),e.on("change",u))})):i.stripePromise.then(function(t){t&&e&&!d.current&&(d.current=!0,t.initCheckout(r).then(function(e){e&&(safeSetContext(t,e),e.on("change",u))}))}),function(){e=!1}},[i,p,r,u]);var h=usePrevious(n);t.useEffect(function(){null!==h&&h!==n&&console.warn("Unsupported prop change on CheckoutProvider: You cannot change the `stripe` prop after setting it.")},[h,n]);var C=usePrevious(r);t.useEffect(function(){if(p.checkoutSdk){var e,t,n=null==C?void 0:null===(e=C.elementsOptions)||void 0===e?void 0:e.appearance,o=null==r?void 0:null===(t=r.elementsOptions)||void 0===t?void 0:t.appearance;o&&!isEqual(o,n)&&p.checkoutSdk.changeAppearance(o)}},[r,C,p.checkoutSdk]),t.useEffect(function(){registerWithStripeJs(p.stripe)},[p.stripe]);var v=t.useMemo(function(){return extractCheckoutContextValue(p.checkoutSdk,s)},[p.checkoutSdk,s]);return p.checkoutSdk?t.createElement(f.Provider,{value:p},t.createElement(m.Provider,{value:v},o)):null};CheckoutProvider.propTypes={stripe:u.any,options:u.shape({fetchClientSecret:u.func.isRequired,elementsOptions:u.object}).isRequired};var useElementsOrCheckoutSdkContextWithUseCase=function(e){var n=t.useContext(f),r=t.useContext(l);if(n&&r)throw Error("You cannot wrap the part of your app that ".concat(e," in both <CheckoutProvider> and <Elements> providers."));return n?parseCheckoutSdkContext(n,e):parseElementsContext(r,e)},h=["mode"],createElementComponent=function(e,n){var r="".concat(e.charAt(0).toUpperCase()+e.slice(1),"Element"),o=n?function(e){useElementsOrCheckoutSdkContextWithUseCase("mounts <".concat(r,">"));var n=e.id,o=e.className;return t.createElement("div",{id:n,className:o})}:function(n){var o,i=n.id,c=n.className,s=n.options,u=void 0===s?{}:s,a=n.onBlur,p=n.onFocus,l=n.onReady,d=n.onChange,f=n.onEscape,m=n.onClick,C=n.onLoadError,v=n.onLoaderStart,y=n.onNetworksChange,E=n.onConfirm,g=n.onCancel,k=n.onShippingAddressChange,S=n.onShippingRateChange,b=useElementsOrCheckoutSdkContextWithUseCase("mounts <".concat(r,">")),P="elements"in b?b.elements:null,w="checkoutSdk"in b?b.checkoutSdk:null,j=_slicedToArray(t.useState(null),2),x=j[0],O=j[1],A=t.useRef(null),_=t.useRef(null);useAttachEvent(x,"blur",a),useAttachEvent(x,"focus",p),useAttachEvent(x,"escape",f),useAttachEvent(x,"click",m),useAttachEvent(x,"loaderror",C),useAttachEvent(x,"loaderstart",v),useAttachEvent(x,"networkschange",y),useAttachEvent(x,"confirm",E),useAttachEvent(x,"cancel",g),useAttachEvent(x,"shippingaddresschange",k),useAttachEvent(x,"shippingratechange",S),useAttachEvent(x,"change",d),l&&(o="expressCheckout"===e?l:function(){l(x)}),useAttachEvent(x,"ready",o),t.useLayoutEffect(function(){if(null===A.current&&null!==_.current&&(P||w)){var t=null;if(w)switch(e){case"payment":t=w.createPaymentElement(u);break;case"address":if("mode"in u){var n=u.mode,o=_objectWithoutProperties(u,h);if("shipping"===n)t=w.createShippingAddressElement(o);else if("billing"===n)t=w.createBillingAddressElement(o);else throw Error("Invalid options.mode. mode must be 'billing' or 'shipping'.")}else throw Error("You must supply options.mode. mode must be 'billing' or 'shipping'.");break;case"expressCheckout":t=w.createExpressCheckoutElement(u);break;case"currencySelector":t=w.createCurrencySelectorElement();break;default:throw Error("Invalid Element type ".concat(r,". You must use either the <PaymentElement />, <AddressElement options={{mode: 'shipping'}} />, <AddressElement options={{mode: 'billing'}} />, or <ExpressCheckoutElement />."))}else P&&(t=P.create(e,u));A.current=t,O(t),t&&t.mount(_.current)}},[P,w,u]);var U=usePrevious(u);return t.useEffect(function(){if(A.current){var e=extractAllowedOptionsUpdates(u,U,["paymentRequest"]);e&&"update"in A.current&&A.current.update(e)}},[u,U]),t.useLayoutEffect(function(){return function(){if(A.current&&"function"==typeof A.current.destroy)try{A.current.destroy(),A.current=null}catch(e){}}},[]),t.createElement("div",{id:i,className:c,ref:_})};return o.propTypes={id:u.string,className:u.string,onChange:u.func,onBlur:u.func,onFocus:u.func,onReady:u.func,onEscape:u.func,onClick:u.func,onLoadError:u.func,onLoaderStart:u.func,onNetworksChange:u.func,onConfirm:u.func,onCancel:u.func,onShippingAddressChange:u.func,onShippingRateChange:u.func,options:u.object},o.displayName=r,o.__elementType=e,o},C="undefined"==typeof window,v=t.createContext(null);v.displayName="EmbeddedCheckoutProviderContext";var useEmbeddedCheckoutContext=function(){var e=t.useContext(v);if(!e)throw Error("<EmbeddedCheckout> must be used within <EmbeddedCheckoutProvider>");return e},y=C?function(e){var n=e.id,r=e.className;return useEmbeddedCheckoutContext(),t.createElement("div",{id:n,className:r})}:function(e){var n=e.id,r=e.className,o=useEmbeddedCheckoutContext().embeddedCheckout,i=t.useRef(!1),c=t.useRef(null);return t.useLayoutEffect(function(){return!i.current&&o&&null!==c.current&&(o.mount(c.current),i.current=!0),function(){if(i.current&&o)try{o.unmount(),i.current=!1}catch(e){}}},[o]),t.createElement("div",{ref:c,id:n,className:r})},E=createElementComponent("auBankAccount",C),g=createElementComponent("card",C),k=createElementComponent("cardNumber",C),S=createElementComponent("cardExpiry",C),b=createElementComponent("cardCvc",C),P=createElementComponent("fpxBank",C),w=createElementComponent("iban",C),j=createElementComponent("idealBank",C),x=createElementComponent("p24Bank",C),O=createElementComponent("epsBank",C),A=createElementComponent("payment",C),_=createElementComponent("expressCheckout",C),U=createElementComponent("currencySelector",C),W=createElementComponent("paymentRequestButton",C),T=createElementComponent("linkAuthentication",C),R=createElementComponent("address",C),I=createElementComponent("shippingAddress",C),N=createElementComponent("paymentMethodMessaging",C),L=createElementComponent("affirmMessage",C),Y=createElementComponent("afterpayClearpayMessage",C);e.AddressElement=R,e.AffirmMessageElement=L,e.AfterpayClearpayMessageElement=Y,e.AuBankAccountElement=E,e.CardCvcElement=b,e.CardElement=g,e.CardExpiryElement=S,e.CardNumberElement=k,e.CheckoutProvider=CheckoutProvider,e.CurrencySelectorElement=U,e.Elements=Elements,e.ElementsConsumer=ElementsConsumer,e.EmbeddedCheckout=y,e.EmbeddedCheckoutProvider=function(e){var n=e.stripe,r=e.options,o=e.children,i=t.useMemo(function(){return parseStripeProp(n,"Invalid prop `stripe` supplied to `EmbeddedCheckoutProvider`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.")},[n]),c=t.useRef(null),s=t.useRef(null),u=_slicedToArray(t.useState({embeddedCheckout:null}),2),a=u[0],p=u[1];t.useEffect(function(){if(!s.current&&!c.current){var setStripeAndInitEmbeddedCheckout=function(e){s.current||c.current||(s.current=e,c.current=s.current.initEmbeddedCheckout(r).then(function(e){p({embeddedCheckout:e})}))};"async"===i.tag&&!s.current&&(r.clientSecret||r.fetchClientSecret)?i.stripePromise.then(function(e){e&&setStripeAndInitEmbeddedCheckout(e)}):"sync"===i.tag&&!s.current&&(r.clientSecret||r.fetchClientSecret)&&setStripeAndInitEmbeddedCheckout(i.stripe)}},[i,r,a,s]),t.useEffect(function(){return function(){a.embeddedCheckout?(c.current=null,a.embeddedCheckout.destroy()):c.current&&c.current.then(function(){c.current=null,a.embeddedCheckout&&a.embeddedCheckout.destroy()})}},[a.embeddedCheckout]),t.useEffect(function(){registerWithStripeJs(s)},[s]);var l=usePrevious(n);t.useEffect(function(){null!==l&&l!==n&&console.warn("Unsupported prop change on EmbeddedCheckoutProvider: You cannot change the `stripe` prop after setting it.")},[l,n]);var d=usePrevious(r);return t.useEffect(function(){if(null!=d){if(null==r){console.warn("Unsupported prop change on EmbeddedCheckoutProvider: You cannot unset options after setting them.");return}void 0===r.clientSecret&&void 0===r.fetchClientSecret&&console.warn("Invalid props passed to EmbeddedCheckoutProvider: You must provide one of either `options.fetchClientSecret` or `options.clientSecret`."),null!=d.clientSecret&&r.clientSecret!==d.clientSecret&&console.warn("Unsupported prop change on EmbeddedCheckoutProvider: You cannot change the client secret after setting it. Unmount and create a new instance of EmbeddedCheckoutProvider instead."),null!=d.fetchClientSecret&&r.fetchClientSecret!==d.fetchClientSecret&&console.warn("Unsupported prop change on EmbeddedCheckoutProvider: You cannot change fetchClientSecret after setting it. Unmount and create a new instance of EmbeddedCheckoutProvider instead."),null!=d.onComplete&&r.onComplete!==d.onComplete&&console.warn("Unsupported prop change on EmbeddedCheckoutProvider: You cannot change the onComplete option after setting it."),null!=d.onShippingDetailsChange&&r.onShippingDetailsChange!==d.onShippingDetailsChange&&console.warn("Unsupported prop change on EmbeddedCheckoutProvider: You cannot change the onShippingDetailsChange option after setting it."),null!=d.onLineItemsChange&&r.onLineItemsChange!==d.onLineItemsChange&&console.warn("Unsupported prop change on EmbeddedCheckoutProvider: You cannot change the onLineItemsChange option after setting it.")}},[d,r]),t.createElement(v.Provider,{value:a},o)},e.EpsBankElement=O,e.ExpressCheckoutElement=_,e.FpxBankElement=P,e.IbanElement=w,e.IdealBankElement=j,e.LinkAuthenticationElement=T,e.P24BankElement=x,e.PaymentElement=A,e.PaymentMethodMessagingElement=N,e.PaymentRequestButtonElement=W,e.ShippingAddressElement=I,e.useCheckout=function(){parseCheckoutSdkContext(t.useContext(f),"calls useCheckout()");var e=t.useContext(m);if(!e)throw Error("Could not find Checkout Context; You need to wrap the part of your app that calls useCheckout() in an <CheckoutProvider> provider.");return e},e.useElements=function(){return useElementsContextWithUseCase("calls useElements()").elements},e.useStripe=function(){return useElementsOrCheckoutSdkContextWithUseCase("calls useStripe()").stripe}}(t,n(7294))},2859:function(e,t,n){"use strict";n.d(t,{J:function(){return loadStripe}});var r,o="acacia",i="https://js.stripe.com",c="".concat(i,"/").concat(o,"/stripe.js"),s=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,u=/^https:\/\/js\.stripe\.com\/(v3|[a-z]+)\/stripe\.js(\?.*)?$/,findScript=function(){for(var e=document.querySelectorAll('script[src^="'.concat(i,'"]')),t=0;t<e.length;t++){var n,r=e[t];if(n=r.src,s.test(n)||u.test(n))return r}return null},injectScript=function(e){var t=e&&!e.advancedFraudSignals?"?advancedFraudSignals=false":"",n=document.createElement("script");n.src="".concat(c).concat(t);var r=document.head||document.body;if(!r)throw Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return r.appendChild(n),n},registerWrapper=function(e,t){e&&e._registerWrapper&&e._registerWrapper({name:"stripe-js",version:"6.1.0",startTime:t})},a=null,p=null,l=null,initStripe=function(e,t,n){if(null===e)return null;var r,i=t[0].match(/^pk_test/),c=3===(r=e.version)?"v3":r;i&&c!==o&&console.warn("Stripe.js@".concat(c," was loaded on the page, but @stripe/stripe-js@").concat("6.1.0"," expected Stripe.js@").concat(o,". This may result in unexpected behavior. For more information, see https://docs.stripe.com/sdks/stripejs-versioning"));var s=e.apply(void 0,t);return registerWrapper(s,n),s},d=!1,getStripePromise=function(){return r||(r=(null!==a?a:(a=new Promise(function(e,t){if("undefined"==typeof window||"undefined"==typeof document){e(null);return}if(window.Stripe,window.Stripe){e(window.Stripe);return}try{var n,r=findScript();r?r&&null!==l&&null!==p&&(r.removeEventListener("load",l),r.removeEventListener("error",p),null===(n=r.parentNode)||void 0===n||n.removeChild(r),r=injectScript(null)):r=injectScript(null),l=function(){window.Stripe?e(window.Stripe):t(Error("Stripe.js not available"))},p=function(e){t(Error("Failed to load Stripe.js",{cause:e}))},r.addEventListener("load",l),r.addEventListener("error",p)}catch(e){t(e);return}})).catch(function(e){return a=null,Promise.reject(e)})).catch(function(e){return r=null,Promise.reject(e)}))};Promise.resolve().then(function(){return getStripePromise()}).catch(function(e){d||console.warn(e)});var loadStripe=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];d=!0;var r=Date.now();return getStripePromise().then(function(e){return initStripe(e,t,r)})}}}]);