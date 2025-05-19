document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    fetch('/search.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load search data');
            }
            return response.json();
        })
        .then(articles => {
            searchInput.addEventListener('input', function() {
                const query = this.value.toLowerCase();
                searchResults.innerHTML = '';

                if (query.length < 2) return;

                const results = articles.filter(article => {
                    return article.title.toLowerCase().includes(query) || 
                           article.content.toLowerCase().includes(query) ||
                           article.category.toLowerCase().includes(query);
                });

                displaySearchResults(results);
            });
        })
        .catch(error => {
            console.error('Error loading search data:', error);
            searchResults.innerHTML = '<p style="color: #dc3545;">Error loading search data. Please try again later.</p>';
        });
});

function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    
    if (results.length > 0) {
        results.forEach(article => {
            searchResults.innerHTML += `
                <div class="search-result">
                    <a href="${article.url}">
                        ${article.title}
                    </a>
                    <div class="search-result-category">
                        Category: ${article.category}
                    </div>
                </div>
            `;
        });
    } else {
        searchResults.innerHTML = '<p style="color: #666;">No results found</p>';
    }
}
