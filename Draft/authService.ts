const API_URL = 'http://localhost:5000/api';

export interface LoginResponse {
    message: string;
    token: string;
    user: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        profilePic?: string;
    };
}

export interface RegisterResponse {
    message: string;
    userId: number;
}

export interface ForgotPasswordResponse {
    message: string;
    token?: string;
    demoNote?: string;
}

// Check backend health
export const checkBackendHealth = async () => {
    try {
        const response = await fetch(`${API_URL}/health`);
        return await response.json();
    } catch (error) {
        console.error('Backend health check failed:', error);
        throw error;
    }
};

// Login user
export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }

        // Save token to localStorage
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            if (data.user.profilePic) {
                localStorage.setItem('profilePic', data.user.profilePic);
            }
        }

        return data;
    } catch (error: any) {
        console.error('Login error:', error);
        throw error;
    }
};

// Register user
export const register = async (
    firstName: string,
    lastName: string,
    suffixName: string,
    email: string,
    password: string
): Promise<RegisterResponse> => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName, lastName, suffixName, email, password }),
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Registration failed');
        }

        return data;
    } catch (error: any) {
        console.error('Registration error:', error);
        throw error;
    }
};

// Forgot password by email
export const forgotPasswordByEmail = async (email: string): Promise<ForgotPasswordResponse> => {
    try {
        const response = await fetch(`${API_URL}/forgot-password/email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to send reset email');
        }

        return data;
    } catch (error: any) {
        console.error('Forgot password error:', error);
        throw error;
    }
};

// Forgot password by mobile
export const forgotPasswordByMobile = async (mobileNumber: string): Promise<ForgotPasswordResponse> => {
    try {
        const response = await fetch(`${API_URL}/forgot-password/mobile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mobileNumber }),
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to send SMS');
        }

        return data;
    } catch (error: any) {
        console.error('Forgot password mobile error:', error);
        throw error;
    }
};

// Get user profile
export const getProfile = async () => {
    try {
        const token = localStorage.getItem('token');
        
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_URL}/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch profile');
        }

        return data;
    } catch (error: any) {
        console.error('Profile fetch error:', error);
        throw error;
    }
};

// Get home page data
export const getHomeData = async () => {
    try {
        const response = await fetch(`${API_URL}/home`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch home data');
        }

        return await response.json();
    } catch (error) {
        console.error('Home data fetch error:', error);
        throw error;
    }
};

// Logout user
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('profilePic');
    window.location.href = '/login';
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('token');
};

// Get current user
export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

// Add these new functions to your existing authService.ts

export interface Destination {
    id: number;
    title: string;
    description: string;
    address: string;
    image_url: string;
    category: string;
    rating: number;
    total_reviews: number;
    distance: number;
    latitude?: number;
    longitude?: number;
    opening_hours?: string;
    entry_fee?: number;
    contact_info?: string;
    website?: string;
}

export interface DestinationDetail {
    destination: Destination;
    details?: any[];
    related?: Destination[];
}

export interface HomeData {
    recommended: Destination[];
    popular: Destination[];
    cultural: Destination[];
}

// Get all destinations
export const getDestinations = async (category?: string, limit?: number): Promise<Destination[]> => {
    try {
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (limit) params.append('limit', limit.toString());
        
        const response = await fetch(`${API_URL}/destinations?${params.toString()}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch destinations');
        }

        const data = await response.json();
        return data.destinations;
    } catch (error) {
        console.error('Get destinations error:', error);
        throw error;
    }
};

// Get single destination
export const getDestination = async (id: number): Promise<DestinationDetail> => {
    try {
        const response = await fetch(`${API_URL}/destinations/${id}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch destination');
        }

        const data = await response.json();
        return data.destination;
    } catch (error) {
        console.error('Get destination error:', error);
        throw error;
    }
};

// Toggle favorite
export const toggleFavorite = async (destinationId: number): Promise<{ isFavorite: boolean }> => {
    try {
        const token = localStorage.getItem('token');
        
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_URL}/favorites/${destinationId}/toggle`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to toggle favorite');
        }

        return data;
    } catch (error) {
        console.error('Toggle favorite error:', error);
        throw error;
    }
};

// Get user favorites
export const getFavorites = async (): Promise<Destination[]> => {
    try {
        const token = localStorage.getItem('token');
        
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${API_URL}/favorites`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch favorites');
        }

        return data.favorites;
    } catch (error) {
        console.error('Get favorites error:', error);
        throw error;
    }
};