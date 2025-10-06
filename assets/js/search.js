document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    if (!searchInput || !searchResults) {
        return;
    }

    const MIN_QUERY_LENGTH = 2;
    const DEBOUNCE_MS = 200;
    let articles = [];

    const handleInput = event => {
        const rawQuery = event.target.value || '';
        const query = rawQuery.trim().toLowerCase();

        if (query.length < MIN_QUERY_LENGTH) {
            searchResults.innerHTML = '<p class="search-meta">Type at least 2 characters to search.</p>';
            return;
        }

        const matches = articles.filter(article => {
            const title = (article.title || '').toLowerCase();
            const content = (article.content || '').toLowerCase();
            const category = (article.category || '').toLowerCase();
            return title.includes(query) || content.includes(query) || category.includes(query);
        });

        displaySearchResults(matches, rawQuery.trim());
    };

    fetch('/search.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load search data');
            }
            return response.json();
        })
        .then(data => {
            articles = Array.isArray(data) ? data : [];
            searchResults.innerHTML = '<p class="search-meta">Type at least 2 characters to search.</p>';
            searchInput.addEventListener('input', debounce(handleInput, DEBOUNCE_MS));
        })
        .catch(error => {
            console.error('Error loading search data:', error);
            searchResults.innerHTML = '<p style="color: #dc3545;">Error loading search data. Please try again later.</p>';
        });
});

function displaySearchResults(results, query) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) {
        return;
    }

    searchResults.innerHTML = '';

    if (!Array.isArray(results) || results.length === 0) {
        searchResults.innerHTML = `<p style="color: #666;">No results found for "${query}".</p>`;
        return;
    }

    const meta = document.createElement('p');
    meta.className = 'search-meta';
    meta.textContent = `${results.length} result${results.length === 1 ? '' : 's'} for "${query}"`;
    searchResults.appendChild(meta);

    const fragment = document.createDocumentFragment();
    results.forEach(article => {
        const wrapper = document.createElement('article');
        wrapper.className = 'search-result';

        const link = document.createElement('a');
        link.href = article.url;
        link.textContent = article.title || 'Untitled article';
        wrapper.appendChild(link);

        if (article.category) {
            const category = document.createElement('div');
            category.className = 'search-result-category';
            category.textContent = `Category: ${article.category}`;
            wrapper.appendChild(category);
        }

        fragment.appendChild(wrapper);
    });

    searchResults.appendChild(fragment);
}

function debounce(fn, delay) {
    let timerId;
    return function debounced(...args) {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => fn.apply(this, args), delay);
    };
}
