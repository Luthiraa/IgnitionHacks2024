import google.generativeai as genai
import os
import keys
# Configure the API key
genai.configure(api_key=keys.keys[0])

# Create a model instance
model = genai.GenerativeModel('gemini-1.5-flash')

# Generate content
response = model.generate_content("Write a story about an AI and magic")

# Print the response
print(response.text)