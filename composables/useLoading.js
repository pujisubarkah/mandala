// Composable untuk loading state menggunakan logo.png
export const useLoading = () => {
  const isLoading = ref(false)

  const startLoading = () => {
    isLoading.value = true
  }

  const stopLoading = () => {
    isLoading.value = false
  }

  const withLoading = async (asyncFunction) => {
    startLoading()
    try {
      const result = await asyncFunction()
      return result
    } finally {
      stopLoading()
    }
  }

  return {
    isLoading: readonly(isLoading),
    startLoading,
    stopLoading,
    withLoading
  }
}
