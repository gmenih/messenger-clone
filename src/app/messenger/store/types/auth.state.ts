export interface AuthStored {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
}

export interface AuthState {
    isLoading: boolean;
    accessToken: string;
    refreshToken: string;
    tokenExpiresAt: Date;
    error?: string;
}

export interface TokenReceivedProps {
    accessToken: string;
    refreshToken: string;
    expiresAt: Date;
}

export interface StartAuthProps {
    pollId: string;
}

export interface ErrorProps {
    errorMessage: string;
}

export interface AuthToken$ {
    authToken: string;
    refreshToken: string;
}
