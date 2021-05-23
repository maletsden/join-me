export async function loginUser(credentials) {
    try {
        const data = await fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        return await data.json();
    } catch (e) {
        console.error(e.message);
    }
}

export async function loginUserByToken(token) {
    try {
        const data = await fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        });

        return await data.json();
    } catch (e) {
        console.error(e.message);
    }
}