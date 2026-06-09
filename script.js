const apiKey = '6db88b95232b5e7933c3e8d75186ca24'; 
const url = `https://gnews.io{apiKey}`;

const newsContainer = document.getElementById('news-container');

async function fetchNews() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.articles && data.articles.length > 0) {
            displayNews(data.articles);
        } else {
            newsContainer.innerHTML = '<p>No news available at the moment.</p>';
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p>Connection error, please try again later.</p>';
    }
}

function displayNews(articles) {
    newsContainer.innerHTML = '';
    articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'news-card';
        
        // استخدام صورة افتراضية إذا لم تتوفر صورة للخبر
        const imageUrl = article.image || 'https://placeholder.com';
        
        card.innerHTML = `
            <img src="${imageUrl}" alt="${article.title}">
            <h2>${article.title}</h2>
            <p>${article.description || ''}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(card);
    });
}

// تشغيل الدالة عند تحميل الصفحة
fetchNews();
