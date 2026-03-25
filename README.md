# New Till / Tablet Checklist

Interactive Windows 10/11 setup checklist for new tills and tablets. This project turns an internal documentation flow into a cleaner operational tool with device-aware paths, progress tracking, and printable handover output.

## Live Demo

https://irons28.github.io/new-till-tablet-checklist/

## Why This Project Exists

The original process lived in a Confluence guide and checklist. This version reframes that content as a lightweight web app that is easier to follow, easier to validate, and stronger as a portfolio case study.

## Features

- Till and tablet workflows from one interface
- Sidebar section navigation with saved progress
- Expandable step instructions
- Setup metadata for store, device name, engineer, and date
- Handover summary with notes, print, and copy actions
- Lightweight static deployment via GitHub Pages
- Mock illustration assets that can be swapped for real screenshots later

## Tech

- HTML
- CSS
- Vanilla JavaScript
- localStorage for persistence
- GitHub Pages for hosting

## Running Locally

Because this is a static project, you can open `index.html` directly in a browser or serve the folder with any simple local server.

## Project Structure

- `index.html` - app shell and templates
- `styles.css` - layout and visual design
- `app.js` - interaction logic and persistence
- `data/checklist.js` - checklist data model
- `assets/illustrations/` - mock visuals for each section

## Future Improvements

- Replace mock visuals with real captured screenshots
- Export handover summaries to PDF or CSV
- Add per-step issue logging
- Add team or multi-user tracking
- Add a simple admin/reporting layer

## Screenshots

The current build uses lightweight mock illustration assets in place of live Windows screenshots. That keeps the UI polished while leaving room to add real operational screenshots later.
