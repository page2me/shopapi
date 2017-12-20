// debug URL ที่เรียก
console.log('https://oas.kotchasan.com/api.php/categories');
// ใช้ Ajax โหลดข้อมูลหมวดหมู่มาทำเป็นเมนู
new GAjax({method: 'GET'}).send('https://oas.kotchasan.com/api.php/categories', null, function (xhr) {
    // debug ผลตอบกลับจาก Server
    console.log(xhr.responseText);
    // แปลงข้อมูลตอบกลับเป็น JSON Object
    var ds = xhr.responseText.toJSON(),
        // menu element #categorymenu
        menu = $G('categorymenu');
    if (ds) {
        // วนลูปสร้างรายการเมนูหมวดหมู่
        for (var i in ds) {
            var li = menu.create('li');
            li.innerHTML = '<a href="index.html?category_id=' + ds[i].category_id + '"><span>' + ds[i].topic + '</span></a>';
            li.id = ds[i].category_id + '/1';
        }
        // เรียกใช้งาน Javascript Drop Down Menu เพื่อให้รองรับ Responsive (ไม่ใช้ก็ได้)
        new GDDMenu('topmenu');
        // อ่านค่าจาก Addressbar แล้วมายกเอา category_id และ page ที่เป็น parameter ออก
        var urls = /category_id=([0-9]+)(&page=([0-9]+))?/.exec(window.location.toString());
        if (urls) {
              // ถ้ามี parameter ครบ ไปโหลดหน้าเว็บที่ต้องการมาแสดง
            getProducts(urls[1] + '/' + (urls[3] ? urls[3] : 1));
        } else {
           // ถ้าไม่มี ตรวจสอบ category_id จากเมนูรายการแรก
            urls = /category_id=([0-9]+)/.exec(menu.firstChild.firstChild.href);
           // แสดงหน้าแรก
            getProducts(urls[1] + '/1');
        }
    }
});
function getProducts(id) {
  // debug URL ที่เรียก
  console.log('https://oas.kotchasan.com/api.php/products/' + id);
  // ใช้ Ajax โหลดข้อมูลตามที่เลือก
  new GAjax({method: 'GET'}).send('https://oas.kotchasan.com/api.php/products/' + id, 'limit=20', function (xhr) {
    // debug ผลตอบกลับจาก Server
    console.log(xhr.responseText);
    // แปลงข้อมูลตอบกลับเป็น JSON Object
    var ds = xhr.responseText.toJSON(),
      detail = '',
      item,
      col = 4,
      n = 0;
    // #content ส่วนแสดงผลเนื้อหา
    content = $G('content');
    if (ds) {
      // วนลูปรายการ ds.items เพื่อแสดงรายการสินค้า โดยใช้ griid ในการแสดงผล
      detail += '<div class="document-list thumbview"><div class="row">';
      for (var i in ds.items) {
        if (n > 0 && n % col == 0) {
          detail += '</div><div class="row">';
        }
        item = ds.items[i];
        detail += '<article class="col' + col + '">';
        detail += '<a class="figure" href="' + item.url + '" rel="nofollow" target="_blank">';
        detail += '<img class=nozoom src="' + item.image + '" alt="' + item.topic + '">';
        detail += '</a><div>';
        detail += '<h6><a href="' + item.url + '" rel="nofollow" target="_blank">' + item.topic + '</a></h6>';
        detail += '<p class="price">' + item.price + ' THB</p>';
        detail += '</div></article>';
        n++;
      }
      detail += '</div></div>';
      // ลิงค์รายการแบ่งหน้า (ถ้ามี)
      if (ds.totalpage > 0) {
        detail += '<footer class="splitpage">';
        for (i = 1; i <= ds.totalpage; i++) {
          if (i == ds.page) {
            detail += '<strong>' + i + '</strong>';
          } else {
            detail += '<a href="index.html?category_id=' + ds.category_id + '&amp;page=' + i + '" id="' + ds.category_id + '/' + i + '">' + i + '</a>';
          }
        }
        detail += '</footer>';
      }
      // แสดงผลข้อมูลลงใน #content
      content.innerHTML = detail;
    }
  });
  return false;
}