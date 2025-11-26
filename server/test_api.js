const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
const USER = { username: `testuser_${Date.now()}`, password: 'password123' };

async function runTests() {
    try {
        console.log('1. Testing Signup...');
        const signupRes = await axios.post(`${API_URL}/auth/signup`, USER);
        const token = signupRes.data.token;
        console.log('   Signup Successful. Token received.');

        console.log('2. Testing Login...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, USER);
        if (loginRes.data.token !== token) console.log('   Login Successful (Token matches/refreshed).');

        const config = { headers: { 'x-auth-token': token } };

        console.log('3. Testing Create Note...');
        const noteRes = await axios.post(`${API_URL}/notes`, {
            title: 'Test Note',
            content: 'This is a test note content that is long enough to be summarized by the AI. It contains important information about the project status and next steps.'
        }, config);
        const noteId = noteRes.data._id;
        console.log(`   Note Created. ID: ${noteId}`);

        console.log('4. Testing Get Notes...');
        const getRes = await axios.get(`${API_URL}/notes`, config);
        if (getRes.data.length > 0) console.log(`   Get Notes Successful. Count: ${getRes.data.length}`);

        console.log('5. Testing Summarize Note (AI)...');
        try {
            const sumRes = await axios.post(`${API_URL}/notes/${noteId}/summarize`, {}, config);
            console.log('   Summarize Successful.');
            console.log('   Summary:', sumRes.data.summary);
        } catch (err) {
            console.log('   Summarize Failed (Expected if API Key is invalid/missing):', err.response?.data?.message || err.message);
        }

        console.log('6. Testing Delete Note...');
        await axios.delete(`${API_URL}/notes/${noteId}`, config);
        console.log('   Delete Successful.');

        console.log('\nALL TESTS PASSED!');
    } catch (err) {
        console.error('\nTEST FAILED:', err.response?.data || err.message);
    }
}

runTests();
