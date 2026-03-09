/* ═══════════════════════════════════════════════════════
   OKTA JOURNEY — Flowchart Connector Lines
   Draws SVG bezier curves between DO-section nodes.
   ═══════════════════════════════════════════════════════ */

(function () {
    'use strict';

    /* ── Connection map — simplified left-to-right flow ── */
    const CONNECTIONS = [
        // Pre-Awareness
        { from: 'node-A1', to: 'node-B1', exit: 'right', enter: 'left' },
        { from: 'node-A1', to: 'node-B2', exit: 'right', enter: 'left' },
        { from: 'node-A2', to: 'node-B3', exit: 'right', enter: 'left' },

        // Pre-Awareness → Awareness
        { from: 'node-B2', to: 'node-C1', exit: 'right', enter: 'left' },
        { from: 'node-B1', to: 'node-C1', exit: 'right', enter: 'left' },
        { from: 'node-B3', to: 'node-C1', exit: 'right', enter: 'left' },

        // Within Awareness
        { from: 'node-C3', to: 'node-C2', exit: 'top', enter: 'bottom' },

        // Awareness → Evaluation
        { from: 'node-C1', to: 'node-D2', exit: 'right', enter: 'left' },
        { from: 'node-C2', to: 'node-D4', exit: 'right', enter: 'left' },

        // Within Evaluation
        { from: 'node-D5', to: 'node-D4', exit: 'top', enter: 'bottom' },
        { from: 'node-D2', to: 'node-D5', exit: 'bottom', enter: 'top' },

        // Evaluation → Selection
        { from: 'node-D2', to: 'node-E1', exit: 'right', enter: 'left' },
        { from: 'node-D4', to: 'node-E2', exit: 'right', enter: 'left' },

        // Selection → Adoption
        { from: 'node-E1', to: 'node-F1', exit: 'right', enter: 'left' },
        { from: 'node-E2', to: 'node-F2', exit: 'right', enter: 'left' },

        // Adoption → Renewal
        { from: 'node-F1', to: 'node-G2', exit: 'right', enter: 'left' },
        { from: 'node-F2', to: 'node-G2', exit: 'right', enter: 'left' },
    ];

    const SVG_NS = 'http://www.w3.org/2000/svg';
    const LINE_COLOR = 'rgba(138, 132, 255, 0.22)';
    const LINE_WIDTH = 1.2;
    const ARROW_SIZE = 4;

    let svg, container;

    /* ── Initialise ── */
    function init() {
        svg = document.getElementById('flowchart-svg');
        container = document.getElementById('flowchart-area');
        if (!svg || !container) return;

        // Define arrowhead marker
        const defs = createSVG('defs');
        const marker = createSVG('marker', {
            id: 'arrowhead',
            markerWidth: ARROW_SIZE * 2,
            markerHeight: ARROW_SIZE * 2,
            refX: ARROW_SIZE,
            refY: ARROW_SIZE / 2,
            orient: 'auto',
            markerUnits: 'userSpaceOnUse',
        });
        const arrowPath = createSVG('polygon', {
            points: `0,0 ${ARROW_SIZE},${ARROW_SIZE / 2} 0,${ARROW_SIZE}`,
            fill: LINE_COLOR,
        });
        marker.appendChild(arrowPath);
        defs.appendChild(marker);
        const filter = createSVG('filter', { id: 'pulseFilter', x: '-50%', y: '-50%', width: '200%', height: '200%' });
        filter.innerHTML = `
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.0" result="blur1" />
            <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        `;
        defs.appendChild(filter);

        svg.appendChild(defs);

        draw();
        window.addEventListener('resize', debounce(draw, 150));
    }

    let pulseAnimationId = null;
    const pulseParticles = [];   // Array of { circle, path, duration, offset }

    /* ── Draw all connections ── */
    function draw() {
        // Cancel any running pulse animation loop
        if (pulseAnimationId) cancelAnimationFrame(pulseAnimationId);
        pulseParticles.length = 0;

        // Remove previous paths and circles (keep defs)
        svg.querySelectorAll('path, circle').forEach(p => p.remove());

        const containerRect = container.getBoundingClientRect();

        // Size SVG to fill container
        svg.setAttribute('width', container.scrollWidth);
        svg.setAttribute('height', container.scrollHeight);
        svg.setAttribute('viewBox', `0 0 ${container.scrollWidth} ${container.scrollHeight}`);

        CONNECTIONS.forEach(conn => {
            const fromEl = document.getElementById(conn.from);
            const toEl = document.getElementById(conn.to);
            if (!fromEl || !toEl) return;

            const fromRect = fromEl.getBoundingClientRect();
            const toRect = toEl.getBoundingClientRect();

            const start = getAnchor(fromRect, containerRect, conn.exit);
            const end = getAnchor(toRect, containerRect, conn.enter);

            const d = buildBezier(start, end, conn.exit, conn.enter);

            const path = createSVG('path', {
                d: d,
                fill: 'none',
                stroke: LINE_COLOR,
                'stroke-width': LINE_WIDTH,
                'stroke-linecap': 'round',
                'marker-end': 'url(#arrowhead)',
            });

            svg.appendChild(path);

            // Line-draw animation
            try {
                const totalLen = path.getTotalLength();
                path.style.strokeDasharray = totalLen;
                path.style.strokeDashoffset = totalLen;
                path.style.animation = `drawLine 0.6s ease forwards`;
                path.style.animationDelay = `${0.8 + Math.random() * 0.6}s`;
            } catch (_) { /* fallback: just show */ }

            // === Data Flow Pulses (JS-driven) ===
            const targetChar = conn.to.charAt(5); // e.g. 'node-D2' -> 'D'
            let phaseIndex = 0;
            if (targetChar === 'C') phaseIndex = 1;
            else if (targetChar === 'D') phaseIndex = 2;
            else if (targetChar === 'E') phaseIndex = 3;
            else if (targetChar === 'F') phaseIndex = 4;
            else if (targetChar === 'G') phaseIndex = 5;

            // Later phases: more particles, faster speed
            const numPulses = 1 + Math.floor(phaseIndex * 1.2);  // 1 → 7
            const duration = Math.max(2500, 6000 - (phaseIndex * 700));  // ms

            for (let i = 0; i < numPulses; i++) {
                const circle = createSVG('circle', {
                    r: 1.0,
                    fill: '#7dd3fc',
                    filter: 'url(#pulseFilter)',
                    opacity: 0.15
                });
                svg.appendChild(circle);

                // Stagger evenly so particles are spread across the path
                const offset = (duration / numPulses) * i;

                pulseParticles.push({ circle, path, duration, offset });
            }
        });

        // Start the animation loop
        startPulseAnimation();
    }

    /* ── Animate all pulse particles via requestAnimationFrame ── */
    function startPulseAnimation() {
        const startTime = performance.now();

        function tick(now) {
            const elapsed = now - startTime;

            for (const p of pulseParticles) {
                try {
                    const totalLen = p.path.getTotalLength();
                    // Calculate position along path (0 → 1, looping)
                    const t = ((elapsed + p.offset) % p.duration) / p.duration;
                    const point = p.path.getPointAtLength(t * totalLen);

                    p.circle.setAttribute('cx', point.x);
                    p.circle.setAttribute('cy', point.y);

                    // Fade in at start, fade out at end for smooth looping
                    let opacity = 0.15;
                    if (t < 0.08) opacity = t / 0.08 * 0.15;
                    else if (t > 0.92) opacity = (1 - t) / 0.08 * 0.15;
                    p.circle.setAttribute('opacity', opacity);
                } catch (_) { /* skip if path not ready */ }
            }

            pulseAnimationId = requestAnimationFrame(tick);
        }

        pulseAnimationId = requestAnimationFrame(tick);
    }

    /* ── Get anchor point on an element edge ── */
    function getAnchor(elRect, parentRect, side) {
        const scrollX = container.scrollLeft || 0;
        const scrollY = container.scrollTop || 0;

        const x = elRect.left - parentRect.left + scrollX;
        const y = elRect.top - parentRect.top + scrollY;
        const w = elRect.width;
        const h = elRect.height;

        switch (side) {
            case 'top': return { x: x + w / 2, y: y };
            case 'bottom': return { x: x + w / 2, y: y + h };
            case 'left': return { x: x, y: y + h / 2 };
            case 'right': return { x: x + w, y: y + h / 2 };
            default: return { x: x + w / 2, y: y + h / 2 };
        }
    }

    /* ── Build cubic bezier path ── */
    function buildBezier(start, end, exitDir, enterDir) {
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Control point offset — proportional to distance
        const tension = Math.min(dist * 0.4, 80);

        let cp1 = { ...start };
        let cp2 = { ...end };

        // Exit direction control point
        switch (exitDir) {
            case 'right': cp1.x += tension; break;
            case 'left': cp1.x -= tension; break;
            case 'bottom': cp1.y += tension; break;
            case 'top': cp1.y -= tension; break;
        }

        // Enter direction control point
        switch (enterDir) {
            case 'left': cp2.x -= tension; break;
            case 'right': cp2.x += tension; break;
            case 'top': cp2.y -= tension; break;
            case 'bottom': cp2.y += tension; break;
        }

        return `M ${start.x} ${start.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${end.x} ${end.y}`;
    }

    /* ── Helpers ── */
    function createSVG(tag, attrs) {
        const el = document.createElementNS(SVG_NS, tag);
        if (attrs) {
            Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
        }
        return el;
    }

    function debounce(fn, ms) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), ms);
        };
    }

    /* ── CSS animation for line drawing ── */
    const style = document.createElement('style');
    style.textContent = `
        @keyframes drawLine {
            to { stroke-dashoffset: 0; }
        }
        .flowchart-svg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            overflow: visible;
        }
        #flowchart-area {
            position: relative;
        }
        #do-flowchart {
            position: relative;
            z-index: 1;
        }
    `;
    document.head.appendChild(style);

    /* ── Column Hover Effect for Flowchart Backgrounds ── */
    function initColumnHover() {
        const flowCols = document.querySelectorAll('.flow-col');

        // Build an array of columns. Each column has an index 0-5.
        // It consists of the phase header, the think cells in that column, and the flow col itself.
        const columns = Array.from({ length: 6 }).map((_, i) => {
            const elements = [];

            const header = document.querySelector(`.okta-col-header:nth-child(${i + 2})`);
            if (header) elements.push(header);

            document.querySelectorAll('.think-sub-row').forEach(row => {
                const cell = row.querySelector(`.think-cell:nth-child(${i + 2})`);
                if (cell) elements.push(cell);
            });

            const flowCol = flowCols[i];
            if (flowCol) elements.push(flowCol);

            return { index: i, elements, flowCol, header };
        });

        columns.forEach(col => {
            col.elements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    if (col.flowCol) col.flowCol.classList.add('hover-bg-active');
                    if (col.header) col.header.classList.add('hover-bg-active');
                });
                el.addEventListener('mouseleave', () => {
                    if (col.flowCol) col.flowCol.classList.remove('hover-bg-active');
                    if (col.header) col.header.classList.remove('hover-bg-active');
                });
            });
        });
    }

    /* ── Persona Popup – Open / Close ── */
    function initPersonaPopup() {
        const overlay = document.getElementById('persona-popup-overlay');
        const closeBtn = document.getElementById('persona-popup-close');
        if (!overlay) return;

        // Open on any "Business Leader" bar click
        document.querySelectorAll('.persona-bar.biz').forEach(bar => {
            bar.addEventListener('click', () => {
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // prevent background scroll
            });
        });

        function closePopup() {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Close button
        if (closeBtn) closeBtn.addEventListener('click', closePopup);

        // Backdrop click (outside the card)
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closePopup();
        });

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) closePopup();
        });
    }

    /* ── Persona Chat – Immersive AI Conversation ── */
    function initPersonaChat() {
        const messagesEl = document.getElementById('persona-chat-messages');
        const inputEl = document.getElementById('persona-chat-input');
        const sendBtn = document.getElementById('persona-chat-send');
        const chipsEl = document.getElementById('persona-chat-chips');
        if (!messagesEl || !inputEl) return;

        /* ── Knowledge Base — Business Leader speaks in first person ── */
        const KB = [
            {
                keywords: ['night', 'worry', 'concern', 'keeps you up', 'afraid', 'fear', 'risk'],
                response: "Honestly? I lose sleep over friction in the customer experience. Every extra click is lost revenue. But I also can't sacrifice security — a data breach would be catastrophic. Balancing frictionless UX with airtight security is my constant tension."
            },
            {
                keywords: ['evaluate', 'vendor', 'compare', 'choose', 'select', 'assess'],
                response: "I start with analyst reports and peer recommendations — Gartner, Forrester, that kind of thing. Then I look at business value: will this drive conversion? Can it scale? I rely heavily on case studies from companies similar to ours. My team also needs to test it hands-on before I sign off."
            },
            {
                keywords: ['purchase', 'buy', 'decision', 'budget', 'invest', 'spending'],
                response: "In Customer Identity scenarios, I'm the decision maker for identity solutions. For Workforce identity, I'm still a key decision maker but I collaborate more with the CTO and CISO. I need to see a clear ROI case — cost vs. impact — and get buy-in from the entire purchasing committee."
            },
            {
                keywords: ['content', 'resource', 'read', 'consume', 'information', 'learn'],
                response: "I'm drawn to case studies, demos, and video content — I need to see business value, not just technical specs. I want analyst reports, industry trends, and pricing information upfront. I'll also check peer reviews on forums. Don't make me dig through developer docs to find business value."
            },
            {
                keywords: ['feel', 'emotion', 'frustrat', 'overwhelm', 'experience', 'sentiment'],
                response: "The evaluation process is emotionally exhausting. I start motivated, but quickly feel overwhelmed investigating dozens of vendors across countless websites. When I finally narrow the shortlist, I feel encouraged. The worst part? Implementation roadblocks after purchase — that makes me genuinely angry."
            },
            {
                keywords: ['challenge', 'barrier', 'obstacle', 'problem', 'struggle', 'difficult', 'hard'],
                response: "My biggest challenges are: 1) Accessing the right information — vendor sites are confusing. 2) Getting free trials that actually let my team test fully. 3) It's incredibly hard to directly compare vendors' products and pricing for our specific needs."
            },
            {
                keywords: ['goal', 'objective', 'priority', 'target', 'aim', 'want'],
                response: "My core objectives are: driving conversion and revenue growth, enabling frictionless onboarding, boosting customer engagement across all channels, and protecting against attacks — all while keeping multi-factor authentication seamless. Growth without compromising security."
            },
            {
                keywords: ['team', 'organization', 'report', 'structure', 'hierarchy', 'who'],
                response: "I typically hold titles like CMO/CDO, CPO, or VP of Marketing. I report to the CEO, and work closely with the CFO on budget. I collaborate with the CTO and CIO/CISO on technology decisions, but my primary focus is the business outcome, not the technical architecture."
            },
            {
                keywords: ['channel', 'web', 'mobile', 'platform', 'reach', 'touchpoint'],
                response: "I prefer web and mobile channels. On the main website, I visit Home, Products, Solutions, Pricing, and Resources. For other acquired products, similar pages. I want everything SEO-friendly so I can find executive-level explanations of identity tools — not buried in a developer portal."
            },
            {
                keywords: ['segment', 'enterprise', 'commercial', 'size', 'company'],
                response: "It depends on the segment. In Strategic & Enterprise, I'm a decision influencer — I define business needs and push for technology-driven competitive advantage. In Commercial, I'm more of a direct decision maker, collaborating closely with IT leaders on productivity and cost efficiency outcomes."
            },
            {
                keywords: ['cross-sell', 'expand', 'upsell', 'more', 'growth', 'renewal'],
                response: "When it comes to expanding identity solutions, I'm an important stakeholder but not the primary decision maker. I'll defer to tech and security leaders for technical assessment, but I need to see the business case — ROI, customer impact, competitive advantage."
            },
            {
                keywords: ['identity', 'solution', 'platforms', 'tools', 'product'],
                response: "I need an identity solution that drives business results: faster customer onboarding, reduced friction, omnichannel access, and revenue growth. I want to see the product's business value clearly, not just its technical capabilities. Show me how it impacts my KPIs."
            },
            {
                keywords: ['think', 'mindset', 'perspective', 'view'],
                response: "I'm constantly thinking about three things: driving growth, scaling the business easily and securely, and staying ahead of the competition. I need personalization for customer offerings and I'm always concerned about maintaining a frictionless experience while protecting privacy."
            },
            {
                keywords: ['do', 'action', 'day', 'typical', 'activity', 'behavior'],
                response: "Day to day, I talk to my IT team about technology needs, lean on my professional network for advice and recommendations, and stay current by reading thought-leadership articles. When evaluating solutions, I follow industry analysts closely."
            },
            {
                keywords: ['roi', 'measure', 'success', 'metric', 'value', 'impact'],
                response: "Measuring ROI is actually one of my pain points. After implementation, I work with Customer Success and Sales to measure the impact, but it's often unclear how to quantify it. I need clear dashboards and business-value metrics, not just uptime percentages."
            },
            {
                keywords: ['implement', 'adopt', 'onboard', 'setup', 'deploy', 'launch'],
                response: "I want to get new solutions up and running as quickly and seamlessly as possible. The implementation phase is where my frustration peaks — developers often have to learn implementation without trying the product first. There's rarely a single source of truth for implementation guidance."
            },
            {
                keywords: ['ux', 'user experience', 'design', 'interface', 'calculator'],
                response: "I need SEO-friendly vendor comparisons, an ROI calculator, customizable solution offerings, and easy access to sales reps and support teams. I also care about upcoming product releases and the roadmap — specifically how they'll create business value."
            },
            {
                keywords: ['security', 'privacy', 'protect', 'compliance', 'threat', 'attack'],
                response: "Security is non-negotiable for me. I need attack protection and multi-factor authentication, but they can't create friction in the customer experience. It's a delicate balance — I want customers to feel safe without feeling blocked."
            },
        ];

        const FALLBACK_RESPONSES = [
            "That's an interesting angle. From my perspective as a Business Leader, everything ties back to customer experience and growth. Can you be more specific about what aspect you'd like to explore?",
            "Good question. I focus on the business outcomes — revenue, customer satisfaction, competitive advantage. My peers in technology and security handle the technical deep-dives. What business aspect are you curious about?",
            "I'd love to share more on that. My world revolves around conversion, frictionless experiences, and scaling without risk. Try asking me about my evaluation process, challenges, or what content I find most useful.",
        ];

        let isBusy = false;

        function findResponse(query) {
            const q = query.toLowerCase();
            let bestMatch = null;
            let bestScore = 0;
            for (const entry of KB) {
                const score = entry.keywords.filter(kw => q.includes(kw)).length;
                if (score > bestScore) { bestScore = score; bestMatch = entry; }
            }
            if (bestMatch) return bestMatch.response;
            return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
        }

        function addMessage(text, type) {
            const msg = document.createElement('div');
            msg.className = `chat-msg ${type}-msg`;
            if (type === 'persona') {
                msg.innerHTML = `
                    <div class="chat-msg-avatar"><img src="persona-business-leader.png" alt="" /></div>
                    <div class="chat-msg-bubble">${text}</div>`;
            } else {
                msg.innerHTML = `<div class="chat-msg-bubble">${text}</div>`;
            }
            messagesEl.appendChild(msg);
            messagesEl.scrollTop = messagesEl.scrollHeight;
        }

        function showTyping() {
            const typing = document.createElement('div');
            typing.className = 'chat-msg persona-msg';
            typing.id = 'typing-msg';
            typing.innerHTML = `
                <div class="chat-msg-avatar"><img src="persona-business-leader.png" alt="" /></div>
                <div class="chat-msg-bubble typing-indicator"><span></span><span></span><span></span></div>`;
            messagesEl.appendChild(typing);
            messagesEl.scrollTop = messagesEl.scrollHeight;
        }

        function removeTyping() {
            const t = document.getElementById('typing-msg');
            if (t) t.remove();
        }

        function handleSend() {
            const text = inputEl.value.trim();
            if (!text || isBusy) return;

            isBusy = true;
            addMessage(text, 'user');
            inputEl.value = '';

            // Show typing after short pause
            setTimeout(() => {
                showTyping();
                // Respond after 1-2s
                const delay = 1000 + Math.random() * 1200;
                setTimeout(() => {
                    removeTyping();
                    addMessage(findResponse(text), 'persona');
                    isBusy = false;
                }, delay);
            }, 400);
        }

        // Send button
        sendBtn.addEventListener('click', handleSend);

        // Enter key
        inputEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleSend();
        });

        // Suggestion chips
        chipsEl.addEventListener('click', (e) => {
            const chip = e.target.closest('.chat-chip');
            if (!chip || isBusy) return;
            const question = chip.getAttribute('data-question');
            inputEl.value = question;
            handleSend();
        });
    }

    /* ── Boot ── */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(() => { init(); initColumnHover(); initPersonaPopup(); initPersonaChat(); }, 200));
    } else {
        setTimeout(() => { init(); initColumnHover(); initPersonaPopup(); initPersonaChat(); }, 200);
    }

})();
