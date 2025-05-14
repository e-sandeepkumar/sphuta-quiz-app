import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, 'questions.json');
    const file = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(file);

    const { level, technology, topic } = req.query;

    let filtered = data;

    if (level && technology && topic) {
      filtered = data.filter(q =>
        q.level === level &&
        q.technology === technology &&
        q.topic === topic
      );
    }

    res.status(200).json(filtered);
  } catch (error) {
    console.error('API error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}