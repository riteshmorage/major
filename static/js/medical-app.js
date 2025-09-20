/**
 * 🧠 MEDICAL APP JAVASCRIPT
 * ========================
 * 
 * Modern JavaScript functionality for Fetal Brain Abnormality Detection System
 * Features: Drag & Drop, Real-time Analysis, Interactive UI Components
 * 
 * Author: Medical AI System
 * Technology: Vanilla JS ES6+ with Modern APIs
 */

class MedicalApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.startHealthCheck();
    }

    setupEventListeners() {
        // Global event listeners
        document.addEventListener('DOMContentLoaded', this.onDOMReady.bind(this));
        window.addEventListener('load', this.onWindowLoad.bind(this));
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    onDOMReady() {
        console.log('🏥 Medical App: DOM Ready');
        this.initializeAnimations();
        this.setupAccessibility();
    }

    onWindowLoad() {
        console.log('🏥 Medical App: Window Loaded');
        this.preloadAssets();
    }

    onWindowResize() {
        this.handleResponsiveLayout();
    }

    initializeComponents() {
        // Initialize tooltips if Bootstrap is available
        if (typeof bootstrap !== 'undefined') {
            const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        }

        // Initialize progress bars
        this.initializeProgressBars();
    }

    initializeAnimations() {
        // Intersection Observer for animations
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '50px'
            });

            // Observe elements with animation classes
            document.querySelectorAll('.fade-in, .slide-up, .scale-in').forEach(el => {
                observer.observe(el);
            });
        }
    }

    initializeProgressBars() {
        const progressBars = document.querySelectorAll('.confidence-fill');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
    }

    setupAccessibility() {
        // Add ARIA labels and roles
        const buttons = document.querySelectorAll('button:not([aria-label])');
        buttons.forEach(button => {
            const text = button.textContent.trim();
            if (text) {
                button.setAttribute('aria-label', text);
            }
        });

        // Keyboard navigation for custom components
        this.setupKeyboardNavigation();
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // ESC key to close modals
            if (e.key === 'Escape') {
                const openModals = document.querySelectorAll('.modal.show');
                openModals.forEach(modal => {
                    const modalInstance = bootstrap.Modal.getInstance(modal);
                    if (modalInstance) {
                        modalInstance.hide();
                    }
                });
            }

            // Enter key for custom buttons
            if (e.key === 'Enter' && e.target.classList.contains('custom-btn')) {
                e.target.click();
            }
        });
    }

    handleResponsiveLayout() {
        const width = window.innerWidth;
        
        // Adjust layout for mobile devices
        if (width < 768) {
            document.body.classList.add('mobile-layout');
        } else {
            document.body.classList.remove('mobile-layout');
        }

        // Adjust sidebar on tablets
        if (width >= 768 && width < 992) {
            document.body.classList.add('tablet-layout');
        } else {
            document.body.classList.remove('tablet-layout');
        }
    }

    preloadAssets() {
        // Preload critical images
        const criticalImages = [
            '/static/images/brain-icon.png',
            '/static/images/medical-bg.jpg'
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    startHealthCheck() {
        // Check if all required services are available
        this.healthCheck = setInterval(() => {
            this.checkSystemHealth();
        }, 30000); // Check every 30 seconds
    }

    checkSystemHealth() {
        // Simple health check - can be expanded
        const healthIndicators = document.querySelectorAll('.health-indicator');
        const isHealthy = navigator.onLine && document.readyState === 'complete';
        
        healthIndicators.forEach(indicator => {
            indicator.classList.toggle('healthy', isHealthy);
            indicator.classList.toggle('unhealthy', !isHealthy);
        });
    }

    // Utility methods
    static showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show notification`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        // Add to page
        const container = document.querySelector('.notification-container') || document.body;
        container.appendChild(notification);

        // Auto remove
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, duration);

        return notification;
    }

    static formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    static formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(date));
    }

    static validateImage(file) {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp', 'image/tiff'];
        const maxSize = 16 * 1024 * 1024; // 16MB

        if (!validTypes.includes(file.type)) {
            throw new Error('Invalid file type. Please upload an image file (JPEG, PNG, GIF, BMP, TIFF)');
        }

        if (file.size > maxSize) {
            throw new Error('File too large. Maximum size is 16MB');
        }

        return true;
    }

    static animateNumber(element, start, end, duration = 1000) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.round(current);
        }, 16);
    }

    static createConfidenceChart(element, confidence) {
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        element.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const centerX = 50;
        const centerY = 50;
        const radius = 40;

        // Draw background circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 8;
        ctx.stroke();

        // Draw confidence arc
        const startAngle = -Math.PI / 2;
        const endAngle = startAngle + (confidence / 100) * 2 * Math.PI;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        
        // Color based on confidence level
        if (confidence >= 90) {
            ctx.strokeStyle = '#10b981'; // Green
        } else if (confidence >= 70) {
            ctx.strokeStyle = '#f59e0b'; // Yellow
        } else {
            ctx.strokeStyle = '#ef4444'; // Red
        }
        
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Draw percentage text
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 16px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${confidence}%`, centerX, centerY);
    }
}

/**
 * 📊 ANALYTICS TRACKING
 * ====================
 */
class MedicalAnalytics {
    constructor() {
        this.sessionStart = Date.now();
        this.events = [];
    }

