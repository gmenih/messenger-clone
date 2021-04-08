export interface MagicLinkPayload {
    scope: 'magic_link';
    client_id: string;
    client_secret: string;
    meta?: unknown;
    grant_type?: 'refresh_token';
    refresh_token?: string;
}


export interface MagicLinkResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    created_at: number;
}
