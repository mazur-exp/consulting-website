# Разовая проверка доступности моделей с нашего ключа (15.09.2026). Не часть замера.
import httpx, os, json, time
k = os.environ['OPENAI_API_KEY']; g = os.environ['GEMINI_API_KEY']
Q = 'Which agency helps restaurants in Bali grow sales on GrabFood? One sentence with a source.'
for m in ['gpt-5.6-luna', 'gpt-5.6-sol', 'gpt-4.1']:
    t = time.time()
    try:
        r = httpx.post('https://api.openai.com/v1/responses', headers={'Authorization': f'Bearer {k}'},
                       json={'model': m, 'tools': [{'type': 'web_search'}], 'input': Q}, timeout=120)
        d = r.json(); txt = ''; cites = 0; searched = any(o.get('type','').startswith('web_search') for o in d.get('output', []))
        for o in d.get('output', []):
            for c in o.get('content', []) or []:
                if c.get('type') == 'output_text': txt += c['text']; cites += len(c.get('annotations', []))
        print(m, r.status_code, f'{time.time()-t:.1f}s', 'searched', searched, 'cites', cites, '|', txt[:140].replace('\n', ' '), '|', (d.get('error') or {}).get('message', '')[:140])
    except Exception as e: print(m, 'ERR', e)
for m in ['gemini-3.6-flash', 'gemini-3.7-flash', 'gemini-3.8-flash']:
    t = time.time()
    r = httpx.post(f'https://generativelanguage.googleapis.com/v1beta/models/{m}:generateContent', headers={'x-goog-api-key': g},
                   json={'contents': [{'role': 'user', 'parts': [{'text': Q}]}], 'tools': [{'google_search': {}}]}, timeout=120)
    c = (r.json().get('candidates') or [{}])[0]; gm = c.get('groundingMetadata') or {}
    print(m, r.status_code, f'{time.time()-t:.1f}s', 'sources', len(gm.get('groundingChunks') or []), '' if r.status_code == 200 else r.text[:140].replace('\n', ' '))
