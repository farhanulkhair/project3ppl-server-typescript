// Import required modules
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

// Define Comic interface
interface Comic {
  id: number;
  title: string;
  author: string;
  year: number;
  publisher: string;
  genre: string;
  description: string;
}

// Define interfaces for request bodies
interface ComicInput {
  title?: string;
  author?: string;
  year?: number | string;
  publisher?: string;
  genre?: string;
  description?: string;
}

interface BulkDeleteRequest {
  ids: (number | string)[];
}

// Initialize Express app
const app = express();
const PORT: number = 3000;

// Middleware
app.use(bodyParser.json());

// Sample database (in memory)
let comics: Comic[] = [
  {
    id: 1,
    title: "Batman: The Dark Knight Returns",
    author: "Frank Miller",
    year: 1986,
    publisher: "DC Comics",
    genre: "Superhero",
    description: "Set in a dystopian future, an aged Bruce Wayne dons the Batman costume once again."
  },
  {
    id: 2,
    title: "Watchmen",
    author: "Alan Moore",
    year: 1986,
    publisher: "DC Comics",
    genre: "Superhero",
    description: "Deconstruction of the superhero concept, features complex characters and alternating storylines."
  },
  {
    id: 3,
    title: "Maus",
    author: "Art Spiegelman",
    year: 1991,
    publisher: "Pantheon Books",
    genre: "Biography",
    description: "A survivor's tale, portraying Jews as mice and Nazis as cats during the Holocaust."
  }
];

// Helper function to find next available ID
const getNextId = (): number => {
  const maxId = comics.reduce((max, comic) => (comic.id > max ? comic.id : max), 0);
  return maxId + 1;
};

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});