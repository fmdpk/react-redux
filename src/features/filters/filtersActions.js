export const colorFilterChanged = (color, changeType) => {
  return {
    type: 'filters/colorFilterChanged',
    payload: { color, changeType },
  }
}

export const statusFilterChanged = (status) => {
  return { type: 'filters/statusFilterChanged', payload: status }
}
