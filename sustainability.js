// Sustainability Analytics Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Chart.js default configuration for dark theme
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
    Chart.defaults.backgroundColor = 'rgba(255, 255, 255, 0.05)';

    // Common chart options
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(10, 14, 26, 0.95)',
                titleColor: '#ffffff',
                bodyColor: '#94a3b8',
                borderColor: 'rgba(0, 212, 255, 0.3)',
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: false,
                titleFont: {
                    size: 14,
                    weight: 600
                },
                bodyFont: {
                    size: 13
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                    drawBorder: false
                },
                ticks: {
                    color: '#64748b',
                    font: {
                        size: 11
                    }
                }
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                    drawBorder: false
                },
                ticks: {
                    color: '#64748b',
                    font: {
                        size: 11
                    }
                }
            }
        }
    };

    // Sample data for charts
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    
    // CO2 Emissions Chart
    const co2Ctx = document.getElementById('co2Chart').getContext('2d');
    new Chart(co2Ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'CO₂ Emissions (Kgs)',
                data: [1200, 1150, 1100, 1050, 980, 920],
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#ef4444',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: '#ef4444',
                pointHoverBorderColor: '#ffffff',
                pointHoverBorderWidth: 3
            }]
        },
        options: {
            ...commonOptions,
            plugins: {
                ...commonOptions.plugins,
                tooltip: {
                    ...commonOptions.plugins.tooltip,
                    callbacks: {
                        label: function(context) {
                            return `CO₂ Emissions: ${context.parsed.y} Kgs`;
                        }
                    }
                }
            }
        }
    });

    // NOx Emissions Chart
    const noxCtx = document.getElementById('noxChart').getContext('2d');
    new Chart(noxCtx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'NOₓ Emissions (Kgs)',
                data: [85, 82, 78, 75, 72, 68],
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#f59e0b',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            ...commonOptions,
            plugins: {
                ...commonOptions.plugins,
                tooltip: {
                    ...commonOptions.plugins.tooltip,
                    callbacks: {
                        label: function(context) {
                            return `NOₓ Emissions: ${context.parsed.y} Kgs`;
                        }
                    }
                }
            }
        }
    });

    // Fresh Water Consumption Chart
    const waterCtx = document.getElementById('waterChart').getContext('2d');
    new Chart(waterCtx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: 'Fresh Water (m³)',
                data: [45, 42, 40, 38, 35, 33],
                backgroundColor: 'rgba(6, 182, 212, 0.8)',
                borderColor: '#06b6d4',
                borderWidth: 2,
                borderRadius: 6,
                borderSkipped: false
            }]
        },
        options: {
            ...commonOptions,
            plugins: {
                ...commonOptions.plugins,
                tooltip: {
                    ...commonOptions.plugins.tooltip,
                    callbacks: {
                        label: function(context) {
                            return `Fresh Water: ${context.parsed.y} m³`;
                        }
                    }
                }
            }
        }
    });

    // Lubricant Oil Consumption Chart
    const oilCtx = document.getElementById('oilChart').getContext('2d');
    new Chart(oilCtx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Lubricant Oil (litres)',
                data: [28, 26, 24, 22, 20, 18],
                borderColor: '#8b5cf6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#8b5cf6',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            ...commonOptions,
            plugins: {
                ...commonOptions.plugins,
                tooltip: {
                    ...commonOptions.plugins.tooltip,
                    callbacks: {
                        label: function(context) {
                            return `Lubricant Oil: ${context.parsed.y} litres`;
                        }
                    }
                }
            }
        }
    });

    // Waste Generated Breakdown Chart
    const wasteCtx = document.getElementById('wasteChart').getContext('2d');
    new Chart(wasteCtx, {
        type: 'doughnut',
        data: {
            labels: ['Organic Waste', 'Plastic Waste', 'Metal Waste', 'Chemical Waste', 'Other'],
            datasets: [{
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    'rgba(34, 197, 94, 0.8)',
                    'rgba(0, 212, 255, 0.8)',
                    'rgba(124, 58, 237, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(245, 158, 11, 0.8)'
                ],
                borderColor: [
                    '#22c55e',
                    '#00d4ff',
                    '#7c3aed',
                    '#ef4444',
                    '#f59e0b'
                ],
                borderWidth: 2,
                hoverBorderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        color: '#94a3b8',
                        font: {
                            size: 12
                        },
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 14, 26, 0.95)',
                    titleColor: '#ffffff',
                    bodyColor: '#94a3b8',
                    borderColor: 'rgba(0, 212, 255, 0.3)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.parsed}%`;
                        }
                    }
                }
            },
            cutout: '60%'
        }
    });

    // Supply Chain Miles Chart
    const supplyChainCtx = document.getElementById('supplyChainChart').getContext('2d');
    new Chart(supplyChainCtx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Supply Chain Miles (nm)',
                data: [2800, 2650, 2500, 2350, 2200, 2100],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#10b981',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            ...commonOptions,
            plugins: {
                ...commonOptions.plugins,
                tooltip: {
                    ...commonOptions.plugins.tooltip,
                    callbacks: {
                        label: function(context) {
                            return `Supply Chain Miles: ${context.parsed.y} nm`;
                        }
                    }
                }
            }
        }
    });

    // Chart view controls
    const controlBtns = document.querySelectorAll('.control-btn');
    controlBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            controlBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const view = this.dataset.view;
            console.log(`Switching to ${view} view`);
            
            // Here you would implement the logic to switch between trend and vessel-wise views
            // For now, we'll just log the action
        });
    });

    // Animate metric cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe metric cards
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe chart containers
    const chartContainers = document.querySelectorAll('.chart-container');
    chartContainers.forEach((container, index) => {
        container.style.opacity = '0';
        container.style.transform = 'translateY(30px)';
        container.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`;
        observer.observe(container);
    });

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        .metric-card.animate-in,
        .chart-container.animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .metric-card:hover .metric-icon {
            transform: scale(1.1) rotate(5deg);
        }
        
        .metric-icon {
            transition: transform 0.3s ease;
        }
        
        .chart-container:hover .chart-icon {
            transform: scale(1.2);
        }
        
        .chart-icon {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // Real-time data simulation (optional)
    function simulateRealTimeUpdates() {
        const metricValues = document.querySelectorAll('.metric-value');
        
        setInterval(() => {
            metricValues.forEach(value => {
                const currentValue = parseFloat(value.textContent);
                const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
                const newValue = Math.max(0, currentValue + variation);
                
                // Only update the number, preserve the unit
                const unit = value.querySelector('.metric-unit');
                const unitText = unit ? unit.textContent : '';
                value.innerHTML = `${newValue.toFixed(1)} <span class="metric-unit">${unitText}</span>`;
            });
        }, 30000); // Update every 30 seconds
    }

    // Uncomment to enable real-time updates
    // simulateRealTimeUpdates();

    // Scroll fade effect for analytics dashboard
    const analyticsDashboard = document.getElementById('analyticsDashboard');
    if (analyticsDashboard) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Calculate scroll progress (0 to 1)
            const scrollProgress = scrollTop / (documentHeight - windowHeight);
            
            // Start fading when user scrolls 20% down the page
            const fadeStartProgress = 0.2;
            const fadeEndProgress = 0.8;
            
            let opacity = 1;
            let scale = 1;
            
            if (scrollProgress > fadeStartProgress) {
                const fadeProgress = (scrollProgress - fadeStartProgress) / (fadeEndProgress - fadeStartProgress);
                opacity = Math.max(0, 1 - fadeProgress);
                scale = Math.max(0.8, 1 - (fadeProgress * 0.2));
            }
            
            analyticsDashboard.style.opacity = opacity;
            analyticsDashboard.style.transform = `scale(${scale})`;
        });
    }

    // Enhanced hover effects for benefit items
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.benefit-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.benefit-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Smooth scroll for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});