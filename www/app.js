// ================== بيانات المجموعات ==================
const G1_diseases = ["Cholera","Typhoid","Shigellosis","Dysentery","OtherBacterial","FoodPoisoning","ViralGastroenteritis"];
const G2_diseases = ["TB_Respiratory","ExtraPulmonaryTB","Brucellosis","Leprosy","Tetanus","Diphtheria"];
const G3_diseases = ["Pertussis","Polio","Rabies","Dengue","Pseudovirus","Measles","Rubella","HepA","HepB","OtherHep","Mumps"];
const G4_diseases = ["Fungal","Malaria","Leishmaniasis","Bilharzia","GuineaWorm","IntestinalParasites"];
const G5_diseases = ["MalignantTumors","RespiratoryCancer","DigestiveCancer","BreastCancer","BenignTumors"];
const G6_diseases = ["NutritionalAnemia","Thalassemia","SickleCell","OtherAnemia","SpleenDiseases","Diabetes","Malnutrition","Rickets"];
const G7_diseases = ["MentalDisorders","NervousDiseases","MeningitisBacterial","MeningitisUnknown"];
const G8_diseases = ["EyeDiseases","Glaucoma","EarDisorders_Osteoma","EarDisorders_External","EarDisorders_Middle"];
const G9_diseases = ["CardiovascularDiseases","AcuteRheumaticFever","ChronicRheumaticHeartDisease","Hypertension","HeartFromHypertension","IschemicHeartDisease","OtherHeartDiseases","Hemorrhoids"];
const G10_diseases = ["RespiratoryDiseases","Tonsillitis","Influenza","Pneumonia","Bronchitis","NasalSinusDisorders","Asthma"];
const G11_diseases = ["OralDiseases","ToothDecay","OtherDentalDiseases","StomachUlcer","DuodenalUlcer","Gastritis","Appendicitis","NonInfectiousIntestines","LiverDiseases","GallPancreasDisorders"];
const G12_diseases = ["SkinDiseases","Cellulitis","Allergies","JointDisorders","BackPainWithOther"];
const G13_diseases = ["UrogenitalDiseases","AcuteChronicKidneyFailure","UrinaryStones","MaleGenitalDiseases","PostpartumComplications"];
const G14_diseases = ["InjuriesFractures","BurnsWounds","OtherAccidents","TransportAccidents","Falls","Drowning","Assault","Other"];

// ================== دالة حساب كل مرض ==================
function calculate(diseaseId) {
  const maleRow = document.getElementById(diseaseId + "_male");
  const femaleRow = document.getElementById(diseaseId + "_female");
  if (!maleRow || !femaleRow) return;

  let maleTotal=0, femaleTotal=0, grandTotal=0;
  for(let i=1;i<=5;i++){
    const m = Number(maleRow.children[i].children[0].value || 0);
    const f = Number(femaleRow.children[i].children[0].value || 0);
    maleTotal += m; femaleTotal += f; grandTotal += (m+f);

    const cell = document.getElementById(diseaseId+"_t"+i);
    if(cell) cell.innerText = m+f;
  }

  document.getElementById(diseaseId+"_maleTotal").innerText = maleTotal;
  document.getElementById(diseaseId+"_femaleTotal").innerText = femaleTotal;
  document.getElementById(diseaseId+"_grandTotal").innerText = grandTotal;

  updateGroupTotals();
  updateGrandTotalsByAge();
  updateRiskAlert(diseaseId, grandTotal);
}

// ================== تنبيه الإنذار المبكر ==================
function updateRiskAlert(diseaseId, total) {
  const threshold = 20; // الحد للتنبيه، يمكن تغييره لكل مرض حسب الحاجة
  const row = document.getElementById(diseaseId+"_male").parentNode;
  if(!row) return;
  if(total>=threshold){
    row.style.backgroundColor="#f8d7da"; // أحمر
  } else if(total>=10){
    row.style.backgroundColor="#fff3cd"; // أصفر
  } else {
    row.style.backgroundColor="#d4edda"; // أخضر
  }
}

// ================== تحديث كل مجموعة ==================
function updateGroupTotals(){
  const groups=[
    {id:"G1_total",list:G1_diseases},{id:"G2_total",list:G2_diseases},{id:"G3_total",list:G3_diseases},
    {id:"G4_total",list:G4_diseases},{id:"G5_total",list:G5_diseases},{id:"G6_total",list:G6_diseases},
    {id:"G7_total",list:G7_diseases},{id:"G8_total",list:G8_diseases},{id:"G9_total",list:G9_diseases},
    {id:"G10_total",list:G10_diseases},{id:"G11_total",list:G11_diseases},{id:"G12_total",list:G12_diseases},
    {id:"G13_total",list:G13_diseases},{id:"G14_total",list:G14_diseases}
  ];
  groups.forEach(g=>{
    const el = document.getElementById(g.id);
    if(!el) return;
    el.innerText = g.list.reduce((sum,d)=>sum+Number(document.getElementById(d+"_grandTotal")?.innerText||0),0);
  });
}

