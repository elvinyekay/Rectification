import type { VercelRequest, VercelResponse } from '@vercel/node';
import { mockDocuments } from './_data/mockDocuments';

export default function handler(req: VercelRequest, res: VercelResponse) {
    const id = (req.query.id as string) || '';
    const doc = mockDocuments.find((d) => d.id === id);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    if (!doc) return res.status(404).json({ message: 'Not found' });
    return res.status(200).json({ done: false, document: doc });
}
