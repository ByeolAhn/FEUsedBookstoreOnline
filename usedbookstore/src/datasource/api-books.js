let apiURL = process.env.APIURL || 'http://localhost:3000'

const list = async () => {
    try {
        let response = await fetch(apiURL + '/books/get/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}