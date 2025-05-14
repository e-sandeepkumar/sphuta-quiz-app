const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const filePath = path.join(__dirname, 'questions.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const { level, technology, topic } = req.query;
    const filtered = data.filter(
      q => q.level === level && q.technology === technology && q.topic === topic
    );

    res.status(200).json(filtered);
  } catch (error) {
    console.error('API error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};