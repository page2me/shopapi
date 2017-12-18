new GAjax({method: 'GET'}).send('https://oas.kotchasan.com/api.php/categories', null, function (xhr) {
  var ds = xhr.responseText.toJSON(),
    menu = $G('categorymenu');
  if (ds) {
    for (var i in ds) {
      var li = menu.create('li');
      li.innerHTML = '<a><span>' + ds[i].topic + '</span></a>';
      li.id = ds[i].category_id + '/1';
    }
    new GDDMenu('topmenu');
    forEach(menu.elems('li'), function () {
      callClick(this, getProducts);
    });
    menu.firstChild.click();
  }
});
function getProducts() {
  new GAjax({method: 'GET'}).send('https://oas.kotchasan.com/api.php/products/' + this.id, 'limit=20', function (xhr) {
    var ds = xhr.responseText.toJSON(),
      detail = '',
      item,
      col = 4,
      n = 0;
    content = $G('content');
    if (ds) {
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
      if (ds.totalpage > 0) {
        detail += '<footer class="splitpage">';
        for (i = 1; i <= ds.totalpage; i++) {
          if (i == ds.page) {
            detail += '<strong>' + i + '</strong>';
          } else {
            detail += '<a id="' + ds.category_id + '/' + i + '" onclick="getProducts.call(this)">' + i + '</a>';
          }
        }
        detail += '</footer>';
      }
      content.innerHTML = detail;
    }
  });
  return false;
}