import os
from pathlib import Path
from bs4 import BeautifulSoup
import re
from datetime import datetime



directory = "D:/websites/Articles2/articles/"
ignore = ["guide_and_examples", "google_fonts_download"] #folder names to ignore

article_files = []

# get article paths:
for root, dirnames, filenames in os.walk(directory):
    for filename in filenames:
        if filename.endswith(".html") and not (Path(os.path.basename(root)).stem in ignore):
            fname = os.path.join(root, filename)
            article_files.append(fname)

print("Found", len(article_files), "articles. Generating index.html ...")



with open(r"D:\websites\Articles2\index_template.html", "r") as file:
    template = file.read()
    parsed_template = BeautifulSoup(template, features="lxml")

    article_data = []

    # read data from articles:
    for path in article_files:
        with open(path, "r") as file:
            article_html = file.read()
            parsed_article = BeautifulSoup(article_html, features="lxml")
            tags = parsed_article.find_all("tag")
            tags = "".join(str(tag) for tag in tags)
            headline = parsed_article.find("h1").text
            published_date = parsed_article.find("div", {"class": "info_item"})
            published_date = re.findall(r"[0-9]{2}\.[0-9]{2}\.[0-9]{4}", published_date.text)[0]
            article_data.append({"path": str(Path(*Path(path).parts[-2:])), "tags": tags, "title": headline, "date": published_date})

    article_data.sort(key=lambda x: datetime.strptime(x["date"], '%d.%m.%Y'), reverse=True)

    # generate index file:
    for data in article_data:
        elem = BeautifulSoup('<div class="article_item"><a href="articles/' + data["path"] + '" target="_self" rel="noopener noreferrer"><h2>' + data["title"] + '</h2></a><div class="article_item_info">' + data["date"] + '</div><div class="tags">' + str(data["tags"]) + '</div></div><hr>', features="lxml")
        main = parsed_template.find("main")
        main.append(elem.div)
        main.append(elem.hr)

    # save index file:
    with open(r"D:\websites\Articles2\index.html", "w", encoding='utf-8') as file:
        file.write(parsed_template.decode_contents())

print("done")