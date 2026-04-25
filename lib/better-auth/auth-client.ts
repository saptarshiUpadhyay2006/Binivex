import { createAuthClient } from "better-auth/react"

const getBaseURL = () => {
    const url = process.env.NEXT_PUBLIC_BASE_URL;
    if (!url || !url.startsWith('http')) {
        return typeof window !== 'undefined' ? window.location.origin : "http://localhost:3000";
    }
    return url;
};

export const authClient = createAuthClient({
    baseURL: getBaseURL()
})
