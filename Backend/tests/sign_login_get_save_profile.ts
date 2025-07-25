import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/user';

async function getUserProfileTest() {
    const signupData = {
        email: 'testuser@example.com',
        password: 'TestPassword123!',
        user_name: 'testuser',
        name: 'Test User',
    };

    try {
        // // Signup
        // const signupRes = await axios.post(`${BASE_URL}/signup`, signupData);
        // if (signupRes.status !== 201) {
        //     throw new Error(signupRes.data.message || 'Signup failed');
        // }
        // console.log("Signup successful");

        // Login
        const loginRes = await axios.post(`${BASE_URL}/login`, {
            email: signupData.email,
            password: signupData.password,
        });

        if (loginRes.status !== 200 || !loginRes.data.token) {
            throw new Error(loginRes.data.message || 'Login failed');
        }

        const token = loginRes.data.token;
        console.log('Login successful');
        console.log('Token:', token);

        // Get user profile
        const profileRes = await axios.get(`${BASE_URL}/get-user-profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // Update user bio
        const newBio = 'This is my newest bio!';
        const updateRes = await axios.post(`${BASE_URL}/save-user-profile`, {
            bio: newBio,
        }, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        if (updateRes.status !== 200) {
            throw new Error(updateRes.data.message || 'Update profile failed');
        }

        // Fetch updated profile
        const updatedProfileRes = await axios.get(`${BASE_URL}/get-user-profile`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        if (updatedProfileRes.status !== 200) {
            throw new Error(updatedProfileRes.data.message || 'Get updated profile failed');
        }

        if (updatedProfileRes.data.userProfile.bio !== newBio) {
            console.log("Fuck this is new: ", updatedProfileRes.data.userProfile);
            throw new Error('Bio was not updated correctly');
        }
        if (profileRes.status !== 200) {
            throw new Error(profileRes.data.message || 'Get profile failed');
        }

        console.log('User profile:', profileRes.data);
        console.log('✅ Get user profile test passed!');
    } catch (err: any) {
        console.error('❌ Test failed:', err.response?.data?.message || err.message);
    }
}

getUserProfileTest();
