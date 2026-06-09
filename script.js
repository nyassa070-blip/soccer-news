// رابط API مفتوح ومخصص بالكامل لجلب أخبار كرة القدم (Soccer) الأمريكية فقط
const url = 'https://newsapi.org';

const newsContainer = document.getElementById('news-container');

async function fetchNews() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.articles && data.articles.length > 0) {
            displayNews(data.articles);
        } else {
            newsContainer.innerHTML = '<p style="color:white; text-align:center;">No soccer news available at the moment.</p>';
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p style="color:white; text-align:center;">Connection error, please try again later.</p>';
    }
}

function displayNews(articles) {
    newsContainer.innerHTML = '';
    
    // عرض أول 12 خبر كرة قدم لتنظيم مظهر الموقع
    const limitedArticles = articles.slice(0, 12);
    
    limitedArticles.forEach(article => {
        if (!article.title || article.title.includes('[Removed]')) return;
        
        const card = document.createElement('div');
        card.className = 'news-card';
        
        // صورة افتراضية فخمة لملعب كرة قدم إذا لم تتوفر صورة للخبر الإخباري
        const imageUrl = article.urlToImage || 'https://unsplash.com';
        
        card.innerHTML = `
            <img src="${imageUrl}" alt="${article.title}">
            <h2 style="color: black; font-size: 1.1rem; margin: 10px 0; line-height: 1.4;">${article.title}</h2>
            <p style="color: #555; font-size: 0.85rem; flex-grow: 1; line-height: 1.5;">${article.description || 'Click read more to see full coverage of this soccer match.'}</p>
            <a href="${article.url}" target="_blank" style="display: block; text-align: center; background: #28a745; color: white; padding: 10px; text-decoration: none; border-radius: 4px; margin-top: auto; font-weight: bold;">Read more</a>
        `;
        newsContainer.appendChild(card);
    });
}

// تشغيل جلب الأخبار فوراً
fetchNews();
