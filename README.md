# MDL Frontend

A cleaned-up, maintainable static frontend for the MDL platform. The project uses a simple shared design system, reusable layout patterns, and consistent page structure across the public pages.

## Structure

- `index.html` - primary home page
- `pages/about.html` - about page
- `pages/contact.html` - contact page
- `pages/resources.html` - resource library page
- `pages/auth/` - login, signup, and password reset
- `pages/fields/` - field detail pages
- `admin/dashboard.html` - admin dashboard
- `src/styles/` - design tokens and shared CSS
- `src/scripts/main.js` - shared client-side rendering for fields and resources

## Notes

- Community pages were left untouched as requested.
- The project keeps the same MDL dark visual palette while standardizing typography, spacing, and shared components.
- Navigation and page links were normalized to point to valid pages.
