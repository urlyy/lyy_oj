const get = async (url, param) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Network request failed');
    }
}

const post = async (url, body) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Network request failed');
    }
}

export { get, post }