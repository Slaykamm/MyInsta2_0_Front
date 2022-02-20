export const convertedDate = (date) => (date).split('T')[0]
export const convertedTime = (date) => ((date).split('T')[1].split('.')[0])
export const convertedFullDate = (date) => (date).split('T')[0] + ', ' + ((date).split('T')[1].split('.')[0])



