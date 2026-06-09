const apiKey = "6db88b95232b5e7933c3e8d75186ca24";

async function getNews() {
try {

const url =
`https://gnews.io/api/v4/search?q=football&lang=en&token=${apiKey}`;

const res = await fetch(url);
const data = await res.json();

console.log(data);

if (!data.articles) {
document.getElementById("news").innerHTML =
"  No news is currently available ";
return;
}

let html = "";

data.articles.forEach(article => {
html += `
<div class="card">
<img src="${article.image || ''}">
<h3>${article.title}</h3>
<p>${article.description || ''}</p>
<a href="${article.url}" target="_blank"> Read</a>
</div>
`;
});

document.getElementById("news").innerHTML = html;

} catch (err) {
console.log(err);
document.getElementById("news").innerHTML =
"   A communication error occurred  API";
}
}

getNews();