# 🎬 MovieVerse — Movie Discovery App

MovieVerse is a full-stack Movie Discovery application built with **React.js, Node.js, Express.js, and MongoDB**.

The application allows users to discover movies, search for movies, browse categories, sort results, view detailed movie information, and maintain a persistent wishlist.

The frontend communicates only with the Node.js backend. The backend communicates with the external movie API and handles caching, error handling, and wishlist persistence.

---

## ✨ Features

### 🎥 Movie Discovery
- Discover movies from the home page.
- Browse movies by predefined categories.
- Search movies by title.
- View movie posters, titles, and release years.
- View detailed information about a selected movie.

### 🔎 Search
- Search movies through the backend API.
- Supports different search terms and capitalization.
- Handles empty searches.
- Displays a clear message when no movies are found.
- Handles rapid consecutive searches safely.
- Previous requests are cancelled when a new search starts.

### 🗂️ Categories
Available categories include:

- Action
- Comedy
- Drama
- Sci-Fi
- Horror
- Animation

> **Note:** The OMDb API does not provide a dedicated genre/discover endpoint in the selected API usage. Therefore, category browsing is implemented using OMDb title-search queries rather than strict genre filtering.

### ↕️ Sorting
Search and category results can be sorted by:

- Default
- Year — Newest
- Year — Oldest

### 📄 Pagination
- Supports pagination for large result sets.
- Displays current page and total pages.
- Previous and Next buttons.
- Previous is disabled on the first page.
- Next is disabled on the last page.
- Pagination resets when a new search or category is selected.

### ❤️ Wishlist
- Add movies to a persistent wishlist.
- Remove movies from the wishlist.
- Prevent duplicate wishlist entries.
- Wishlist data is stored in MongoDB.
- Wishlist remains available after page refresh.
- Wishlist can be opened from the navigation bar.
- Movies in the wishlist can be opened in the details page.

### 🎬 Movie Details
- Displays detailed information for a movie.
- Uses IMDb ID to fetch movie details.
- Supports direct movie-detail URLs.
- Supports browser refresh on the details page.
- Back navigation preserves the previous browsing context through browser history.

### ⚡ Performance & Reliability
- MongoDB caching for repeated movie search requests.
- Cache expiration using a TTL-style `expiresAt` field.
- Axios request timeout for external API calls.
- Request cancellation for rapid search changes.
- Separate handling for timeout, upstream API failure, validation errors, and empty results.

### 📱 Responsive Design
The UI is responsive for:

- Mobile devices
- Tablets
- Desktop screens

The movie grid adapts its number of columns according to screen size.

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- React Router DOM
- Axios
- Tailwind CSS

## Backend

- Node.js
- Express.js
- Axios
- CORS
- dotenv

## Database

- MongoDB
- Mongoose

## External Movie API

- OMDb API

---

# 🏗️ Architecture

The application follows a simple client-server architecture:

```text
┌──────────────────────┐
│      React App       │
│      Frontend        │
└──────────┬───────────┘
           │
           │ Axios HTTP Requests
           ▼
┌──────────────────────┐
│   Node.js + Express  │
│       Backend        │
└───────┬────────┬─────┘
        │        │
        │        │
        ▼        ▼
┌────────────┐  ┌────────────────┐
│  MongoDB   │  │   OMDb API     │
│            │  │ External Movie │
│ Wishlist   │  │     Data       │
│ Cache      │  └────────────────┘
└────────────┘
```

### Request Flow

For movie search:

```text
User
 ↓
React SearchBar
 ↓
Frontend movieApi.js
 ↓
Node.js / Express
 ↓
movieController.js
 ↓
movieService.js
 ↓
MongoDB Cache
 ↓
If cache miss → OMDb API
 ↓
Response
 ↓
React UI
```

---

# 📁 Project Structure

```text
movie-discovery-app/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── movieController.js
│   │   │   └── wishlistController.js
│   │   │
│   │   ├── models/
│   │   │   ├── movies.js
│   │   │   ├── Wishlist.js
│   │   │   └── MovieCache.js
│   │   │
│   │   ├── routes/
│   │   │   ├── movieRoutes.js
│   │   │   └── wishlistRoutes.js
│   │   │
│   │   └── services/
│   │       └── movieService.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── main.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── CategoryFilter.jsx
│   │   │   ├── MovieCard.jsx
│   │   │   ├── MovieGrid.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── SortFilter.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── MovieDetails.jsx
│   │   │   └── Wishlist.jsx
│   │   │
│   │   ├── services/
│   │   │   └── movieApi.js
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   └── index.css
│   │
│   ├── .gitignore
│   ├── .eslintrc.json
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── vite.config.js
│
└── README.md
```

