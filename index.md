---
layout: default
permalink: /
title: "Abid's Writing Portfolio"
description: "Explore expertly crafted blogs, tutorials, cheat sheets, projects, book reviews, and career resources in data and AI."
---
<script src="{{ 'assets/js/search.js' | relative_url }}" defer></script>

<div class="author-section">
  <img src="assets/images/author.jpg" alt="Abid's Profile Picture" class="author-image">
  
  <div class="author-bio">
    <h1 class="author-title">Hello! I'm Abid</h1>
    <p class="author-description">
      I am a certified data science professional with a passion for developing innovative machine learning solutions. As a dedicated technical writer and educator, I have authored over 500 articles to make complex concepts more accessible and to promote practical understanding. If you appreciate my work, please feel free to <a href="{{ 'pages/contact' | relative_url }}" class="highlight-link">contact me</a> or reach out on LinkedIn.
    </p>
  </div>
</div>

## 🆕 Latest Posts
{% assign latest_items = site.data.latest | default: [] %}
<div id="latestList">
  {% if latest_items and latest_items.size > 0 %}
  <ul class="latest-list">
    {% for item in latest_items limit:3 %}
    <li>
      <span class="latest-dot"></span>
      <a class="latest-link" href="{{ item.url }}">{{ item.title }}</a>
      {% if item.date %}
      <span class="latest-date">{{ item.date | date: "%b %d, %Y" }}</span>
      {% endif %}
    </li>
    {% endfor %}
  </ul>
  {% else %}
  <p>No recent posts.</p>
  {% endif %}
</div>

<div class="search-container">
  <i class="fas fa-search search-icon"></i>
  <input type="text" id="searchInput" class="search-input" placeholder="Search articles...">
</div>
<div id="searchResults" aria-live="polite"></div>

## 👨‍🔬 Author Expertise 

{% assign portfolio_content = site.data.content | default: {} %}
{% assign expertise_items = portfolio_content.expertise | default: [] %}
<div id="expertiseGrid" class="content-grid">
  {% for item in expertise_items %}
  <div class="content-card">
    <h3><i class="{{ item.icon }}" style="color: var(--secondary-color);"></i> {{ item.title }}</h3>
    <p>{{ item.description }}</p>
    <a href="{{ item.link | relative_url }}" style="color: var(--secondary-color);">Learn More →</a>
  </div>
  {% endfor %}
</div>

## 🎯 Popular Topics

{% assign topic_items = portfolio_content.topics | default: [] %}
<div id="topicsGrid" class="topics-grid">
  {% for topic in topic_items %}
  <a href="{{ topic.link | relative_url }}" class="topic-link">
    <i class="{{ topic.icon }}"></i> {{ topic.title }}
  </a>
  {% endfor %}
</div>

## 📖 Miscellaneous

- 📚 **[Books Published by Abid]({{ 'pages/books-by-abid' | relative_url }})** - Check out my published books and ebooks
- 📝 **[Career Resources]({{ 'pages/career-advice' | relative_url }})** - Career guidance and interview preparation
- 📋 **[Cheat Sheets]({{ 'pages/cheat-sheets' | relative_url }})** - Quick reference guides for various technologies
- 📬 **[Contact Me]({{ 'pages/contact' | relative_url }})** - Get in touch with me for questions or collaborations

<div class="cta-section">
  <h2>Stay Updated!</h2>
  <p>Star ⭐ this <a href="https://github.com/kingabzpro/Writing-Portfolio">repository</a> to get notified about new content and updates.</p>
  
  {% assign social_links = portfolio_content.social | default: [] %}
  <div id="socialLinks" class="social-links">
    {% for link in social_links %}
    <a href="{{ link.url }}" aria-label="{{ link.platform }}">
      <i class="{{ link.icon }}"></i>
    </a>
    {% endfor %}
  </div>
</div>
