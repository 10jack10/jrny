/**
 * Onboarding Flow for Interactive Journey
 */

const onboardingSteps = [
    {
        title: "Welcome & Overview",
        description: "A bird's eye view of the journey framework: Think, Feel, and Do.",
        target: ".okta-body",
        media: "journeygifawarness.gif" // Placeholder or actual GIF
    },
    {
        title: "Deep Dive on Hover",
        description: "Hover over nodes to reveal detailed 'Buyer Mindsets' or 'Behavior' details.",
        target: ".buyer-mindset",
        media: "journeygifadoption.gif"
    },
    {
        title: "Interactive Elements",
        description: "Click on specific nodes to open presentations, wireframes, or deep dives.",
        target: "#node-D5",
        media: "journeygifevaluation.gif"
    },
    {
        title: "Meet the Personas",
        description: "You can chat with different personas to understand their unique perspectives and challenges.",
        target: ".persona-bar",
        media: "journeygifrenewal.gif"
    },
    {
        title: "Social Listening",
        description: "The 'Feel' section connects directly to Pulse Analytics. Click emotional labels to explore real social posts.",
        target: ".feel-label",
        media: "journeygifadoption.gif"
    },
    {
        title: "AI Assistant",
        description: "Need help? The Journey Assistant can answer deep questions about any phase or persona.",
        target: "#ai-toggle-btn",
        media: "okta-pre-auth-bg.gif"
    }
];

class Onboarding {
    constructor(steps) {
        this.steps = steps;
        this.currentStep = 0;
        this.init();
    }

    init() {
        this.createUI();
        this.attachEvents();
    }

    createUI() {
        const overlay = document.createElement('div');
        overlay.id = 'onboarding-overlay';
        overlay.className = 'onboarding-overlay hidden';
        overlay.innerHTML = `
            <div class="onboarding-spotlight"></div>
            <div class="onboarding-card">
                <button class="onboarding-close">&times;</button>
                <div class="onboarding-content">
                    <div class="onboarding-media">
                        <img src="" alt="Step Media" id="onboarding-media-img">
                    </div>
                    <div class="onboarding-text">
                        <h2 id="onboarding-title"></h2>
                        <p id="onboarding-desc"></p>
                    </div>
                </div>
                <div class="onboarding-footer">
                    <div class="onboarding-progress"></div>
                    <div class="onboarding-nav">
                        <button id="onboarding-prev" class="onboarding-btn secondary">Back</button>
                        <button id="onboarding-next" class="onboarding-btn primary">Next</button>
                        <button id="onboarding-start" class="onboarding-btn primary hidden">Start Exploring</button>
                    </div>
                </div>
                <button class="onboarding-skip">Skip Onboarding</button>
            </div>
        `;
        document.body.appendChild(overlay);

        this.overlay = overlay;
        this.card = overlay.querySelector('.onboarding-card');
        this.mediaImg = overlay.querySelector('#onboarding-media-img');
        this.title = overlay.querySelector('#onboarding-title');
        this.desc = overlay.querySelector('#onboarding-desc');
        this.progress = overlay.querySelector('.onboarding-progress');
        this.btnPrev = overlay.querySelector('#onboarding-prev');
        this.btnNext = overlay.querySelector('#onboarding-next');
        this.btnStart = overlay.querySelector('#onboarding-start');
        this.btnSkip = overlay.querySelector('.onboarding-skip');
        this.btnClose = overlay.querySelector('.onboarding-close');
        this.spotlight = overlay.querySelector('.onboarding-spotlight');

        this.createProgressDots();
    }

    createProgressDots() {
        this.steps.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'progress-dot';
            if (index === 0) dot.classList.add('active');
            this.progress.appendChild(dot);
        });
    }

    attachEvents() {
        this.btnNext.addEventListener('click', () => this.nextStep());
        this.btnPrev.addEventListener('click', () => this.prevStep());
        this.btnSkip.addEventListener('click', () => this.end());
        this.btnClose.addEventListener('click', () => this.end());
        this.btnStart.addEventListener('click', () => this.end());
    }

    start() {
        this.overlay.classList.remove('hidden');
        document.body.classList.add('onboarding-active');
        this.updateStep();
    }

    updateStep() {
        const step = this.steps[this.currentStep];
        this.title.innerText = step.title;
        this.desc.innerText = step.description;
        this.mediaImg.src = step.media;

        // Update Nav
        this.btnPrev.disabled = this.currentStep === 0;
        if (this.currentStep === this.steps.length - 1) {
            this.btnNext.classList.add('hidden');
            this.btnStart.classList.remove('hidden');
        } else {
            this.btnNext.classList.remove('hidden');
            this.btnStart.classList.add('hidden');
        }

        // Update Dots
        const dots = this.progress.querySelectorAll('.progress-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentStep);
        });

        this.highlightTarget(step.target);
    }

    nextStep() {
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.updateStep();
        }
    }

    prevStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.updateStep();
        }
    }

    highlightTarget(selector) {
        const target = document.querySelector(selector);
        if (!target) {
            this.spotlight.style.opacity = '0';
            this.card.style.top = `50%`;
            this.card.style.left = `50%`;
            this.card.style.transform = `translate(-50%, -50%)`;
            return;
        }

        // Use 'auto' instead of 'smooth' to ensure immediate positioning for the calculation
        target.scrollIntoView({ behavior: 'auto', block: 'center' });

        // Small timeout to ensure the browser has finished layouts
        setTimeout(() => {
            const rect = target.getBoundingClientRect();
            const padding = 15;

            this.spotlight.style.opacity = '1';
            this.spotlight.style.top = `${rect.top - padding}px`;
            this.spotlight.style.left = `${rect.left - padding}px`;
            this.spotlight.style.width = `${rect.width + padding * 2}px`;
            this.spotlight.style.height = `${rect.height + padding * 2}px`;

            // Dynamic Positioning with Collision Detection
            const cardRect = this.card.getBoundingClientRect();
            const cardHeight = cardRect.height || 550; // Updated fallback for larger card
            const viewportHeight = window.innerHeight;
            const margin = 20;

            if (rect.bottom + cardHeight + margin < viewportHeight) {
                // Fits BELOW target
                this.card.style.top = `${rect.bottom + margin}px`;
                this.card.style.left = `50%`;
                this.card.style.transform = `translateX(-50%)`;
            } else if (rect.top - cardHeight - margin > 0) {
                // Fits ABOVE target
                this.card.style.top = `${rect.top - cardHeight - margin}px`;
                this.card.style.left = `50%`;
                this.card.style.transform = `translateX(-50%)`;
            } else {
                // CENTER as fallback
                this.card.style.top = `50%`;
                this.card.style.left = `50%`;
                this.card.style.transform = `translate(-50%, -50%)`;
            }

            // Final safety clamp: Ensure it never goes off-screen vertically
            const newCardRect = this.card.getBoundingClientRect();
            if (newCardRect.bottom > viewportHeight) {
                this.card.style.top = `${viewportHeight - newCardRect.height - margin}px`;
            }
            if (newCardRect.top < 0) {
                this.card.style.top = `${margin}px`;
            }
        }, 50);
    }

    end() {
        this.overlay.classList.add('hidden');
        document.body.classList.remove('onboarding-active');
        localStorage.setItem('onboarding_completed', 'true');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const onboarding = new Onboarding(onboardingSteps);

    // Check if should start
    if (!localStorage.getItem('onboarding_completed')) {
        setTimeout(() => {
            onboarding.start();
        }, 2000); // Small delay for intro animations
    }

    // Allow manual re-trigger if needed (e.g., from a help button)
    window.startOnboarding = () => onboarding.start();
});
