import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api'; // Change as needed

async function signupAndLoginTest() {
    const signupData = {
        email: 'testuser@example.com',
        password: 'TestPassword123!',
    };

    // Signup
    const signupRes = await axios.post(`${BASE_URL}/signup`, signupData);
    if (signupRes.status !== 201) {
        throw new Error('Signup failed');
    }

    // Login
    const loginRes = await axios.post(`${BASE_URL}/login`, signupData);
    if (loginRes.status !== 200 || !loginRes.data.token) {
        throw new Error('Login failed');
    }

    console.log('Signup and login test passed!');
}

signupAndLoginTest().catch(err => {
    console.error('Test failed:', err.message);
});