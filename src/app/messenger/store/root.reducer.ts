import {authReducer} from './auth/auth.reducer';

export const rootReducer = () => ({
    auth: authReducer,
});
