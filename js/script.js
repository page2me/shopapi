new GAjax().send('https://oas.kotchasan.com/api.php/categories', null, function (xhr) {
  var ds = xhr.responseText.toJSON(),
    menu = $G('categorymenu');
  if (ds) {
    for (var i in ds) {
      var li = menu.create('li');
      li.innerHTML = '<a><span>' + ds[i].topic + '</span></a>';
      li.id = ds[i].category_id;
    }
    new GDDMenu('topmenu');
    forEach(menu.elems('li'), function () {
      callClick(this, getProducts);
    });
    menu.firstChild.click();
  }
});
var getProducts = function () {
  new GAjax().send('https://oas.kotchasan.com/api.php/products/' + this.id + '/1', null, function (xhr) {
    var ds = xhr.responseText.toJSON(),
      detail = '',
      item,
      n = 0;
    content = $G('content');
    if (ds) {
      detail += '<div class="document-list thumbview"><div class="row">';
      for (var i in ds.items) {
        if (n > 0 && n % 4 == 0) {
          detail += '</div><div class="row">';
        }
        item = ds.items[i];
        detail += '<article class="col4">';
        detail += '<a class="figure"><img class=nozoom src="' + item.image + '" alt="' + item.topic + '"></a>';
        detail += '<div>';
        detail += '<h6>' + item.topic + '</h6>';
        detail += '<p class="price">' + item.price + ' THB</p>';
        detail += '</div></article>';
        n++;
      }
      detail += '</div></div>';
      content.innerHTML = detail;
    }
  });
};