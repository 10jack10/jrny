import urllib.request
import re
import json

def fetch_giphy(query):
    url = f"https://giphy.com/search/{query.replace(' ', '-')}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        # Giphy embeds an initial state JSON in the HTML
        match = re.search(r'window\.Giphy\.renderState\s*=\s*(\{.*?\})\s*</script>', html)
        if match:
            state = json.loads(match.group(1))
            gifs = state.get('gifs', {}).get('gifs', {})
            for gif_id, gif_data in gifs.items():
                if 'images' in gif_data and 'original' in gif_data['images']:
                    return gif_data['images']['original']['url'].split('?')[0]
    except Exception as e:
        print(f"Error fetching {query}: {e}")
    return None

queries = [
    "abstract tech nodes loop",   # Awareness (network)
    "data processing abstract",   # Evaluation (analyzing)
    "focus target geometry",      # Selection (narrowing down)
    "building digital blocks",    # Adoption (constructing)
    "infinite loop abstract"      # Renewal (cycle)
]

with open("gif_urls.txt", "w") as f:
    for q in queries:
        url = fetch_giphy(q)
        print(f"{q}: {url}")
        if url:
            f.write(f"{url}\n")
