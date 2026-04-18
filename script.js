
const sheetURL = "https://opensheet.elk.sh/1k6NxRHJYTSZtmAqkB-P6Qrpylnh5crkaIGkqGjtCoTA/1";

let data = [];

fetch(sheetURL)
.then(res => res.json())
.then(res => {
  data = res;
  show("طيور");
});

function show(cat){
  let html = "";

  data.filter(x => x["القسم"] == cat).forEach(item => {
    html += `
    <div class="card">
      <img src="https://images.weserv.nl/?url=${item["الصورة"]}">
      <div class="card-content">
        <div class="name">${item["اسم"]}</div>
        <div class="price">${item["السعر"]} جنيه</div>
      </div>
    </div>
    `;
  });

  document.getElementById("content").innerHTML = html;
}
