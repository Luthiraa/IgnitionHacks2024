from flask import Flask, request, jsonify
import os
from google.cloud import vision
from google.cloud.vision_v1 import types
import google.generativeai as genai

app = Flask(__name__)

# Configure the Google Cloud Vision API
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'./utils/keys/GCVAuthKey.json'

# Configure the Google Gemini API
genai.configure(api_key="YOUR_API_KEY")


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


@app.route('/process-image', methods=['POST'])
def process_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    image_file = request.files['image']
    image_path = './images/' + image_file.filename
    image_file.save(image_path)

    latex_text, description = convert_image_to_latex(image_path)

    # Get the input text and output type from the request
    input_text = request.form.get('input', '')
    output_type = request.form.get('output_type', 'long-answer')

    # Generate a direct and concise question using Google Gemini API
    model = genai.GenerativeModel('gemini-1.5-flash')

    # Generate a concise question
    question_prompt = f"Generate a clear and concise math problem based on the following expression without any extra explanation: {latex_text}"
    question_response = model.generate_content(question_prompt)
    question = question_response.text.strip()

    # Generate a direct answer
    answer_prompt = f"Provide only the direct answer to the following math problem without any extra explanation: {question}"
    answer_response = model.generate_content(answer_prompt)
    answer = answer_response.text.strip()

    # Prepare the response
    return jsonify({
        'latex_text': latex_text,
        'description': description,
        'question': question,
        'answer': answer
    })


if __name__ == '__main__':
    # Ensure the upload directory exists
    if not os.path.exists('./images/'):
        os.makedirs('./images/')
    app.run(debug=True)