---

# 🔌 Backend API

Base URL:

```text
http://localhost:1819/api
```

> The backend port can be changed using the `PORT` environment variable.

## Movie APIs

### Search Movies

```http
GET /movies/search?query=batman&page=1
```

Example:

```text
GET http://localhost:1819/api/movies/search?query=batman&page=1
```

### Discover / Recommended Movies

```http
GET /movies/featured
```

This endpoint provides the initial movie discovery data used on the home page.

### Category Movies

```http
GET /movies/category?category=Action&page=1
```

### Movie Details

```http
GET /movies/:imdbId
```

Example:

```text
GET /movies/tt0372784
```

---

# ❤️ Wishlist APIs

### Add Movie to Wishlist

```http
POST /wishlist
```

Request body:

```json
{
  "imdbId": "tt0372784",
  "title": "Batman Begins",
  "year": "2005",
  "poster": "poster-url"
}
```

### Get Wishlist

```http
GET /wishlist
```

### Remove Movie

```http
DELETE /wishlist/:imdbId
```

Example:

```text
DELETE /wishlist/tt0372784
```

---

# 🗄️ Database Design

MongoDB is used for persistent wishlist storage and API response caching.

## Wishlist Collection

Model:

```text
Wishlist
```

Fields:

| Field | Type | Description |
|---|---|---|
| imdbId | String | Unique IMDb movie ID |
| title | String | Movie title |
| year | String | Movie release year |
| poster | String | Movie poster URL |
| createdAt | Date | Automatically generated |
| updatedAt | Date | Automatically generated |

`imdbId` is unique and indexed to prevent duplicate wishlist entries.

---

# ⚡ Movie Cache

Model:

```text
MovieCache
```

Fields:

| Field | Type | Description |
|---|---|---|
| cacheKey | String | Unique search + page key |
| data | Mixed | Cached OMDb response |
| expiresAt | Date | Cache expiration time |
| createdAt | Date | Automatically generated |
| updatedAt | Date | Automatically generated |

## Cache Strategy

For search requests, a cache key is generated using the search query and page number.

Example:

```text
batman_1
```

The backend:

1. Receives the search request.
2. Generates a cache key.
3. Checks MongoDB for a non-expired cache entry.
4. Returns cached data if available.
5. Calls OMDb if no valid cache exists.
6. Stores the response in MongoDB.
7. Returns the response to the frontend.

Current cache duration:

```text
10 minutes
```

This reduces repeated external API requests and helps with API rate limits.

---

# 🧩 Backend Layers

The backend is separated into different responsibilities.

## Routes

Routes define the available API endpoints.

Examples:

```text
movieRoutes.js
wishlistRoutes.js
```

## Controllers

Controllers handle:

- Request validation
- Calling services
- HTTP responses
- Error handling

Examples:

```text
movieController.js
wishlistController.js
```

## Services

The movie service handles communication with the external OMDb API and movie caching.

File:

```text
backend/src/services/movieService.js
```

## Models

Mongoose models define MongoDB collections and schemas.

Examples:

```text
movies.js
Wishlist.js
MovieCache.js
```

---

# 🛡️ Error Handling

The backend handles several failure scenarios.

## Invalid Search

If the search query is missing:

```text
400 Bad Request
```

## Movie Not Found

If OMDb returns no result:

```text
404 Not Found
```

## External API Timeout

If OMDb does not respond within the configured timeout:

```text
504 Gateway Timeout
```

## External API Failure

If the external movie service returns an error:

```text
502 Bad Gateway
```

## Unexpected Backend Error

Unexpected server errors return:

```text
500 Internal Server Error
```

The frontend displays user-friendly error messages instead of exposing technical details.

---

# 🚦 Rapid Search Request Handling

Rapid search changes can create multiple requests at the same time.

For example:

```text
bat
batm
batma
batman
```

Without request cancellation, an older request could finish after the newest request and overwrite the UI.

To prevent this, the frontend uses:

```text
AbortController
```

Before starting a new search:

1. The previous request is cancelled.
2. A new request is created.
3. The latest response updates the UI.

This helps keep the UI consistent during fast user input.

---

# 🔐 API Key Security

The OMDb API key is stored in the backend environment file:

```text
backend/.env
```

Example:

```env
OMDB_API_KEY=your_omdb_api_key
PORT=1819
MONGO_URI=your_mongodb_connection_string
```

The frontend never communicates directly with OMDb and never contains the API key.

The frontend only calls:

```text
Node.js Backend
```

The backend then calls:

```text
OMDb API
```

The `.env` file should never be committed to Git.

---

# ⚙️ Environment Variables

