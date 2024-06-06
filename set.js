const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0YwaTl3SEFHZ0ZYeFpZVlJnY2FvS1NIa1FUdkRGWUZPUDEzZ0FROHRGUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZHIwa0RtbFRFNzQyTkw1VmtZVld4UG0yaWVUSEVSSEI2YytSOThQU1VIOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5T3Z6WlNLNmhsVmNJZ1Z5L0daOCs0Y21WcjQ5MWJEVzhMUG40NnBQdTI4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3bmg4MWF2aVV5WFBnL1lscGppSDA4Y2NJVUFYNW9QUExLeExEbWxZREhZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJDRjI1UVNqR1gwT0hnUjB4ckN4MWpteDhadmthQ1c5czVORFNSeXJ3Vmc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlYwajdwOVlKdFNlZUVObzkyb3R0VGdHS3h0eXpvTFhibElySHh2MWdmMjA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEpaQkRxTFNXTGFSZ2g4dXpGRTJyVzJxb1VVNUdaWFdnYS9XUFE3REdFUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUEM1K0F1dlZXc1EwRnZIRE9hLzNzMHYwUE9ITDZkN2JZdUVwbENubGppND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik93NGVTZ0JUcllvcVQ5VTVDa0loNmVZZkprWm1Cb0J5VWFVQVcwUzVvRkJSUmJNZHBKS3p2QWkrd1R1d1Y2Q0p5QmVTRTFtdkZSdTZrNGwwSE1JUUNBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTMsImFkdlNlY3JldEtleSI6ImN1VVF0aWhCREs1Z3A0SitWTWVIRGlFVk5SNVQ1ZngwejNxS0JHTDNvZnM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzczNDQwNzU4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkFBMTI4NjM0OTZCNTFGNkVEMzQwM0Y0NDVERkMyQ0NFIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MTc2NDg1OTl9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc3MzQ0MDc1OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJFNzY5RDdDRUVERDkwOEQ1RjBBNEZEQUM3QkI0QjAzOSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzE3NjQ4NjAxfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJXYkZ1RnM3ZFNSQ3BrSXdZYUxZMUN3IiwicGhvbmVJZCI6IjNhNWU3YjY1LTM4YTgtNDhmZi04ODVhLWIwNTA0Njc4YTlhNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyTzYvRjZjNmRmRjRGdDhiY2pVZnRIajJENTQ9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSnJaWGluV0VkMEJib1ptQXlFQkEweGRCMUpJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjhQODM5QU5WIiwibWUiOnsiaWQiOiIyNTQ3NzM0NDA3NTg6ODFAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J+YrSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS1QvOUlVQ0VNZjVoTE1HR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiTG13OThmS1NpTGxYaUc4bW83MzhIUnJSMHpOZ0tlbGlGWXpGVkoybndtUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiQ3EyakkxVUtlUDRESE1XWFJhTXN2UDNOZ3VvWGNwNE11T0duZThPSVRFZlVoT3JYa29EeXBvU3h2SDB6Qis2WkgrZ3pLb0lISkZ0MC8rVUpyN3Y4REE9PSIsImRldmljZVNpZ25hdHVyZSI6IkltNlBiNDlTWWplNEZzWWJ5c2Y4TWdIeFljVFVrTTFORTdudTdTQmszR3RqVkhaYTMvajR1K3VyKzBiOTJ3VFRGQmtETHdiYXFLVHJCNzRQL3RjZUFBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzczNDQwNzU4OjgxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlM1c1BmSHlrb2k1VjRodkpxTzkvQjBhMGRNellDbnBZaFdNeFZTZHA4SmsifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTc2NDg1OTcsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRXhVIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "⚔DJ DELBOY ANIEY",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "+254 773 440758",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'DEXTER-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
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
