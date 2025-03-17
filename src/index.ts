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

// === REQUIRED ENDPOINTS ===

// GET: Get all comics with optional filtering and pagination
app.get("/comics", (req: Request, res: Response) => {
  try {
    let result = [...comics];

    // Filter by query parameters if provided
    const { author, genre, publisher, year } = req.query;

    if (author && typeof author === "string") {
      result = result.filter((comic) =>
        comic.author.toLowerCase().includes(author.toLowerCase())
      );
    }

    if (genre && typeof genre === "string") {
      result = result.filter((comic) =>
        comic.genre.toLowerCase().includes(genre.toLowerCase())
      );
    }

    if (publisher && typeof publisher === "string") {
      result = result.filter((comic) =>
        comic.publisher.toLowerCase().includes(publisher.toLowerCase())
      );
    }

    if (year && typeof year === "string") {
      result = result.filter((comic) => comic.year === parseInt(year));
    }

    // Pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedResult = {
      data: result.slice(startIndex, endIndex),
      totalItems: result.length,
      totalPages: Math.ceil(result.length / limit),
      currentPage: page,
    };

    res.status(200).json(paginatedResult);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while fetching comics",
        error: (error as Error).message,
      });
  }
});

// GET: Get a specific comic by ID
app.get("/comics/:id", (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const comic = comics.find((comic) => comic.id === id);

    if (comic) {
      res.status(200).json({ data: comic });
    } else {
      res.status(404).json({ message: `Comic with ID ${id} not found` });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while fetching the comic",
        error: (error as Error).message,
      });
  }
});

// POST: Add a new comic
app.post("/comics", (req: Request, res: Response) => {
  try {
    const { title, author, year, publisher, genre, description } =
      req.body as ComicInput;

    // Basic validation
    if (!title || !author || !year) {
      return res
        .status(400)
        .json({ message: "Title, author, and year are required fields" });
    }

    const newComic: Comic = {
      id: getNextId(),
      title,
      author,
      year: typeof year === "string" ? parseInt(year) : year,
      publisher: publisher || "Unknown",
      genre: genre || "Unspecified",
      description: description || "",
    };

    comics.push(newComic);

    res.status(201).json({
      message: "Comic added successfully",
      data: newComic,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while adding the comic",
        error: (error as Error).message,
      });
  }
});

// === ADDITIONAL ENDPOINTS (FOR EXTRA POINTS) ===

// PUT: Update an existing comic
app.put("/comics/:id", (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const comicIndex = comics.findIndex((comic) => comic.id === id);

    if (comicIndex === -1) {
      return res.status(404).json({ message: `Comic with ID ${id} not found` });
    }

    // Get fields to update
    const { title, author, year, publisher, genre, description } =
      req.body as ComicInput;

    // Update comic
    const updatedComic: Comic = {
      ...comics[comicIndex],
      title: title !== undefined ? title : comics[comicIndex].title,
      author: author !== undefined ? author : comics[comicIndex].author,
      year:
        year !== undefined
          ? typeof year === "string"
            ? parseInt(year)
            : year
          : comics[comicIndex].year,
      publisher:
        publisher !== undefined ? publisher : comics[comicIndex].publisher,
      genre: genre !== undefined ? genre : comics[comicIndex].genre,
      description:
        description !== undefined
          ? description
          : comics[comicIndex].description,
    };

    comics[comicIndex] = updatedComic;

    res.status(200).json({
      message: "Comic updated successfully",
      data: updatedComic,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while updating the comic",
        error: (error as Error).message,
      });
  }
});

// DELETE: Delete a comic
app.delete("/comics/:id", (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const comicIndex = comics.findIndex((comic) => comic.id === id);

    if (comicIndex === -1) {
      return res.status(404).json({ message: `Comic with ID ${id} not found` });
    }

    const deletedComic = comics[comicIndex];
    comics.splice(comicIndex, 1);

    res.status(200).json({
      message: "Comic deleted successfully",
      data: deletedComic,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while deleting the comic",
        error: (error as Error).message,
      });
  }
});

