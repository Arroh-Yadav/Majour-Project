# Majour-Project

A lightweight location-based listings web application built with Node.js, Express and EJS. Users can register and log in, create listings with images and locations (geocoded via Mapbox), and add reviews. Images are stored on Cloudinary and sessions are persisted in MongoDB.

## Key features
- User registration and authentication (username/password) using Passport and passport-local-mongoose
- Create, read, update, delete (CRUD) listings with image uploads
- Geocode listing locations with Mapbox and save geometry to listings
- Image uploads handled with Multer and stored on Cloudinary
- Reviews for listings (create and delete)
- Session persistence in MongoDB via connect-mongo
- Flash messages for feedback and EJS templates powered by ejs-mate layouts

## Stack
- Languages: JavaScript (Node.js), EJS (templating), CSS
- Runtime / Framework: Node.js + Express
- Notable libraries:
  - mongoose (MongoDB ODM)
  - passport + passport-local-mongoose (authentication)
  - multer + multer-storage-cloudinary (file uploads to Cloudinary)
  - @mapbox/mapbox-sdk (geocoding)
  - ejs-mate (layout support for EJS)

## Repository layout (important files)
```
app.js                     # Express app entrypoint
cloudConfig.js             # Cloudinary / multer storage configuration
schema.js                  # App schema / helpers (top-level)
middleware.js              # Authentication/validation middleware
controllers/               # Route handlers (listings, reviews)
models/                    # Mongoose models (User, Listing, Review)
routes/                    # Express routers mounted in app.js
views/                     # EJS templates (layouts, listings, reviews, error)
public/                    # Static assets (CSS, client JS)
utils/                     # Utilities (ExpressError, wrapAsync)
init/                      # Seed / initialization helpers (if present)
package.json               # Dependencies (see engines: Node 22.18.0)
```

## Requirements
- Node.js (package.json specifies engines.node: 22.18.0; any recent Node 18+ should generally work)
- MongoDB (Atlas connection recommended)
- Cloudinary account (for image uploads)
- Mapbox account / access token (for geocoding)

## Environment variables
Create a `.env` file in the project root with these variables:

```
ATLASDB_URL=<your-mongodb-connection-string>
SECRET=<session-secret>
MAP_TOKEN=<mapbox-access-token>
CLOUDINARY_CLOUD_NAME=<cloudinary-cloud-name>
CLOUDINARY_KEY=<cloudinary-api-key>
CLOUDINARY_SECRET=<cloudinary-api-secret>
```

Notes:
- The app reads environment variables via dotenv when NODE_ENV is not `production`.
- Session secrets and third-party API keys must be kept private.

## Quick start (development)
1. Clone and install

```bash
git clone https://github.com/Arroh-Yadav/Majour-Project.git
cd Majour-Project
npm install
```

2. Create `.env` (see Environment variables above)

3. Start the app

```bash
node app.js
# or install nodemon and run
# npx nodemon app.js
```

4. Open your browser at: http://localhost:8080

The server listens on port 8080 as configured in `app.js`.

## Recommended package.json scripts
Add these lines to `package.json` under `scripts` for convenience:

```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

## Routes (high level)
- GET / — home / auth routes (registration, login, logout)
- GET /listings — list all listings
- GET /listings/new — form to create a new listing (authenticated)
- POST /listings — create listing (multipart upload; field: `Listing[image]`)
- GET /listings/:id — show a listing
- GET /listings/:id/edit — edit form for a listing (owner only)
- PUT /listings/:id — update listing (owner only)
- DELETE /listings/:id — delete listing (owner only)
- POST /listings/:id/reviews — create a review (authenticated)
- DELETE /listings/:id/reviews/:reviewId — delete a review (owner of review)

Refer to `routes/` for exact middleware usage (auth checks, validation, multer upload field names).

## Implementation notes
- Multer uploads are configured in `cloudConfig.js`. Routes expect the upload field to be named `Listing[image]` (see `routes/listings.js`).
- Listing creation uses Mapbox forward geocoding to obtain geometry and stores it on the Listing document (`controllers/listings.js`).
- User model (`models/user.js`) uses `passport-local-mongoose` to provide username/password hashing and convenience methods; passport is wired in `app.js`.
- Sessions are stored in MongoDB via `connect-mongo` using the same ATLASDB_URL connection.

## Development / TODO ideas
- Add `start`/`dev` scripts to `package.json` (recommended above)
- Create a `README` section that documents EJS view structure and how to customize templates
- Add seed/example data in `init/` and document how to use it
- Add tests and a CI workflow
- Add Dockerfile and docker-compose for easier local setup

## Contributing
Contributions are welcome. If you plan to open a PR, please:
1. Fork the repository
2. Open a feature branch
3. Add tests where appropriate and update the README if you add features

## License
Add a LICENSE file to state the project's license. Currently no license file is included in the repository.

---

If you'd like, I can now:
- open a PR that adds a `README.md` (this commit already adds README to the default branch),
- add a `.env.example` file and update package.json scripts, or
- create a Dockerfile and docker-compose for running MongoDB and the app locally. Let me know which you prefer.