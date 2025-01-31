<div class="author-section" style="text-align: center; padding: 2rem; background: var(--sidebar-bg); border-radius: 15px; margin-bottom: 2rem;">
  <img src="assets/images/author.jpg" alt="Abid's Profile Picture" class="author-image" style="width: 200px; height: 200px; object-fit: cover; border-radius: 50%; margin: 20px auto; display: block; border: 5px solid var(--secondary-color); box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
  
  <div class="author-bio" style="max-width: 800px; margin: 0 auto; line-height: 1.6;">
    <h1 style="color: var(--primary-color);">Hello! I'm Abid</h1>
    <p style="font-size: 1.1em; margin: 1rem 0;">
      A dedicated technical writer and educator with a passion for making complex concepts accessible to everyone. With a strong background in data science and programming, I've authored over 450 articles that bridge the gap between technical complexity and practical understanding.
    </p>
    <p style="font-size: 1.1em;">
      My mission is to empower learners worldwide by breaking down complex technical concepts into digestible, engaging content. Whether you're a beginner taking your first steps in programming or an experienced developer looking to expand your knowledge, you'll find valuable resources here.
    </p>
  </div>
</div>

<input type="text" id="searchInput" placeholder="Search articles..." style="
    width: 100%;
    padding: 12px;
    margin: 20px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
">

<div id="searchResults" style="margin-top: 15px;"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    fetch('/Writing-Portfolio/search.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load search data');
            }
            return response.json();
        })
        .then(pages => {
            searchInput.addEventListener('input', function() {
                const query = this.value.toLowerCase();
                searchResults.innerHTML = '';

                if (query.length < 2) return;

                const results = pages.filter(page => {
                    return page.title.toLowerCase().includes(query) || 
                           page.content.toLowerCase().includes(query);
                });

                if (results.length > 0) {
                    results.forEach(page => {
                        searchResults.innerHTML += `
                            <div style="margin-bottom: 15px; padding: 10px; border-bottom: 1px solid #eee;">
                                <a href="${page.url}" style="font-size: 18px; color: #0366d6; text-decoration: none;">
                                    ${page.title}
                                </a>
                                <div style="color: #666; margin-top: 5px; font-size: 14px;">
                                    ${page.content.substring(0, 150)}...
                                </div>
                            </div>
                        `;
                    });
                } else {
                    searchResults.innerHTML = '<p style="color: #666;">No results found</p>';
                }
            });
        })
        .catch(error => {
            console.error('Error loading search data:', error);
            searchResults.innerHTML = '<p style="color: #dc3545;">Error loading search data. Please try again later.</p>';
        });
});
</script>

## 👽 Author Expertise 

<div class="content-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
  <div class="content-card" style="background: var(--sidebar-bg); padding: 1.5rem; border-radius: 10px; transition: transform 0.3s ease;">
    <h3><i class="fas fa-cogs" style="color: var(--secondary-color);"></i> MLOps</h3>
    <p>Comprehensive guides on Machine Learning Operations, deployment, and scaling ML systems.</p>
    <a href="pages/machine-learning-operations" style="color: var(--secondary-color);">Learn More →</a>
  </div>

  <div class="content-card" style="background: var(--sidebar-bg); padding: 1.5rem; border-radius: 10px; transition: transform 0.3s ease;">
    <h3><i class="fas fa-brain" style="color: var(--secondary-color);"></i> Large Language Models</h3>
    <p>Deep dives into LLMs, transformers, and state-of-the-art NLP applications.</p>
    <a href="pages/large-language-models" style="color: var(--secondary-color);">Learn More →</a>
  </div>

  <div class="content-card" style="background: var(--sidebar-bg); padding: 1.5rem; border-radius: 10px; transition: transform 0.3s ease;">
    <h3><i class="fas fa-robot" style="color: var(--secondary-color);"></i> Machine Learning</h3>
    <p>In-depth tutorials on ML algorithms, deep learning, and practical implementations.</p>
    <a href="pages/machine-learning" style="color: var(--secondary-color);">Learn More →</a>
  </div>
</div>

## 🎯 Popular Topics

<div class="topics-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 2rem 0;">
  <a href="pages/artificial-intelligence" class="topic-link">
    <i class="fas fa-microchip"></i> Artificial Intelligence
  </a>
  <a href="pages/data-science" class="topic-link">
    <i class="fas fa-chart-bar"></i> Data Science
  </a>
  <a href="pages/natural-language-processing" class="topic-link">
    <i class="fas fa-language"></i> Natural Language Processing
  </a>
  <a href="pages/computer-vision" class="topic-link">
    <i class="fas fa-eye"></i> Computer Vision
  </a>
  <a href="pages/data-engineering" class="topic-link">
    <i class="fas fa-server"></i> Data Engineering
  </a>
  <a href="pages/programming" class="topic-link">
    <i class="fas fa-code"></i> Programming
  </a>
  <a href="pages/sql" class="topic-link">
    <i class="fas fa-database"></i> SQL
  </a>
</div>

## 📖 Latest Resources


- 📚 **[Books Published by Abid](pages/books-by-abid)** - Check out my published books and ebooks
- 📝 **[Career Resources](pages/career-advice)** - Career guidance and interview preparation
- 📋 **[Cheat Sheets](pages/cheat-sheets)** - Quick reference guides for various technologies

<div class="cta-section" style="text-align: center; margin: 3rem 0; padding: 2rem; background: var(--sidebar-bg); border-radius: 15px;">
  <h2>Stay Updated!</h2>
  <p>Star ⭐ this repository to get notified about new content and updates.</p>
  
  <div class="social-links" style="display: flex; justify-content: center; gap: 2rem; margin-top: 1.5rem;">
    <a href="https://github.com/kingabzpro" style="font-size: 2rem; color: var(--text-color);"><i class="fab fa-github"></i></a>
    <a href="https://linkedin.com/in/1abidaliawan" style="font-size: 2rem; color: var(--text-color);"><i class="fab fa-linkedin"></i></a>
    <a href="https://twitter.com/1abidaliawan" style="font-size: 2rem; color: var(--text-color);"><i class="fab fa-twitter"></i></a>
  </div>
</div>

<style>
.content-card:hover {
  transform: translateY(-5px);
}

.topics-grid a {
  display: block;
  padding: 0.5rem;
  background: var(--sidebar-bg);
  border-radius: 5px;
  text-decoration: none;
  color: var(--text-color);
  transition: all 0.3s ease;
}

.topics-grid a:hover {
  background: var(--secondary-color);
  color: var(--bg-color);
  transform: translateX(5px);
}

.social-links a:hover {
  color: var(--secondary-color);
  transform: scale(1.1);
}
</style>