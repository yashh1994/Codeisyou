import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/user';

async function signupAndLoginTest() {
    const signupData = {
        email: 'testuser@example.com',
        password: 'TestPassword123!',
        user_name: 'testuser',
        name: 'Test User',
    };

    try {
        // Signup
        const signupRes = await axios.post(`${BASE_URL}/signup`, signupData);
        if (signupRes.status !== 201) {
            throw new Error(signupRes.data.message || 'Signup failed');
        }
        console.log("Signup successful");

        // Login
        const loginRes = await axios.post(`${BASE_URL}/login`, {
            email: signupData.email,
            password: signupData.password,
        });

        if (loginRes.status !== 200 || !loginRes.data.token) {
            throw new Error(loginRes.data.message || 'Login failed');
        }

        console.log('Login successful');
        console.log('Token:', loginRes.data.token);

        console.log('✅ Signup and login test passed!');
    } catch (err: any) {
        console.error('❌ Test failed:', err.response?.data?.message || err.message);
    }
}

signupAndLoginTest();
