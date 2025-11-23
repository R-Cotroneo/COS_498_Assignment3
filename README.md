# Music Theory & Production Hub (COS_498_Assignment3)

A simple Dockerized Node.js + Nginx application providing a hub for music theory, production fundamentals, and curated PDF learning resources. Includes an admin interface for managing PDF entries.

## Quick Start

Prerequisites:
- Docker and Docker Compose installed

From the project root:

```bash
docker compose build
docker compose up
```

Then open: a3.raistcotroneo.com

To stop containers:

```bash
docker compose down
```

## Services
- `a3-backend`: Express app (internal port `785`, not exposed directly)
- `a3-nginx`: Reverse proxy / static asset server (exposes `8080`)

## Core Pages
- `/` (Home): Overview sections on Music Theory, Production Fundamentals, Rock History, and a call-to-action linking to PDF resources.
- `/pdfFiles`: Lists all available PDF learning resources with name, description, and a button to view each PDF in a new tab.
  - Individual PDF access: `/pdfFiles/<filename.pdf>`
  - Test error handling link for a non-existent PDF is included on the page.
- `/admin`: Administrative interface (basic styling) for managing PDF entries.
  - Add PDF: `POST /admin/uploadPdf` (requires name, path matching a file in `documents/`, and description)
  - Delete PDF: `POST /admin/deletePdf` (by resource ID)
  - Update PDF: `POST /admin/updatePdf` (modify name/description of an existing PDF)
  - View all PDFs: `GET /admin/getAllPdfs` (renders current list with IDs, names, paths, descriptions)

## File Locations
- Backend code: `be/`
- Nginx config & static assets: `fe/`
- Handlebars views: `be/views/`
- PDF document storage: `be/documents/` (ensure referenced files exist here)

## Stopping & Cleaning Up
```bash
docker compose down --remove-orphans
```
Remove images if desired:
```bash
docker image prune -f
```

## Troubleshooting
- Blank page or 502: Ensure both containers are running (`docker ps`).
- Missing PDFs: Verify filenames exist in `be/documents/` and paths entered on the admin page match exactly.
- Styles not loading: Nginx serves `/static/style.css`; confirm `fe/public/style.css` and Nginx build succeeded.
