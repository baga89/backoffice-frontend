const isoToLocaleDate = (ISOString) => {
  return new Date(ISOString).toLocaleDateString('hr-HR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default isoToLocaleDate;
