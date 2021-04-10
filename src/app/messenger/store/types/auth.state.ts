export interface AuthState {
    isLoading: boolean;
    authToken: string;
    refreshToken: string;
    tokenExpiresAt: Date;
    error?: string;
}

export interface TokenReceivedProps {
    authToken: string;
    refreshToken: string;
    expiresAt: Date;
}

export interface StartAuthProps {
    pollId: string;
}

export interface ErrorProps {
    errorMessage: string;
}
