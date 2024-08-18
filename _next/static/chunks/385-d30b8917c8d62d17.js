(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[385],{4710:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return W}});var n=a(5893),r=a(7294);a(3931);var s=()=>(0,n.jsxs)("div",{className:"dashboard-container dashboard-skeleton",children:[(0,n.jsx)("div",{className:"skeleton skeleton-chart"}),(0,n.jsx)("div",{className:"skeleton skeleton-chart"}),(0,n.jsx)("div",{className:"skeleton skeleton-chart"})]}),l=a(6495),o=a(7282),i=a(3148);let c=(e,t)=>{let a={};return e.forEach(e=>{let n;let r=new Date(e.date||e.Date);switch(t){case"week":let s=new Date(r.setDate(r.getDate()-r.getDay()));n="".concat(s.getFullYear(),"-").concat(s.getMonth()+1,"-").concat(s.getDate());break;case"year":n=r.getFullYear();break;case"month":n="".concat(r.getFullYear(),"-").concat(r.getMonth()+1);break;default:n=r.toLocaleDateString()}a[n]||(a[n]=[]),a[n].push(e)}),a},d=e=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2}).format(e);var h=a(6942),u=a.n(h),p=e=>{let{data:t}=e;i.kL.register(i.uw,i.f$,i.jn,i.od,i.Dx,i.u,i.De,o.Z);let[a,s]=(0,r.useState)("daily"),[h,p]=(0,r.useState)({labels:[],datasets:[]});function m(e){let t=e.chart.data.datasets[0].data;return t.reduce((e,t)=>e+t,0)/t.length}(0,r.useEffect)(()=>{t&&t.length>0&&g()},[t,a]);let g=()=>{let e;switch(a){case"weekly":e=c(t,"week");break;case"yearly":e=c(t,"year");break;case"monthly":e=c(t,"month");break;default:e=c(t,"date")}let n=Object.keys(e),r=n.map(t=>e[t].reduce((e,t)=>e+(parseFloat(t.amount)||parseFloat(t.Amount)||0),0));p({labels:n,datasets:[{label:"Amount",data:r,borderColor:"#8884d8",fill:!1}]})};return(0,n.jsxs)("div",{className:u().lineChartContainer,children:[(0,n.jsxs)("div",{className:u().chartControls,children:[(0,n.jsx)("label",{htmlFor:"time-interval",children:"Select Time Interval:"}),(0,n.jsxs)("select",{id:"time-interval",value:a,onChange:e=>{s(e.target.value)},children:[(0,n.jsx)("option",{value:"daily",children:"Daily"}),(0,n.jsx)("option",{value:"weekly",children:"Weekly"}),(0,n.jsx)("option",{value:"monthly",children:"Monthly"}),(0,n.jsx)("option",{value:"yearly",children:"Yearly"})]})]}),0===h.labels.length?(0,n.jsx)("p",{children:"No expenses from chart data available."}):(0,n.jsx)("div",{className:"chart-wrapper",children:(0,n.jsx)(l.x1,{data:h,options:{responsive:!0,maintainAspectRatio:!1,scales:{x:{title:{display:!0,text:"Time Interval",font:{size:14}},ticks:{autoSkip:!0,maxTicksLimit:10},reverse:!1},y:{title:{display:!0,text:"Amount",font:{size:14}},ticks:{beginAtZero:!1}}},plugins:{tooltip:{callbacks:{label:function(e){let t=e.raw;return"number"==typeof t?d(t):t},title:function(e){let t=new Date(e[0].label);return new Intl.DateTimeFormat(e[0].chart.options.locale,{year:"numeric",month:"short",day:"numeric"}).format(t)}}},legend:{display:!1},annotation:{annotations:{avg:{type:"line",borderColor:"black",borderDash:[6,6],borderDashOffset:0,borderWidth:3,label:{position:"center",display:!0,content:e=>"Average: "+d(m(e).toFixed(2))},scaleID:"y",value:e=>m(e)}}}}}})})]})},m=a(8023),g=a.n(m),x=e=>{let{data:t}=e;return t&&0!==t.length?(0,n.jsx)("div",{className:g().tableContainer,children:(0,n.jsxs)("table",{className:g().tableContents,children:[(0,n.jsx)("thead",{children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{className:g().tableTh,children:"Date"}),(0,n.jsx)("th",{className:g().tableTh,children:"Amount"}),(0,n.jsx)("th",{className:g().tableTh,children:"Category"}),(0,n.jsx)("th",{className:g().tableTh,children:"Description"})]})}),(0,n.jsx)("tbody",{children:t.map((e,t)=>(0,n.jsxs)("tr",{children:[(0,n.jsx)("td",{className:g().tableTd,children:e.date||e.Date}),(0,n.jsx)("td",{className:g().tableTd,children:d(e.amount||e.Amount)}),(0,n.jsx)("td",{className:g().tableTd,children:e.category||e.Category}),(0,n.jsx)("td",{className:g().tableTd,children:e.description||e.Description})]},t))})]})}):(0,n.jsx)("p",{children:"No table data available."})};i.kL.register(i.qi,i.u),i.kL.register({id:"centerText",beforeDraw:e=>{if("doughnut"===e.config.type){let{ctx:t,chartArea:{top:a,bottom:n,left:r,right:s}}=e,l=s-r,o=n-a,i=d(e.data.datasets[0].data.reduce((e,t)=>e+t,0));t.save(),t.font="bold ".concat(Math.min(l,o)/12,"px Arial"),t.textAlign="center",t.textBaseline="middle",t.fillStyle="white",t.fillText(i,r+l/2,a+o/2),t.restore()}}});var j=e=>{let{data:t}=e,[a,s]=(0,r.useState)({labels:[],datasets:[]});return(0,r.useEffect)(()=>{if(!t||0===t.length){s({labels:[],datasets:[]});return}let e=t.reduce((e,t)=>{let a=t.Category||"Uncategorized",n=parseFloat(t.Amount);return e[a]||(e[a]=0),e[a]+=n,e},{}),a=Object.keys(e).map(t=>({name:t,value:e[t]})),n=["#8884d8","#83a6ed","#8dd1e1","#82ca9d","#a4de6c","#d0ed57","#ffc658","#ff7f0e","#ff6b01","#e86a92"];s({labels:a.map(e=>e.name),datasets:[{data:a.map(e=>e.value),backgroundColor:n.slice(0,a.length),hoverBackgroundColor:n.slice(0,a.length)}]})},[t]),(0,n.jsx)("div",{className:"chart-wrapper",children:0===a.labels.length?(0,n.jsx)("p",{children:"No expenses from chart data available."}):(0,n.jsx)("div",{className:"chart-wrapper",children:(0,n.jsx)(l.$I,{data:a,options:{responsive:!0,maintainAspectRatio:!0,plugins:{tooltip:{callbacks:{label:function(e){if(null!==e.raw)return d(e.raw)}}}}}},JSON.stringify(a))})})},y=a(9383),C=a.n(y),b=e=>{let{children:t,onClose:a}=e;return(0,n.jsx)("div",{className:C().modalBackdrop,onClick:a,children:(0,n.jsxs)("div",{className:C().modalContent,onClick:e=>e.stopPropagation(),children:[(0,n.jsx)("button",{className:C().modalClose,onClick:a,children:"Χ"}),t]})})},f=e=>{let{data:t}=e,[a,s]=(0,r.useState)(!1),l=t.filter(e=>e.Amount<0&&!e.Ignore).map(e=>({...e,Amount:Math.abs(e.Amount)})),o=t.filter(e=>e.Amount>0&&!e.Ignore).map(e=>({...e,Amount:Math.abs(e.Amount)}));return(0,r.useEffect)(()=>{},[t]),(0,n.jsxs)("div",{className:"dashboard-container",children:[(0,n.jsxs)("div",{className:"card full-width-card",children:[(0,n.jsx)("h2",{children:"Expenses Over Time"}),(0,n.jsx)(p,{data:l})]}),(0,n.jsxs)("div",{className:"card",children:[(0,n.jsx)("h2",{children:"Expense Breakdown"}),(0,n.jsx)(j,{data:l})]}),(0,n.jsxs)("div",{className:"card majority-card clickable-card",onClick:()=>s(!0),children:[(0,n.jsx)("h2",{children:"Data Table"}),(0,n.jsx)("div",{className:"table-container",children:(0,n.jsx)(x,{data:t})})]}),a&&(0,n.jsx)(b,{onClose:()=>s(!1),children:(0,n.jsx)(x,{data:t})}),(0,n.jsxs)("div",{className:"card majority-card",children:[(0,n.jsx)("h2",{children:"Income Over Time"}),(0,n.jsx)(p,{data:o})]}),(0,n.jsxs)("div",{className:"card",children:[(0,n.jsx)("h2",{children:"Income Breakdown"}),(0,n.jsx)(j,{data:o})]})]})},v=a(1793),k=a.n(v),_=a(8901),D=a(7460),w=a.n(D),N=a(4105),S=e=>{let{onFileUploaded:t}=e,[a,s]=(0,r.useState)(!1),[l,o]=(0,r.useState)(!1),i={Date:["Date","Posting Date","Transaction Date","Transaction DateTime"],Description:["Description","Details","Memo","Narrative"],Amount:["Amount","Transaction Amount","Credit Amount","Debit Amount"],Ignore:["Ignore"]},c=e=>{w().parse(e,{header:!0,skipEmptyLines:!0,dynamicTyping:!0,complete:e=>{t(e.data.map(e=>d(e))),s(!1),o(!0)},error:e=>{console.error("CSV parsing error: ".concat(e.message)),alert("Error parsing CSV file."),s(!1)}})},d=e=>{let t={};return Object.keys(i).forEach(a=>{let n=i[a].find(t=>e.hasOwnProperty(t));t[a]=!!n&&e[n]}),t},h=e=>{let a=new FileReader;a.onload=e=>{let a=e.target.result,n=N.ij(a,{type:"binary"}),r=n.SheetNames[0],l=n.Sheets[r],[c,...d]=N.P6.sheet_to_json(l,{header:1});t(d.map(e=>{let t={};return Object.keys(i).forEach(a=>{let n=i[a].find(e=>c.includes(e));t[a]=n?e[c.indexOf(n)]:null}),t})),s(!1),o(!0)},a.onerror=e=>{console.error("Excel parsing error: ".concat(e.message)),alert("Error parsing Excel file."),s(!1)},a.readAsBinaryString(e)},u=(0,r.useCallback)(e=>{s(!0),o(!1),e.forEach(e=>{"text/csv"===e.type?c(e):e.type.includes("spreadsheetml")?h(e):(console.error("Unsupported file type: ".concat(e.type)),alert("Unsupported file type. Please upload a CSV or Excel file."),s(!1))})},[t]),{getRootProps:p,getInputProps:m}=(0,_.uI)({onDrop:u});return(0,n.jsx)("div",{children:l?(0,n.jsxs)("div",{className:k().uploadStatus,children:[(0,n.jsx)("h1",{children:"File uploaded successfully."}),(0,n.jsx)("button",{onClick:()=>{o(!1),t([])},children:"Clear data"})]}):(0,n.jsxs)("div",{...p(),className:k().dropzone,children:[(0,n.jsx)("input",{...m()}),a?(0,n.jsx)("h1",{children:"Uploading..."}):(0,n.jsx)("h1",{children:"Drag 'n' drop some files here, or click to select files"})]})})},A=e=>{let{headers:t,onCategoryCreate:a}=e,[s,l]=(0,r.useState)(""),[o,i]=(0,r.useState)(""),[c,d]=(0,r.useState)("contains"),[h,u]=(0,r.useState)(t[0]),[p,m]=(0,r.useState)(!1);return(0,n.jsxs)("div",{children:[(0,n.jsx)("select",{value:h,onChange:e=>u(e.target.value),children:t.map(e=>(0,n.jsx)("option",{value:e,children:e},e))}),(0,n.jsxs)("select",{value:c,onChange:e=>d(e.target.value),children:[(0,n.jsx)("option",{value:"contains",children:"Contains"}),(0,n.jsx)("option",{value:"exact",children:"Is Exactly"}),(0,n.jsx)("option",{value:"startsWith",children:"Starts With"}),(0,n.jsx)("option",{value:"endsWith",children:"Ends With"})]}),(0,n.jsx)("input",{type:"text",value:o,onChange:e=>i(e.target.value),placeholder:"Enter matching ".concat(c.toLowerCase())}),(0,n.jsx)("input",{type:"text",value:s,onChange:e=>l(e.target.value),placeholder:"Enter new category"}),"Ignore?",(0,n.jsx)("input",{type:"checkbox",checked:p,onChange:e=>m(e.target.checked)}),(0,n.jsx)("button",{onClick:()=>{a(s,o,c,h,p),l("Unnamed category"),i(""),d("contains"),u(t[0]),m(!1)},children:"Confirm New Category"})]})},I=a(2894),T=a.n(I),E=a(6269);let M="categoriesStore",F=async()=>(0,E.X3)("categoriesDB",1,{upgrade(e){e.objectStoreNames.contains(M)||e.createObjectStore(M,{keyPath:"id",autoIncrement:!0})}}),L=async e=>(await F()).put(M,e),B=async()=>(await F()).getAll(M),O=async()=>(await F()).clear(M);var U=e=>{let{headers:t,onCategoryCreate:a,onClose:s,onSave:l,onUpload:o}=e,[i,c]=(0,r.useState)(!1),[d,h]=(0,r.useState)([]);(0,r.useEffect)(()=>{(async()=>{h(await B())})()},[]);let u=async(e,t,n,r,s)=>{h([...d,{newCategory:e,stringMatch:t,matchType:n,selectedHeader:r,ignore:s}]),a(e,t,n,r,s),c(!1)},p=async()=>{await O(),h([])};return(0,n.jsx)(b,{onClose:s,children:(0,n.jsxs)("div",{children:[(0,n.jsx)("h2",{children:"Manage Categories"}),(0,n.jsx)("div",{className:T().categoryList,children:d.map((e,t)=>(0,n.jsx)("div",{className:T().categoryItem,children:(0,n.jsxs)("span",{children:[e.newCategory,": ",e.selectedHeader," ",e.matchType," ",e.stringMatch," (Ignore: ",e.ignore?"Yes":"No",")"]})},t))}),i?(0,n.jsx)(A,{headers:t,onCategoryCreate:u}):(0,n.jsx)("button",{onClick:()=>c(!0),children:"Add Category"}),(0,n.jsxs)("div",{className:T().categoryManagerButtons,children:[(0,n.jsx)("button",{onClick:s,children:"Close & Cancel"}),(0,n.jsx)("button",{onClick:()=>{l(),s()},children:"Save"}),(0,n.jsx)("button",{onClick:p,children:"Clear All"})]}),(0,n.jsxs)("div",{className:T().categoryManagerButtons,children:[(0,n.jsx)("button",{onClick:()=>{let e="data:application/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(d)),t=document.createElement("a");t.setAttribute("href",e),t.setAttribute("download","category_manager_settings.json"),document.body.appendChild(t),t.click(),t.remove()},children:"Download Settings"}),(0,n.jsx)("input",{type:"file",accept:"application/json",onChange:e=>{let t=e.target.files[0];if(t){let e=new FileReader;e.onload=e=>{try{let t=JSON.parse(e.target.result);h(t),o(t)}catch(e){console.error("Failed to load categories:",e)}},e.readAsText(t)}},style:{display:"none"},id:"uploadSettings"}),(0,n.jsx)("label",{htmlFor:"uploadSettings",className:T().uploadButton,children:"Upload Settings"})]})]})})},W=()=>{let[e,t]=(0,r.useState)([]),[a,l]=(0,r.useState)(!1),[o,i]=(0,r.useState)([]),[c,d]=(0,r.useState)([]),[h,u]=(0,r.useState)(!1);(0,r.useEffect)(()=>{(async()=>{i(await B())})()},[]);let p=[{Date:"2024-01-02",Amount:-30,Category:"Transportation",Description:"Bus fare",Ignore:!1},{Date:"2024-01-03",Amount:-100,Category:"Entertainment",Description:"Concert tickets",Ignore:!1},{Date:"2024-01-04",Amount:2e3,Category:"Salary",Description:"Monthly salary",Ignore:!1},{Date:"2024-01-05",Amount:-150,Category:"Rent",Description:"Monthly rent",Ignore:!1},{Date:"2024-01-06",Amount:-20,Category:"Utilities",Description:"Electricity bill",Ignore:!1},{Date:"2024-01-07",Amount:-10,Category:"Food",Description:"Fast food",Ignore:!1},{Date:"2024-01-08",Amount:100,Category:"Gift",Description:"Gift from friend",Ignore:!1},{Date:"2024-01-09",Amount:-50,Category:"Shopping",Description:"Clothing",Ignore:!1},{Date:"2024-01-10",Amount:-5,Category:"Transportation",Description:"Taxi",Ignore:!1},{Date:"2024-01-01",Amount:-50,Category:"Groceries",Description:"Supermarket",Ignore:!1}],m=e.filter(e=>!e.Ignore),g=e=>{if(l(!0),!e||0===e.length){console.warn("Empty file uploaded or invalid data."),t([]),l(!1);return}d(Object.keys(e[0])),t(j(e,o)),l(!1)},x=async(a,n,r,s,l)=>{if(!a||!n||!r||!s)return;let c={newCategory:a,stringMatch:n,matchType:r,selectedHeader:s,ignore:l},d=[...o,c];i(d),await L(c),t(j(e,d))},j=(e,t)=>e.map(e=>{let a=t.find(t=>{switch(t.matchType){case"exact":return e[t.selectedHeader].toLowerCase()===t.stringMatch.toLowerCase();case"startsWith":return e[t.selectedHeader].toLowerCase().startsWith(t.stringMatch.toLowerCase());case"endsWith":return e[t.selectedHeader].toLowerCase().endsWith(t.stringMatch.toLowerCase());case"contains":return e[t.selectedHeader].toLowerCase().includes(t.stringMatch.toLowerCase());default:return!1}});return a?{...e,Category:a.newCategory,Ignore:a.ignore}:e});return(0,n.jsxs)("div",{className:"body-container",children:[(0,n.jsx)("h1",{children:"Dashboard Overview"}),(0,n.jsxs)("div",{children:[(0,n.jsx)("h2",{children:"Upload Your Data"}),(0,n.jsx)(S,{onFileUploaded:g})]}),(0,n.jsxs)("div",{children:[e.length>0&&(0,n.jsx)("button",{onClick:()=>u(!0),children:"Open Category Manager"}),h&&(0,n.jsx)(U,{headers:c,categories:o,onCategoryCreate:x,onClose:()=>u(!1),onSave:()=>{t(j(e,o)),u(!1)},onUpload:a=>{i(a),t(j(e,a))}})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("h2",{children:"Quick View: Reports"}),a?(0,n.jsx)(s,{}):e.length?(0,n.jsx)(f,{data:m}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("p",{children:"No data available. Please upload a file to view reports."}),(0,n.jsx)(s,{})]})]}),(0,n.jsx)("button",{onClick:()=>g(p),children:"Use Test Data"}),(0,n.jsx)("button",{onClick:()=>{t([]),i([]),d([])},children:"Clear Data"})]})}},2894:function(e){e.exports={categoryList:"categorymanager_categoryList__xHR4U",categoryItem:"categorymanager_categoryItem__ANJZV",categoryManagerButtons:"categorymanager_categoryManagerButtons__GKCEu",uploadButton:"categorymanager_uploadButton__8fw0E"}},1793:function(e){e.exports={dropzone:"fileupload_dropzone__cI_ZA",uploadStatus:"fileupload_uploadStatus__3LW_7"}},6942:function(e){e.exports={lineChartContainer:"linechart_lineChartContainer__XZEQz",chartControls:"linechart_chartControls__xQUJQ"}},9383:function(e){e.exports={modalBackdrop:"modal_modalBackdrop__R0Rnx",modalContent:"modal_modalContent__AWJ2M",modalClose:"modal_modalClose__oIxEd"}},3931:function(e){e.exports={skeleton:"skeleton_skeleton__Bzazt",loading:"skeleton_loading__EwLKp",skeletonChart:"skeleton_skeletonChart__CNdNB"}},8023:function(e){e.exports={tableContainer:"table_tableContainer__mSloZ",tableContents:"table_tableContents__Mc12A",tableTh:"table_tableTh__x6G70",tableTd:"table_tableTd__T_vjs"}},67:function(){},2061:function(){}}]);