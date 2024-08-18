import requests

WOLFRAM_API_URL = "http://api.wolframalpha.com/v2/query"
WOLFRAM_APP_ID = "your-app-id"  # Replace with your actual Wolfram Alpha App ID


def generate_question_from_notes(notes):
    params = {
        "input": notes,
        "appid": WOLFRAM_APP_ID,
        "output": "json"
    }
    response = requests.get(WOLFRAM_API_URL, params=params)

    if response.status_code == 200:
        data = response.json()
        try:
            pods = data.get('queryresult', {}).get('pods', [])
            if pods:
                for pod in pods:
                    if pod.get('title') == "Input interpretation":
                        return pod['subpods'][0]['plaintext']
            return "No direct question generated."
        except KeyError:
            return "Error parsing Wolfram Alpha response."
    else:
        return f"Failed to contact Wolfram Alpha API: {response.status_code}"


def call_wolfram_api(question: str) -> str:
    params = {
        "input": question,
        "appid": WOLFRAM_APP_ID,
        "output": "json"
    }
    response = requests.get(WOLFRAM_API_URL, params=params)

    if response.status_code == 200:
        data = response.json()
        try:
            pods = data.get('queryresult', {}).get('pods', [])
            if pods:
                for pod in pods:
                    if pod.get('title') == "Result":
                        return pod['subpods'][0]['plaintext']
            return "No direct answer found."
        except KeyError:
            return "Error parsing Wolfram Alpha response."
    else:
        return f"Failed to contact Wolfram Alpha API: {response.status_code}"
