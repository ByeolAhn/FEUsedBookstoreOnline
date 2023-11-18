let apiURL = process.env.APIURL || 'http://localhost:3000'

const signin = async (user) => {
    try {
        let response = await fetch(apiURL + '/users/signin/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export { signin }