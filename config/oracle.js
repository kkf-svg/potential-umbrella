import pkg from 'oracledb';
const { initOracleClient, getConnection } = pkg;
import 'dotenv/config';
import path from 'path';

// For Wallet-based connection
initOracleClient({
  configDir: path.join(process.cwd(), 'wallet') 
});

async function insertUser(user) {
  try {
    const connection = await getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectString: process.env.ORACLE_CONNECT
    });

    await connection.execute(
      `INSERT INTO users (user_id, first_name, last_name, email, role)
       VALUES (:id, :fname, :lname, :email, :role)`,
      {
        id: user.user_id,
        fname: user.first_name,
        lname: user.last_name,
        email: user.email,
        role: user.role
      },
      { autoCommit: true }
    );

    console.log("✅ User inserted into Oracle DB");
    await connection.close();
  } catch (err) {
    console.error("❌ Oracle DB connection error:", err);
  }
}
console.log("🔍 Oracle Wallet Path:", path.join(process.cwd(), 'wallet'));

export default insertUser;