// ================== الإجمالي العام لكل فئة عمرية ==================
function updateGrandTotalsByAge(){
  const allDiseases=[].concat(G1_diseases,G2_diseases,G3_diseases,G4_diseases,G5_diseases,G6_diseases,G7_diseases,G8_diseases,
    G9_diseases,G10_diseases,G11_diseases,G12_diseases,G13_diseases,G14_diseases);

  let totals=[0,0,0,0,0]; let grand=0;
  allDiseases.forEach(d=>{
    for(let i=1;i<=5;i++){
      const c=document.getElementById(d+"_t"+i);
      if(c) totals[i-1]+=Number(c.innerText||0);
    }
    const g=document.getElementById(d+"_grandTotal");
    if(g) grand+=Number(g.innerText||0);
  });

  for(let i=1;i<=5;i++){
    const el=document.getElementById("grand_t"+i);
    if(el) el.innerText=totals[i-1];
  }
  const gt=document.getElementById("grand_total");
  if(gt) gt.innerText=grand;
}

// ================== التبويبات ==================
function openSubTab(evt,diseaseName){
  document.querySelectorAll(".subtabcontent").forEach(el=>el.style.display="none");
  document.querySelectorAll(".subtablinks").forEach(el=>el.classList.remove("active"));
  document.getElementById(diseaseName).style.display="block";
  evt.currentTarget.classList.add("active");
}

// ================== تسجيل الدخول ==================
function login(){
  const user=document.getElementById("username").value;
  const pass=document.getElementById("password").value;
  if(user==="admin" && pass==="123456"){
    document.getElementById("loginPage").style.display="none";
    document.getElementById("dashboard").style.display="block";
  } else {
    document.getElementById("loginError").innerText="❌ بيانات الدخول غير صحيحة";
  }
}

// ================== المحافظات والمديريات ==================
const districtsData={
  "إب":["العدين","يريم","السدة","مذيخرة","القفر"],
  "تعز":["القاهرة","صالة","المظفر","الشمايتين"],
  "صنعاء":["السبعين","التحرير","شعوب","آزال"],
  "عدن":["المنصورة","الشيخ عثمان","دار سعد","التواهي"],
  "الحديدة":["الحالي","الميناء","اللحية","باجل"],
  "ذمار":["مدينة ذمار","عنس","وصاب"],
  "حجة":["حجة","مبين","كحلان"],
  "عمران":["عمران","ريدة","خارف"],
  "ريمة":["الجبين","السلفية"],
  "المحويت":["المحويت","الرجم"],
  "البيضاء":["رداع","الزاهر"],
  "مأرب":["مأرب","صرواح"],
  "الجوف":["الحزم","الغيل"],
  "صعدة":["صعدة","رازح"],
  "شبوة":["عتق","بيحان"],
  "حضرموت":["المكلا","سيئون"],
  "المهرة":["الغيضة"],
  "أبين":["زنجبار","لودر"],
  "لحج":["الحوطة","تبن"],
  "الضالع":["الضالع"],
  "سقطرى":["حديبو"]
};
function populateDistricts(){
  const gov=document.getElementById("governorate").value;
  const dist=document.getElementById("district");
  dist.innerHTML='<option value="">اختر المديرية</option>';
  if(districtsData[gov]){
    districtsData[gov].forEach(d=>{
      const o=document.createElement("option");
      o.value=d; o.textContent=d; dist.appendChild(o);
    });
  }
}

// ================== تصدير Excel ==================
function exportToExcel(){
  const allDiseases=[].concat(G1_diseases,G2_diseases,G3_diseases,G4_diseases,G5_diseases,G6_diseases,G7_diseases,G8_diseases,
    G9_diseases,G10_diseases,G11_diseases,G12_diseases,G13_diseases,G14_diseases);
  let data=[];
  data.push(["المرض","<1","1-4","5-14","15-45","45+","إجمالي ذكور","إجمالي إناث","الإجمالي الكلي"]);

  allDiseases.forEach(d=>{
    const maleRow=document.getElementById(d+"_male");
    const femaleRow=document.getElementById(d+"_female");
    if(!maleRow||!femaleRow) return;
    let ages=[];
    for(let i=1;i<=5;i++){
      const c=document.getElementById(d+"_t"+i);
      ages.push(Number(c?.innerText||0));
    }
    const maleTotal=Number(document.getElementById(d+"_maleTotal")?.innerText||0);
    const femaleTotal=Number(document.getElementById(d+"_femaleTotal")?.innerText||0);
    const grandTotal=Number(document.getElementById(d+"_grandTotal")?.innerText||0);
    data.push([d,...ages,maleTotal,femaleTotal,grandTotal]);
  });

  const ws=XLSX.utils.aoa_to_sheet(data);
  const wb=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,ws,"تقرير الأمراض");
  XLSX.writeFile(wb,"تقرير_الأمراض.xlsx");
}

