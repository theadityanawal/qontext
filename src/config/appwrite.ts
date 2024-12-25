import { Client, Account } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('676c57800013c79f1960'); // Replace with your project ID

export const account = new Account(client);
export { ID } from 'appwrite';
