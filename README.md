<p align="center">
  <a href="https://looptube.vercel.app/">
    <img alt="LoopTube" src="https://github.com/iamsainikhil/looptube/raw/main/public/logo.png" width="300" />
  </a>
</p>
<h1 align="center">
  LoopTube
</h1>

<p align="center">
<a href="https://github.com/iamsainikhil/looptube/blob/master/LICENSE" target="_blank" rel="noreferrer noopener">
<img alt="GitHub" src="https://img.shields.io/github/license/iamsainikhil/nextjs-prismic-blog-starter?style=flat-square">
</a>
<a href="http://commitizen.github.io/cz-cli/" target="_blank" rel="noreferrer noopener">
<img alt="Commitizen friendly" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg">
</a>
</p>

LoopTube is a web application which allows user to search for YouTube videos or paste any YouTube video link. This app also features a media player that allows the user to trim and loop any portion of a YouTube video with ability to save the video(s) to a playlist.

# 👀 **Demo**

[https://looptube.vercel.app/](https://looptube.vercel.app/)

# 🎉 **Features**

LoopTube provides multiple features like:

- **Search**: Search for YouTube videos by entering the keyword or pasting the entire youtube video link or just pasting the video id.
- **Video**: Trim and loop a YouTube video with ability to share the URL as well as adding to playlist(s).
- **Playlist**: View videos added to a playlist all at one place. Ability to save, share, and delete a playlist. Option to individually remove a video from the playlist.

# 🗍 **Pages**

## Search

- Search with Typing Something to find the relevant YouTube videos.

![Type Something](https://github.com/iamsainikhil/looptube/README/Search_Type_Something_Demo.gif)

[**Watch video**](https://fluvid.com/videos/detail/698A4IAOD7Fe5wdKG)

- Search with pasted YouTube Video Link to find the relevant YouTube videos.

![YouTube Video Link](https://github.com/iamsainikhil/looptube/README/Search_Paste_YouTube_Video_Link_Demo.gif)

[**Watch video**](https://fluvid.com/videos/detail/PgDo-uRn7Bsgj9XMx)

- Search with pasted YouTube Video ID to find the relevant YouTube videos.

![YouTube Video ID](https://github.com/iamsainikhil/looptube/README/Search_YouTube_Video_ID_Demo.gif)

[**Watch video**](https://fluvid.com/videos/detail/ZOmq-ID1wGI9PYq6k)

## Video

- Watch the video in a YouTube media player with the ability to trim the video, share the URL, and save to playlist(s).

![Video page](https://github.com/iamsainikhil/looptube/README/Video_Demo.gif)

[**Watch video**](https://fluvid.com/videos/detail/wz_2XCokyjcn2YLG5)

## Playlists

- After adding the videos (trimmed or original) to playlist(s). You can see all the playlists at once in a single dashboard.

> Playlists are saved in user's browser localStorage

![Playlists page](https://github.com/iamsainikhil/looptube/README/Playlists_Demo.gif)

[**watch video**](https://fluvid.com/videos/detail/R68rdCaV2DFMAy3MR)

## Playlist

- Watch all the videos added to a local playlist or from a shared playlist.

> Shared playlists can also be saved locally. Moreover, user will be given the option to merge the videos if there is a playlist that exist locally with the same name of a shared playlist.

![Playlist page](https://github.com/iamsainikhil/looptube/README/Playlist_Demo.gif)

[**watch video**](https://fluvid.com/videos/detail/y7X9zT37A_UYKgrAD)

## Themes

- LoopTube offers user the option to switch between `light` and `dark` theme. By default, theme is set using the user's system preferences.

![Themes Demo](https://github.com/iamsainikhil/looptube/README/Themes_Demo.gif)

[**watch video**](https://fluvid.com/videos/detail/7x8vGhXOKYidj71nE)

# 💻 Quick start

1. **Clone the repository**

```bash
git clone https://github.com/iamsainikhil/looptube.git
```

2. **Install the packages**

   Install the packages using the command `npm install`

3. **Environment File**

Create an `.env` file in the root directory of the project. Add the following properties in it:

```json
YOUTUBE_API_V3=<your YouTube API key> (Required)

NEXT_PUBLIC_GA_ID=<your Google Analytics tracking ID> (Optional)

NEXT_PUBLIC_SITE_URL=<URL of the deployed app> (Optional)

NEXT_PUBLIC_HOTJAR_ID=<your project Hotjar tracking ID> (Optional)

NEXT_PUBLIC_HOTJAR_VERSION=<your project Hotjar tracking code version> (Optional)
```

4. **Start developing.**

   Navigate into your new site’s directory and start it up.

   ```bash
   # Go to project directory
   cd <project-name>

   # start the application
   npm run dev
   ```

5. **Open the source code and start editing!**

   Your site is now running at `http://localhost:3000`!

   Open the `<project-name>` directory in your code editor of choice and edit the contents. Save your changes and the browser will update in real time!

# ⚙️ Available Scripts

---

In the project directory, you can run:

`npm run dev`

Runs the app in the development mode.Open `[http://localhost:3000](http://localhost:3000/)` to view it in the browser. The page will reload if you make edits. You will also see any lint or nextjs develop errors in the console.

`npm run start`

Runs the app in the production mode.Open `[http://localhost:3000](http://localhost:3000/)` to view it in the browser. The page will reload if you make edits. You will also see any lint or nextjs develop errors in the console.

`npm run build`

Builds the app for production to the `build` folder.It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes. Your app is ready to be deployed!

See the section about **[deployment](https://nextjs.org/docs/deployment)** for more information.

`npm format`

Formats the app files like _js, jsx, json, and md_ using Prettier. You can learn more about the format **[here](https://prettier.io/docs/en/install.html)**.

# **🙌 Contribution**

- Open pull request with improvements.
- If you have any new idea, check the **[feature request](https://github.com/iamsainikhil/looptube/raw/master/README_images/.github/ISSUE_TEMPLATE/feature_request.md)** template to create a request.
- If you found any issue or a bug, check the **[bug report](https://github.com/iamsainikhil/looptube/raw/master/README_images/.github/ISSUE_TEMPLATE/bug_report.md)** template to create a report.

# **📃 License**

Have a look at the **[license file](https://github.com/iamsainikhil/looptube/raw/master/README_images/LICENSE)** for details

# **📧 Contact**

Whether you’d like to discuss about this starter template or simply say “hello”, I’d love to hear from you.

Email: **[contact@iamsainikhil.com](mailto:contact@iamsainikhil.com)**

# **🎓 Learning NextJS**

Looking for more guidance? Full documentation for NextJS lives [on the website](https://nextjs.org/docs/getting-started). Here are some places to start:

- **For most developers, I recommend starting with the [in-depth tutorial for creating a site with NextJS](https://nextjs.org/learn/basics/create-nextjs-app).** It starts with zero assumptions about your level of ability and walks through every step of the process.
- **To dive straight into code samples, head [to the documentation](https://nextjs.org/docs/getting-started).** In particular, check out the *Basic Features*, *API Reference*, and *Advanced Features* sections in the sidebar.
