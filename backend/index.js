import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postsRouter from './routes/postRoutes.js';
import usersRouter from './routes/userRoutes.js';
import personsRouter from './routes/personRoutes.js';
import VSRouter from './routes/vitalSignsRoutes.js';
import dotenv from 'dotenv'

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use the posts router : l'URL de l'API est /api/posts.
// le '/' de la fonction router.get('/', async (req, res) de postsRoutes.js est mappée à /api/posts
// et permet lee requetes de type : GET http://localhost:3001/api/posts
app.use('/api/posts', postsRouter);
// Use the users router : l'URL de l'API est /api/users.
app.use('/api/users', usersRouter);
// Use the persons router : l'URL de l'API est /api/persons.
app.use('/api/persons', personsRouter);
// Use the vital-signs router : l'URL de l'API est //api/vital-signs.
app.use('/api/vital-signs', VSRouter);
// Start the server
// const PORT = 3001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.listen(3001, '0.0.0.0', () => {
  console.log('Server running on http://0.0.0.0:3001');
});
