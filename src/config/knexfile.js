import dotenv from 'dotenv';
dotenv.config();

const knexConfig = {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5433/wbtable',
    migrations: {
        directory: './migrations',
    },
    seeds: {
        directory: './seeds',
    },
};

export default knexConfig;
