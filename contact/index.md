---
layout: page
title: 蘇智弦服務處公開聯絡資料
kicker: 聯絡資料
description: 蘇智弦服務處位於彰化縣和美鎮線東路三段 9 號（彰和路、線東路交叉路口），電話 04-7519819，亦可透過 LINE 官方帳號聯繫。
permalink: /contact/
updated: 2026-10-07
sources:
  - { publisher: 蘇智弦競選團隊, title: "官方網站聯絡區塊（網站自述）", url: "https://mrfrancis0127.github.io/ChihHsuan-2026/#contact", date: "2026-10-07 查閱", supports: "地址、電話、LINE" }
---

<table class="page-facts">
<tr><th>地址</th><td>{{ site.data.site_info.address }}（{{ site.data.site_info.address_note }}）｜<a href="{{ site.data.site_info.map_url }}" target="_blank" rel="noopener">開啟地圖</a></td></tr>
<tr><th>電話</th><td><a href="tel:{{ site.data.site_info.phone | remove: '-' }}">{{ site.data.site_info.phone }}</a></td></tr>
<tr><th>行動電話</th><td><a href="tel:{{ site.data.site_info.mobile | remove: '-' }}">{{ site.data.site_info.mobile }}</a></td></tr>
<tr><th>LINE 官方帳號</th><td><a href="{{ site.data.site_info.line_url }}" target="_blank" rel="noopener">{{ site.data.site_info.line_url }}</a></td></tr>
{% if site.data.site_info.service_hours != "" %}<tr><th>服務時間</th><td>{{ site.data.site_info.service_hours }}</td></tr>{% endif %}
{% if site.data.site_info.booking_note != "" %}<tr><th>預約方式</th><td>{{ site.data.site_info.booking_note }}</td></tr>{% endif %}
</table>
