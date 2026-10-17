name: Deploy Academic Website to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

# Permissions required to publish to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      # Optional: Compile Typst CV using official typst-community action
      # - name: Setup Typst
      #   uses: typst-community/setup-typst@v3
      # - name: Compile Typst CV
      #   run: |
      #     mkdir -p public
      #     typst compile cv.typ public/Filip_Rehburg_CV.pdf

      - name: Build site
        run: npm run build

      - name: Setup GitHub Pages
        uses: actions/configure-pages@v5

      - name: Upload Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
