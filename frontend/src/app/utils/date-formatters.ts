const monDateYearFormatter = (dateStr: string): string => (
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
)

export default monDateYearFormatter;