export const useHttp = () => {
    const request =  async (
        url, 
        method = "GET", 
        body = null,
        headers = { "Content-Type": 'application/json' }
         ) => {
            try {
                const response = await fetch(url, { method, body, headers })
                if (!response.ok) {
                    throw new Error("Призошла ошибка")
                }
                const data = await response.json()
                return data
            } catch (error) {
                throw error
            }
    }

    return { request }
}