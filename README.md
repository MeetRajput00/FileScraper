# Google Drive Web Scraper API

This is a Node.js-based API for scraping Google Drive search results. It allows you to perform searches on Google Drive and retrieve the corresponding search results.

## Features

- Perform Google Drive searches by providing a search query.
- Scrape and retrieve search results containing links to Google Drive files.

## Prerequisites

Before running the API, ensure that you have the following installed:

- Node.js (version X.X.X)
- NPM (Node Package Manager)

## Installation

1. Clone this repository to your local machine:

git clone https://github.com/MeetRajput00/GoogleDriveScraper.git

2. Navigate to the project directory:

cd GoogleDriveScraper

3. Install the dependencies:

npm install

4. npm start

The API will be running on `http://localhost:3000`.

## API Usage

### GET /search

Perform a Google Drive search.

- **Query Parameters**:
  - `q`: The search query.

- **Example**:

GET /?q=asur

- **Response**:

```json
{
  "results": [
    {
      "extractedString": "https://drive.google.com/file/d/1D1aF2chzoJTRwjjIbt8s0si2oBJLwceJ/view",
      "title":"Asur S01 E01-08 WebRip Hnidi 480p - mkvCinemas.zip"
    },
    // ...
  ]
}
