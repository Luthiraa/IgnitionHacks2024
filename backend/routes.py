"""
from flask import Flask, request, jsonify, render_template
from werkzeug.utils import secure_filename
import os
from utils.imageProcess import convert_image_to_latex
from services.geminiService import generate_question_from_notes, generate_solution

# Initialize the Flask application
app = Flask(__name__)

# Define your routes
UPLOAD_FOLDER = './images/'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/process_latex', methods=['POST'])
def process_latex_route():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Convert the image to LaTeX or text using Google Cloud Vision
        latex_text = convert_image_to_latex(filepath)
        if "No text detected" in latex_text:
            return jsonify({"error": latex_text}), 400

        # Generate a question based on the LaTeX text
        question = generate_question_from_notes(latex_text)
        if "error" in question.lower():
            return jsonify({"error": question}), 500

        # Generate a solution based on the generated question
        answer = generate_solution(question)
        if "error" in answer.lower():
            return jsonify({"error": answer}), 500

if __name__ == '__main__':
    # Ensure the upload directory exists
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True, port=5000)
"""

from flask import Flask, request, jsonify
import os
from google.cloud import vision
from google.cloud.vision_v1 import types
import google.generativeai as genai

app = Flask(__name__)

# Configure the Google Cloud Vision API
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'./utils/keys/GCVAuthKey.json'

# Configure the Google Gemini API
genai.configure(api_key="AIzaSyDK9ebMx2OcdEm5Bwm9HrkynnEsoyN-PaM")


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
    latex_text, description = "", ""

    if 'image' in request.files:
        image_file = request.files['image']
        image_path = './images/' + image_file.filename
        image_file.save(image_path)

        latex_text, description = convert_image_to_latex(image_path)

    # Retrieve the user_prompt from the form data
    user_prompt = request.form.get('user_prompt', '')

    # Generate a direct and concise question using Google Gemini API
    model = genai.GenerativeModel('gemini-1.5-flash')

    # If user_prompt is provided, use it in the question generation
    combined_prompt = user_prompt
    if latex_text:
        combined_prompt += f" based on the following expression: {latex_text}"

    # Get the desired output type (e.g., 'multiple_choice', 'long_answer', 'short_answer')
    output_type = request.form.get('output_type')

    if output_type == 'multiple_choice':
        # Generate the question
        question_prompt = f"Generate a clear and concise multiple choice math problem {combined_prompt}."
        question_response = model.generate_content(question_prompt)
        question = question_response.text.strip()

        # Generate multiple-choice options
        answer_prompt = f"Provide the correct multiple choice answer to this problem with a short explanation as to why: {question}"
        answer_response = model.generate_content(answer_prompt)
        choices = answer_response.text.strip().split(
            '\n')[:3]  # Take the first three lines as choices

        # Prepare multiple-choice response
        result = {
            'question': question,
            'choices': choices
        }
    else:
        # Generate the question
        question_prompt = f"Generate a clear and concise math problem {combined_prompt}."
        question_response = model.generate_content(question_prompt)
        question = question_response.text.strip()

        # Generate a direct answer based on the output type
        if output_type == 'short_answer':
            answer_prompt = f"Provide a short and direct answer to the following math problem without any extra explanation: {question}"
        else:  # 'long_answer' or default
            answer_prompt = f"Provide a detailed answer to the following math problem: {question}"

        answer_response = model.generate_content(answer_prompt)
        answer = answer_response.text.strip()

        # Prepare response based on the selected output type
        result = {
            'question': question,
            'answer': answer
        }

    # Return the final JSON response
    return jsonify({
        'latex_text': latex_text,
        'description': description,
        'result': result
    })


if __name__ == '__main__':
    # Ensure the upload directory exists
    if not os.path.exists('./images/'):
        os.makedirs('./images/')
    app.run(debug=True)
