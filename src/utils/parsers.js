// parsers.js
export const parseData = (data) => {
  return data
    .map((item) => {
      try {
        const date = new Date(item.Date || item.date)
        const amount = parseFloat(item.Amount || item.amount)

        if (isNaN(date.getTime()) || isNaN(amount)) {
          console.error(`Invalid data entry: ${JSON.stringify(item)}`)
          return null
        }

        return {
          date: date.toISOString().split('T')[0], // Format as 'YYYY-MM-DD'
          amount,
          category: item.Category || item.category,
          description: item.Description || item.description
        }
      } catch (error) {
        console.error(`Data parsing error: ${error.message}`, item)
        return null
      }
    })
    .filter((entry) => entry !== null) // Filter out invalid entries
}
