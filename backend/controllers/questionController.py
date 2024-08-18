from services.wolframService import generate_question_from_notes


def generate_question(latex_string: str) -> str:
    # Generate a more sophisticated question from the LaTeX string
    question = f"Generate a question based on the following LaTeX: {latex_string}"
    return generate_question_from_notes(question)
