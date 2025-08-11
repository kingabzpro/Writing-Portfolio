---
layout: default
permalink: /
title: "Abid's Writing Portfolio"
description: "Explore expertly crafted blogs, tutorials, cheat sheets, projects, book reviews, and career resources in data and AI."
---

<link rel="stylesheet" href="assets/css/main.css">
<script src="assets/js/search.js" defer></script>

<div class="author-section">
  <img src="assets/images/author.jpg" alt="Abid's Profile Picture" class="author-image">
  
  <div class="author-bio">    <h1 class="author-title">Hello! I'm Abid</h1>
    <p class="author-description">
      I am a certified data science professional with a passion for developing innovative machine learning solutions. As a dedicated technical writer and educator, I have authored over 500 articles to make complex concepts more accessible and to promote practical understanding. If you appreciate my work, please feel free to <a href="pages/contact" class="highlight-link">contact me</a> or reach out on LinkedIn.
    </p>
  </div>
</div>

## 🆕 Latest Posts
<style>
  /* Compact latest list, scoped to this page */
  .latest-list { list-style: none; padding: 0; margin: 0 0 0.75rem 0; }
  .latest-list li { display: flex; align-items: center; gap: 10px; padding: 6px 8px; border-radius: 6px; }
  .latest-list li + li { margin-top: 4px; }
  .latest-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--secondary-color); flex: 0 0 6px; }
  .latest-link { color: var(--text-color); text-decoration: none; font-weight: 600; }
  .latest-link:hover { text-decoration: underline; color: var(--secondary-color); }
</style>
<div id="latestList"></div>
<script>
  fetch('/assets/data/latest.json')
    .then(r => r.json())
    .then(items => {
      const latest = Array.isArray(items) ? items.slice(0, 3) : [];
      const el = document.getElementById('latestList');
      if (!el) return;
      if (latest.length === 0) {
        el.innerHTML = '<p>No recent posts.</p>';
        return;
      }
      const list = latest.map(item => `
        <li>
          <span class="latest-dot"></span>
          <a class="latest-link" href="${item.url}">${item.title}</a>
        </li>
      `).join('');
      el.innerHTML = `<ul class="latest-list">${list}</ul>`;
    })
    .catch(err => console.error('Failed to load latest posts:', err));
</script>

<div class="search-container">
  <i class="fas fa-search search-icon"></i>
  <input type="text" id="searchInput" class="search-input" placeholder="Search articles...">
</div>
<div id="searchResults"></div>

## 👨‍🔬 Author Expertise 

<div id="expertiseGrid" class="content-grid"></div>

## 🎯 Popular Topics

<div id="topicsGrid" class="topics-grid"></div>


<script>
fetch('/assets/data/content.json')
  .then(response => response.json())
  .then(data => {
    // Populate expertise section
    const expertiseGrid = document.getElementById('expertiseGrid');
    data.expertise.forEach(item => {
      expertiseGrid.innerHTML += `
        <div class="content-card">
          <h3><i class="${item.icon}" style="color: var(--secondary-color);"></i> ${item.title}</h3>
          <p>${item.description}</p>
          <a href="${item.link}" style="color: var(--secondary-color);">Learn More →</a>
        </div>
      `;
    });

    // Populate topics section
    const topicsGrid = document.getElementById('topicsGrid');
    data.topics.forEach(topic => {
      topicsGrid.innerHTML += `
        <a href="${topic.link}" class="topic-link">
          <i class="${topic.icon}"></i> ${topic.title}
        </a>
      `;
    });
  })
  .catch(error => {
    console.error('Error loading content data:', error);
  });
</script>

## 📖 Miscellaneous

- 📚 **[Books Published by Abid](pages/books-by-abid)** - Check out my published books and ebooks
- 📝 **[Career Resources](pages/career-advice)** - Career guidance and interview preparation
- 📋 **[Cheat Sheets](pages/cheat-sheets)** - Quick reference guides for various technologies
- 📬 **[Contact Me](pages/contact)** - Get in touch with me for questions or collaborations

<div class="cta-section">
  <h2>Stay Updated!</h2>
  <p>Star ⭐ this <a href="https://github.com/kingabzpro/Writing-Portfolio">repository</a> to get notified about new content and updates.</p>
  
  <div id="socialLinks" class="social-links"></div>
</div>

<script>
fetch('/assets/data/content.json')
  .then(response =[0m response.json())
  .then(data => {
    // Populate social links
    const socialLinks = document.getElementById('socialLinks');
    data.social.forEach(link => {
      socialLinks.innerHTML += `
        <a href="${link.url}"><i class="${link.icon}"></i></a>
      `;
    });
  })
  .catch(error => {
    console.error('Error loading social links:', error);
  });

</script>
