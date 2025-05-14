const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const { level, technology, topic } = req.query;

  const filePath = path.resolve(__dirname, './questions.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const filtered = data.filter(q =>
    q.level === level &&
    q.technology === technology &&
    q.topic === topic
  );

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(filtered);
};