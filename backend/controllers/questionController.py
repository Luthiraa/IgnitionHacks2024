from services.wolframService import ask_wolfram_conversational


def generate_question(latex_string: str) -> str:
    # Generate a more sophisticated question from the LaTeX string
    # question = f"Generate a question based on the following LaTeX: {latex_string}"
    question = "Make an easy math question"
    return ask_wolfram_conversational(question)