// ================== مؤشرات الخطر العالمية ==================
const riskLabels=["المجموعة 1","المجموعة 2","المجموعة 3","المجموعة 4","المجموعة 5","المجموعة 6","المجموعة 7","المجموعة 8","المجموعة 9","المجموعة 10","المجموعة 11","المجموعة 12","المجموعة 13","المجموعة 14"];
const riskData=[5,12,8,20,7,15,3,6,10,18,9,4,2,2,11];

function drawRiskChart(){
  const ctx=document.getElementById('globalRiskChart').getContext('2d');
  new Chart(ctx,{
    type:'bar',
    data:{labels:riskLabels,datasets:[{label:'مؤشر الخطر (عدد الحالات أو نسبة الخطر)',data:riskData,backgroundColor:'rgba(255,99,132,0.6)',borderColor:'rgba(255,99,132,1)',borderWidth:1}]},
    options:{responsive:true,plugins:{legend:{display:true,position:'top'},title:{display:true,text:'مؤشرات الخطر العالمية لكل مجموعة من الأمراض'}},scales:{y:{beginAtZero:true,title:{display:true,text:'عدد الحالات أو مؤشر الخطر'}},x:{title:{display:true,text:'المجموعات'}}}}
  });
}

// استدعاء الرسم عند تحميل الصفحة
window.addEventListener("load",drawRiskChart);
function sendWhatsApp() {
  const phone = "00967711129611"; // الرقم الدولي
  const message = encodeURIComponent("📊 هذا تقرير الإحصاء الوطني للأمراض.");
  const url = `https://wa.me/${phone}?text=${message}`;
  window.open(url, "_blank");
}

function sendTelegram() {
  const username = "YOUR_TELEGRAM_USERNAME"; // ضع اسم المستخدم أو معرف القناة
  const message = encodeURIComponent("📊 هذا تقرير الإحصاء الوطني للأمراض.");
  const url = `https://t.me/${username}?text=${message}`;
  window.open(url, "_blank");
}
// ================== حفظ التقرير ==================
function saveReport() {

  const facility = document.getElementById("facilityName")?.value;
  const month = document.getElementById("month")?.value;
  const year = document.getElementById("year")?.value;

  if (!facility || !month || !year) {
    alert("يرجى اختيار المرفق والشهر والسنة أولاً");
    return;
  }

  const key = `report_${facility}_${month}_${year}`;
  let reportData = {};

  // جمع كل المدخلات الرقمية
  document.querySelectorAll('input[type="number"]').forEach(input => {
    reportData[input.id] = input.value;
  });

  localStorage.setItem(key, JSON.stringify(reportData));

  alert("✅ تم حفظ التقرير بنجاح");
}


// ================== استرجاع التقرير ==================
function loadReport() {

  const facility = document.getElementById("facilityName")?.value;
  const month = document.getElementById("month")?.value;
  const year = document.getElementById("year")?.value;

  if (!facility || !month || !year) {
    alert("يرجى اختيار المرفق والشهر والسنة أولاً");
    return;
  }

  const key = `report_${facility}_${month}_${year}`;
  const savedData = localStorage.getItem(key);

  if (!savedData) {
    alert("⚠ لا يوجد تقرير محفوظ لهذا الشهر");
    return;
  }

  const reportData = JSON.parse(savedData);

  Object.keys(reportData).forEach(id => {
    const input = document.getElementById(id);
    if (input) input.value = reportData[id];
  });

  // إعادة حساب المجاميع بعد الاسترجاع
  document.querySelectorAll('input[type="number"]').forEach(input => {
    const diseaseId = input.id.split("_")[0];
    calculate(diseaseId);
  });

  alert("📂 تم استرجاع التقرير بنجاح");
}

(function(){
  var nativePrint = window.print ? window.print.bind(window) : null;
  window.print = function(){
    if (window.AndroidPrint) { window.AndroidPrint.print(); }
    else if (nativePrint) { nativePrint(); }
  };
})();
