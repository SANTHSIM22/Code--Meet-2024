import sqlite3
import bcrypt
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from functools import wraps

app = Flask(__name__)
CORS(app)  # Enable CORS

# Function to create a connection to the database
def get_db_connection():
    conn = sqlite3.connect('users.db')
    conn.row_factory = sqlite3.Row
    return conn

# User model creation if it doesn't exist
def create_users_table():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password BLOB NOT NULL,
            salt BLOB NOT NULL,
            role TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

def role_required(role):
    """Decorator to check user role."""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            token = request.headers.get('Authorization')  # Assuming a token is sent with the request
            if token is None or not token.startswith('Bearer '):
                return jsonify({"message": "Missing or invalid token."}), 403

            user_info = decode_token(token)  # Implement your token decoding logic here
            if user_info['role'] != role:
                return jsonify({"message": "Access denied."}), 403

            return f(*args, **kwargs)
        return decorated_function
    return decorator

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE username = ?', (username,)).fetchone()
    conn.close()
    if user:
        # Append the salt to the password and hash it
        salt = user['salt']
        salted_password = password.encode('utf-8') + salt
        if bcrypt.checkpw(salted_password, user['password']):
            # Generate a token with the user's info, including their role
            token = generate_token(username, user['role'])  # Implement your token generation logic here
            return jsonify({"message": "Login successful!", "redirect": "/user/dashboard", "token": token}), 200

    return jsonify({"message": "Invalid username or password."}), 401

@app.route('/admin/dashboard', methods=['GET'])
@role_required('admin')
def admin_dashboard():
    return jsonify({"message": "Welcome to the Admin Dashboard!"})

@app.route('/user/dashboard', methods=['GET'])
def user_dashboard():
    return jsonify({"message": "Welcome to the User Dashboard!"})

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    role = data.get('role', 'user')  # Default role is 'user'

    conn = get_db_connection()

    # Check if username already exists
    existing_user = conn.execute('SELECT * FROM users WHERE username = ?', (username,)).fetchone()
    if existing_user:
        conn.close()
        return jsonify({"message": "Username already exists."}), 400

    # Generate a random salt
    salt = os.urandom(16)  # 16 bytes of random salt

    # Salt and hash the password
    salted_password = password.encode('utf-8') + salt
    hashed_password = bcrypt.hashpw(salted_password, bcrypt.gensalt())

    # Insert the new user into the database
    conn.execute('INSERT INTO users (username, password, salt, role) VALUES (?, ?, ?, ?)',
                 (username, hashed_password, salt, role))
    conn.commit()
    conn.close()

    return jsonify({"message": "User registered successfully."}), 201

def generate_token(username, role):
    # Implement token generation logic (e.g., JWT)
    return f"Bearer {username}-token"

def decode_token(token):
    # Implement token decoding logic (e.g., JWT)
    username, role = token.split('-token')
    return {'username': username, 'role': 'admin' if username == 'admin' else 'user'}

if __name__ == '__main__':
    create_users_table()  # Ensure the database exists
    app.run(debug=True)