Create:

```text
backend/.env
```

Example:

```env
PORT=1819
MONGO_URI=mongodb://127.0.0.1:27017/movie-discovery
OMDB_API_KEY=your_omdb_api_key
```

Replace the values with your own configuration.

---

# 🚀 Local Setup

## Prerequisites

Make sure the following are installed:

- Node.js
- npm
- MongoDB
- Git

You also need an OMDb API key.

---

## 1. Clone the Repository

```bash
git clone <your-github-repository-url>
```

Then:

```bash
cd movie-discovery-app
```

---

# 2. Setup Backend

Open a terminal:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create:

```text
backend/.env
```

Add:

```env
PORT=1819
MONGO_URI=mongodb://127.0.0.1:27017/movie-discovery
OMDB_API_KEY=your_omdb_api_key
```

Start the backend:

```bash
node main.js
```

The backend should run on:

```text
http://localhost:1819
```

---

# 3. Setup Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Vite will provide a local URL similar to:

```text
http://localhost:5173
```

Open that URL in your browser.

---

# 🔄 Application Flow

## Search Flow

```text
User enters movie name
        ↓
SearchBar
        ↓
movieApi.js
        ↓
GET /api/movies/search
        ↓
movieController.js
        ↓
movieService.js
        ↓
Check MongoDB Cache
        ↓
 ┌───────────────┐
 │ Cache exists? │
 └───────┬───────┘
         │
    Yes  │  No
     ↓   │   ↓
 Return  │ OMDb API
 Cache   │   ↓
         │ Store Cache
         │   ↓
         └── Response
              ↓
          React UI
```

---

# ❤️ Wishlist Flow

```text
User clicks Wishlist
        ↓
POST /api/wishlist
        ↓
wishlistController.js
        ↓
MongoDB
        ↓
Wishlist Collection
```

When the wishlist page is opened:

```text
GET /api/wishlist
        ↓
MongoDB
        ↓
Wishlist Collection
        ↓
React Wishlist Page
```

Removing a movie:

```text
DELETE /api/wishlist/:imdbId
        ↓
MongoDB
        ↓
Movie removed
        ↓
UI updated
```

---

# 🧠 Technical Decisions

## Why React?

React was selected because:

- It is component-based.
- It provides efficient UI updates.
- It works well for interactive search and filtering.
- React Router provides client-side navigation.
- It is suitable for responsive single-page applications.

## Why Node.js + Express?

Node.js and Express were selected because:

- They are lightweight for API development.
- They work well with JavaScript-based frontend development.
- Express makes API routing simple.
- Node acts as a secure middle layer between React and the external movie API.

## Why MongoDB?

MongoDB was selected because:

- The project already uses JavaScript/Node.js.
- Mongoose provides a simple schema layer.
- Wishlist data is easy to store as documents.
- MongoDB can also store cached external API responses.

## Why OMDb?

OMDb was selected as the external movie API for this assignment because it provides movie search and movie-detail information through a REST API.

The frontend does not directly call OMDb. All movie requests pass through the Node.js backend.

## Why MongoDB Cache?

Caching was added to:

- Reduce repeated external API calls.
- Improve response time for repeated requests.
- Reduce unnecessary API usage.
- Help handle API rate limits.

---

# ⚠️ Assumptions & Limitations

## 1. OMDb Category Limitation

OMDb does not provide the same discovery and genre-filtering capabilities as APIs such as TMDB.

Therefore, category buttons currently use search terms such as:

```text
Action
Comedy
Drama
Sci-Fi
Horror
Animation
```

These are implemented as movie title searches rather than guaranteed genre filters.

This limitation is documented instead of pretending the API provides strict genre filtering.

## 2. Wishlist Authentication

The current implementation does not include user authentication.

The wishlist is persistent in MongoDB but is not associated with individual user accounts.

Authentication was intentionally kept outside the current assignment scope because the requirement only specifies a persistent wishlist.

## 3. External API Dependency

Movie search and details depend on the availability of the OMDb API.

If OMDb is unavailable or slow, the backend returns an appropriate error and the frontend displays an error state.

## 4. API Rate Limits

The external API may impose request limits.

MongoDB caching helps reduce repeated requests, but it cannot completely remove external API limitations.

## 5. Movie Data

Movie information is provided by the external movie API and may be incomplete for some titles.

The application therefore handles missing fields where possible.

---

# 📱 Responsive Design

The application uses responsive Tailwind CSS classes.

The movie grid adapts across screen sizes:

```text
Mobile       → 2 columns
Small        → 3 columns
Large        → 4 columns
Extra Large  → 5 columns
```