    track(event, data = {}) {
        const eventData = {
            event,
            timestamp: Date.now(),
            sessionDuration: Date.now() - this.sessionStart,
            userAgent: navigator.userAgent,
            url: window.location.href,
            ...data
        };

        this.events.push(eventData);
        console.log('📊 Analytics:', eventData);

        // Send to analytics service (implement as needed)
        this.sendToAnalytics(eventData);
    }

    sendToAnalytics(eventData) {
        // Implement analytics sending logic here
        // Could be Google Analytics, custom analytics, etc.
        if (typeof gtag !== 'undefined') {
            gtag('event', eventData.event, {
                custom_parameter: JSON.stringify(eventData)
            });
        }
    }

    getSessionSummary() {
        return {
            sessionDuration: Date.now() - this.sessionStart,
            totalEvents: this.events.length,
            uniqueEvents: [...new Set(this.events.map(e => e.event))].length,
            events: this.events
        };
    }
}

/**
 * 🔒 SECURITY UTILITIES
 * ====================
 */
class SecurityUtils {
    static sanitizeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    static validateCSRF() {
        const token = document.querySelector('meta[name="csrf-token"]');
        return token ? token.getAttribute('content') : null;
    }

    static secureFileUpload(file) {
        // Basic security checks for file uploads
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/tiff'];
        const maxSize = 16 * 1024 * 1024; // 16MB

        if (!allowedTypes.includes(file.type)) {
            throw new Error('Invalid file type');
        }

        if (file.size > maxSize) {
            throw new Error('File too large');
        }

        // Check for malicious file extensions
        const fileName = file.name.toLowerCase();
        const dangerousExtensions = ['.exe', '.bat', '.cmd', '.scr', '.pif', '.com'];
        
        for (const ext of dangerousExtensions) {
            if (fileName.includes(ext)) {
                throw new Error('Potentially dangerous file detected');
            }
        }

        return true;
    }
}

/**
 * 🎨 UI COMPONENTS
 * ================
 */
class UIComponents {
    static createLoadingSpinner(size = 'medium') {
        const spinner = document.createElement('div');
        spinner.className = `spinner-border text-primary spinner-${size}`;
        spinner.setAttribute('role', 'status');
        spinner.innerHTML = '<span class="visually-hidden">Loading...</span>';
        return spinner;
    }

    static showModal(title, content, buttons = []) {
        const modalId = 'dynamic-modal-' + Date.now();
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = modalId;
        modal.setAttribute('tabindex', '-1');
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    <div class="modal-footer">
                        ${buttons.map(btn => `<button type="button" class="btn btn-${btn.type || 'secondary'}" ${btn.dismiss ? 'data-bs-dismiss="modal"' : ''}>${btn.text}</button>`).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();

        // Clean up after modal is hidden
        modal.addEventListener('hidden.bs.modal', () => {
            modal.remove();
        });

        return modalInstance;
    }

    static createProgressBar(progress = 0, animated = true) {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress';
        progressBar.innerHTML = `
            <div class="progress-bar ${animated ? 'progress-bar-striped progress-bar-animated' : ''}" 
                 role="progressbar" 
                 style="width: ${progress}%" 
                 aria-valuenow="${progress}" 
                 aria-valuemin="0" 
                 aria-valuemax="100">
                ${progress}%
            </div>
        `;
        return progressBar;
    }

    static createToast(message, type = 'info', duration = 5000) {
        const toastContainer = document.querySelector('.toast-container') || this.createToastContainer();
        
        const toast = document.createElement('div');
        toast.className = `toast show align-items-center text-white bg-${type} border-0`;
        toast.setAttribute('role', 'alert');
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'danger' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;

        toastContainer.appendChild(toast);

        // Auto remove after duration
        setTimeout(() => {
            if (toast.parentNode) {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }
        }, duration);

        return toast;
    }

    static createToastContainer() {
        const container = document.createElement('div');
        container.className = 'toast-container position-fixed top-0 end-0 p-3';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
        return container;
    }
}

/**
 * 🔧 UTILITY FUNCTIONS
 * ====================
 */
const Utils = {
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },

    generateId() {
        return 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
    },

    copyToClipboard(text) {
        if (navigator.clipboard) {
            return navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                return Promise.resolve();
            } catch (err) {
                return Promise.reject(err);
            } finally {
                document.body.removeChild(textArea);
            }
        }
    },

    downloadFile(data, filename, type = 'text/plain') {
        const blob = new Blob([data], { type });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }
};

// Initialize the medical app
const medicalApp = new MedicalApp();
const analytics = new MedicalAnalytics();

// Track page view
analytics.track('page_view', {
    page: window.location.pathname,
    title: document.title
});

// Global error handling
window.addEventListener('error', (e) => {
    console.error('🚨 Global Error:', e.error);
    analytics.track('javascript_error', {
        message: e.error.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno
    });
});

// Global promise rejection handling
window.addEventListener('unhandledrejection', (e) => {
    console.error('🚨 Unhandled Promise Rejection:', e.reason);
    analytics.track('promise_rejection', {
        reason: e.reason.toString()
    });
});

// Export utilities for global use
window.MedicalApp = MedicalApp;
window.MedicalAnalytics = MedicalAnalytics;
window.SecurityUtils = SecurityUtils;
window.UIComponents = UIComponents;
window.Utils = Utils;

console.log('🏥 Medical App JavaScript Loaded Successfully!');