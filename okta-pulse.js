// Dummy Tech Data
const topicsData = [
    { id: 'auth0', label: 'Platform Migration', x: 25, y: 35, r: 25, color: '#8884FF' },
    { id: 'rbac', label: 'RBAC Setup', x: -30, y: 15, r: 18, color: '#8884FF' },
    { id: 'b2b', label: 'B2B Identity', x: 45, y: 22, r: 30, color: '#A5B4FC' },
    { id: 'security', label: 'Security Breach Concerns', x: -60, y: 40, r: 28, color: '#F97316' },
    { id: 'api', label: 'API Rate Limits', x: -80, y: 20, r: 15, color: '#F97316' },
    { id: 'mfa', label: 'MFA Rollout', x: 10, y: 28, r: 22, color: '#A5B4FC' },
    { id: 'cost', label: 'Licensing Costs', x: -45, y: 30, r: 20, color: '#F97316' },
    { id: 'sso', label: 'Seamless SSO', x: 60, y: 42, r: 24, color: '#8884FF' },
    { id: 'dev', label: 'Developer Docs', x: -15, y: 10, r: 16, color: '#8884FF' },
];

const emotionData = [
    { name: 'Frustrated', val: 142, color: '#F87171' },
    { name: 'Expectant', val: 115, color: '#FBBF24' },
    { name: 'Confident', val: 98, color: '#4ADE80' },
];

const mockPosts = [
    {
        author: '@sec_admin',
        handle: 'SysAdmin Steve',
        time: '1h ago',
        body: 'Just finished migrating our workforce to the new tenants. The SSO experience is flawless. Very satisfying deployment!',
        sentiment: 'positive',
        emotion: 'Confident',
        topicId: 'sso'
    },
    {
        author: 'u/dev_apex',
        handle: 'ApexCoder',
        time: '3h ago',
        body: 'The new rate limits on the Auth API are brutal. Had to spend the entire weekend rewriting our cache layer just to avoid 429 errors.',
        sentiment: 'negative',
        emotion: 'Frustrated',
        topicId: 'api'
    },
    {
        author: '@ciso_daily',
        handle: 'CISO Network',
        time: '5h ago',
        body: 'Looking closely at the new B2B identity features. The promise of frictionless partner onboarding is exactly what we need this quarter.',
        sentiment: 'neutral',
        emotion: 'Expectant',
        topicId: 'b2b'
    },
    {
        author: 'u/identity_guy',
        handle: 'IdentityPro',
        time: '7h ago',
        body: 'Anyone else struggling to map multiple Active Directory domains into a single universal directory? Need a guide here.',
        sentiment: 'negative',
        emotion: 'Frustrated',
        topicId: 'dev'
    },
    {
        author: '@startup_cto',
        handle: 'Sarah Tech',
        time: '10h ago',
        body: 'Switched from homegrown auth to the new platform. Time to market just halved. Best architectural decision we made this year. 🚀',
        sentiment: 'positive',
        emotion: 'Confident',
        topicId: 'auth0'
    }
];

