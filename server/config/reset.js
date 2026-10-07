import dotenv from 'dotenv'

dotenv.config()

const { pool } = await import('./database.js')

const resetDatabase = async () => {
  try {
    await pool.query(`
      DROP TABLE IF EXISTS events;
      DROP TABLE IF EXISTS locations;

      CREATE TABLE locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        icon VARCHAR(20),
        slug VARCHAR(100) UNIQUE NOT NULL
      );

      CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        description TEXT,
        event_date TIMESTAMP NOT NULL,
        location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE
      );
    `)

    await pool.query(`
        INSERT INTO locations (name, description, icon, slug)
        VALUES
          (
            'Innovation Lab',
            'A space for coding, technology, AI, and creative projects.',
            'Laptop',
            'innovation-lab'
          ),
          (
            'Student Union',
            'The center of campus clubs, networking, food, and social events.',
            'Coffee',
            'student-union'
          ),
          (
            'Library Commons',
            'A quiet community space for studying, tutoring, and workshops.',
            'Books',
            'library-commons'
          ),
          (
            'Game Lounge',
            'A casual space for gaming, tournaments, and student meetups.',
            'Games',
            'game-lounge'
          );
      `)

    await pool.query(`
      INSERT INTO events (title, description, event_date, location_id)
      VALUES
        (
          'AI Hack Night',
          'Build a small AI project with other students.',
          '2026-09-15 18:00:00',
          1
        ),
        (
          'React Workshop',
          'Learn React basics and build a small web interface.',
          '2026-10-22 17:30:00',
          1
        ),
        (
          'Student Club Fair',
          'Meet student organizations and find a club to join.',
          '2026-10-12 12:00:00',
          2
        ),
        (
          'Career Networking Night',
          'Connect with students, alumni, and local professionals.',
          '2026-10-28 18:30:00',
          2
        ),
        (
          'Midterm Study Session',
          'Study together and prepare for upcoming midterms.',
          '2026-10-18 14:00:00',
          3
        ),
        (
          'Resume Workshop',
          'Get feedback and improve your resume before applying for internships.',
          '2026-11-02 16:00:00',
          3
        ),
        (
          'Mario Kart Tournament',
          'Compete in a friendly campus Mario Kart tournament.',
          '2026-10-20 19:00:00',
          4
        ),
        (
          'Community Game Night',
          'Play board games and multiplayer games with other students.',
          '2026-11-05 18:00:00',
          4
        );
    `)

    console.log('uniPulse database reset successfully')
  } catch (error) {
    console.error('Error resetting database:', error)
  } finally {
    await pool.end()
  }
}

resetDatabase()