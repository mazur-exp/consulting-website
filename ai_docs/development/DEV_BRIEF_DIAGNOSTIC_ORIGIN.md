# ТЗ разработчику: «откуда изначально» в диагностике

Заведено 20.09.2026. Текст ниже можно отправлять как есть. Контекст для нас:
первый лид с колонки в The Phuket News (Flip side, Rawai) пришлось сшивать
руками из серверного лога сайта и базы диагностики. Сайт с 20.09 передаёт
первое касание в диагностику параметром `utm_term`, но диагностика его
теряет: он не в permit и не в таблице. Это и надо доделать.

---

## Текст для разработчика

Репо `delivery-monitor`, ветка `main`. Задача небольшая, 5 правок в одной
цепочке, без изменения логики диагностики.

**Что происходит.** Сайт booster.delivery добавляет к каждой ссылке на
diagnostic.booster.delivery параметр `utm_term` = первое касание сессии
посетителя, в одну строку: `referral/thephuketnews.com`, `ai/ChatGPT`,
`search/Google`, `social/Facebook`, `direct`. Уже в проде. Диагностика
этот параметр сейчас выбрасывает: `landing` permit'ит только четыре utm,
JS-контроллер шлёт в API только то, что пришло в `@utm`, API permit'ит те же
четыре, в таблице `diagnostics` колонки нет.

**Что нужно.** Донести `utm_term` до базы и напечатать его в уведомлении о
лиде.

1. Миграция: `add_column :diagnostics, :utm_term, :string`. Индекс не нужен.

2. `app/controllers/diagnostics/pages_controller.rb`, метод `landing`:
   добавить `:utm_term` в `params.permit(...)`. После этого `@utm.to_json`
   попадёт в `data-diagnostic-utm-value`, и `diagnostic_controller.js`
   отправит его в API без правок (там `...utm` в body).

3. `app/controllers/api/v1/diagnostics_controller.rb`, `create`: добавить
   `:utm_term` в `params.permit(...)` для `utm:`.

4. `app/services/diagnostics/intake.rb`, `create!`: рядом с `utm_content`
   добавить `utm_term: @utm["utm_term"].to_s.first(200).presence`.

5. `app/services/diagnostics/contact_service.rb`, `notify_ops`: после строки
   «откуда: utm_source / utm_content» добавить две строки, обе только если
   есть что печатать:
   - `откуда изначально: #{@diagnostic.utm_term}`
   - `браузер: Facebook (встроенный)` если `user_agent` содержит `FB_IAB` или
     `FBAN`; `браузер: Instagram (встроенный)` если содержит `Instagram`.
     Это важно: встроенный браузер Facebook не отдаёт реферер, и без этой
     строки такой лид выглядит как «пришёл ниоткуда».

Итоговое уведомление для лида с колонки будет выглядеть так (новые строки
последние две перед ссылкой):

```
Flip side · grab · балл N
контакт: нажал WhatsApp, ждём сообщение
откуда: website / hero
откуда изначально: referral/thephuketnews.com
браузер: Facebook (встроенный)
https://diagnostic.booster.delivery/d/...
```

**Проверка.** Открыть
`https://diagnostic.booster.delivery/?utm_source=website&utm_medium=cta&utm_campaign=free_audit&utm_content=hero&utm_term=referral%2Ftest.local`,
запустить диагностику любой ссылкой Grab, убедиться в rails runner, что у
новой записи `utm_term == "referral/test.local"`, нажать WhatsApp на отчёте
и увидеть строку «откуда изначально» в Telegram-уведомлении. Запись потом
удалить, чтобы не портить статистику.

**Не нужно.** Не трогать Umami-партиал `app/views/diagnostics/_analytics.html.erb`
(он уже читает `utm_term` из URL сам) и не менять формат существующих строк
уведомления: на них завязаны глаза, а не код, но пусть остаются как есть.

---

## Что уже сделано с нашей стороны (для сверки)

- Сайт: `client/src/lib/analytics.ts` пишет первое касание в
  `sessionStorage.db_origin`, `cta.ts` кладёт его в `utm_term`, событие
  `cta-click` в Umami и GA. Коммит `89979f1`.
- Диагностика: Umami на `diagnostic.booster.delivery` (общий website id с
  сайтом, `a3060360`), события `diagnostic-landing`, `diagnostic-report`,
  `diagnostic-contact`, все с полем `origin`. Коммит `b0f6387` (PΔ.430).
