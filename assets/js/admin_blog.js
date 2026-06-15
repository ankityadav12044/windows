import { firestore } from "./firebase_config.js";
import {
    addDoc,
    collection,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const form = document.getElementById("adminBlogForm");
const statusBox = document.getElementById("adminBlogStatus");
const submitButton = document.getElementById("adminBlogSubmit");

const showStatus = (message, type) => {
    statusBox.textContent = message;
    statusBox.className = `admin-status ${type}`;
};

const makeExcerpt = (content) => {
    const cleaned = content.replace(/\s+/g, " ").trim();
    return cleaned.length > 160 ? `${cleaned.slice(0, 157)}...` : cleaned;
};

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const content = formData.get("content").trim();

    const blog = {
        title: formData.get("title").trim(),
        category: formData.get("category").trim(),
        author: formData.get("author").trim() || "Shyama & Company",
        imageUrl: formData.get("imageUrl").trim() || "../assets/img/blog.png",
        excerpt: formData.get("excerpt").trim() || makeExcerpt(content),
        content,
        createdAt: serverTimestamp(),
        status: "published"
    };

    submitButton.disabled = true;
    submitButton.textContent = "Publishing...";
    showStatus("Blog publish ho raha hai...", "info");

    try {
        await addDoc(collection(firestore, "blogs"), blog);
        form.reset();
        showStatus("Blog successfully publish ho gaya.", "success");
    } catch (error) {
        console.error(error);
        showStatus("Blog publish nahi hua. Firebase rules/firestore permission check karein.", "error");
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Publish Blog";
    }
});
