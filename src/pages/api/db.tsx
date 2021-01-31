import type { NextApiRequest, NextApiResponse } from 'next'

import db from '../../db.json'

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(db)
}
