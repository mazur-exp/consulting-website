# Воронка флота: охват, открытия меню, заказы (снято 24.09.2026)

Источник: `merchant_daily_metrics` в delivery-monitor, тот же расчёт, что у виджета
«Воронка клиентов» в org-дашборде (`FleetConversionBenchmark`: фильтр охват от 500).
Период 26.06-23.09.2026 (90 дней). Медианы по заведениям, не агрегат по флоту.
Снято под LinkedIn-пост 2; в декабрьский выпуск бенчмарка эти срезы просились
(BACKLOG «воронка показы, открытия меню, заказы»).

| Рынок, платформа | n | Открыли меню, медиана (min-max) | Из открывших заказали, медиана (max) | Сквозная охват-заказ, медиана / среднее / лучшая | Итого охват / визиты / заказы |
|---|---|---|---|---|---|
| Бали, GrabFood | 90 | 7.4% (3.8-14.0) | 11.5% (24.9) | 0.82% / 0.86% / 1.85% | 5 833 206 / 428 963 / 57 961 |
| Пхукет, GrabFood | 13 | 8.5% (5.2-12.7) | 11.7% (32.9) | 0.98% / 1.08% / 2.8% | 368 927 / 31 594 / 4 984 |
| Бали, GoFood | 81 | 7.1% (1.3-40.9) | 27.9% (91.6) | 1.85% / 3.28% / 24.95% | 1 361 309 / 95 512 / 26 776 |

GoFood в публичных сравнениях воронки не используем: у GoBiz другая семантика
`customer_reach` (уже тёплая аудитория), отсюда «конверсия 25%». Для публикаций
берём только GrabFood.

Топ-заведение Алекса (виджет 26.06-23.09): 488 504 охват, 6.8% открыли меню,
9.1% заказали, 1.0% сквозная. По обоим шагам около медианы, не в лидерах.

## Запрос (с Mac)

```
export SSH_AUTH_SOCK=$(ls /private/tmp/com.apple.launchd.*/Listeners | head -1)
ssh myserver 'C=$(docker ps --format "{{.Names}}" | grep "^delivery-monitor-web-" | head -1); docker exec $C bin/rails runner "
rows = MerchantDailyMetric.joins(:restaurant).where(\"stat_date >= ? AND stat_date <= ?\", Date.new(2026,6,26), Date.new(2026,9,23)).where(\"customer_reach > 0\").group(\"restaurants.country\", :platform, :restaurant_id).pluck(Arel.sql(\"restaurants.country, merchant_daily_metrics.platform, restaurant_id, SUM(customer_reach), SUM(customer_visits), SUM(unique_menu_visits), SUM(orders), COUNT(*)\"))
def med(a); s=a.sort; n=s.size; return nil if n==0; n.odd? ? s[n/2] : (s[n/2-1]+s[n/2])/2.0; end
rows.group_by{|r| [r[0], r[1]]}.each do |(country, plat), rs|
  rs = rs.select{|r| r[3].to_f >= 500}
  open = rs.map{|r| v=(r[4].to_f>0 ? r[4].to_f : r[5].to_f); v>0 ? v/r[3].to_f*100 : nil}.compact
  buy  = rs.map{|r| v=(r[4].to_f>0 ? r[4].to_f : r[5].to_f); v>0 ? r[6].to_f/v*100 : nil}.compact
  conv = rs.map{|r| r[6].to_f/r[3].to_f*100}
  puts \"#{country} #{plat}: n=#{rs.size} | reach->menu median #{med(open)&.round(1)} | menu->order median #{med(buy)&.round(1)} | reach->order median #{med(conv)&.round(2)} best #{conv.max.round(2)}\"
end
"'
```

Колонки: `customer_reach` = охват (увидели ресторан), `customer_visits` = просмотры
меню (для Grab; `unique_menu_visits` почти пустая), `orders` = заказы.
