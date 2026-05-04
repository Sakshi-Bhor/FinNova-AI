/* Sidebar */
function showSection(id,el){
document.querySelectorAll(".page").forEach(sec=>{
sec.style.display="none";
});

document.getElementById(id).style.display="block";

document.querySelectorAll(".menu").forEach(item=>{
item.classList.remove("active");
});

el.classList.add("active");
}

/* Theme System */
const themeFab=document.getElementById("themeFab");
const themePanel=document.getElementById("themePanel");

themeFab.onclick=()=>{
themePanel.style.display=
themePanel.style.display==="flex"?"none":"flex";
};

function setTheme(name){
document.body.className=`theme-${name}`;
localStorage.setItem("theme",name);
}

setTheme(localStorage.getItem("theme") || "dark");

/* Currency Converter */
const from=document.getElementById("from");
const to=document.getElementById("to");
const fromFlag=document.getElementById("fromFlag");
const toFlag=document.getElementById("toFlag");
const convertBtn=document.getElementById("convert");

for(let code in countryList){
from.innerHTML+=`<option value="${code}">${code}</option>`;
to.innerHTML+=`<option value="${code}">${code}</option>`;
}

from.value="USD";
to.value="INR";

function updateFlags(){
fromFlag.src=`https://flagsapi.com/${countryList[from.value]}/flat/64.png`;
toFlag.src=`https://flagsapi.com/${countryList[to.value]}/flat/64.png`;
}

from.onchange=updateFlags;
to.onchange=updateFlags;

async function convertCurrency(){

try{

convertBtn.innerText="Converting...";

let amount=parseFloat(document.getElementById("amount").value) || 1;

let res=await fetch(`https://open.er-api.com/v6/latest/${from.value}`);
let data=await res.json();

let rate=data.rates[to.value];

let final=(amount*rate).toFixed(2);

document.getElementById("result").innerText=
`${amount} ${from.value} = ${final} ${to.value}`;

document.getElementById("historyList").innerHTML+=
`<li>${amount} ${from.value} = ${final} ${to.value}</li>`;

}catch(error){

document.getElementById("result").innerText=
"Conversion failed. Check internet.";

}

convertBtn.innerText="Convert Now";
}

document.getElementById("convert").onclick=convertCurrency;

document.getElementById("swap").onclick=()=>{
let temp=from.value;
from.value=to.value;
to.value=temp;
updateFlags();
convertCurrency();
};

updateFlags();
convertCurrency();

/* AI Assist */
const sendBtn=document.getElementById("sendBtn");
const chatBox=document.getElementById("chatBox");

function aiReply(msg){

msg=msg.toLowerCase();

if(msg.includes("usd")) return "USD remains a dominant reserve currency.";
if(msg.includes("gold")) return "Gold is often used as a hedge during uncertainty.";
if(msg.includes("inflation")) return "Inflation means rising prices over time.";
if(msg.includes("bitcoin")) return "Bitcoin is volatile and high risk.";
if(msg.includes("save")) return "Diversify savings across assets.";
return "Ask me about currency, gold, inflation, crypto or finance.";
}

sendBtn.onclick=()=>{

let input=document.getElementById("userInput");
let text=input.value.trim();

if(text==="") return;

chatBox.innerHTML+=`<div class="user">${text}</div>`;
input.value="";

setTimeout(()=>{
chatBox.innerHTML+=`<div class="bot">${aiReply(text)}</div>`;
chatBox.scrollTop=chatBox.scrollHeight;
},500);
};

/* Enter key */
document.getElementById("userInput").addEventListener("keypress",(e)=>{
if(e.key==="Enter") sendBtn.click();
});

/* Chart */
new Chart(document.getElementById("myChart"),{
type:"line",
data:{
labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
datasets:[{
data:[82.7,83,83.2,83.6,83.4,83.7,83.5],
borderWidth:3,
tension:.4
}]
},
options:{
responsive:true,
maintainAspectRatio:false,
plugins:{legend:{display:false}}
}
});