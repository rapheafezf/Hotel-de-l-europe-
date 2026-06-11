import sys
import time
from bs4 import BeautifulSoup, NavigableString
from deep_translator import GoogleTranslator

LANGUAGES = {
    'es': 'es',
    'de': 'de'
}

def translate_html(html_content, target_lang):
    soup = BeautifulSoup(html_content, 'html.parser')
    translator = GoogleTranslator(source='fr', target=target_lang)
    
    text_tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'strong', 'em', 'li', 'button', 'a', 'label', 'option', 'th', 'td', 'div']
    
    texts_to_translate = []
    nodes_to_translate = []
    
    for element in soup.descendants:
        if isinstance(element, NavigableString):
            parent = element.parent
            if parent.name in text_tags and not parent.has_attr('data-no-translate'):
                text = element.string.strip()
                if text and len(text) > 1 and not text.isdigit():
                    texts_to_translate.append(text)
                    nodes_to_translate.append(element)
    
    for img in soup.find_all('img', alt=True):
        if img['alt'].strip():
            texts_to_translate.append(img['alt'].strip())
            nodes_to_translate.append(('alt', img))
            
    for meta in soup.find_all('meta', attrs={'name': 'description'}):
        if meta.get('content', '').strip():
            texts_to_translate.append(meta['content'].strip())
            nodes_to_translate.append(('content', meta))
            
    batch_size = 10 # Smaller batch size to prevent hanging
    translated_texts = []
    print(f"Translating {len(texts_to_translate)} elements to {target_lang}...")
    
    for i in range(0, len(texts_to_translate), batch_size):
        batch = texts_to_translate[i:i+batch_size]
        print(f"Translating batch {i//batch_size + 1}/{(len(texts_to_translate)//batch_size) + 1}")
        try:
            # Add a small delay
            time.sleep(1)
            translated_batch = translator.translate_batch(batch)
            translated_texts.extend(translated_batch)
        except Exception as e:
            print(f"Error translating batch: {e}. Retrying one by one...")
            for text in batch:
                try:
                    translated_texts.append(translator.translate(text))
                except Exception as ex:
                    translated_texts.append(text)
            
    for i, node in enumerate(nodes_to_translate):
        if i < len(translated_texts) and translated_texts[i]:
            if isinstance(node, tuple):
                attr, tag = node
                tag[attr] = translated_texts[i]
            else:
                node.string.replace_with(translated_texts[i])
                
    if soup.html:
        soup.html['lang'] = target_lang
        
    return str(soup)

def main():
    try:
        with open('index.html', 'r', encoding='utf-8') as f:
            html_content = f.read()
    except Exception as e:
        print(f"Failed to read index.html: {e}")
        sys.exit(1)
        
    for lang_code, lang_name in LANGUAGES.items():
        print(f"Processing {lang_code}...")
        translated_html = translate_html(html_content, lang_code)
        
        translated_html = translated_html.replace('class="lang-btn active" id="lang-fr"', 'class="lang-btn" id="lang-fr" onclick="window.location.href=\'index.html\'"')
        translated_html = translated_html.replace(f'class="lang-btn" id="lang-{lang_code}"', f'class="lang-btn active" id="lang-{lang_code}"')
        
        for lang in ['fr', 'en', 'es', 'de']:
            target_url = 'index.html' if lang == 'fr' else f'{lang}.html'
            translated_html = translated_html.replace(f'id="lang-{lang}"', f'id="lang-{lang}" onclick="window.location.href=\'{target_url}\'"')
            
        with open(f'{lang_code}.html', 'w', encoding='utf-8') as f:
            f.write(translated_html)
            
        print(f"Created {lang_code}.html")
        
if __name__ == '__main__':
    main()
