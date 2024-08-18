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

    # Extract description
    description = extract_description(response)

    return latex_text, description

def convert_to_latex(text):
    latex_text = text.replace('\n', ' \\\\ ')
    return latex_text

def extract_description(response):
    description = ""
    if response.text_annotations:
        description = response.text_annotations[0].description
    return description

image_path = './images/test-image.png'
latex_text, description = convert_image_to_latex(image_path)

# Write to a LaTeX file in the same directory with utf-8 encoding
with open('output.tex', 'w', encoding='utf-8') as f:
    for line in latex_text.split('\n'):
        f.write(line + '\n')

# Write the description to a text file
with open('imageDesc.txt', 'w', encoding='utf-8') as f:
    f.write(description)