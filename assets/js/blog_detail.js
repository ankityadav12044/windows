import { firestore } from "./firebase_config.js";
import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const title = document.getElementById("blogDetailTitle");
const author = document.getElementById("blogDetailAuthor");
const date = document.getElementById("blogDetailDate");
const category = document.getElementById("blogDetailCategory");
const image = document.getElementById("blogDetailImage");
const content = document.getElementById("blogDetailContent");

const escapeHtml = (value = "") => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const formatDate = (timestamp) => {
    const blogDate = timestamp?.toDate ? timestamp.toDate() : null;
    if (!blogDate) return "New Blog";

    return blogDate.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
};

const renderMissing = () => {
    title.textContent = "Blog not found";
    content.innerHTML = "<p>Blog available nahi hai. Blog page se koi published blog open karein.</p>";
};

const loadBlog = async () => {
    const blogId = new URLSearchParams(window.location.search).get("id");
    if (!blogId || blogId.startsWith("sample-")) {
        renderMissing();
        return;
    }

    try {
        const snapshot = await getDoc(doc(firestore, "blogs", blogId));
        if (!snapshot.exists()) {
            renderMissing();
            return;
        }

        const blog = snapshot.data();
        title.textContent = blog.title || "Blog";
        author.textContent = blog.author || "Shyama & Company";
        date.textContent = formatDate(blog.createdAt);
        category.textContent = blog.category || "Blog";
        image.src = blog.imageUrl || "../assets/img/blog.png";
        image.alt = blog.title || "Blog";
        content.innerHTML = escapeHtml(blog.content || blog.excerpt || "")
            .split(/\n{2,}/)
            .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br>")}</p>`)
            .join("");
    } catch (error) {
        console.error(error);
        renderMissing();
    }
};

loadBlog();
