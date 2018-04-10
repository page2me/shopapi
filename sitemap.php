<?php
header('Content-Type: application/xml; charset=UTF-8');
// XML
$content = '<'.'?xml version="1.0" encoding="UTF-8"?'.'>';
$content .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
$content .= ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"';
$content .= ' xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9';
$content .= ' http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">';
// ข้อมูลหมวดหมู่
$json = json_decode(file_get_contents('https://oas.kotchasan.com/api.php/categories'));
// วันนี้
$date = date('Y-m-d');
foreach ($json as $item) {
  $content .= '<url><loc>http://'.$_SERVER['HTTP_HOST'].'/index.html?category_id='.$item->category_id.'</loc><lastmod>'.$date.'</lastmod><changefreq>daily</changefreq><priority>0.5</priority></url>';
}
$json = json_decode(file_get_contents('https://oas.kotchasan.com/api.php/products'));
foreach ($json->items as $item) {
  $content .= '<url><loc>http://'.$_SERVER['HTTP_HOST'].'/index.html?id='.$item->id.'</loc><lastmod>'.$date.'</lastmod><changefreq>daily</changefreq><priority>0.5</priority></url>';
}
for ($i = 2; $i <= $json->totalpage; $i++) {
  $json = json_decode(file_get_contents('https://oas.kotchasan.com/api.php/products/'.$i));
  foreach ($json->items as $item) {
    $content .= '<url><loc>http://'.$_SERVER['HTTP_HOST'].'/index.html?id='.$item->id.'</loc><lastmod>'.$date.'</lastmod><changefreq>daily</changefreq><priority>0.5</priority></url>';
  }
}
$content .= '</urlset>';
echo $content;
