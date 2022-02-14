<p align="center">
  <a href="https://trimtube.vercel.app/">
    <img alt="TrimTube" src="https://raw.githubusercontent.com/iamsainikhil/trimtube/main/public/logo.png" width="200" />
  </a>
</p>
<h1 align="center">
  TrimTube
</h1>

<p align="center">
<a href="https://github.com/iamsainikhil/trimtube/blob/main/LICENSE" target="_blank" rel="noreferrer noopener">
<img alt="GitHub" src="https://img.shields.io/github/license/iamsainikhil/nextjs-prismic-blog-starter?style=flat-square">
</a>
<a href="http://commitizen.github.io/cz-cli/" target="_blank" rel="noreferrer noopener">
<img alt="Commitizen friendly" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg">
</a>
</p>

TrimTube is a web application which allows user to fetch video or a playlist using a YouTube video or playlist link. This app also features a media player that allows the user to trim and loop any portion of a YouTube video with ability to save the video(s) to a playlist(s).

# 👀 **Demo**

[https://trimtube.vercel.app/](https://trimtube.vercel.app/)

# 🎉 **Features**

TrimTube provides multiple features like:

- **Search**: Search for a YouTube video or playlist by pasting the entire youtube video or playlist link or just the ID.
- **Video**: Trim and loop a YouTube video with ability to share the URL as well as adding to playlist(s).
- **Playlist**: View videos added to a playlist all at one place. Ability to save, share, and delete a playlist. Option to individually remove a video from the playlist.
- **Sync**: Ability to sync a playlist with that of the YouTube playlist if the playlist was created locally in the app using the Search with playlist feature.
- **Sort**: Sort a playlist created in the app based on the `title` or `publishedDate` of the videos.
- **Repeat**: Repeat a single video or the entire playlist or just play through all the videos in the playlist once.

# 🧐 **How to use TrimTube?**

## Search Video

<p>
    There are multiple ways to search a video in the app.
    <ul>
        <li>
        Search with pasted <code>YouTube Video URL</code> or a
        <code>YouTube Video ID</code> to find the relevant YouTube
        video(s).
        </li>
        <li>
        Visit <code>https://trimtube.vercel.app/video?v=ID</code> page replacing <code>ID</code> with <code>YouTube Video ID</code> 
        to find the relevant YouTube video(s).
        ex - <code>https://trimtube.vercel.app/video?v=a6Ur326zJtM</code>
        </li>
    </ul>
 </p>

[Watch Demo - Search Video](https://vimeo.com/676948611)

## Trim Video

<p>
    Click on <code>Trim Video</code> button on <code>Video</code> page and use the trim controls to input the <code>Start</code> and <code>End</code> times in <code>Minutes</code> and <code>Seconds</code> to <code>Trim</code> the video which will loop the video between this interval indefinitely.
</p>

[Watch Demo - Trim Video](https://vimeo.com/676948653)

## Create Playlist

<p>
    There are multiple ways to create a playlist in the app.
    <ul>
      <li>
      <p>
      Search with pasted <code>YouTube Playlist URL</code> or a
      <code>YouTube Playlist ID</code> to find the relevant YouTube
      video(s).
      </p>
      <p>
      Create a playlist in the app using the <code>Create Playlist</code> button with an ability to edit the name of the created playlist later.
      </p>
      </li>
      <li>
        On <code>Video</code> page, create a playlist in the modal when saving a video to a playlist.
      </li>
    </ul>
  </p>

[Watch Demo - Create Playlist](https://vimeo.com/676948508)

## Playlist Controls

<p>
        <ul>
          <li>
            <strong>Repeat</strong> a video or the playlist.
          </li>
          <li>
            <strong>Shuffle</strong> the playlist
          </li>
          <li>
            <strong>Sort</strong> the playlist based on the <code>Title</code> or <code>Date</code>.
          </li>
          <li>
            <strong>Fetch</strong> the remote YouTube playlist and merge any new videos with the local playlist.
            <blockquote>Note: this option is available only on the playlists that were created using the YouTube playlist URL or ID</blockquote>
          </li>
        </ul>
      </p>

[Watch Demo - Playlist Controls](https://vimeo.com/676948539)

## Share

<p>
  Share a trimmed <code>Video</code> or a created <code>Playlist</code>
  in the app on multiple platforms like
  <code>Facebook</code>, <code>Twitter</code>, <code>LinkedIn</code> and
  <code>WhatsApp</code>.
</p>
<p style="text-align: center">OR</p>
<p>
  You can simply <code>Copy</code> the URL to share on other platforms
  as well.
</p>

[Watch Demo - Share](https://vimeo.com/676948628)

# 💻 Quick start

1. **Clone the repository**

   ```bash
   git clone https://github.com/iamsainikhil/trimtube.git
   ```

2. **Install the packages**

   Install the packages using the command `npm install`

3. **Environment File**

   Create an `.env` file in the root directory of the project. Add the following properties in it:

   ```sh
   YOUTUBE_API_V3=<your YouTube API key> (Required)

   NEXT_PUBLIC_GA_ID=<your Google Analytics tracking ID> (Optional)

   NEXT_PUBLIC_SITE_URL=<URL of the deployed app> (Optional)

   NEXT_PUBLIC_HOTJAR_ID=<your project Hotjar tracking ID> (Optional)

   NEXT_PUBLIC_HOTJAR_VERSION=<your project Hotjar tracking code version> (Optional)
   ```

4. **Start developing.**

   Navigate into your new site’s directory and start it up.

   ```sh
   # Go to project directory
   cd <project-name>

   # start the application
   npm run dev
   ```

5. **Open the source code and start editing!**

   Your site is now running at `http://localhost:3000`!

   Open the `<project-name>` directory in your code editor of choice and edit the contents. Save your changes and the browser will update in real time!

# ⚙️ Available Scripts

---

In the project directory, you can run:

- `npm run dev`

  Runs the app in the development mode.Open `[http://localhost:3000](http://localhost:3000/)` to view it in the browser. The page will reload if you make edits. You will also see any lint or nextjs develop errors in the console.

- `npm run start`

  Runs the app in the production mode.Open `[http://localhost:3000](http://localhost:3000/)` to view it in the browser. The page will reload if you make edits. You will also see any lint or nextjs develop errors in the console.

- `npm run build`

  Builds the app for production to the `build` folder.It correctly bundles React in production mode and optimizes the build for the best performance.

  The build is minified and the filenames include the hashes. Your app is ready to be deployed!

  See the section about **[deployment](https://nextjs.org/docs/deployment)** for more information.

- `npm format`

  Formats the app files like _js, jsx, json, and md_ using Prettier. You can learn more about the format **[here](https://prettier.io/docs/en/install.html)**.

> Note: `pwa-asset-generator` tool is used to generate the below PWA assets. You can learn more about this tool **[here](https://github.com/onderceylan/pwa-asset-generator#features)**.

- `npx pwa-asset-generator ./public/logo.png ./public --icon-only --favicon --opaque false --maskable false --type png`

  Generates favicons and place them in the `public` directory.

- `npx pwa-asset-generator ./public/logo.png ./public/light --splash-only --background lightgray --type jpeg --quality 80`

  Generates splash images needed for apple devices with a light background and place them in the `public/light` directory.

- `npx pwa-asset-generator ./public/logo.png ./public/dark --splash-only --background 'rgba(51,51,51, 1)' --type jpeg --quality 80`

  Generates splash images needed for apple devices with a dark background and place them in the `public/dark` directory.

# **🙌 Contribution**

- Open pull request with improvements.
- If you have any new idea, check the **[feature request](https://raw.githubusercontent.com/iamsainikhil/trimtube/main/blob/main/.github/ISSUE_TEMPLATE/feature_request.md)** template to create a request.
- If you found any issue or a bug, check the **[bug report](https://raw.githubusercontent.com/iamsainikhil/trimtube/main/blob/main/.github/ISSUE_TEMPLATE/bug_report.md)** template to create a report.

# **📃 License**

Have a look at the **[license file](https://raw.githubusercontent.com/iamsainikhil/trimtube/main/raw/master/README_images/LICENSE)** for details

# **📧 Contact**

Whether you’d like to discuss about this application or simply say “hello”, I’d love to hear from you.

Email: **[contact@iamsainikhil.com](mailto:contact@iamsainikhil.com)**
