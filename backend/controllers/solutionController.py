from services.wolframService import generate_problem_and_answer


def generate_solution(question: str) -> str:
    return generate_problem_and_answer(question)