// POST: Add multiple comics at once (bulk operation)
app.post("/comics/bulk", (req: Request, res: Response) => {
  try {
    const comicsToAdd = req.body as ComicInput[];

    if (!Array.isArray(comicsToAdd) || comicsToAdd.length === 0) {
      return res
        .status(400)
        .json({ message: "Request body must be a non-empty array of comics" });
    }

    const addedComics: Comic[] = [];
    const failedComics: { comic: ComicInput; reason: string }[] = [];

    comicsToAdd.forEach((comic) => {
      const { title, author, year } = comic;

      // Basic validation
      if (!title || !author || !year) {
        failedComics.push({
          comic,
          reason: "Title, author, and year are required fields",
        });
        return;
      }

      const newComic: Comic = {
        id: getNextId(),
        title,
        author,
        year: typeof year === "string" ? parseInt(year) : year,
        publisher: comic.publisher || "Unknown",
        genre: comic.genre || "Unspecified",
        description: comic.description || "",
      };

      comics.push(newComic);
      addedComics.push(newComic);
    });

    res.status(201).json({
      message: `Successfully added ${addedComics.length} comics, failed to add ${failedComics.length} comics`,
      addedComics,
      failedComics,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while adding comics in bulk",
        error: (error as Error).message,
      });
  }
});

// DELETE: Delete multiple comics at once (bulk operation)
app.delete("/comics/bulk", (req: Request, res: Response) => {
  try {
    const { ids } = req.body as BulkDeleteRequest;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({
          message: "Request body must contain a non-empty array of ids",
        });
    }

    const deletedComics: Comic[] = [];
    const notFoundIds: (number | string)[] = [];

    ids.forEach((id) => {
      const parsedId = typeof id === "string" ? parseInt(id) : id;
      const comicIndex = comics.findIndex((comic) => comic.id === parsedId);

      if (comicIndex === -1) {
        notFoundIds.push(id);
        return;
      }

      const deletedComic = comics[comicIndex];
      comics.splice(comicIndex, 1);
      deletedComics.push(deletedComic);
    });

    res.status(200).json({
      message: `Successfully deleted ${deletedComics.length} comics, could not find ${notFoundIds.length} comics`,
      deletedComics,
      notFoundIds,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while deleting comics in bulk",
        error: (error as Error).message,
      });
  }
});

// GET: Get statistics about the comic collection
app.get("/stats/comics", (req: Request, res: Response) => {
  try {
    // Get unique publishers, authors, and genres
    const publishers = [...new Set(comics.map((comic) => comic.publisher))];
    const authors = [...new Set(comics.map((comic) => comic.author))];
    const genres = [...new Set(comics.map((comic) => comic.genre))];

    // Get count by publisher, author, and genre
    const publisherCounts: Record<string, number> = {};
    const authorCounts: Record<string, number> = {};
    const genreCounts: Record<string, number> = {};

    comics.forEach((comic) => {
      publisherCounts[comic.publisher] =
        (publisherCounts[comic.publisher] || 0) + 1;
      authorCounts[comic.author] = (authorCounts[comic.author] || 0) + 1;
      genreCounts[comic.genre] = (genreCounts[comic.genre] || 0) + 1;
    });

    // Get oldest and newest comics
    const oldestComic = comics.reduce(
      (oldest, comic) => (comic.year < oldest.year ? comic : oldest),
      comics[0]
    );
    const newestComic = comics.reduce(
      (newest, comic) => (comic.year > newest.year ? comic : newest),
      comics[0]
    );

    res.status(200).json({
      totalComics: comics.length,
      uniquePublishers: publishers.length,
      uniqueAuthors: authors.length,
      uniqueGenres: genres.length,
      publisherCounts,
      authorCounts,
      genreCounts,
      oldestComic,
      newestComic,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while fetching statistics",
        error: (error as Error).message,
      });
  }
});

// GET: Search comics by keyword
app.get("/search/comics/:keyword", (req: Request, res: Response) => {
  try {
    const keyword = req.params.keyword.toLowerCase();

    const results = comics.filter(
      (comic) =>
        comic.title.toLowerCase().includes(keyword) ||
        comic.author.toLowerCase().includes(keyword) ||
        comic.publisher.toLowerCase().includes(keyword) ||
        comic.genre.toLowerCase().includes(keyword) ||
        comic.description.toLowerCase().includes(keyword)
    );

    if (results.length === 0) {
      return res
        .status(404)
        .json({
          message: `No comics found matching keyword: ${req.params.keyword}`,
        });
    }

    res.status(200).json({
      message: `Found ${results.length} comics matching keyword: ${req.params.keyword}`,
      data: results,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while searching comics",
        error: (error as Error).message,
      });
  }
});