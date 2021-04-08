export interface AuthenticationState {
    isLoading: boolean;
    authToken: string;
    refreshToken: string;
    tokenExpiresAt: Date;
}

export interface TokenReceivedProps {
    authToken: string;
    refreshToken: string;
    expiresIn: number;
    createdAt: number;
}
