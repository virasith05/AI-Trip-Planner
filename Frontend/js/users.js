// Register function using fetch API
const RegisterUser = async (values) => {
  try {
    const response = await fetch('http://localhost:8086/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    });

    // Check if response is ok BEFORE parsing JSON
    if (!response.ok) {
      console.error('Server error:', response.status, response.statusText);
      
      // Try to get error message from response text
      const text = await response.text();
      console.error('Server response:', text);
      
      return {
        success: false,
        message: `Server error: ${response.status}. Please check your server.`
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Register error:", error);
    return { success: false, message: error.message || "Registration failed" };
  }
};

// Login function using fetch API
const LoginUser = async (values) => {
  try {
    const response = await fetch('http://localhost:8086/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    });

    // Check if response is ok BEFORE parsing JSON
    if (!response.ok) {
      console.error('Server error:', response.status, response.statusText);
      
      // Try to get error message from response text
      const text = await response.text();
      console.error('Server response:', text);
      
      return {
        success: false,
        message: `Server error: ${response.status}. Please check your server.`
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: error.message || "Login failed" };
  }
};

// Export both functions
export { RegisterUser, LoginUser };