const { v4: uuidv4 } = require('uuid');

// e.g. VPMS-20260621-9F3A2B
const generatePassNumber = () => {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomPart = uuidv4().split('-')[0].toUpperCase();
  return `VPMS-${datePart}-${randomPart}`;
};

module.exports = generatePassNumber;
