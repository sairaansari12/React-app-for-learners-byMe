from pathlib import Path
from importlib import util
from sys import exit

pdf_path = Path('saira_resume_updated_2026.pdf')
print('pdf exists:', pdf_path.exists(), 'abs:', pdf_path.resolve())

for name in ['PyPDF2', 'pypdf', 'pdfminer', 'pdftotext', 'fitz', 'pikepdf']:
    spec = util.find_spec(name)
    print(name, 'installed' if spec else 'missing')

try:
    import PyPDF2
    print('using PyPDF2', PyPDF2.__version__)
    reader = PyPDF2.PdfReader(pdf_path)
    print('pages', len(reader.pages))
    for i, page in enumerate(reader.pages[:3]):
        print('---PAGE', i+1,'---')
        text = page.extract_text()
        print(text[:1200] if text else '<no text>')
except Exception as e:
    print('ERROR', type(e).__name__, e)
    exit(1)
