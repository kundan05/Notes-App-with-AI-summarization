const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function verify() {
    try {
        // 1. Signup
        const username = `testuser_${Date.now()}`;
        const password = 'password123';
        console.log(`1. Signing up user: ${username}`);
        const signupRes = await axios.post(`${API_URL}/auth/signup`, { username, password });
        const token = signupRes.data.token;
        console.log('   Signup successful, token received.');

        // 2. Create Note
        console.log('2. Creating a note...');
        const noteRes = await axios.post(
            `${API_URL}/notes`,
            {
                title: 'Test Note for AI',
                content: 'Artificial intelligence (AI) is intelligence demonstrated by machines, as opposed to the natural intelligence displayed by animals including humans. AI research has been defined as the field of study of intelligent agents, which refers to any system that perceives its environment and takes actions that maximize its chance of achieving its goals.'
            },
            { headers: { 'Authorization': `Bearer ${token}` } }
        );
        const noteId = noteRes.data._id;
        console.log(`   Note created with ID: ${noteId}`);

        // 3. Summarize Note
        console.log('3. Requesting summarization...');
        const summarizeRes = await axios.post(
            `${API_URL}/notes/${noteId}/summarize`,
            {},
            { headers: { 'Authorization': `Bearer ${token}` } }
        );

        if (summarizeRes.data.summary) {
            console.log('   SUCCESS: Summary generated!');
            console.log('   Summary:', summarizeRes.data.summary);
        } else {
            console.error('   FAILURE: No summary returned.');
            process.exit(1);
        }

    } catch (error) {
        console.error('VERIFICATION FAILED');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error(error.message);
        }
        process.exit(1);
    }
}

verify();