// Controller
const PulseController = {
    activeTopic: null,

    init() {
        this.bindEvents();
    },

    bindEvents() {
        // Find all elements that want to trigger the pulse board with a specific topic
        const pulseTriggers = document.querySelectorAll('[data-pulse-topic]');
        if (pulseTriggers.length > 0) {
            pulseTriggers.forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    // Prevent other row clicks if applicable
                    e.stopPropagation();
                    const topic = trigger.getAttribute('data-pulse-topic');
                    this.open(topic);
                });
            });
        }

        // Close via overlay click
        const overlay = document.getElementById('pulse-popup-overlay');
        if (overlay) overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.close();
        });
    },

    open(initialTopicId = null) {
        const overlay = document.getElementById('pulse-popup-overlay');
        if (overlay) overlay.classList.add('active');

        // Set the active topic immediately if passed from the trigger
        if (initialTopicId) {
            this.activeTopic = initialTopicId;
        }

        // Slight scale down of app-container for depth
        const appContainer = document.querySelector('.app-container');
        if (appContainer) {
            appContainer.style.transform = 'scale(0.98)';
            appContainer.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        }
        document.body.style.overflow = 'hidden';

        // Render charts after modal is displayed to get correct dimensions
        setTimeout(() => {
            this.renderMatrix();
            this.renderFeed();
        }, 100);
    },

    close() {
        const overlay = document.getElementById('pulse-popup-overlay');
        if (overlay) overlay.classList.remove('active');

        const appContainer = document.querySelector('.app-container');
        if (appContainer) {
            appContainer.style.transform = '';
        }
        document.body.style.overflow = '';
        this.activeTopic = null; // reset filter on close
    },

    renderMatrix() {
        const container = document.getElementById('pulse-passion-matrix');
        if (!container) return;
        container.innerHTML = '';

        const rect = container.getBoundingClientRect();
        const margin = { top: 20, right: 20, bottom: 40, left: 40 };
        const width = rect.width - margin.left - margin.right;
        const height = rect.height - margin.top - margin.bottom;

        if (width <= 0 || height <= 0) return;

        const svg = d3.select(container)
            .append('svg')
            .attr('class', 'pulse-chart-svg')
            .attr('viewBox', `0 0 ${rect.width} ${rect.height}`)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Add a background rect to capture clicks for resetting the filter
        svg.append('rect')
            .attr('width', width)
            .attr('height', height)
            .attr('fill', 'transparent')
            .on('click', () => {
                this.activeTopic = null;
                d3.selectAll('.pulse-bubble-group').style('opacity', 1);
                this.renderFeed();
            });

        // X scale (Sentiment -100 to 100)
        const x = d3.scaleLinear()
            .domain([-100, 100])
            .range([0, width]);

        // Y scale (Intensity 0 to 50)
        const y = d3.scaleLinear()
            .domain([0, 50])
            .range([height, 0]);

        // Axes
        svg.append('g')
            .attr('class', 'pulse-axis')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x).ticks(5).tickSize(-height).tickFormat(d => d))
            .call(g => g.select(".domain").remove());

        svg.append('g')
            .attr('class', 'pulse-axis')
            .call(d3.axisLeft(y).ticks(5).tickSize(-width))
            .call(g => g.select(".domain").remove());

        // Labels
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height + 35)
            .attr("fill", "rgba(255,255,255,0.4)")
            .style("font-size", "10px")
            .text("Avg. Emotion Sentiment Score");

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("y", -30)
            .attr("x", -height / 2)
            .attr("fill", "rgba(255,255,255,0.4)")
            .style("font-size", "10px")
            .text("Avg. Emotion Intensity Score");

        // Bubbles
        const node = svg.append("g")
            .selectAll("g")
            .data(topicsData)
            .join("g")
            .attr("class", "pulse-bubble-group")
            // Instantly apply the opacity filter if the dashboard opened with this activeTopic
            .style("opacity", d => (this.activeTopic && this.activeTopic !== d.id) ? 0.3 : 1)
            .attr("transform", d => `translate(${x(d.x)},${y(d.y)})`)
            .style("cursor", "pointer")
            .on("click", (event, d) => {
                event.stopPropagation(); // prevent background click

                // Toggle active topic
                if (this.activeTopic === d.id) {
                    this.activeTopic = null;
                    d3.selectAll('.pulse-bubble-group').style('opacity', 1);
                } else {
                    this.activeTopic = d.id;
                    d3.selectAll('.pulse-bubble-group').style('opacity', 0.3);
                    d3.select(event.currentTarget).style('opacity', 1);
                }

                this.renderFeed();
            });

        node.append("circle")
            .attr("class", "pulse-bubble")
            .attr("r", 0)
            .attr("fill", d => d.color)
            .transition().duration(800).delay((d, i) => i * 50)
            .attr("r", d => d.r);

        node.append("text")
            .attr("class", "pulse-label")
            .attr("dy", -10)
            .text(d => d.label)
            .attr("opacity", 0)
            .transition().duration(800).delay((d, i) => i * 50 + 400)
            .attr("opacity", 1);
    },

    renderFeed() {
        const container = document.getElementById('pulse-live-voices');
        if (!container) return;

        let postsToRender = mockPosts;

        if (this.activeTopic) {
            postsToRender = mockPosts.filter(post => post.topicId === this.activeTopic);
        }

        if (postsToRender.length === 0) {
            container.innerHTML = `
                <div style="padding: 2rem; text-align: center; color: var(--okta-text-muted); opacity: 0.7;">
                    <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="1.5" fill="none" class="mb-2" style="margin: 0 auto 10px auto; display: block;">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    No posts currently match this topic filter.
                </div>
            `;
            return;
        }

        container.innerHTML = postsToRender.map((post, i) => `
            <div class="pulse-post" style="opacity: 0; transform: translateY(10px); animation: fadeUpIn 0.4s ease forwards ${i * 0.1}s">
                <div class="pulse-post-header">
                    <div class="pulse-avatar">${post.author.charAt(1).toUpperCase()}</div>
                    <div class="pulse-author-col">
                        <span class="pulse-author">${post.handle} <span style="color:var(--okta-ether-blue); font-weight:400; font-size: 0.8rem;">${post.author}</span></span>
                        <span class="pulse-time">${post.time}</span>
                    </div>
                </div>
                <div class="pulse-body">${post.body}</div>
                <div class="pulse-tags">
                    <span class="pulse-tag ${post.sentiment}">
                        <span style="display:inline-block; width:6px; height:6px; background:currentColor; border-radius:50%;"></span>
                        ${post.sentiment.charAt(0).toUpperCase() + post.sentiment.slice(1)}
                    </span>
                    <span class="pulse-tag">${post.emotion}</span>
                </div>
            </div>
        `).join('');

        // Add a small keyframe animation
        if (!document.getElementById('pulse-animations')) {
            const style = document.createElement('style');
            style.id = 'pulse-animations';
            style.innerHTML = `
                @keyframes fadeUpIn {
                    to { opacity: 1; transform: translateY(0); }
                }
            `;
            document.head.appendChild(style);
        }
    }
};

document.addEventListener('DOMContentLoaded', () => PulseController.init());
