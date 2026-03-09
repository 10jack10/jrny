import urllib.request
import json
import urllib.parse
queries = [
    "dark abstract tech scanning loop",
    "dark data processing loop",
    "dark target focus loop abstract",
    "dark abstract building digital loop",
    "dark infinite tech loop abstract"
]
for q in queries:
    url = f"https://g.tenor.com/v1/search?q={urllib.parse.quote(q)}&key=LIVDSRZULELA&limit=1"
    try:
        res = urllib.request.urlopen(url).read().decode("utf-8")
        data = json.loads(res)
        gif_url = data.get("results", [{}])[0].get("media", [{}])[0].get("gif", {}).get("url", "none")
        print(f"{q}:\n{gif_url}\n")
    except Exception as e:
        print(f"Error {q}: {e}")
