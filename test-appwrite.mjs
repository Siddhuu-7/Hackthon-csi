import { Client, Account } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('69402fcd001f2b560740');

const account = new Account(client);

console.log('Testing Appwrite connection...');
console.log('Endpoint:', 'https://fra.cloud.appwrite.io/v1');
console.log('Project ID:', '69402fcd001f2b560740');

try {
  // This will fail if not logged in, but it tests the connection
  const user = await account.get();
  console.log('✅ Connected! User:', user.email);
} catch (error) {
  if (error.code === 401) {
    console.log('✅ Connection successful! (No active session - this is expected)');
  } else {
    console.log('❌ Connection error:', error.message);
    console.log('\nPossible issues:');
    console.log('1. Check if Project ID is correct');
    console.log('2. Make sure "localhost" is added as a Web platform in Appwrite Console');
  }
}
