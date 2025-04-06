import sqlite3

# Database connection banayein (agar database file nahi hai to yeh create ho jayega)
conn = sqlite3.connect('example.db')

# Cursor object banayein
cursor = conn.cursor()

# Example table create karna
cursor.execute('''CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)''')

# Data insert karna
cursor.execute("INSERT INTO users (name) VALUES ('Alice')")

# Commit changes
conn.commit()

# Connection close karna
conn.close()
