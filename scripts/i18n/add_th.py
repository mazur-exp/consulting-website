"""Добавляет строку th: после строки id: по номерам строк.
   python3 add_th.py <файл> <json {"номер": "тайский"}>
   Номера — из вывода find_missing (0-based), правим с конца."""
import sys, json, re
p, jf = sys.argv[1], sys.argv[2]
mp = {int(k): v for k, v in json.load(open(jf, encoding='utf-8')).items()}
lines = open(p, encoding='utf-8').read().split('\n')
for n in sorted(mp, reverse=True):
    m = re.match(r'^(\s*)id: "(.*?)",?$', lines[n])
    if not m:
        print('пропуск, не похоже на id-строку:', n, lines[n][:60]); continue
    if not lines[n].rstrip().endswith(','):
        lines[n] = lines[n].rstrip() + ','
    lines.insert(n + 1, f'{m.group(1)}th: "{mp[n]}"')
open(p, 'w', encoding='utf-8').write('\n'.join(lines))
print('добавлено:', len(mp))
