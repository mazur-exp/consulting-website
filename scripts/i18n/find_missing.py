import sys, re
p=sys.argv[1]
lines=open(p,encoding='utf-8').read().split('\n')
for i,l in enumerate(lines):
    m=re.match(r'^(\s*)id: "(.*?)",?$', l)
    if m and 'th:' not in (lines[i+1] if i+1<len(lines) else ''):
        print(f'{i}| {m.group(2)}')
