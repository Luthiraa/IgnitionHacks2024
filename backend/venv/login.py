from flask import Flask, request, render_template, redirect, url_for, flash, jsonify
from flask_cors import CORS
import sqlite3
from hashlib import sha256
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.secret_key = os.urandom(24)

# Connect to SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect('./backend/.venv/data.db', check_same_thread=False)
cursor = conn.cursor()

# Create users table
cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)
''')
conn.commit()

def create_user(username, email, password):
    # Hash the password for security
    hashed_password = sha256(password.encode()).hexdigest()
    try:
        cursor.execute('''
        INSERT INTO users (username, email, password)
        VALUES (?, ?, ?)
        ''', (username, email, hashed_password))
        conn.commit()
        return True
    except sqlite3.IntegrityError:
        return False

def login_user(username, password):
    # Hash the password to compare with the stored hash
    hashed_password = sha256(password.encode()).hexdigest()
    cursor.execute('''
    SELECT * FROM users WHERE username = ? AND password = ?
    ''', (username, hashed_password))
    user = cursor.fetchone()
    return user is not None

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data['username']
    email = data['email']
    password = data['password']
    confirm_password = data['confirm_password']

    if password == confirm_password:
        if create_user(username, email, password):
            return jsonify({'success': True})
        else:
            return jsonify({'success': False, 'message': 'Username or email already exists.'})
    else:
        return jsonify({'success': False, 'message': 'Passwords do not match.'})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']
    if login_user(username, password):
        return jsonify({'success': True})
    else:
        return jsonify({'success': False, 'message': 'Invalid username or password.'})

if __name__ == '__main__':
    app.run(debug=True)