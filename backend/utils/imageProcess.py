import os
from google.cloud import vision
from google.cloud.vision_v1 import types

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'./utils/keys/GCVAuthKey.json'


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
    latex_text = text.replace('\n', ' \\\\ ')
    return latex_text


"""
image_path = '../../tests/images/test-image.png'
latex_text = convert_image_to_latex(image_path)

# write to a latex file in the same directory with utf-8 encoding
with open('../../tests/output/output.tex', 'w', encoding='utf-8') as f:
    for line in latex_text.split('\n'):
        f.write(line + '\n')
"""
