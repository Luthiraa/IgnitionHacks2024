from flask import Flask, request, jsonify, render_template
from werkzeug.utils import secure_filename
import os
from controllers.questionController import generate_question
from controllers.solutionController import generate_solution
from utils.imageProcess import convert_image_to_latex

# Initialize the Flask application
app = Flask(__name__)

# Define your routes
UPLOAD_FOLDER = './images/'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


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
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)

        # Convert the image to LaTeX
        latex_text = convert_image_to_latex(filepath)

        # Generate a question and answer based on the LaTeX text
        question = generate_question(latex_text)
        answer = generate_solution(question)

        return jsonify({"latex": latex_text, "question": question, "answer": answer})

    return jsonify({"error": "File type not allowed"}), 400


if __name__ == '__main__':
    app.run(debug=True, port=5000)
