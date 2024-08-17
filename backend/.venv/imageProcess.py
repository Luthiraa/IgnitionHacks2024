import os
from google.cloud import vision
from google.cloud.vision_v1 import types

# Set the environment variable for the service account key
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'./keys/GCVAuthKey.json'

def convert_image_to_latex(image_path):
    # Initialize the Vision API client
    client = vision.ImageAnnotatorClient()

    # Load the image
    with open(image_path, 'rb') as image_file:
        content = image_file.read()
    image = types.Image(content=content)

    # Perform text detection
    response = client.document_text_detection(image=image)
    annotations = response.full_text_annotation
    detected_text = annotations.text
    latex_text = convert_to_latex(detected_text)

    return latex_text

def convert_to_latex(text):

    latex_text = text.replace('\n', ' \\\\ ')
    return latex_text

# Example usage
image_path = './images/test-image.png'
latex_text = convert_image_to_latex(image_path)
print(latex_text)

