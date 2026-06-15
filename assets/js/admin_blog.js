import { firestore } from "./firebase_config.js";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    updateDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const form = document.getElementById("adminBlogForm");
const blogIdInput = document.getElementById("adminBlogId");
const statusBox = document.getElementById("adminBlogStatus");
const submitButton = document.getElementById("adminBlogSubmit");
const cancelButton = document.getElementById("adminBlogCancel");
const listBox = document.getElementById("adminBlogList");
const refreshButton = document.getElementById("adminRefreshBlogs");

let blogs = [];

const toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2600,
    timerProgressBar: true
});

const showToast = (icon, title) => {
    toast.fire({ icon, title });
};

const showStatus = (message, type) => {
    statusBox.textContent = message;
    statusBox.className = `admin-status ${type}`;
};

const escapeHtml = (value = "") => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const makeExcerpt = (content) => {
    const cleaned = content.replace(/\s+/g, " ").trim();
    return cleaned.length > 160 ? `${cleaned.slice(0, 157)}...` : cleaned;
};

const formatDate = (timestamp) => {
    const date = timestamp?.toDate ? timestamp.toDate() : null;
    if (!date) return "New";

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
};

const getBlogPayload = () => {
    const formData = new FormData(form);
    const content = formData.get("content").trim();

    return {
        title: formData.get("title").trim(),
        category: formData.get("category").trim(),
        author: formData.get("author").trim() || "Shyama & Company",
        imageUrl: formData.get("imageUrl").trim() || "../assets/img/blog.png",
        excerpt: formData.get("excerpt").trim() || makeExcerpt(content),
        content,
        status: "published"
    };
};

const resetForm = () => {
    form.reset();
    blogIdInput.value = "";
    submitButton.textContent = "Publish Blog";
    cancelButton.hidden = true;
    showStatus("", "");
};

const renderBlogs = () => {
    if (!blogs.length) {
        listBox.innerHTML = '<p class="admin-empty-state">No blogs found. Create your first blog above.</p>';
        return;
    }

    listBox.innerHTML = blogs.map((blog) => `
        <article class="admin-blog-row">
            <img src="${escapeHtml(blog.imageUrl || "../assets/img/blog.png")}" alt="${escapeHtml(blog.title)}">
            <div class="admin-blog-row-content">
                <div class="admin-blog-row-meta">
                    <span>${escapeHtml(blog.category || "Blog")}</span>
                    <span>${escapeHtml(formatDate(blog.createdAt))}</span>
                </div>
                <h3>${escapeHtml(blog.title || "Untitled Blog")}</h3>
                <p>${escapeHtml(blog.excerpt || "")}</p>
            </div>
            <div class="admin-blog-row-actions">
                <button type="button" data-action="view" data-id="${blog.id}" title="View blog">
                    <i class="fa-solid fa-eye"></i>
                </button>
                <button type="button" data-action="edit" data-id="${blog.id}" title="Edit blog">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button type="button" data-action="delete" data-id="${blog.id}" title="Delete blog">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </article>
    `).join("");
};

const loadBlogs = async () => {
    listBox.innerHTML = '<p class="admin-empty-state">Loading blogs...</p>';

    try {
        const blogsQuery = query(collection(firestore, "blogs"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(blogsQuery);
        blogs = snapshot.docs.map((blogDoc) => ({ id: blogDoc.id, ...blogDoc.data() }));
        renderBlogs();
    } catch (error) {
        console.error(error);
        listBox.innerHTML = '<p class="admin-empty-state error">Unable to load blogs. Check Firestore permissions.</p>';
        showToast("error", "Unable to load blogs");
    }
};

const fillFormForEdit = (blog) => {
    blogIdInput.value = blog.id;
    form.elements.title.value = blog.title || "";
    form.elements.category.value = blog.category || "";
    form.elements.author.value = blog.author || "Shyama & Company";
    form.elements.imageUrl.value = blog.imageUrl || "";
    form.elements.excerpt.value = blog.excerpt || "";
    form.elements.content.value = blog.content || "";
    submitButton.textContent = "Update Blog";
    cancelButton.hidden = false;
    form.scrollIntoView({ behavior: "smooth", block: "start" });
    showStatus("Editing selected blog.", "info");
};

const viewBlog = (blog) => {
    Swal.fire({
        title: blog.title || "Untitled Blog",
        html: `
            <div class="admin-view-modal">
                <img src="${escapeHtml(blog.imageUrl || "../assets/img/blog.png")}" alt="${escapeHtml(blog.title)}">
                <div class="admin-view-meta">
                    <span>${escapeHtml(blog.author || "Shyama & Company")}</span>
                    <span>${escapeHtml(blog.category || "Blog")}</span>
                    <span>${escapeHtml(formatDate(blog.createdAt))}</span>
                </div>
                <p>${escapeHtml(blog.content || blog.excerpt || "").replaceAll("\n", "<br>")}</p>
            </div>
        `,
        width: 760,
        confirmButtonText: "Close",
        confirmButtonColor: "#ff7a1a"
    });
};

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const blogId = blogIdInput.value;
    const blog = getBlogPayload();
    const isEditing = Boolean(blogId);

    submitButton.disabled = true;
    submitButton.textContent = isEditing ? "Updating..." : "Publishing...";
    showStatus(isEditing ? "Updating blog..." : "Publishing blog...", "info");

    try {
        if (isEditing) {
            await updateDoc(doc(firestore, "blogs", blogId), {
                ...blog,
                updatedAt: serverTimestamp()
            });
            showToast("success", "Blog updated successfully");
            showStatus("Blog updated successfully.", "success");
        } else {
            await addDoc(collection(firestore, "blogs"), {
                ...blog,
                createdAt: serverTimestamp()
            });
            showToast("success", "Blog published successfully");
            showStatus("Blog published successfully.", "success");
        }

        resetForm();
        await loadBlogs();
    } catch (error) {
        console.error(error);
        const message = isEditing ? "Blog update failed" : "Blog publish failed";
        showToast("error", message);
        showStatus(`${message}. Please check Firestore permissions.`, "error");
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = blogIdInput.value ? "Update Blog" : "Publish Blog";
    }
});

cancelButton.addEventListener("click", resetForm);
refreshButton.addEventListener("click", loadBlogs);

listBox.addEventListener("click", async (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const blog = blogs.find((item) => item.id === button.dataset.id);
    if (!blog) return;

    if (button.dataset.action === "view") {
        viewBlog(blog);
        return;
    }

    if (button.dataset.action === "edit") {
        fillFormForEdit(blog);
        return;
    }

    const result = await Swal.fire({
        title: "Delete this blog?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#64748b"
    });

    if (!result.isConfirmed) return;

    try {
        await deleteDoc(doc(firestore, "blogs", blog.id));
        showToast("success", "Blog deleted successfully");
        if (blogIdInput.value === blog.id) resetForm();
        await loadBlogs();
    } catch (error) {
        console.error(error);
        showToast("error", "Blog delete failed");
    }
});

loadBlogs();
