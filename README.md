# Biztek Custom Carpentry website

A static site (plain HTML, CSS and JavaScript, no build step). Open `index.html` in a browser, or upload the whole folder to any web host (Netlify, Cloudflare Pages, GitHub Pages, or regular cPanel hosting).

## Before launch

1. **Add real projects.** Edit `js/projects.js`. The eight projects in there are *examples* to show the layout. Replace them with completed jobs and remove `sample: true` so the "Example" tag disappears.
2. **Add photos.** Put them in `images/projects/<project-id>/` using the file names listed in `js/projects.js` (e.g. `wide.jpg`, `joinery.jpg`, `before.jpg`, `after.jpg`). Any missing photo shows a wood-grain placeholder, so you can add them gradually. JPGs about 2000px wide and under 500 KB each work well.
3. **Activate the quote form.** Requests are sent silently in the background (no email app or pop-ups for the visitor) through [FormSubmit](https://formsubmit.co) to `anthony@biztekcarpentry.com`. Once the site is live, submit one test request. FormSubmit then emails that inbox a one-time confirmation link. Click it, and every request after that arrives by email with the photos attached. To use another service instead (e.g. Formspree), set `FORM_ENDPOINT` in `js/main.js`.
4. **Add reviews.** Paste real, verified reviews (e.g. from Google) into `REVIEWS` in `js/projects.js`. The Reviews section stays hidden until at least one is added.
5. **Check the domain.** `index.html` assumes `https://biztekcarpentry.com/` in the canonical and social tags. Update it if the domain is different.

## Files

```
index.html          Page content and structure
images/logo.png     Logo (also favicon.png, apple-touch-icon.png)
css/styles.css      All styling
js/projects.js      Portfolio projects and reviews (edit this most)
js/main.js          Portfolio, lightbox, before/after slider, quote form
images/             Favicon and project photos
```
