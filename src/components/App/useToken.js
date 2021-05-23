import { useCookies } from 'react-cookie';

export default function useToken() {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const setToken = userToken => {
        setCookie('token', userToken, {
            path: '/',
            maxAge: 3600 * 24 * 7, // 7 days
            sameSite: true,
        })
    };

    const removeToken = () => removeCookie('token');

    return {
        token: cookies.token,
        setToken,
        removeToken
    }
}