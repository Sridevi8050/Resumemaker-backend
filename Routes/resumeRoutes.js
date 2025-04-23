// import { Router } from 'express';
// const router = Router();
// import pool from '../db';

// router.post('/save-resume', async (req, res) => {
//   const { name, mobile, email, keyPoints, template } = req.body;

//   try {
//     const result = await pool.query(
//       `INSERT INTO resumes (name, mobile, email, template, keypoints)
//        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
//       [name, mobile, email, template, JSON.stringify(keyPoints)]
//     );

//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// export default router;
import { Router } from 'express';
const router = Router();
import { query } from '../db';

router.post('/save-resume', async (req, res) => {
  const { name, mobile, email, keyPoints, template } = req.body;

  try {
    const result = await query(
      `INSERT INTO resumes (name, mobile, email, template, keypoints)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, mobile, email, template, JSON.stringify(keyPoints)]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;