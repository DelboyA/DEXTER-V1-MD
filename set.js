const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNExmdFJtdDRQR1VQN2RDNW1wc0NCaVE5MlpUZzd1ZW1wK1ZxZE1pL1Uzcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUpLSWZDRXl2WDROZUhiQ0xVSXBDM2o4NWlWT1lYWnJEMnVRVEhvNW5qbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIySUxNTzhlekhaM0hqUzFBa0NvYXJlTjJPTTliQnh1b1h3TWN4RDUvcEc0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZkJ4QnhNQzQ1aVJrakFkY202dEJGNGVDbTVpcUROcG5OU08zVURCZHpNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhDL3dsaSsxeE81OTIvNU55R3Vic3YvaGtBNVJxcFhHc3hrUWRXQlk4Mms9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFZUHR3ekxScEpaRkk4UzBqUGpzeVdQeWdtbmhaOEpaTmYwTXM2VmQreTQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUpPZkN5OEJMSktacWRwSmkyYTlmMlRMYkxndFp1bjRmcjlLdm42elIycz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVDkzUk9ZSFNCeE9BVzNvRWNyUVREMElYUGhPRmRLVXRaODd4TGZrc3VFOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlvNDl5Zkk3NkhlOElLR2ptNkNIdFZXZDFMK2NJektUVmJhS1VGeDl2TFJqUVNjTVFLMXNOQ3cyc3ZzUDRVSE0xTVR6VEZBU0VxMEdWdWx6U2VvNWp3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg2LCJhZHZTZWNyZXRLZXkiOiJ5YzlIcWdDTkhuNFZuSDhNWG9tMURUeWhJdkUxMUVBLzgxeVM3U2czUmxNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc3MzQ0MDc1OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJCMkEwOEJBNjYzQzc2MUIzODkyNjQ5QUVCREVBMjBBMiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzE1ODY3Mzc4fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3NzM0NDA3NThAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMDlDRUJCRUIwRkZGOTcxMUVDRTAwNUMwQUMxMkZDRjcifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcxNTg2NzM3OH0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzczNDQwNzU4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjVERTA0NEMwQUQ2Mzk5MEIwM0M2QTUyMjU1RTNFMjk4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTU4NjczNzl9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc3MzQ0MDc1OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBREQxOTRBRDdBNEI5OEI1QzU5OEUyQUFDQjU2REYwRSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzE1ODY3Mzc5fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJJRW84T01BcVJ2ZVpYdzR3T2djU0J3IiwicGhvbmVJZCI6ImQzYmQ2OGUzLTZjZjktNDI3MC1iNmIwLWU0OWE4NGIyNWUyZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRMm04NXNBNzVLalprSlpYOXNZa0VhaDFWM289In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRFZSamVrVyt5UENvcHNkV01CNDJpUmxucWtNPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkRRVDNQUTZZIiwibWUiOnsiaWQiOiIyNTQ3NzM0NDA3NTg6OUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZi/8J2ZgPCdmYfwnZi98J2ZivCdmZQg8J2YvPCdmYnwnZmE8J2ZgPCdmZTwn5iOIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMZStrOU1DRU9PZG1MSUdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJCeUFlcGwwRmx6TGE1VzVSSlBxeXFSN2J5NXBTd1RFSGxaZVlNTzVYYWdZPSIsImFjY291bnRTaWduYXR1cmUiOiJpM3lkZzZXQmRMOFpBU0tBN1o2YVVWVWtObmVqNG04MXhpVzBhVEs2aDY3RC9GVXlSN21FTnlMd0FhdUlnSk9yKzJvK0dmclQ5ZDVMN0xVV0pJK0FDZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiN2treCthM3lhRmlMZldjV3RaRVFObGZqcC9DMnR1MW8vYVl5TnR5cE5jNFd0OUtuVTFjclNGSldrRHdnZWUydEN1Z09NYUZXV2RNLzZIRUtHSlFmakE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3NzM0NDA3NTg6OUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJRY2dIcVpkQlpjeTJ1VnVVU1Q2c3FrZTI4dWFVc0V4QjVXWG1ERHVWMm9HIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE1ODY3Mzc2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUJ6ciJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "⚔DJ DELBOY ANIEY",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "+254 773 440758",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'DEXTER-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
