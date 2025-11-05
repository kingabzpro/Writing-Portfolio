# Use the official Jekyll image
FROM jekyll/jekyll:latest

# Set working directory
WORKDIR /srv/jekyll

# Copy Gemfile and Gemfile.lock if they exist, or create a basic Gemfile
COPY _config.yml ./

# Install the required Jekyll theme and any additional dependencies
RUN gem install jekyll-theme-architect jekyll-seo-tag jekyll-sitemap webrick

# Copy the current directory contents into the container at /srv/jekyll
COPY . .

# Expose port 4000 for the Jekyll development server
EXPOSE 4000

# Command to run Jekyll in development mode with live reload
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--port", "4000", "--livereload"]