# import os
# from google.cloud import vision
# from google.cloud.vision_v1 import types

# os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'./keys/GCVAuthKey.json'

# def convert_image_to_latex(image_path):
#     client = vision.ImageAnnotatorClient()

#     # Load the image
#     with open(image_path, 'rb') as image_file:
#         content = image_file.read()
#     image = types.Image(content=content)
#     response = client.document_text_detection(image=image)
#     annotations = response.full_text_annotation
#     detected_text = annotations.text
#     latex_text = convert_to_latex(detected_text)

#     return latex_text

# def convert_to_latex(text):
#     latex_text = text.replace('\n', ' \\\\ ')
#     return latex_text

# image_path = './images/test-image.png'
# latex_text = convert_image_to_latex(image_path)

# # write to a latex file in the same directory with utf-8 encoding
# with open('output.tex', 'w', encoding='utf-8') as f:
#     for line in latex_text.split('\n'):
#         f.write(line + '\n')


import os
from google.cloud import vision
from google.cloud.vision_v1 import types

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'./keys/GCVAuthKey.json'

def convert_image_to_latex(image_path):
    client = vision.ImageAnnotatorClient()

    # Load the image
    with open(image_path, 'rb') as image_file:
        content = image_file.read()
    image = types.Image(content=content)
    response = client.document_text_detection(image=image)
    annotations = response.full_text_annotation
    detected_text = annotations.text
    latex_text = convert_to_latex(detected_text)

    return latex_text

def convert_to_latex(text):
    # Split text into paragraphs
    paragraphs = text.split('\n\n')
    latex_paragraphs = []

    for paragraph in paragraphs:
        # Replace newlines within paragraphs with spaces
        clean_paragraph = paragraph.replace('\n', ' ')
        # Add LaTeX paragraph formatting
        latex_paragraphs.append(f"\\paragraph{{{clean_paragraph}}}")

    # Join paragraphs with double newlines for LaTeX
    latex_text = '\n\n'.join(latex_paragraphs)
    return latex_text

image_path = '../tests/images/test-image.png'
latex_text = convert_image_to_latex(image_path)

# Write to a LaTeX file in the same directory with utf-8 encoding
with open('output.tex', 'w', encoding='utf-8') as f:
    f.write('\\documentclass{article}\n')
    f.write('\\begin{document}\n')
    f.write(latex_text)
    f.write('\n\\end{document}')