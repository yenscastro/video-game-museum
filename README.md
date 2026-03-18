# WEB103 Project 3 - Video Game of the Year Museum

Submitted by: **Yens Castro**

About this web app: **An interactive museum that displays Game of the Year winners from The Game Awards. Users can browse different eras (2010s, 2020s, Classics, All Time Greats) and hover over years on a billboard to reveal the winning game, complete with images, developer info, and genre.**

Time spent: **15** hours

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses React to display data from the API**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured Events table**
  - [x]  **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [x]  **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**
- [x] **The web app displays a title.**
- [x] **Website includes a visual interface that allows users to select a location they would like to view.**
- [x] **Each location has a detail page with its own unique URL.**
- [x] **Clicking on a location navigates to its corresponding detail page and displays list of all events from the `events` table associated with that location.**


The following **additional** features are implemented:

- [x] **Interactive billboard with hover effects** - Hover over years to reveal game details
- [x] **Game images** - Each game has its own image displayed on hover
- [x] **Timeline view** - Complete chronological list of all games in each gallery
- [x] **Glass-morphism UI** - Semi-transparent cards with backdrop blur effects
- [x] **Responsive design** - Works on mobile, tablet, and desktop
- [x] **Custom loading spinner** - Animated spinner while data loads

## Video Walkthrough

https://youtu.be/h0xd-CIF-mI

**Render Database View:**
<img width="1908" height="743" alt="image" src="https://github.com/user-attachments/assets/345bb8b1-67a5-4362-ab6d-f046f8ef9c18" />


**Database Table Contents:**
<img width="1359" height="884" alt="image" src="https://github.com/user-attachments/assets/97194023-e3d1-462d-bc27-11cab923cdc0" />


## Notes

**Challenges encountered:**
- **Database connection issues**: Had to configure SSL properly for Render's PostgreSQL
- **Environment variables**: Ensuring .env files were loaded correctly in both development and production
- **CSS conflicts**: The original template had conflicting styles that caused the billboard to not display properly
- **Hover state bugs**: Initially, the hover state was passing event objects instead of year values, causing the billboard not to update
- **Image paths**: Setting up local image storage and ensuring correct paths in the database

**Solutions implemented:**
- Used proper SSL configuration with `rejectUnauthorized: false`
- Created separate .env files and ensured they were loaded with dotenv
- Completely rewrote the CSS with transparent backgrounds and glass-morphism effects
- Fixed hover handlers to pass the year value directly instead of event objects
- Organized images in public folder with proper folder structure

## License

Copyright [2026] [Yens Castro]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
