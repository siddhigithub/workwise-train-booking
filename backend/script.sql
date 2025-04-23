CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE seats (
    id SERIAL PRIMARY KEY,
    seat_number INT UNIQUE NOT NULL,
    is_booked BOOLEAN DEFAULT FALSE,
    user_id INT REFERENCES users(id)
);
