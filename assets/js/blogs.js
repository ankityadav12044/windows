import { firestore } from "./firebase_config.js";
import {
    collection,
    getDocs,
    orderBy,
    query
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const blogGrid = document.getElementById("blogGrid");
const blogLimit = Number(blogGrid?.dataset.limit || 0);

const fallbackBlogs = [
    {
        id: "sample-installation",
        title: "Step by step guide to perfect window installation",
        category: "Installation",
        author: "Shyama & Company",
        imageUrl: "../assets/img/g5.png",
        excerpt: "Learn the best practices for installing new windows to ensure maximum energy efficiency, durability, and natural lighting in your home.",
        dateText: "July 14, 2026"
    },
    {
        id: "sample-glass",
        title: "How to choose the perfect glass for your office windows",
        category: "Glass Types",
        author: "Shyama & Company",
        imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600",
        excerpt: "Discover the differences between double-pane, tempered, and tinted glass to make the best architectural choice for your workspace.",
        dateText: "July 15, 2026"
    },
    {
        id: "sample-maintenance",
        title: "Signs it's time to replace or repair your old windows",
        category: "Maintenance",
        author: "Shyama & Company",
        imageUrl: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&q=80&w=600",
        excerpt: "Drafts, condensation, and high energy bills are clear indicators. Find out when a simple repair or a full window replacement is necessary.",
        dateText: "July 16, 2026"
    }
];

const escapeHtml = (value = "") => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const formatDate = (timestamp, fallback = "New Blog") => {
    const date = timestamp?.toDate ? timestamp.toDate() : null;
    if (!date) return fallback;

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
};

const renderBlogs = (blogs) => {
    const visibleBlogs = blogLimit > 0 ? blogs.slice(0, blogLimit) : blogs;

    blogGrid.innerHTML = visibleBlogs.map((blog) => `
        <div class="blog-card">
            <div class="card-image-wrapper">
                <img src="${escapeHtml(blog.imageUrl || "../assets/img/blog.png")}" alt="${escapeHtml(blog.title)}">
                <span class="date-badge">${escapeHtml(formatDate(blog.createdAt, blog.dateText))}</span>
            </div>
            <div class="card-contents">
                <div class="meta-info">
                    <span><i class="fa-solid fa-user"></i> By ${escapeHtml(blog.author || "Shyama & Company")}</span>
                    <span class="divider">|</span>
                    <span><i class="fa-solid fa-tag"></i> ${escapeHtml(blog.category || "Blog")}</span>
                </div>
                <h3>${escapeHtml(blog.title)}</h3>
                <p>${escapeHtml(blog.excerpt || "")}</p>
                <a href="blog_detail.html?id=${encodeURIComponent(blog.id)}" class="btn-view-now">View Now <i class="fa-solid fa-arrow-right"></i></a>
            </div>
        </div>
    `).join("");
};

const loadBlogs = async () => {
    try {
        const blogsQuery = query(
            collection(firestore, "blogs"),
            orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(blogsQuery);
        const blogs = snapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((blog) => blog.status === "published");

        renderBlogs(blogs.length ? blogs : fallbackBlogs);
    } catch (error) {
        console.error(error);
        renderBlogs(fallbackBlogs);
    }
};

loadBlogs();
