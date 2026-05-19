let siteStatus = "on";

fetch("https://opensheet.elk.sh/1k6NxRHJYTSZtmAqkB-P6Qrpylnh5crkaIGkqGjtCoTA/settings")
.then(res => res.json())
.then(res => {
  siteStatus = res[0].status;
});

const sheetURL = "https://opensheet.elk.sh/1k6NxRHJYTSZtmAqkB-P6Qrpylnh5crkaIGkqGjtCoTA/1";

let data = [];

// تحميل البيانات
fetch(sheetURL)
.then(res => res.json())
.then(res => {
  data = res;
  show("طيور");
});


// ✅ التاريخ + الساعة (لايف)
function updateDateTime() {

  let now = new Date();

  let days = ["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];
  let dayName = days[now.getDay()];

  let day = now.getDate();
  let month = now.getMonth() + 1;
  let year = now.getFullYear();

  let hours = now.getHours();
  let minutes = now.getMinutes();

  let period = hours >= 12 ? "مساءً" : "صباحًا";

  hours = hours % 12;
  if (hours === 0) hours = 12;

  minutes = minutes < 10 ? "0" + minutes : minutes;

  document.getElementById("dateBox").innerText =
    "📅 " + dayName + " " + day + " / " + month + " / " + year +
    " - 🕒 " + hours + ":" + minutes + " " + period;
}

// تشغيلها كل ثانية
setInterval(updateDateTime, 1000);
updateDateTime();


// عرض المنتجات
function show(cat){
  if(siteStatus === "off"){
  document.getElementById("content").innerHTML = `
    <div style="text-align:center; padding:40px;">
<h2 style="font-size:38px;font-weight:bold;line-height:1.8;color:white;">
🐑✨ عيد أضحى مبارك ✨🐑
</h2>

<p style="font-size:24px;font-weight:bold;line-height:1.8;color:white;">
دواجن ومشويات درغام تتمنى لكم عيدًا سعيدًا ❤️
</p>
    </div>
  `;
  return;
}
  document.querySelectorAll(".tabs button").forEach(btn => {
    btn.classList.remove("active");
  });

  document.querySelectorAll(".tabs button").forEach(btn => {
    if(btn.innerText.includes(cat)){
      btn.classList.add("active");
    }
  });

  let html = "";

  data
  .filter(x => x["القسم"] == cat)
  .forEach(item => {

    let img = item["الصورة"] 
      ? item["الصورة"] 
      : "https://via.placeholder.com/300?text=No+Image";

    html += `
    <div class="card">

      <!-- صورة + لودينج -->
      <div class="img-box">
        <div class="img-loader"></div>
        <img src="${img}" 
             onload="this.classList.add('loaded'); this.previousElementSibling.style.display='none'" 
             onerror="this.src='https://via.placeholder.com/300?text=No+Image'; this.classList.add('loaded'); this.previousElementSibling.style.display='none'">
      </div>

      <div class="card-content">
        
        <div class="name">${item["اسم"]}</div>

        <div class="price">
          <span class="num">${item["السعر"]}</span>
          جنيه
          ${item["الوحدة"] || "الكيلو"}
        </div>

        <a href="https://wa.me/201211340121?text=${encodeURIComponent(
          "السلام عليكم، عايز أطلب " + item["اسم"] + " بسعر " + item["السعر"] + " جنيه " + (item["الوحدة"] || "الكيلو")
        )}" 
        target="_blank" 
        class="order-item-btn">
          اطلب ده
        </a>

      </div>
    </div>
    `;
    
  });

  document.getElementById("content").innerHTML = html;
}
