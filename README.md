# Mariana Soares Mateus - Portfolio

Professional game-development portfolio built with Jekyll and the Chirpy theme infrastructure.

## Content structure

- `_data/projects.yml` contains project cards, facts, contributions, technologies, challenges and media entries.
- `_data/portfolio.yml` contains profile, About Me, specialties, skills, resume, education, highlights and contact links.
- `_layouts/portfolio.html` renders the single-page experience and reusable project dialogs.
- `assets/css/portfolio.css` and `assets/js/portfolio.js` provide the visual system and interactions.

## Add a project

Add another entry to `_data/projects.yml`. Use a unique `slug`, one of the filters `Games`, `Apps` or `Others`, and the fields that apply. Empty optional fields are omitted automatically.

Project media belongs under `assets/media/projects/<project-slug>/`. Covers belong under `assets/img/portfolio/projects/`. Set `cover` on the project for a card image. Media entries support `image`, `video` and `placeholder`; videos are loaded only when the project dialog opens.

## Local development

Install Ruby and Bundler, then run:

```console
bundle install
bundle exec jekyll serve
```

The GitHub Pages workflow builds the production site and runs HTMLProofer.
