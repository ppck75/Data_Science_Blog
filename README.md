# Data Science Blog | Changyu

## About the Blog

**Data Science Blog | Changyu** is a personal technical blog that documents my learning journey in data science, artificial intelligence, and data analysis. It serves as a learning archive where I organize and build upon knowledge gained from university courses, online courses, books, research papers, projects, and hands-on exercises.

The blog's content is written in Korean.

More than simply a place to publish posts, this blog is a portfolio project built by customizing a static website hosted on GitHub Pages. Based on the original WENIVLOG theme, it extends key aspects of the frontend experience—including the overall layout, content rendering, category navigation, search, dark mode, and post detail pages—to suit the blog's purpose.

## Implementation

This blog is deployed as static files on **GitHub Pages** without a separate backend server. The HTML, CSS, and JavaScript files run in the browser, which reads files from the GitHub repository and renders the post list and menu information.

In the production environment, JavaScript calls the GitHub API to retrieve the lists of posts and menus from the repository. The browser parses the retrieved file list using regular expressions, and the date, title, category, thumbnail, description, and author encoded in each filename are used as post metadata. The local development environment can use local JSON data instead of the GitHub API, accommodating API rate limits and local testing scenarios.

Post content can be written in either Markdown or Jupyter Notebook format. Markdown posts are converted to HTML with `marked.js`, and code blocks receive syntax highlighting through `highlight.js`. For Jupyter Notebook posts, the blog reads the cell structure of each `.ipynb` file and converts Markdown and Code cells to HTML. It also displays code execution results, tables, and image outputs. MathJax is used for mathematical notation, making posts that require equations—such as notes on linear algebra, machine learning, and deep learning—readable directly within the blog.

The displayed view is determined by the URL query string. The default view shows the complete list of posts, URLs in the form `?post=...` render a specific post's detail page, and URLs in the form `?menu=...` display the introduction page or another standalone menu page. When users select a post or navigate between menus, the History API updates the URL, allowing the same content to remain accessible after a refresh or through a directly shared link.

The post list view provides a home section and a card-based post list featuring the latest posts, total number of posts, main categories, and number of posts in each category. The search field supports keyword searches based on filenames and metadata, while category buttons filter the list to posts on the selected topic. Pagination is also implemented to accommodate a growing number of posts.

## Writing and Publishing Posts

Posts follow a predefined filename convention. The blog currently uses the following formats:

```text
[YYYYMMDD]_[title]_[category]_[thumbnail]_[description]_[author].md
[YYYYMMDD]_[title]_[category]_[thumbnail]_[description]_[author].ipynb
```

Each field is used as metadata for the post view. `YYYYMMDD` is the publication date, `title` is the post title, `category` is the category, `thumbnail` is the featured image, `description` is the summary displayed on the post card and detail page, and `author` is linked to the author information. If the author field is left empty, the default author is used.

Posts are published through the following process:

1. Write the learning content in Markdown or Jupyter Notebook format.
2. Name the file according to the blog's filename convention.
3. When using a thumbnail, include the image filename in the metadata and manage the image file alongside the post.
4. Add the completed post to the repository and push it to GitHub.
5. After GitHub Pages deploys the static files, the blog's JavaScript adds the new post to the list.

In other words, posts can be published by adding files to the repository without using a separate admin interface or database. Post ordering, category classification, card information, and the title area of the detail page are all generated dynamically in the browser based on the filename and body content.

## Main Topics

The blog covers a range of topics centered on the data science learning journey.

- **Python and Data Analysis**: Notes on Python fundamentals, data types, control flow, NumPy, pandas, matplotlib, data preprocessing, and statistical analysis exercises.
- **Machine Learning**: Supervised and unsupervised learning, regression, classification, KNN, SVM, Decision Tree, Ensemble, hyperparameter tuning, and model evaluation metrics.
- **Deep Learning**: The architecture and operating principles of deep learning models, including PyTorch fundamentals, linear layers, activation functions, CNN, RNN, LSTM, Attention, Transformer, and BERT.
- **NLP and RAG**: Learning notes on tokenization, embeddings, Word2Vec, Transformer-based language models, LangChain-based RAG, VectorDB, Loader, Splitter, Agentic RAG, Tool Calling Agent, and Corrective RAG.
- **Web Crawling and Data Collection**: Web data collection using BeautifulSoup and requests, storing crawl results, and analyzing and visualizing collected data.
- **Mathematics and Statistics Fundamentals**: Foundational concepts for artificial intelligence and data analysis, including linear algebra, probability, statistics, hypothesis testing, analysis of variance, and correlation analysis.
- **Demography**: Concepts from demography courses—including population growth rates, fertility, mortality, and life tables—examined from a data analysis perspective.
- **Research Paper Reviews and Study Notes**: Reviews and summaries of research papers on Computational Grounded Theory, Computational Case Method, Corpus Modeling, media communication, and data science methodologies.
- **Project Notes**: Results from practical work, including data analysis projects, policy communication projects, web crawling-based analyses, Kaggle exercises, and HTML document creation.

## Original Theme and Customization

This blog is based on the **WENIVLOG** theme by Weniv. The original theme is a static blog template designed to simplify running a blog on GitHub Pages. Its structure allows users to create a basic blog by forking the repository, enabling GitHub Pages, and editing the configuration file.

The core structure inherited from the original theme includes:

- Static blog deployment through GitHub Pages
- Blog post management based on post files in the repository
- Configuration of the blog title, GitHub account, repository, and author information through `config.js`
- Markdown post filename conventions and thumbnail metadata
- Top-level menu configuration by adding menu files
- Basic rendering with `marked.js`, `highlight.js`, and Tailwind CSS

Building on this foundation, the current blog significantly extends the frontend features and design.

- **Redesigned home page**: Added a blog home section that presents the latest posts, total number of posts, main categories, and category filters at a glance, moving beyond a simple post-list layout.
- **Enhanced card-based post list**: Increased the visual density for a portfolio-style blog by presenting each post's title, summary, publication date, author, thumbnail, and category in a card.
- **Improved category navigation**: Added post counts for each category and improved the sidebar and overlay panel so users can quickly browse posts by topic.
- **Improved search**: Integrated keyword search and category filtering with post-list rendering.
- **Enhanced detail pages**: Added a header that displays the title, summary, author, date, estimated reading time, and category at the top of each post.
- **Related and previous/next post navigation**: Added a follow-up navigation section that directs readers to posts in the same category or to adjacent posts after they finish reading.
- **Enhanced Jupyter Notebook rendering**: Added functionality that converts Markdown cells, Code cells, execution results, images, and table outputs to HTML, allowing `.ipynb` files to be read directly as blog posts.
- **Improved equation and code readability**: Added MathJax to render equations, along with syntax highlighting and a copy button for code blocks.
- **Dark mode**: Implemented light and dark theme switching based on the user's system settings and locally stored preference.
- **Responsive layout adjustments**: Configured the content and sidebar to appear together on desktop, while ensuring that search, menus, and category navigation work on smaller mobile screens.
- **Updated branding**: Adapted the blog title, favicon, thumbnails, footer text, and introductory copy to suit a personal data science archive.

The result is a personal, portfolio-style technical blog that builds on WENIVLOG's static blog architecture to present data science learning notes in a structured way.

## Credits

- Original theme: WENIVLOG
- Original repository: https://github.com/weniv/github_blog
- This blog was built using Weniv's WENIVLOG template. Its web design and frontend implementation have been independently modified and extended to serve as a personal portfolio.
