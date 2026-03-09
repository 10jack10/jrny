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
    // --- auth0: Platform Migration ---
    { author: '@startup_cto', handle: 'Sarah Tech', time: '10h ago', body: 'Switched from homegrown auth to the new platform. Time to market just halved. Best architectural decision we made this year. 🚀', sentiment: 'positive', emotion: 'Confident', topicId: 'auth0' },
    { author: '@migrator_max', handle: 'Migration Max', time: '1d ago', body: 'The migration script for legacy users actually worked on the first try. Pleasantly surprised by the documentation clarity.', sentiment: 'positive', emotion: 'Confident', topicId: 'auth0' },
    { author: 'u/legacy_pain', handle: 'Legacy Larry', time: '5h ago', body: 'Struggling with the user import API. Getting some weird password hash mismatches that aren\'t documented well.', sentiment: 'negative', emotion: 'Frustrated', topicId: 'auth0' },
    { author: '@cloud_arch', handle: 'Cloud Architect', time: '2h ago', body: 'Finalizing the Auth0 tenant structure for our global regions. The isolation features are solid.', sentiment: 'neutral', emotion: 'Expectant', topicId: 'auth0' },

    // --- rbac: RBAC Setup ---
    { author: '@sec_dev', handle: 'Security Dave', time: '3h ago', body: 'Setting up fine-grained RBAC with custom claims today. The flexibility is insane, but the logic gets complex fast.', sentiment: 'neutral', emotion: 'Expectant', topicId: 'rbac' },
    { author: 'u/ops_pro', handle: 'Ops Champion', time: '8h ago', body: 'Implemented nested roles for our internal dashboard. Finally, we have a clean permissions matrix that actually makes sense.', sentiment: 'positive', emotion: 'Confident', topicId: 'rbac' },
    { author: '@admin_alex', handle: 'Alex Admin', time: '15h ago', body: 'RBAC audit logs are a lifesaver. Caught a misconfiguration in our staging env before it hit prod.', sentiment: 'positive', emotion: 'Confident', topicId: 'rbac' },
    { author: '@junior_dev', handle: 'Junior Dev', time: '1d ago', body: 'Roles and permissions are so confusing at first. Anyone have a simple visual guide for the dashboard?', sentiment: 'negative', emotion: 'Frustrated', topicId: 'rbac' },

    // --- b2b: B2B Identity ---
    { author: '@ciso_daily', handle: 'CISO Network', time: '5h ago', body: 'Looking closely at the new B2B identity features. The promise of frictionless partner onboarding is exactly what we need this quarter.', sentiment: 'neutral', emotion: 'Expectant', topicId: 'b2b' },
    { author: '@enterprise_guru', handle: 'Identity Guru', time: '2h ago', body: 'B2B integration just became much easier with the new delegated administration. Our partners love the self-service portal.', sentiment: 'positive', emotion: 'Confident', topicId: 'b2b' },
    { author: 'u/partner_manager', handle: 'Partner Sam', time: '12h ago', body: 'Why is it so hard to map custom attributes from customer IDPs to our internal profiles? B2B mapping still feels clunky.', sentiment: 'negative', emotion: 'Frustrated', topicId: 'b2b' },
    { author: '@saas_founder', handle: 'SaaS Founder', time: '1d ago', body: 'The B2B features are a game changer for our multi-tenant architecture. Scaling to 100+ customers seems feasible now.', sentiment: 'positive', emotion: 'Confident', topicId: 'b2b' },

    // --- security: Security Breach Concerns ---
    { author: '@threat_intel', handle: 'Threat Intel', time: '1h ago', body: 'Seeing a spike in credential stuffing attacks on several identity providers. Ensure your rate limits are strictly enforced.', sentiment: 'negative', emotion: 'Frustrated', topicId: 'security' },
    { author: 'u/white_hat', handle: 'Security Researcher', time: '4h ago', body: 'Found a minor bypass in a common OAuth flow implementation. Glad to see Okta already has a fix for this in their docs.', sentiment: 'neutral', emotion: 'Expectant', topicId: 'security' },
    { author: '@it_director', handle: 'IT Director Kim', time: '9h ago', body: 'Zero Trust is not just a buzzword after the latest leaks. Moving all our perimeter security to identity-first logic.', sentiment: 'positive', emotion: 'Confident', topicId: 'security' },
    { author: '@paranoid_ops', handle: 'SysOps Paranoid', time: '14h ago', body: 'Reading about the latest session hijacking techniques. Need more granular session revocation controls for high-risk users.', sentiment: 'negative', emotion: 'Frustrated', topicId: 'security' },

    // --- api: API Rate Limits ---
    { author: 'u/dev_apex', handle: 'ApexCoder', time: '3h ago', body: 'The new rate limits on the Auth API are brutal. Had to spend the entire weekend rewriting our cache layer just to avoid 429 errors.', sentiment: 'negative', emotion: 'Frustrated', topicId: 'api' },
    { author: '@api_master', handle: 'API Master', time: '6h ago', body: 'Hitting the limit on `/userinfo` at peak times. Does anyone know if there\'s a bulk endpoint for metadata?', sentiment: 'negative', emotion: 'Frustrated', topicId: 'api' },
    { author: '@latency_junkie', handle: 'FastDev', time: '1d ago', body: 'Optimized our API calls with properly configured refresh tokens. Staying well within the limits now. Performance is great.', sentiment: 'positive', emotion: 'Confident', topicId: 'api' },
    { author: 'u/mobile_dev', handle: 'Mobile App Lead', time: '2d ago', body: 'Evaluating the Management API limits. Seems scalable for our user base, but we need to be careful with the search queries.', sentiment: 'neutral', emotion: 'Expectant', topicId: 'api' },

    // --- mfa: MFA Rollout ---
    { author: '@helpdesk_hero', handle: 'Helpdesk Hero', time: '2h ago', body: 'MFA rollout day 1. Surprisingly few tickets! The push notifications are much smoother than SMS codes.', sentiment: 'positive', emotion: 'Confident', topicId: 'mfa' },
    { author: 'u/security_freak', handle: 'LockItDown', time: '10h ago', body: 'Finally enforced WebAuthn for our admin team. No more phishing the admins. Huge security win!', sentiment: 'positive', emotion: 'Confident', topicId: 'mfa' },
    { author: '@user_complaints', handle: 'Angry User', time: '15h ago', body: 'I lost my phone and now I\'m locked out of everything. The MFA recovery process is a nightmare.', sentiment: 'negative', emotion: 'Frustrated', topicId: 'mfa' },
    { author: '@it_planner', handle: 'Strategic IT', time: '1d ago', body: 'Planning the rollout of biometric MFA for our mobile workforce. Testing phase starts next week.', sentiment: 'neutral', emotion: 'Expectant', topicId: 'mfa' },

    // --- cost: Licensing Costs ---
    { author: 'u/budget_king', handle: 'CFO Bob', time: '6h ago', body: 'The move to active-user pricing is saving us 20% compared to our previous seats-based contract. Good transparency.', sentiment: 'positive', emotion: 'Confident', topicId: 'cost' },
    { author: '@procurement_gal', handle: 'Procurement Pro', time: '1d ago', body: 'Struggling to understand the tiered pricing for B2C users. The jump from 50k to 100k users is quite steep.', sentiment: 'negative', emotion: 'Frustrated', topicId: 'cost' },
    { author: '@it_audit', handle: 'Audit Master', time: '12h ago', body: 'Running an audit on our licensing usage. We have a lot of inactive accounts still being billed. Time to clean up.', sentiment: 'negative', emotion: 'Frustrated', topicId: 'cost' },
    { author: 'u/startup_founder', handle: 'Founder Joe', time: '2d ago', body: 'The free tier for startups is actually very generous. Lets us focus on growth without worrying about the bill yet.', sentiment: 'positive', emotion: 'Confident', topicId: 'cost' },

    // --- sso: Seamless SSO ---
    { author: '@sec_admin', handle: 'SysAdmin Steve', time: '1h ago', body: 'Just finished migrating our workforce to the new tenants. The SSO experience is flawless. Very satisfying deployment!', sentiment: 'positive', emotion: 'Confident', topicId: 'sso' },
    { author: '@hr_coordinator', handle: 'HR Jane', time: '4h ago', body: 'New hires love the one-click login for all our apps. Makes onboarding so much less stressful for everyone.', sentiment: 'positive', emotion: 'Confident', topicId: 'sso' },
    { author: 'u/shadow_it', handle: 'Shadow IT Finder', time: '1d ago', body: 'SSO integrations are uncovering so many rogue apps our departments were using. Time for some governance!', sentiment: 'neutral', emotion: 'Expectant', topicId: 'sso' },
    { author: '@mobile_work', handle: 'Remote Ron', time: '2d ago', body: 'Why does SSO sometimes fail on mobile networks? Getting intermittent authentication errors when switching from WiFi.', sentiment: 'negative', emotion: 'Frustrated', topicId: 'sso' },

    // --- dev: Developer Docs ---
    { author: 'u/identity_guy', handle: 'IdentityPro', time: '7h ago', body: 'Anyone else struggling to map multiple Active Directory domains into a single universal directory? Need a guide here.', sentiment: 'negative', emotion: 'Frustrated', topicId: 'dev' },
    { author: '@code_queen', handle: 'Code Queen', time: '2h ago', body: 'The Quickstart guides are actually helpful for once. Had the login widget up and running in under 15 minutes.', sentiment: 'positive', emotion: 'Confident', topicId: 'dev' },
    { author: 'u/api_newbie', handle: 'Junior Dev 2', time: '12h ago', body: 'The documentation for the Refresh Token rotation is a bit dense. Could use more code examples in Python.', sentiment: 'negative', emotion: 'Frustrated', topicId: 'dev' },
    { author: '@open_source_fan', handle: 'OSS Master', time: '1d ago', body: 'Loving the SDK transparency. Being able to see the source code for the middleware makes debugging so much easier.', sentiment: 'positive', emotion: 'Confident', topicId: 'dev' }
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

        // Update AI Summary if specific topic is selected
        this.updateAISummary();

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
    },

    updateAISummary() {
        const summaryText = document.getElementById('pulse-ai-summary-text');
        if (!summaryText) return;

        if (this.activeTopic) {
            const topic = topicsData.find(t => t.id === this.activeTopic);
            summaryText.innerHTML = `The community is currently discussing <strong>${topic.label}</strong>. Key themes include integration challenges and performance benchmarks. Feedback is predominantly ${mockPosts.filter(p => p.topicId === this.activeTopic)[0]?.sentiment || 'neutral'}.`;
        } else {
            summaryText.textContent = "The conversation is centered on Auth0 platform migration and RBAC setup. Concerns about API rate limits and security breaches are highlighted by several users.";
        }
    }
};

