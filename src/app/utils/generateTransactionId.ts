export const generateTransactionId = () => {
  const prefix = `DON-${new Date().getFullYear()}`;
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); 
  return `${prefix}-${randomPart}`;
};
