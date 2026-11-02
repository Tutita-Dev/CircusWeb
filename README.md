# Circus Charlie XXI

A web platformer inspired by Circus Charlie, with Geometry Dash-style mechanics.
Built as a university team project (2022, team of 3).

[![Gameplay](https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg)](https://www.youtube.com/watch?v=KCY2xpRp-wc)

## Tech stack
- **Game engine:** Phaser 3
- **Frontend:** JavaScript (ES6 modules), HTML, CSS, jQuery, Bootstrap
- **Backend:** Node.js, Express
- **Database:** MySQL

## Features
- 3 levels with different obstacles
- Player modes: lion, cannon and monkey (the game switches mode during the level)
- Level obstacles loaded from a MySQL database through a REST API
- User login
- Pause, sound effects, music, Game Over and Congratulations screens

## How to run
1. Requirements: Node.js, MySQL (or XAMPP)
2. Import the database: `game-db.sql`
3. Start the API: `cd server && npm install && node src/index.js`
4. Open the game at...........

## Project structure
```
CircusWeb/
├── index.html
├── style.css
├── game-db.sql      # Database schema and data
├── assets/          # Images and sounds
├── components/      # Reusable buttons
├── scenes/          # Menu, levels, Game Over, Congratulations
├── src/             # Game config, API client, level data
└── server/          # Node.js + Express API
    └── src/         # Routes and database connection
```

## My role
Team project (3 people). I worked on: Phaser game logic, user interface,
HTML/CSS/JavaScript, database design.

## Future improvements
- Simplify setup (relative paths, environment variables)
- Secure login (POST requests, password hashing)
- Deploy online (maybe?)
