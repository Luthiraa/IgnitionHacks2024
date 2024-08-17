from flask import Flask, request, render_template, redirect, url_for, flash
import sqlite3
from hashlib import sha256
import os
app = Flask(__name__)
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

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm_password']

        if password == confirm_password:
            if create_user(username, email, password):
                flash('User created successfully.', 'success')
                return redirect(url_for('login'))
            else:
                flash('Username or email already exists.', 'danger')
        else:
            flash('Passwords do not match.', 'danger')
    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if login_user(username, password):
            flash('Login successful.', 'success')
            return redirect(url_for('home'))
        else:
            flash('Invalid username or password.', 'danger')
    return render_template('login.html')

if __name__ == '__main__':
    app.run(debug=True)