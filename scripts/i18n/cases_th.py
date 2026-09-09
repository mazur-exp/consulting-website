"""Тайский для case-studies.ts: вытащить английские значения и вставить Th.

  python3 scripts/i18n/cases_th.py list <файл>          — JSON английских значений
  python3 scripts/i18n/cases_th.py inject <файл> <json> — вставить *Th по индексам

Файл — форматированный литерал, поля идут группами ru/en/id. Опираемся на
отступ и имя поля, а не на регулярку по всему тексту: так не ломаемся о
переносы строк внутри длинных значений.
"""
import sys, json, re

FIELD = re.compile(r'^(\s*)([A-Za-z]+)(Ru|En|Id|Th):(.*)$')

def blocks(lines):
    """[(start, end_exclusive, base, lang, kind, value)] для каждого поля."""
    out = []
    i = 0
    while i < len(lines):
        m = FIELD.match(lines[i])
        if not m:
            i += 1; continue
        indent, base, lang, tail = m.groups()
        t = tail.strip()
        start = i
        if t.startswith('['):
            # массив: до строки с закрывающей скобкой на том же отступе
            j = i + 1
            items = []
            while j < len(lines) and lines[j].strip() not in ('],', ']'):
                items.append(lines[j].strip().rstrip(',')); j += 1
            out.append((start, j + 1, base, lang, 'array', items))
            i = j + 1
        elif t == '':
            # значение на следующей строке
            out.append((start, i + 2, base, lang, 'scalar', lines[i + 1].strip().rstrip(',')))
            i += 2
        else:
            out.append((start, i + 1, base, lang, 'scalar', t.rstrip(',')))
            i += 1
    return out

def unquote(s):
    s = s.strip()
    if len(s) > 1 and s[0] in '"\'`' and s[-1] == s[0]:
        s = s[1:-1]
    return s.replace("\\'", "'")

def main():
    mode, path = sys.argv[1], sys.argv[2]
    lines = open(path, encoding='utf-8').read().split('\n')
    bs = blocks(lines)

    if mode == 'list':
        res = []
        for n, (s, e, base, lang, kind, val) in enumerate(bs):
            if lang != 'En':
                continue
            res.append({
                'i': n, 'field': base, 'kind': kind,
                'en': [unquote(v) for v in val] if kind == 'array' else unquote(val),
            })
        print(json.dumps(res, ensure_ascii=False, indent=1))

    elif mode == 'inject':
        th = {int(k): v for k, v in json.load(open(sys.argv[3], encoding='utf-8')).items()}
        # куда вставлять: после Id-блока той же группы, иначе сразу после En
        plan = []
        for n, (s, e, base, lang, kind, val) in enumerate(bs):
            if n not in th:
                continue
            after = e
            if n + 1 < len(bs) and bs[n + 1][2] == base and bs[n + 1][3] == 'Id':
                after = bs[n + 1][1]
            indent = re.match(r'^(\s*)', lines[s]).group(1)
            plan.append((after, indent, base, kind, th[n]))
        for after, indent, base, kind, value in sorted(plan, reverse=True):
            if kind == 'array':
                block = ["%s%sTh: [" % (indent, base)]
                block += ["%s  '%s'," % (indent, v.replace("'", "\\'")) for v in value]
                block += ["%s]," % indent]
            else:
                block = ["%s%sTh: '%s'," % (indent, base, value.replace("'", "\\'"))]
            lines[after:after] = block
        open(path, 'w', encoding='utf-8').write('\n'.join(lines))
        print('вставлено групп:', len(plan))

main()
