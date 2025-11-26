class CustomNoteCard extends HTMLElement {
    connectedCallback() {
        const title = this.getAttribute('title') || 'Untitled Note';
        const content = this.getAttribute('content') || 'No content provided';
        const date = this.getAttribute('date') || new Date().toISOString();
this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
<style>
                .card {
                    transition: all 0.2s ease;
                    transform-origin: center;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    cursor: pointer;
                }
                .card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
                }
                a {
                    text-decoration: none;
                    color: inherit;
                }
.content {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    flex-grow: 1;
                }
                .card-content {
                    flex-grow: 1;
                }
</style>
            <a href="/details.html" class="block h-full">
                <div class="card bg-white overflow-hidden shadow rounded-lg h-full">
                    <div class="p-5 card-content">
                        <h3 class="text-lg leading-6 font-medium text-gray-900 truncate">${title}</h3>
                        <p class="mt-2 text-gray-600 content">${content}</p>
                    </div>
                    <div class="bg-gray-50 px-5 py-3 flex justify-between items-center">
                        <p class="text-sm text-gray-500">${new Date(date).toLocaleDateString()}</p>
                        <div class="flex space-x-2">
                            <span class="text-indigo-600 hover:text-indigo-900">
                                <i data-feather="eye"></i>
                            </span>
                            <span class="text-indigo-600 hover:text-indigo-900">
                                <i data-feather="edit"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </a>
`;
    }
}

customElements.define('custom-note-card', CustomNoteCard);