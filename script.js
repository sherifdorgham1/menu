const sheetURL = "https://opensheet.elk.sh/1k6NxRHJYTSZtmAqkB-P6Qrpylnh5crkaIGkqGjtCoTA/1";

let data = [];

fetch(sheetURL)
.then(res => res.json())
.then(res => {
  data = res;
  show("طيور");
});

function show(cat){

  // إزالة التحديد من الكل
  document.querySelectorAll(".tabs button").forEach(btn => {
    btn.classList.remove("active");
  });

  // تحديد الزر الحالي
  document.querySelectorAll(".tabs button").forEach(btn => {
    if(btn.innerText.includes(cat)){
      btn.classList.add("active");
    }
  });

  let html = "";

  data.filter(x => x["القسم"] == cat).forEach(item => {

    let img = item["الصورة"] ? 
    `https://images.weserv.nl/?url=${item["الصورة"]}` :
    "https://via.placeholder.com/300";

    html += `
    <div class="card">
      <img src="${img}">
      <div class="card-content">
        <div class="name">${item["اسم"]}</div>

        <div class="price">
          ${item["السعر"]} جنيه ${item["الوحدة"] || "الكيلو"}
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
