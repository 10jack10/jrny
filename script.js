document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('detail-card');
    const cardContent = document.getElementById('card-content');

    // ═══════════════════════════════════════
    // RICH DEEP DIVE CARD DATA
    // ═══════════════════════════════════════
    const cardData = {
        1: {
            phase: 1,
            title: 'Identifying Needs & Requirements',
            glowColor: 'rgba(59,130,246,0.5)',
            html: `
                <p>The journey starts with the user recognizing a gap or opportunity. Users approach Belden with one of three primary drivers:</p>
                <div class="card-grid-3">
                    <div class="mini-card">
                        <span class="mc-icon">🔧</span>
                        <span class="mc-label">Product Need</span>
                        <span class="mc-sub">Specific specs: cable, connector type, etc.</span>
                    </div>
                    <div class="mini-card">
                        <span class="mc-icon">📦</span>
                        <span class="mc-label">System Need</span>
                        <span class="mc-sub">Explore portfolio to build a bundle</span>
                    </div>
                    <div class="mini-card">
                        <span class="mc-icon">💡</span>
                        <span class="mc-label">Solution Need</span>
                        <span class="mc-sub">Holistic resolution over individual parts</span>
                    </div>
                </div>
                <div class="tag-row">
                    <span class="tag-pill">Hardware Products</span>
                    <span class="tag-pill">Software Products</span>
                    <span class="tag-pill green">Services</span>
                    <span class="tag-pill yellow">Design</span>
                    <span class="tag-pill yellow">Install</span>
                    <span class="tag-pill yellow">Hypercare</span>
                </div>
            `
        },
        2: {
            phase: 2,
            title: 'Looking for Products',
            glowColor: 'rgba(99,102,241,0.5)',
            html: `
                <p>The amount of detail a user brings to this stage varies significantly — from exact SKUs to vague problem statements.</p>
                <div class="spectrum-bar">
                    <div class="spectrum-seg" style="background:var(--accent-emerald);">Exact SKU</div>
                    <div class="spectrum-seg" style="background:var(--accent-blue);">With Specs</div>
                    <div class="spectrum-seg" style="background:var(--accent-purple);">General Need</div>
                </div>
                <div class="card-grid">
                    <div class="mini-card">
                        <span class="mc-icon">🎯</span>
                        <span class="mc-label">Well-Defined</span>
                        <span class="mc-sub">Returning users, know exact product</span>
                    </div>
                    <div class="mini-card">
                        <span class="mc-icon">🔍</span>
                        <span class="mc-label">Exploratory</span>
                        <span class="mc-sub">Need guidance & discovery tools</span>
                    </div>
                </div>
                <p>Users with well-defined needs seek quick confirmation. Those with vague needs benefit from exploratory tools like Product Finder and AI chatbot.</p>
            `
        },
        3: {
            phase: 3,
            title: 'Finding the Right Product',
            glowColor: 'rgba(14,165,233,0.5)',
            html: `
                <p>After identifying the need, users refine their search through multiple steps to land on the right product.</p>
                <ol class="step-list">
                    <li><span class="sl-num">1</span><span><strong>Initiate Search</strong> — Start with SKUs, specs, or general terms</span></li>
                    <li><span class="sl-num">2</span><span><strong>View Product List</strong> — Scan matching results for potential fits</span></li>
                    <li><span class="sl-num">3</span><span><strong>Refine & Filter</strong> — Narrow down with technical filters & calculators</span></li>
                    <li><span class="sl-num">4</span><span><strong>Review Specs</strong> — Check PDPs, datasheets, installation guides</span></li>
                    <li><span class="sl-num">5</span><span><strong>Compare Products</strong> — Side-by-side comparison of top candidates</span></li>
                </ol>
                <div class="mini-chart">
                    <div class="bar" style="height:90%;background:var(--accent-blue);"><span>All</span></div>
                    <div class="bar" style="height:70%;background:var(--accent-indigo);"><span>Listed</span></div>
                    <div class="bar" style="height:45%;background:var(--accent-purple);"><span>Filtered</span></div>
                    <div class="bar" style="height:25%;background:var(--accent-pink);"><span>Reviewed</span></div>
                    <div class="bar" style="height:12%;background:var(--accent-emerald);"><span>Selected</span></div>
                </div>
            `
        },
        4: {
            phase: 4,
            title: 'Configuring Product / System',
            glowColor: 'rgba(139,92,246,0.5)',
            html: `
                <p>Once users land on the correct product, they may need to configure it for their specific requirements.</p>
                <div class="card-grid">
                    <div class="mini-card">
                        <span class="mc-icon">⚙️</span>
                        <span class="mc-label">Configure a Product</span>
                        <span class="mc-sub">Select variations, find exact SKU, finalize specs</span>
                    </div>
                    <div class="mini-card">
                        <span class="mc-icon">🧩</span>
                        <span class="mc-label">Configure a System</span>
                        <span class="mc-sub">Build a bundle, find compatible next elements</span>
                    </div>
                </div>
                <p>For individual products, the user moves directly to resolution. For systems, they loop back to "Find a product" to locate compatible elements — with a narrower choice due to system configurators showing only compatible products.</p>
                <div class="tag-row">
                    <span class="tag-pill">Product Configurator</span>
                    <span class="tag-pill green">System Configurator</span>
                    <span class="tag-pill yellow">Compatibility Check</span>
                </div>
            `
        },
        5: {
            phase: 5,
            title: 'Switching: Building → Designing',
            glowColor: 'rgba(236,72,153,0.5)',
            html: `
                <p>During product selection, users might realize they need a broader approach — switching from Building to the Designing journey.</p>
                <div class="card-grid">
                    <div class="mini-card">
                        <span class="mc-icon">🏗️</span>
                        <span class="mc-label">Building</span>
                        <span class="mc-sub">Finding individual products or bundles</span>
                    </div>
                    <div class="mini-card">
                        <span class="mc-icon">✨</span>
                        <span class="mc-label">Designing</span>
                        <span class="mc-sub">Comprehensive solutions with support</span>
                    </div>
                </div>
                <div class="tag-row">
                    <span class="tag-pill pink">Design Assistance</span>
                    <span class="tag-pill pink">Pre-configuration</span>
                    <span class="tag-pill pink">Ongoing Support</span>
                </div>
                <p>Users may realize they need compatible products (a bundle) or that partnering with Belden on comprehensive solutions is more effective for their needs.</p>
            `
        },
        6: {
            phase: 6,
            title: 'Resolution & Outcomes',
            glowColor: 'rgba(251,191,36,0.5)',
            html: `
                <p>Users have several ways to finalize their journey, depending on their role and needs.</p>
                <ol class="step-list">
                    <li><span class="sl-num">1</span><span><strong>Download Resources</strong> — Data sheets, CAD drawings, certifications for final prep</span></li>
                    <li><span class="sl-num">2</span><span><strong>Add to List / Project</strong> — Save products for quoting or sharing with teams</span></li>
                    <li><span class="sl-num">3</span><span><strong>Order or Handoff</strong> — Partners order via Edesk; end customers hand off BOMs to distributors</span></li>
                    <li><span class="sl-num">4</span><span><strong>Contact Belden</strong> — For tailored solutions; ideally users should self-serve otherwise</span></li>
                </ol>
                <div class="tag-row">
                    <span class="tag-pill yellow">Bill of Materials</span>
                    <span class="tag-pill green">Edesk Integration</span>
                    <span class="tag-pill">Distributor Quotes</span>
                </div>
            `
        }
    };

    let currentStep = null;
    let hideTimeout;

    // ═══════════════════════════════════════
    // DEEP DIVE CARD LOGIC
    // ═══════════════════════════════════════
    const hoverTargets = document.querySelectorAll('[data-step]');

    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            clearTimeout(hideTimeout);
            const step = el.getAttribute('data-step');

            if (currentStep !== step) {
                currentStep = step;
                renderCard(step);
            }

            card.classList.add('card-visible');
            positionCard(e);
        });

        el.addEventListener('mousemove', positionCard);

        el.addEventListener('mouseleave', () => {
            hideTimeout = setTimeout(() => {
                card.classList.remove('card-visible');
                currentStep = null;
            }, 120);
        });
    });

    function renderCard(step) {
        const data = cardData[step];
        if (!data) return;
        cardContent.innerHTML = `
            <div class="card-top">
                <span class="step-badge">Phase ${data.phase}</span>
                <h2>${data.title}</h2>
                <div class="card-glow" style="background:${data.glowColor};"></div>
            </div>
            <div class="card-body">
                ${data.html}
            </div>
        `;
    }

    function positionCard(e) {
        const offset = 22;
        const cardWidth = card.offsetWidth;
        const cardHeight = card.offsetHeight;

        let x = e.clientX + offset;
        let y = e.clientY + offset;

        if (x + cardWidth > window.innerWidth - 16) x = e.clientX - cardWidth - offset;
        if (y + cardHeight > window.innerHeight - 16) {
            y = e.clientY - cardHeight - offset;
            if (y < 16) y = 16;
        }

        card.style.left = `${x}px`;
        card.style.top = `${y}px`;
    }

    // ═══════════════════════════════════════
    // SVG HELPER UTILITIES
    // ═══════════════════════════════════════
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.getElementById('cross-lane-svg');
    const wrapper = document.getElementById('swim-lanes-wrapper');
    const boardSvg = document.getElementById('board-overlay-svg');
    const board = document.getElementById('journey-board');

    /**
     * Create the <defs> block with arrow-head markers for each color.
     */
    function createMarkerDefs() {
        const defs = document.createElementNS(NS, 'defs');
        const colors = {
            blue: 'rgba(59,130,246,0.7)',
            purple: 'rgba(139,92,246,0.7)',
            indigo: 'rgba(99,102,241,0.7)',
            muted: 'rgba(148,163,184,0.5)',
            yellow: 'rgba(251,191,36,0.7)'
        };

        for (const [name, fill] of Object.entries(colors)) {
            const marker = document.createElementNS(NS, 'marker');
            marker.setAttribute('id', `arrow-${name}`);
            marker.setAttribute('markerWidth', '6');
            marker.setAttribute('markerHeight', '5');
            marker.setAttribute('refX', '5');
            marker.setAttribute('refY', '2.5');
            marker.setAttribute('orient', 'auto-start-reverse');
            marker.setAttribute('markerUnits', 'strokeWidth');

            const poly = document.createElementNS(NS, 'path');
            poly.setAttribute('d', 'M0,0.5 L5,2.5 L0,4.5 L1,2.5 Z');
            poly.setAttribute('fill', fill);
            marker.appendChild(poly);
            defs.appendChild(marker);
        }
        return defs;
    }

    /**
     * Create an SVG path element.
     */
    function makePath(d, colorClass, opts = {}) {
        const path = document.createElementNS(NS, 'path');
        path.setAttribute('d', d);
        const classes = ['connector-path', colorClass];
        if (opts.dashed) classes.push('dashed');
        if (opts.inline) classes.push('inline-arrow');
        path.classList.add(...classes);
        if (opts.markerEnd !== false) {
            path.setAttribute('marker-end', `url(#arrow-${colorClass})`);
        }
        return path;
    }

    // ═══════════════════════════════════════
    // COORDINATE HELPERS (relative to wrapper)
    // ═══════════════════════════════════════
    function rel(el) {
        const wr = wrapper.getBoundingClientRect();
        const er = el.getBoundingClientRect();
        return {
            left: er.left - wr.left,
            right: er.right - wr.left,
            top: er.top - wr.top,
            bottom: er.bottom - wr.top,
            cx: er.left + er.width / 2 - wr.left,
            cy: er.top + er.height / 2 - wr.top,
            w: er.width,
            h: er.height
        };
    }

    // ═══════════════════════════════════════
    // DRAW ALL ARROWS
    // ═══════════════════════════════════════
    function drawAllArrows() {
        svg.innerHTML = '';
        svg.appendChild(createMarkerDefs());

        drawInlineArrows();
        drawCrossLaneConnections();
        drawSkipArc();
    }

    /**
     * INLINE ARROWS — connect right edge of node N to left edge of node N+1
     * for every consecutive pair of .step-node elements inside each .flow-row.
     */
    function drawInlineArrows() {
        // ── Building lane main flow ──
        const buildingNodes = Array.from(
            document.querySelectorAll('.main-building-flow > .step-node')
        );
        for (let i = 0; i < buildingNodes.length - 1; i++) {
            const a = rel(buildingNodes[i]);
            const b = rel(buildingNodes[i + 1]);
            // Straight horizontal line from right edge of A to left edge of B
            const y = (a.cy + b.cy) / 2;
            svg.appendChild(makePath(
                `M ${a.right} ${y} L ${b.left} ${y}`,
                'muted',
                { inline: true }
            ));
        }

        // ── Building → decision fork ──
        const lastBuildingNode = buildingNodes[buildingNodes.length - 1];
        const decisionFork = document.getElementById('decision-fork');
        if (lastBuildingNode && decisionFork) {
            const a = rel(lastBuildingNode);
            const b = rel(decisionFork);
            const y = (a.cy + b.cy) / 2;
            svg.appendChild(makePath(
                `M ${a.right} ${y} L ${b.left} ${y}`,
                'muted',
                { inline: true, markerEnd: false }
            ));
        }

        // ── Designing lane clusters ──
        document.querySelectorAll('.step-cluster').forEach(cluster => {
            const nodes = Array.from(cluster.querySelectorAll('.step-node'));
            for (let i = 0; i < nodes.length - 1; i++) {
                const a = rel(nodes[i]);
                const b = rel(nodes[i + 1]);
                const y = (a.cy + b.cy) / 2;
                svg.appendChild(makePath(
                    `M ${a.right} ${y} L ${b.left} ${y}`,
                    'purple',
                    { inline: true }
                ));
            }
        });
    }

    /**
     * CROSS-LANE CONNECTIONS — curved dashed paths between swim lanes.
     */
    function drawCrossLaneConnections() {
        const backloopSystem = document.getElementById('backloop-system');
        const clusterSystem = document.getElementById('cluster-system');
        const branchSystem = document.getElementById('branch-system');
        const nodeSystemSearch = document.getElementById('node-system-search');
        const backloopProduct = document.getElementById('backloop-product');
        const nodeLandList = document.getElementById('node-land-list');

        if (!backloopSystem || !clusterSystem || !branchSystem ||
            !nodeSystemSearch || !backloopProduct || !nodeLandList) return;

        // ── 1. Building back-loop → Designing cluster (top) ──
        const from1 = rel(backloopSystem);
        const to1 = rel(clusterSystem);
        const gap1 = to1.top - from1.bottom;
        svg.appendChild(makePath(
            `M ${from1.cx} ${from1.bottom} C ${from1.cx} ${from1.bottom + gap1 * 0.5}, ${to1.cx} ${to1.top - gap1 * 0.5}, ${to1.cx} ${to1.top}`,
            'indigo',
            { dashed: true }
        ));

        // ── 2. Decision branch ② → System search node (top) ──
        const from2 = rel(branchSystem);
        const to2 = rel(nodeSystemSearch);
        const gap2 = to2.top - from2.bottom;
        svg.appendChild(makePath(
            `M ${from2.cx} ${from2.bottom} C ${from2.cx} ${from2.bottom + gap2 * 0.5}, ${to2.cx} ${to2.top - gap2 * 0.5}, ${to2.cx} ${to2.top}`,
            'purple',
            { dashed: true }
        ));

        // ── 3. System search node (left) → backloop product label ──
        const from3 = rel(nodeSystemSearch);
        const mid3 = rel(backloopProduct);
        const dx3 = from3.left - mid3.right;
        svg.appendChild(makePath(
            `M ${from3.left} ${from3.cy} C ${from3.left - dx3 * 0.35} ${from3.cy}, ${mid3.right + dx3 * 0.35} ${mid3.cy}, ${mid3.right} ${mid3.cy}`,
            'purple',
            { dashed: true, markerEnd: false }
        ));

        // ── 4. Backloop product → Land on list node (bottom edge) ──
        const from4 = rel(backloopProduct);
        const to4 = rel(nodeLandList);
        const gap4 = from4.top - to4.bottom;
        svg.appendChild(makePath(
            `M ${from4.cx} ${from4.top} C ${from4.cx} ${from4.top - gap4 * 0.55}, ${to4.cx} ${to4.bottom + gap4 * 0.55}, ${to4.cx} ${to4.bottom}`,
            'blue',
            { dashed: true }
        ));
    }

    /**
     * SKIP ARC — yellow dashed curve from first building node to "Land on list" node.
     * Drawn in the board-level overlay SVG (not cross-lane) since it spans annotation + lanes.
     */
    function drawSkipArc() {
        boardSvg.innerHTML = '';
        boardSvg.appendChild(createMarkerDefs());

        const nodeStart = document.getElementById('node-need-product');
        const nodeEnd = document.getElementById('node-land-list');
        if (!nodeStart || !nodeEnd) return;

        const br = board.getBoundingClientRect();
        const s = nodeStart.getBoundingClientRect();
        const e = nodeEnd.getBoundingClientRect();

        // Start: top-center of first node
        const sx = s.left + s.width / 2 - br.left;
        const sy = s.top - br.top;

        // End: top-center of "Land on list" node
        const ex = e.left + e.width / 2 - br.left;
        const ey = e.top - br.top;

        // Arc peaks above the nodes
        const peakY = Math.min(sy, ey) - 26;

        const path = makePath(
            `M ${sx} ${sy} C ${sx} ${peakY}, ${ex} ${peakY}, ${ex} ${ey}`,
            'yellow',
            { dashed: true }
        );
        boardSvg.appendChild(path);
    }

    // Draw once entrance animations have settled
    setTimeout(drawAllArrows, 700);
    window.addEventListener('resize', drawAllArrows);

    // ═══════════════════════════════════════
    // COUNT-UP ANIMATION FOR STATS
    // ═══════════════════════════════════════
    const statValues = document.querySelectorAll('.stat-value');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const raw = el.textContent;
                const hasPlus = raw.includes('+');
                const num = parseInt(raw, 10);
                if (isNaN(num)) return;

                let current = 0;
                const duration = 1200;
                const step = Math.max(1, Math.floor(num / (duration / 30)));
                const interval = setInterval(() => {
                    current += step;
                    if (current >= num) {
                        current = num;
                        clearInterval(interval);
                    }
                    el.textContent = current + (hasPlus ? '+' : '');
                }, 30);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(el => observer.observe(el));

    // ═══════════════════════════════════════
    // MODAL LOGIC (PROJECT LINK)
    // ═══════════════════════════════════════
    const systemConfigTrigger = document.getElementById('trigger-system-configurator');
    const projectModal = document.getElementById('project-modal');
    const projectIframe = document.getElementById('project-iframe');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBackdrop = document.querySelector('.modal-backdrop');

    function openProjectModal(url) {
        if (!projectIframe || !projectModal) return;
        projectIframe.src = url;
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling on main page
    }

    function closeProjectModal() {
        if (!projectModal) return;
        projectModal.classList.remove('active');
        document.body.style.overflow = '';

        // Clear iframe src after transition to stop background processes/audio
        setTimeout(() => {
            if (projectIframe) projectIframe.src = '';
        }, 400);
    }

    if (systemConfigTrigger) {
        systemConfigTrigger.addEventListener('click', () => {
            // Path to the Belden cart project relative to Current working directory
            openProjectModal('../AG belden cart/index.html');
        });
    }

    const aiChatbotTrigger = document.getElementById('trigger-ai-chatbot');
    if (aiChatbotTrigger) {
        aiChatbotTrigger.addEventListener('click', () => {
            openProjectModal('https://belden-frontend-tahgwtwoha-uc.a.run.app/');
        });
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeProjectModal);
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeProjectModal);
    }

    // ═══════════════════════════════════════
    // AI ASSISTANT LOGIC
    // ═══════════════════════════════════════
    const aiToggleBtn = document.getElementById('ai-toggle-btn');
    const aiChatPanel = document.getElementById('ai-chat-panel');
    const aiCloseBtn = document.getElementById('ai-close-btn');
    const aiInput = document.getElementById('ai-input');
    const aiSendBtn = document.getElementById('ai-send-btn');
    const chatMessages = document.getElementById('chat-messages');

    if (aiToggleBtn && aiChatPanel) {
        aiToggleBtn.addEventListener('click', () => {
            aiChatPanel.classList.toggle('active');
            if (aiChatPanel.classList.contains('active')) {
                aiInput.focus();
            }
        });

        // Highlight specific phase
        const highlightPhase = (phase) => {
            const board = document.getElementById('journey-board');

            // Clear previous highlights
            board.classList.remove('board-dimmed');
            document.querySelectorAll('.node-active').forEach(el => el.classList.remove('node-active'));

            if (!phase) return;

            const nodes = document.querySelectorAll(`[data-step="${phase}"]`);
            if (nodes.length > 0) {
                board.classList.add('board-dimmed');
                nodes.forEach(node => {
                    node.classList.add('node-active');

                    // Highlight custom parent containers if they exist
                    const parentCluster = node.closest('.step-cluster');
                    if (parentCluster) parentCluster.classList.add('node-active');

                    const parentBranch = node.closest('.decision-branch');
                    if (parentBranch) parentBranch.classList.add('node-active');
                });
            }
        };

        aiCloseBtn.addEventListener('click', () => {
            aiChatPanel.classList.remove('active');
            highlightPhase(null); // Clear highlights when closed
        });

        // Simple pseudo-AI logic using existing cardData
        const generateAiResponse = (userText) => {
            const lowerText = userText.toLowerCase();
            let responseHtml = "I'm not sure I understand. Try asking about a specific phase, like 'What happens in phase 1?' or 'Tell me about system configurators'.";
            let targetPhase = null;

            // Check phases
            if (lowerText.includes('phase 1') || lowerText.includes('identif') || lowerText.includes('need')) {
                responseHtml = cardData[1].html;
                targetPhase = 1;
            } else if (lowerText.includes('phase 2') || lowerText.includes('look') || lowerText.includes('search')) {
                responseHtml = cardData[2].html;
                targetPhase = 2;
            } else if (lowerText.includes('phase 3') || lowerText.includes('find') || lowerText.includes('right product')) {
                responseHtml = cardData[3].html;
                targetPhase = 3;
            } else if (lowerText.includes('phase 4') || lowerText.includes('configur')) {
                responseHtml = cardData[4].html;
                targetPhase = 4;
            } else if (lowerText.includes('phase 5') || lowerText.includes('switch') || lowerText.includes('designing')) {
                responseHtml = cardData[5].html;
                targetPhase = 5;
            } else if (lowerText.includes('phase 6') || lowerText.includes('resolut') || lowerText.includes('outcome')) {
                responseHtml = cardData[6].html;
                targetPhase = 6;
            }

            return { html: responseHtml, targetPhase };
        };

        const handleSend = () => {
            const text = aiInput.value.trim();
            if (!text) return;

            // Add user message
            const userMsg = document.createElement('div');
            userMsg.className = 'message user-message';
            userMsg.innerHTML = `<div class="message-content">${text}</div>`;
            chatMessages.appendChild(userMsg);

            aiInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Clear highlights while "thinking"
            highlightPhase(null);

            // Add typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'typing-indicator';
            typingIndicator.innerHTML = `<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>`;
            chatMessages.appendChild(typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Simulate delay
            setTimeout(() => {
                typingIndicator.remove();

                const response = generateAiResponse(text);
                const aiMsg = document.createElement('div');
                aiMsg.className = 'message ai-message';
                aiMsg.innerHTML = `<div class="message-content">${response.html}</div>`;
                chatMessages.appendChild(aiMsg);

                // Highlight the board based on response
                highlightPhase(response.targetPhase);

                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000 + Math.random() * 1000); // 1-2s delay
        };

        aiSendBtn.addEventListener('click', handleSend);
        aiInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }

    // ═══════════════════════════════════════
    // DATA SYNTHESIS INTRO ANIMATION
    // ═══════════════════════════════════════
    const initDataSynthesisAnimation = () => {
        const overlay = document.getElementById('data-synthesis-overlay');
        const journeyContainer = document.querySelector('.journey-hidden');

        if (!overlay || !journeyContainer) return;

        const dataTypes = [
            "User Interview", "Bug Report #112", "Analytics Data", "Support Ticket",
            "Competitor Matrix", "Call Transcript", "Feature Request", "Survey Response #84",
            "Sales Data Q3", "Churn Reason", "NPS Score", "Usability Test", "Heatmap Analysis"
        ];

        const numParticles = 150;

        // Spawn particles
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'data-particle particle-scatter';

            // Randomize text, position, and rotation
            particle.textContent = dataTypes[Math.floor(Math.random() * dataTypes.length)];

            // Spread across 120% of viewport to allow drifting in from edges
            const top = -10 + Math.random() * 120;
            const left = -10 + Math.random() * 120;
            const rot = -45 + Math.random() * 90;
            const scale = 0.5 + Math.random() * 0.8;

            particle.style.top = `${top}%`;
            particle.style.left = `${left}%`;
            particle.style.transform = `scale(${scale}) rotate(${rot}deg)`;

            // Random animation delay and duration for the initial float
            particle.style.transitionDelay = `${Math.random() * 0.5}s`;

            overlay.appendChild(particle);
        }

        // Sequence timeline
        setTimeout(() => {
            // Stage 1: Particles appear and drift (handled by initial class and layout)
            const allParticles = document.querySelectorAll('.data-particle');

            // Slight drift movement
            allParticles.forEach(p => {
                const currentRot = parseFloat(p.style.transform.split('rotate(')[1]) || 0;
                p.style.transform = `scale(1) translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) rotate(${currentRot + (Math.random() * 20 - 10)}deg)`;
                p.style.opacity = '1';
            });

            // Stage 2: Convergence
            setTimeout(() => {
                allParticles.forEach(p => {
                    p.className = 'data-particle particle-converge';
                    // Remove individual transforms to let CSS class take over
                    p.style.transform = '';
                    p.style.transitionDelay = `${Math.random() * 0.2}s`; // Snap in closely together
                });

                // Stage 3: The unified bubble expands and reveals the journey
                setTimeout(() => {
                    allParticles.forEach(p => {
                        p.className = 'data-particle particle-expand';
                        p.style.transitionDelay = '0s'; // Expand instantly all together
                    });

                    // Reveal the structured journey board
                    journeyContainer.classList.add('journey-reveal');
                    journeyContainer.classList.remove('journey-hidden');

                    // Fade out overlay
                    setTimeout(() => {
                        overlay.classList.add('fade-out');

                        // Cleanup DOM
                        setTimeout(() => {
                            overlay.remove();
                        }, 1000);
                    }, 500); // Overlay fades shortly after expansion starts

                }, 1000); // Wait for particles to converge

            }, 2000); // Wait for initial drift

        }, 100); // Brief delay after DOM load
    };

    // Start Intro Animation
    initDataSynthesisAnimation();
});