const PulseAIController = {
    messages: [
        { role: 'ai', text: 'Hello! I can help you analyze these community trends. What would you like to know about the current topics?' }
    ],

    init() {
        this.render();
        this.bindEvents();
    },

    bindEvents() {
        const input = document.getElementById('pulse-ai-input');
        const sendBtn = document.getElementById('pulse-ai-send');

        if (sendBtn && input) {
            const handleSend = () => {
                const text = input.value.trim();
                if (!text) return;
                this.addMessage('user', text);
                input.value = '';
                this.generateResponse(text);
            };

            sendBtn.addEventListener('click', handleSend);
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleSend();
            });
        }
    },

    addMessage(role, text) {
        this.messages.push({ role, text });
        this.render();
        const container = document.getElementById('pulse-ai-messages');
        if (container) container.scrollTop = container.scrollHeight;
    },

    generateResponse(userInput) {
        // Simple mock logic
        setTimeout(() => {
            let response = "That's a great question. Based on the data, users are particularly interested in deployment speed and long-term maintenance of these configurations.";
            if (userInput.toLowerCase().includes('security')) {
                response = "Security is a major driver right now. Many users are discussing Zero Trust principles in the context of their recent migrations.";
            } else if (userInput.toLowerCase().includes('cost')) {
                response = "Licensing costs are a frequent pain point, with many looking for ways to optimize their user counts effectively.";
            }
            this.addMessage('ai', response);
        }, 1500);
    },

    render() {
        const container = document.getElementById('pulse-ai-messages');
        if (!container) return;
        container.innerHTML = this.messages.map(msg => `
            <div class="pulse-ai-msg ${msg.role}">${msg.text}</div>
        `).join('');
    }
};

// --- View Switching Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const viewTriggers = document.querySelectorAll('[data-view-trigger]');
    const viewContents = document.querySelectorAll('.view-content');

    viewTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = trigger.getAttribute('data-view-trigger');

            // Update Trigger States
            viewTriggers.forEach(t => t.classList.remove('active'));
            trigger.classList.add('active');

            // Update View States
            viewContents.forEach(view => {
                if (view.id === targetId) {
                    view.classList.add('active');
                } else {
                    view.classList.remove('active');
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    PulseController.init();
    PulseAIController.init();
});
