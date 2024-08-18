from services.wolframService import call_wolfram_api


def generate_solution(question: str) -> str:
    return call_wolfram_api(question)
