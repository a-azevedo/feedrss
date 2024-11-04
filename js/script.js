
let currentPage = 1;
let loading = false;

async function getPosts() {
    if (loading) return; // Prevent multiple requests
    loading = true; // Set loading to true

    const URL = `https://dev.to/api/articles?per_page=10&page=${currentPage}`;
    try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        data.forEach((element, index) => {
            const article = document.createElement('article');
            const title = document.createElement('h2');
            const image = document.createElement('img');

            title.textContent = element.title;
            image.src = element.cover_image || element.social_image;

            article.appendChild(title);
            article.appendChild(image);
            document.body.appendChild(article);
            article.classList.add('card');
            image.classList.add('img');

            if (index === data.length - 1) {
                const lastPost = article;
                observer.observe(lastPost); // Observe the last post
            }
        });

        currentPage++; // Increment currentPage for next request
    } catch (error) {
        console.error('Error fetching posts:', error);
    } finally {
        loading = false; // Reset loading state
    }
}

const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        getPosts();
    }
}, {
    rootMargin: '100px', // Adjust this value to control when the observer is triggered
});

getPosts();






