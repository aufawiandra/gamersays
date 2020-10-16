export const isDev = () => process.env['NODE_ENV'] && process.env['NODE_ENV'] === 'development';

// const url = isDev ? `http://localhost:8000/games?id=${gameId}` : `games?id$gameId`;+