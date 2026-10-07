# WEB103 Project 3 - uniPulse

Submitted by: **Dinakar**

About this web app: **uniPulse is a virtual campus community space where students can explore different campus locations and discover events happening at each location. Users can also browse all events, filter events by location, view countdowns for upcoming events, and identify events that have already passed.**

Time spent: **3 hours**

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses React to display data from the API**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured Events table**
  - [x] **NOTE: The walkthrough includes a view of the Render dashboard demonstrating that the Postgres database is available**
  - [x] **NOTE: The walkthrough includes a demonstration of the table contents using `SELECT * FROM locations;` and `SELECT * FROM events;`**
- [x] **The web app displays a title**
- [x] **Website includes a visual interface that allows users to select a location they would like to view**
- [x] **Each location has a detail page with its own unique URL**
- [x] **Clicking on a location navigates to its corresponding detail page and displays a list of all events from the `events` table associated with that location**

The following **optional** features are implemented:

- [x] An additional page shows all possible events
- [x] Users can filter events by location
- [x] Events display a countdown showing the time remaining before that event
- [x] Events appear with different formatting when the event has passed

The following **additional** features are implemented:

- [x] Responsive layout for smaller screens
- [x] Location-specific event pages
- [x] Past events are visually faded and crossed out
- [x] Navigation between the campus, location pages, and all-events page


## Notes

One challenge was connecting the local Express server to the Render PostgreSQL database. The Render internal hostname only works inside Render's network, so I switched the local project to use the external PostgreSQL hostname.

Another challenge was connecting the React frontend to the Express API. I used the Vite proxy so the frontend could make requests using `/api` routes without needing an additional CORS dependency.

## License

Copyright 2026 Dinakar

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.