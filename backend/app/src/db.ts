import { Client } from 'ts-postgres';

const config = {
	"host": process.env.POSTGRES_DB_HOST,
	"port": +process.env.POSTGRES_DB_PORT,
	"user": process.env.POSTGRES_DB_USER,
	"database": process.env.POSTGRES_DB_NAME,
	"password": process.env.POSTGRES_DB_PASS,
}

export const dbClient = new Client(config);

async function createTables() {
    await dbClient.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            a2f_key VARCHAR(255),
            profile_image_url VARCHAR(255),
            phone_number VARCHAR(255) UNIQUE,
            updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
    `);

    await dbClient.query(`
        CREATE TABLE IF NOT EXISTS friends (
            id SERIAL PRIMARY KEY,
            user_uid1 INTEGER NOT NULL,
            user_uid2 INTEGER NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
    `);

    await dbClient.query(`
        CREATE TABLE IF NOT EXISTS achievements_list (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT NOT NULL
        );
    `);

    await dbClient.query(`
        CREATE TABLE IF NOT EXISTS users_achievements (
            id SERIAL PRIMARY KEY,
            user_uid INTEGER NOT NULL,
            achievement_uid INTEGER NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
    `);

    await dbClient.query(`
        CREATE TABLE IF NOT EXISTS sessions (
            id SERIAL PRIMARY KEY,
            automatching BOOLEAN NOT NULL DEFAULT FALSE,
            customization BOOLEAN NOT NULL DEFAULT FALSE,
            ended BOOLEAN NOT NULL DEFAULT FALSE,
            winner_uid INTEGER,
            updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
    `);

    await dbClient.query(`
        CREATE TABLE IF NOT EXISTS sessions_users (
            id SERIAL PRIMARY KEY,
            user_uid INTEGER NOT NULL,
            session_uid INTEGER NOT NULL,
            spectator BOOLEAN NOT NULL DEFAULT TRUE,
            alive BOOLEAN NOT NULL DEFAULT TRUE,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
    `);

    await dbClient.query(`
        CREATE TABLE IF NOT EXISTS blocked (
            id SERIAL PRIMARY KEY,
            blocker_uid INTEGER NOT NULL,
            blocked_uid INTEGER NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
    `);

    await dbClient.query(`
        CREATE TABLE IF NOT EXISTS chatrooms (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            owner_uid INTEGER NOT NULL,
            hidden BOOLEAN NOT NULL DEFAULT FALSE,
            password VARCHAR(255)
        );
    `);

    await dbClient.query(`
        CREATE TABLE IF NOT EXISTS chatrooms_users (
            id SERIAL PRIMARY KEY,
            chatroom_uid INTEGER NOT NULL,
            user_uid INTEGER NOT NULL,
            admin BOOLEAN NOT NULL DEFAULT FALSE,
            updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
    `);

    await dbClient.query(`
        CREATE TABLE IF NOT EXISTS chatrooms_messages (
            id SERIAL PRIMARY KEY,
            chatroom_user_uid INTEGER NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
    `);

    await dbClient.query(`
        CREATE TABLE IF NOT EXISTS chatrooms_punishments (
            id SERIAL PRIMARY KEY,
            chatroom_user_admin_uid INTEGER NOT NULL,
            chatroom_user_target_uid INTEGER NOT NULL,
            type VARCHAR(50) NOT NULL,
            ends_at TIMESTAMP NOT NULL DEFAULT NOW(),
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
    `);

    await dbClient.query(`
        CREATE TABLE IF NOT EXISTS chatrooms_invitations (
            id SERIAL PRIMARY KEY,
            chatroom_user_uid INTEGER NOT NULL,
            session_user_uid INTEGER NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
    `);

    await dbClient.query("ALTER TABLE friends ADD FOREIGN KEY (user_uid1) REFERENCES users (id);");
    await dbClient.query("ALTER TABLE friends ADD FOREIGN KEY (user_uid2) REFERENCES users (id);");
    await dbClient.query("ALTER TABLE users_achievements ADD FOREIGN KEY (user_uid) REFERENCES users (id);");
    await dbClient.query("ALTER TABLE users_achievements ADD FOREIGN KEY (achievement_uid) REFERENCES achievements_list (id);");
    await dbClient.query("ALTER TABLE sessions ADD FOREIGN KEY (winner_uid) REFERENCES users (id);");
    await dbClient.query("ALTER TABLE sessions_users ADD FOREIGN KEY (user_uid) REFERENCES users (id);");
    await dbClient.query("ALTER TABLE sessions_users ADD FOREIGN KEY (session_uid) REFERENCES sessions (id);");
    await dbClient.query("ALTER TABLE blocked ADD FOREIGN KEY (blocker_uid) REFERENCES users (id);");
    await dbClient.query("ALTER TABLE blocked ADD FOREIGN KEY (blocked_uid) REFERENCES users (id);");
    await dbClient.query("ALTER TABLE chatrooms ADD FOREIGN KEY (owner_uid) REFERENCES users (id);");
    await dbClient.query("ALTER TABLE chatrooms_users ADD FOREIGN KEY (chatroom_uid) REFERENCES chatrooms (id);");
    await dbClient.query("ALTER TABLE chatrooms_users ADD FOREIGN KEY (user_uid) REFERENCES users (id);");
    await dbClient.query("ALTER TABLE chatrooms_messages ADD FOREIGN KEY (chatroom_user_uid) REFERENCES chatrooms_users (id);");
    await dbClient.query("ALTER TABLE chatrooms_punishments ADD FOREIGN KEY (chatroom_user_admin_uid) REFERENCES chatrooms_users (id);");
    await dbClient.query("ALTER TABLE chatrooms_punishments ADD FOREIGN KEY (chatroom_user_target_uid) REFERENCES chatrooms_users (id);");
    await dbClient.query("ALTER TABLE chatrooms_invitations ADD FOREIGN KEY (chatroom_user_uid) REFERENCES chatrooms_users (id);");
    await dbClient.query("ALTER TABLE chatrooms_invitations ADD FOREIGN KEY (session_user_uid) REFERENCES sessions_users (id);");

}


export async function connectDb() {
	await dbClient.connect();
	await createTables();
}
