import requests

# Wolfram Alpha Conversational API details
APP_ID = "VER5TY-EL787WWWYR"  # Replace with your actual Wolfram Alpha App ID
CONVERSATION_API_URL = "https://api.wolframalpha.com/v1/conversation.jsp"


def ask_wolfram_conversational(input_query, conversation_state=None):
    params = {
        "appid": APP_ID,
        "i": input_query
    }
    if conversation_state:
        params["conversationid"] = conversation_state

    response = requests.get(CONVERSATION_API_URL, params=params)

    if response.status_code == 200:
        data = response.json()
        return data
    else:
        return {"error": f"Failed to contact Wolfram Alpha API: {response.status_code}"}

# Function to generate a math problem and then get the answer


def generate_problem_and_answer(latex_input):
    # Generate a math problem based on the LaTeX input
    problem_query = f"Generate a math problem using the expression {latex_input}"
    problem_response = ask_wolfram_conversational(problem_query)

    if "error" in problem_response:
        print(problem_response["error"])
        return

    generated_problem = problem_response.get("result")
    conversation_state = problem_response.get("conversationID")

    if not generated_problem or not conversation_state:
        print("No problem generated or no conversation ID returned.")
        return

    print("Generated Problem:", generated_problem)

    # Now ask Wolfram Alpha to solve the generated problem
    answer_response = ask_wolfram_conversational(
        "What is the solution?", conversation_state)

    if "error" in answer_response:
        print(answer_response["error"])
        return

    generated_answer = answer_response.get("result")

    if generated_answer:
        print("Generated Answer:", generated_answer)
    else:
        print("No direct answer found.")
