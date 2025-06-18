const figureFormatter = (raw: number) => (
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(raw)
)

export default figureFormatter;