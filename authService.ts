import axios from 'axios';

// API Configuration
const API_URL = 'http://localhost:5000/api';

// Configure axios
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Types
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    token: string;
    user: User;
}

export interface ApiError {
    error: string;
    success?: boolean;
    message?: string;
}

// Check backend health
export const checkBackendHealth = async (): Promise<any> => {
    try {
        const response = await api.get('/health');
        return response.data;
    } catch (error: any) {
        throw error.response?.data || { error: 'Backend is not responding' };
    }
};

// Login service
export const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await api.post<AuthResponse>('/login', { 
            email: email.trim(),
            password
        });
        
        if (response.data.token && response.data.user) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error: any) {
        throw error.response?.data as ApiError || { error: 'Network error. Please check your connection.' };
    }
};

// Register service (NO AUTO-LOGIN)
export const register = async (
    firstName: string,
    lastName: string,
    suffixName: string,
    email: string,
    password: string
): Promise<AuthResponse> => {
    try {
        const response = await api.post<AuthResponse>('/register', {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            suffixName: suffixName?.trim() || '',
            email: email.trim(),
            password
        });
        
        return response.data;
    } catch (error: any) {
        throw error.response?.data as ApiError || { error: 'Registration failed. Please try again.' };
    }
};

// Forgot password by email
export const forgotPasswordByEmail = async (email: string): Promise<any> => {
    try {
        const response = await api.post('/forgot-password/email', { 
            email: email.trim() 
        });
        return response.data;
    } catch (error: any) {
        throw error.response?.data as ApiError || { error: 'Network error' };
    }
};

// Forgot password by mobile
export const forgotPasswordByMobile = async (mobileNumber: string): Promise<any> => {
    try {
        const response = await api.post('/forgot-password/mobile', { 
            mobileNumber: mobileNumber.trim() 
        });
        return response.data;
    } catch (error: any) {
        throw error.response?.data as ApiError || { error: 'Network error' };
    }
};

// Reset password
export const resetPassword = async (token: string, newPassword: string): Promise<any> => {
    try {
        const response = await api.post('/reset-password', { 
            token, 
            newPassword 
        });
        return response.data;
    } catch (error: any) {
        throw error.response?.data as ApiError || { error: 'Network error' };
    }
};

// Verify token
export const verifyToken = async (): Promise<any> => {
    try {
        const response = await api.get('/verify-token');
        return response.data;
    } catch (error: any) {
        throw error.response?.data as ApiError || { error: 'Token verification failed' };
    }
};

// Logout
export const logout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
};

// Get current user
export const getCurrentUser = (): User | null => {
    try {
        const userStr = localStorage.getItem('user');
        if (!userStr) return null;
        return JSON.parse(userStr) as User;
    } catch {
        return null;
    }
};

// Check if authenticated
export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    return !!token;
};

// Export api instance
export default api;