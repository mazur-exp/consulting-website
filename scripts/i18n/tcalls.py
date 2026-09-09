"""Разбор вызовов t(...) со счётом скобок и кавычек.

Зачем не регулярка: аргументы многострочные, внутри them апострофы, шаблонные
строки и вложенные скобки. Регулярка на таком ломается тихо — и ломает сайт.

  python3 scripts/i18n/tcalls.py list <файл>        — показать вызовы без th
  python3 scripts/i18n/tcalls.py inject <файл> <json> — вставить th по индексам
"""
import sys, json, re

def find_calls(src):
    """Возвращает [(start, end, [(argstart, argend), ...])] для каждого t(...)."""
    out = []
    for m in re.finditer(r'(?<![\w.$])t\(', src):
        i = m.end()            # сразу после 't('
        depth = 1
        args = [i]
        quote = None
        esc = False
        while i < len(src) and depth:
            ch = src[i]
            if esc:
                esc = False
            elif quote:
                if ch == '\\': esc = True
                elif ch == quote: quote = None
            elif ch in '"\'`':
                quote = ch
            elif ch in '([{':
                depth += 1
            elif ch in ')]}':
                depth -= 1
                if depth == 0:
                    args.append(i)
                    break
            elif ch == ',' and depth == 1:
                args.append(i); args.append(i + 1)
            i += 1
        if depth == 0:
            spans = [(args[k], args[k+1]) for k in range(0, len(args) - 1, 2)]
            out.append((m.start(), i, spans))
    return out

def arg_text(src, span):
    return src[span[0]:span[1]].strip()

def is_literal(a):
    a = a.strip()
    return len(a) > 1 and a[0] in '"\'' and a[-1] == a[0]

def main():
    mode, path = sys.argv[1], sys.argv[2]
    src = open(path, encoding='utf-8').read()
    calls = find_calls(src)

    if mode == 'list':
        res = []
        for n, (s, e, spans) in enumerate(calls):
            args = [arg_text(src, sp) for sp in spans]
            if len(args) < 2 or len(args) > 3: continue
            if not all(is_literal(a) for a in args): continue
            res.append({'i': n, 'ru': args[0], 'en': args[1],
                        'id': args[2] if len(args) > 2 else None})
        print(json.dumps(res, ensure_ascii=False, indent=1))

    elif mode == 'inject':
        th = {int(k): v for k, v in json.load(open(sys.argv[3], encoding='utf-8')).items()}
        # правим с конца, чтобы не сбить смещения
        for n, (s, e, spans) in reversed(list(enumerate(calls))):
            if n not in th: continue
            args = [arg_text(src, sp) for sp in spans]
            ins = ''
            if len(args) == 2:                      # id не было — ставим undefined
                ins = ", undefined, '%s'" % th[n].replace("'", "\\'")
            else:
                ins = ", '%s'" % th[n].replace("'", "\\'")
            src = src[:e] + ins + src[e:]
        open(path, 'w', encoding='utf-8').write(src)
        print('вставлено:', len(th))

main()
