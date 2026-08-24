# Data Science Blog | Changyu

## About the Blog

**Data Science Blog | Changyu** is a personal technical blog that documents my learning journey in data science, artificial intelligence, and data analysis. It serves as a learning archive where I organize and build upon knowledge gained from university courses, online courses, books, research papers, projects, and hands-on exercises.

The blog's content is written in Korean.

More than simply a place to publish posts, this blog is a portfolio project built by customizing a static website hosted on GitHub Pages. Based on the original WENIVLOG theme, it extends key aspects of the frontend experience—including the overall layout, content rendering, category navigation, search, dark mode, and post detail pages—to suit the blog's purpose.

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