The navigation, search form, category filters, movie cards, sorting controls, and pagination are designed to work across mobile and desktop screen sizes.

---

# 🧪 Testing Performed

The following scenarios were tested manually.

## Search Testing

- Normal search
- Lowercase search
- Search with spaces
- Empty search
- No-result search
- Rapid consecutive searches
- Search after selecting a category
- Category after performing a search

## Category Testing

- Category selection
- Category switching
- Category pagination
- Category sorting
- Category to search transition
- Search to category transition

## Movie Details Testing

- Open movie details
- Navigate back
- Refresh details page
- Direct details URL
- Invalid IMDb ID
- Add movie to wishlist
- Remove movie from wishlist

## Wishlist Testing

- Add movie
- Add duplicate movie
- Remove movie
- Refresh wishlist
- Empty wishlist
- Open movie from wishlist
- Navigate between wishlist and details
- Add multiple movies
- Verify MongoDB persistence

## Pagination Testing

- Navigate to next page
- Navigate to previous page
- First page behavior
- Last page behavior
- Pagination after new search
- Pagination after category change
- Sorting with paginated results

## API Reliability Testing

- External API failure
- Slow API response
- Request timeout
- No-result response
- Incomplete movie data
- Rapid requests
- Repeated requests
- Cache response behavior

## Responsive Testing

The UI was tested at mobile-sized and desktop-sized viewport widths.

---

# 🤖 AI Usage

AI tools were used during development as a development assistant.

AI assistance was used for:

- Understanding technical concepts.
- Debugging errors.
- Improving component structure.
- Reviewing API handling.
- Suggesting error-handling approaches.
- Improving UI/UX ideas.
- Reviewing edge cases.
- Writing and improving documentation.

The final implementation was reviewed and tested manually.

The developer understands the implemented application flow, API architecture, MongoDB persistence, caching approach, React components, and error-handling logic.

---

# 🔮 Future Improvements

Possible future improvements include:

### Authentication

Add:

- User registration
- Login
- JWT authentication
- User-specific wishlists

### Better Movie Discovery

Move to an API with stronger discovery capabilities and proper genre filtering.

### Advanced Filters

Add:

- Genre
- Release year
- IMDb rating
- Language
- Runtime
- Content type

### Better Pagination

Implement:

- Page number navigation
- Jump-to-page
- Infinite scrolling as an alternative
- Better large-result navigation

### Improved Caching

Possible improvements:

- Redis caching
- More advanced cache invalidation
- Different cache durations for different endpoints

### Search Improvements

Add:

- Search suggestions
- Debounced search
- Recent searches
- Search history

### UI Improvements

Add:

- Dark/light theme
- Skeleton loaders
- Better poster fallbacks
- Animations
- More detailed responsive layouts

### Production Improvements

Add:

- Automated tests
- API monitoring
- Structured logging
- Rate limiting
- Security headers
- Production environment configuration
- CI/CD

---

# 📋 Requirement Coverage

| Requirement | Implementation |
|---|---|
| Browse / Discover | Home discovery section |
| Search | OMDb search through Node backend |
| Filters / Categories | Action, Comedy, Drama, Sci-Fi, Horror, Animation |
| Sorting | Newest / Oldest / Default |
| Pagination | Previous / Next pagination |
| Movie Details | IMDb ID based details page |
| Persistent Wishlist | MongoDB |
| Context-preserving Navigation | React Router + browser history |
| Loading State | Implemented |
| Empty State | Implemented |
| Error State | Implemented |
| Responsive UI | Tailwind responsive layout |
| External API Handling | Axios timeout + error handling |
| Repeated Request Handling | MongoDB cache |
| Rapid Search Handling | AbortController |
| API Key Protection | Backend `.env` |
| Client → Backend → External API | Implemented |

---

# 📊 Project Status

## ✅ Completed

- React frontend
- Node.js backend
- Express API
- MongoDB connection
- OMDb API integration
- Movie search
- Movie discovery
- Category browsing
- Sorting
- Pagination
- Movie details
- Persistent wishlist
- Duplicate wishlist prevention
- MongoDB caching
- API timeout handling
- Error handling
- Rapid request cancellation
- Responsive UI
- Navigation
- Manual edge-case testing
- README documentation

---

# ▶️ Run the Project

### Backend

```bash
cd backend
npm install
node main.js
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Then open the Vite URL shown in the terminal, normally:

```text
http://localhost:5173
```

---

# 👨‍💻 Author

**Tejas Shimpi**

Full-Stack / MERN Stack Developer

GitHub: Add your GitHub profile URL here

LinkedIn: Add your LinkedIn profile URL here

---

# 📄 License

This project was created for educational and assignment purposes.
