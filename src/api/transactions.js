export const apiCreateSales = async(data) => {
  const resp = await fetch(`${import.meta.env.VITE_BACKEND}/transaction/create/sales`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return await resp.json()
}