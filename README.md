# ZUZUStay - Smart PG & Rental Property Management

A premium, responsive, minimalist "Coming Soon" landing page for **ZUZUStay** (Smart PG & Rental Property Management platform). Built using pure semantic HTML, vanilla CSS (HSL design variables, glassmorphism, responsive grid flex layouts), and vanilla JS. Configured for quick local development and deployment via Firebase Hosting.

## Project Structure

```text
zuzustay-website/
├── firebase.json              # Firebase Hosting configuration
├── .firebaserc                # Firebase target default project
├── README.md                  # Development guide
│
└── public/                    # Production-ready static site files
    ├── index.html             # Premium coming soon landing page
    ├── 404.html               # Customized 404 error page
    ├── privacy-policy.html    # Branded privacy document
    ├── Terms-of-Service.html # Branded terms & rules document
    ├── robots.txt             # Search engine crawling rules
    ├── sitemap.xml            # Crawler sitemap indices
    ├── manifest.json          # PWA metadata configuration
    │
    └── assets/
        ├── css/
        │   └── style.css      # Space-dark and sky-blue design system
        ├── js/
        │   └── main.js        # Dynamic interactive hooks
        ├── images/
        │   ├── logo.png       # ZUZUStay logo
        │   ├── bg.png         # Linked Visual fallback
        │   └── favicon.png    # App icon badge
        └── fonts/             # Font storage directory
```

## Features

- **Space-Dark Design**: Custom dark backdrop gradients blended with sky-blue (`#00a8ff`) highlights and details.
- **Glassmorphism**: Left-middle glass card showcasing the platform capabilities.
- **Responsive**: Full responsive fluid layout for desktop, tablets, and mobile screens.
- **PWA Configuration**: Ready-to-go `manifest.json` settings.
- **SEO optimized**: Canonical references, meta descriptors, schema definitions, robots mapping.

## Serving Locally

### Option A: Python HTTP Server (Built-in)
Run the following in the project root:
```bash
python3 -m http.server 8000 --directory public
```
Then visit: `http://localhost:8000`

### Option B: Node.js Serve
Install and run `serve`:
```bash
npx serve public
```

## Deployment to Firebase

Deploy directly using Firebase Hosting:
```bash
npx firebase login
npx firebase deploy --only hosting
```
