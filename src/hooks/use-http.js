import { useState, useCallback } from 'react'

const errorsMap = new Map()
errorsMap.set(401, 'Un Authorized')
errorsMap.set(403, 'Forbidden ')
errorsMap.set(404, 'Service Not found')
errorsMap.set(405, 'Method not Allowed')

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true)
    setError(null)
    console.log('sending request', requestConfig)
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.methoid ? requestConfig.methoid : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
      })
      if (response.status !== 200) {
        throw new Error('An Error happened ' + errorsMap.get(response.status))
      }

      const data = await response.json()
      applyData(data)
    } catch (error) {
      setError(error.message || 'Something went wrong!')
    }
    setIsLoading(false)
  }, [])

  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest
  }
}

export default useHttp
