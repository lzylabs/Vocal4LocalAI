document.addEventListener('DOMContentLoaded', () => {
	// Initialize animations
	const elements = document.querySelectorAll('section, .challenge-card, .capability-card, .step-card, .step-item');
	
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry, index) => {
			if (entry.isIntersecting) {
				// Add staggered delay for cards
				const delay = entry.target.classList.contains('challenge-card') || 
							entry.target.classList.contains('capability-card') ||
							entry.target.classList.contains('step-card') ||
							entry.target.classList.contains('step-item')
							? index * 100 : 0;
				
				setTimeout(() => {
					entry.target.classList.add('show');
				}, delay);
				
				observer.unobserve(entry.target);
			}
		});
	}, {
		threshold: 0.2,
		rootMargin: '50px'
	});

	elements.forEach(el => {
		el.classList.add('animate-in');
		observer.observe(el);
	});

	// Initialize card hover effects
	const cards = document.querySelectorAll('.card');
	
	cards.forEach(card => {
		card.addEventListener('mousemove', (e) => {
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			
			const centerX = rect.width / 2;
			const centerY = rect.height / 2;
			
			const rotateX = (y - centerY) / 15;
			const rotateY = -(x - centerX) / 15;
			
			card.style.transform = `
				perspective(1000px)
				rotateX(${rotateX}deg)
				rotateY(${rotateY}deg)
				translateZ(10px)
				scale(1.05)
			`;
		});

		card.addEventListener('mouseleave', () => {
			card.style.transform = 'none';
		});
	});

	// Generate background pattern
	const pattern = document.createElement('div');
	pattern.className = 'background-pattern';
	document.body.appendChild(pattern);

	for (let i = 0; i < 100; i++) {
		const dot = document.createElement('div');
		dot.className = 'pattern-dot';
		dot.style.left = `${Math.random() * 100}%`;
		dot.style.top = `${Math.random() * 100}%`;
		dot.style.animationDelay = `${Math.random() * 4}s`;
		pattern.appendChild(dot);
	}

	// Initialize cursor light effect first
	const cursorBackground = document.createElement('div');
	cursorBackground.className = 'cursor-background';
	document.body.insertBefore(cursorBackground, document.body.firstChild);

	const cursorLight = document.createElement('div');
	cursorLight.className = 'cursor-light';
	document.body.appendChild(cursorLight);

	// Handle cursor movement
	document.addEventListener('mousemove', (e) => {
		requestAnimationFrame(() => {
			cursorLight.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate3d(-50%, -50%, 0)`;
		});
	});





	// Smooth scroll
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				const headerOffset = 100;
				const elementPosition = target.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth'
				});
			}
		});
	});
});

// Track mouse position for background glow effect
document.addEventListener('mousemove', (e) => {
	document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
	document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
});

