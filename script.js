const sheetURL = "https://opensheet.elk.sh/1k6NxRHJYTSZtmAqkB-P6Qrpylnh5crkaIGkqGjtCoTA/1";

let data = [];

fetch(sheetURL)
.then(res => res.json())
.then(res => {
  data = res;
  show("طيور");
});

function show(cat){

  // إزالة التحديد من الأزرار
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

  data
  .filter(x => x["القسم"] == cat)
  .forEach(item => {

    // صورة المنتج
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
        
        <!-- اسم المنتج -->
        <div class="name">${item["اسم"]}</div>

        <!-- السعر -->
        <div class="price">
          <span class="num">${item["السعر"]}</span>
          جنيه
          ${item["الوحدة"] || "الكيلو"}
        </div>

        <!-- زر الطلب -->
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
