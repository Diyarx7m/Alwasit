 
        const categoriesData = {
            tours: {
                items: ["assets/جزيرة الاميرات.jpg", "assets/جولة بورصا.jpg", "assets/شيلا و أغوا.jpg", "assets/سبانجا و معشوقية.jpg"],
                descriptions: ["رحلة بحرية فريدة بين الجزر التاريخية", "جولة ثقافية في بورصة العثمانية",
                    "شواطئ ساحرة ومرتفعات شيلا", "طبيعة خلابة وشلالات سبانجا"]
            },
            medical: {
                items: ["assets/تجميل اسنان.jpg", "assets/تجميل غير جراحي2.jpg", "assets/زراعة الشعر .jpg", "assets/نحت الجسم.jpg"],
                descriptions: ["ابتسامة هوليود بتقنيات الليزر", "فيلر وبوتوكس بأحدث المعايير", "زراعة شعر FUE بدون ندوب",
                    "شفط دهون ونحت القوام المتقدم"]
            },
            hotels: {
                items: ["assets/hotel.jpg", "assets/hotel 1.jpg", "assets/hotel 2.jpg", "assets/hotel 3.jpg"],
                descriptions: ["إطلالة بحرية فاخرة", "منتجع صحي وسبا خاص", "أجنحة رئاسية وخدمات VIP", "موقع متميز قرب المطار"]
            },
            apartments: {
                items: ["assets/شقق مفروشة.jpg", "assets/شقق-طرابزون.jpg", "assets/شقة3.jpg", "assets/شقة4.jpg"],
                descriptions: ["غرفتين وصالة - تصميم عصري", "ثلاث غرف مطلة على البحر", "أثاث فاخر وخدمات نظافة يومية",
                    "مجمع سكني هادئ في طرابزون"]
            },
            cottages: {
                items: ["assets/كوخ3.jpg", "assets/كوخ2.jpg", "assets/كوخ-01.jpg"],
                descriptions: ["حمام سباحة خاص وحديقة", "إطلالة على الغابة ومساحة واسعة", "كوخ خشبي مع مدفأة خاصة"]
            },
            flights: {
                items: ["assets/تذاكر طيران.jpg"],
                descriptions: ["أفضل عروض الخطوط الجوية"]
            },
            cars: {
              
                items: ["assets/car3.jpg", "assets/car2.jpg", "assets/car4-4-4-4.jpg"],
                descriptions: ["سيارات حديثة مع سائق خاص", "ليموزين فاخرة للمناسبات", "حافلات صغيرة للمجموعات"]
            }
        };

        function buildCard(itemName, categoryKey, idx) {
            let descText = "";
            const descArray = categoriesData[categoryKey]?.descriptions;
            if (descArray && descArray[idx]) descText = descArray[idx];
            else descText = "خدمة متميزة بأفضل الأسعار وعروض حصرية";
            let imgSrc = itemName;
            let displayTitle = itemName.replace(/^assets\//, '').replace(/\.(jpg|jpeg|png|gif|webp)$/i, '');
           
            if (categoryKey === 'cars' && itemName === 'assets/car2.jpg') displayTitle = 'سيارة فاخرة موديل حديث';
            if (categoryKey === 'cars' && itemName === 'assets/car4-4-4-4.jpg') displayTitle = 'حافلة صغيرة راقية';
            
            return `
                <div class="premium-card w-full h-full flex flex-col">
                    <div class="relative h-56 overflow-hidden bg-gray-100">
                        <img src="${imgSrc}" alt="${itemName}" class="w-full h-full object-cover transition duration-500 hover:scale-105" onerror="this.src='https://placehold.co/600x400/f8f9fa/674621?text=${encodeURIComponent(displayTitle)}'">
                    </div>
                    <div class="p-5 text-right flex-grow">
                        <h4 class="text-xl font-bold mb-2" style="color: var(--text);">${displayTitle}</h4>
                        <p class="text-sm mb-3" style="color: var(--text-secondary);">${descText}</p>
                        <a href="#booking-section" class="inline-block font-semibold text-sm hover:underline" style="color: var(--primary);">طلب الحجز <i class="fas fa-chevron-left mr-1 text-xs"></i></a>
                    </div>
                </div>
            `;
        }

        function renderCategory(containerId, data, categoryId) {
            const container = document.getElementById(containerId);
            if (!container) return;
            
         
            const desktopGrid = document.createElement('div');
            desktopGrid.className = 'desktop-grid-custom';
            
         
            const mobileSliderDiv = document.createElement('div');
            mobileSliderDiv.className = 'mobile-swiper-only';
            mobileSliderDiv.innerHTML = 
                `<div class="swiper swiper-${categoryId}"><div class="swiper-wrapper"></div><div class="swiper-pagination swiper-pagination-${categoryId} mt-6"></div></div>`;
            const swiperWrapperInner = mobileSliderDiv.querySelector('.swiper-wrapper');
            
            data.items.forEach((item, idx) => {
                const cardHtml = buildCard(item, categoryId, idx);
                const cardWrapper = document.createElement('div');
                cardWrapper.innerHTML = cardHtml;
                const cardElement = cardWrapper.firstElementChild;
                desktopGrid.appendChild(cardElement);
                
                const slideDiv = document.createElement('div');
                slideDiv.className = 'swiper-slide h-auto';
                slideDiv.innerHTML = cardHtml;
                swiperWrapperInner.appendChild(slideDiv);
            });
            
            container.innerHTML = '';
            container.appendChild(desktopGrid);
            container.appendChild(mobileSliderDiv);
        }

        let activeSwipers = {};

        function initAllSwipers() {
            const categories = ['tours', 'medical', 'hotels', 'apartments', 'cottages', 'flights', 'cars'];
            categories.forEach(cat => {
                const el = document.querySelector(`.swiper-${cat}`);
                if (el && !activeSwipers[cat]) {
                    const swiperInstance = new Swiper(el, {
                        slidesPerView: 1,
                        spaceBetween: 20,
                        autoplay: {
                            delay: 3000,
                            disableOnInteraction: false,
                        },
                        pagination: {
                            el: `.swiper-pagination-${cat}`,
                            clickable: true,
                        },
                        breakpoints: {
                            480: { slidesPerView: 1.2 },
                            640: { slidesPerView: 2 },
                        }
                    });
                    activeSwipers[cat] = swiperInstance;
                } else if (el && activeSwipers[cat]) {
                    activeSwipers[cat].autoplay.start();
                    activeSwipers[cat].update();
                }
            });
        }

        function destroySwipers() {
            Object.keys(activeSwipers).forEach(key => {
                if (activeSwipers[key]) {
                    activeSwipers[key].destroy(true, true);
                    delete activeSwipers[key];
                }
            });
        }

        function handleResponsiveSwipers() {
            if (window.innerWidth <= 767) {
                destroySwipers();
                initAllSwipers();
            } else {
                destroySwipers();
            }
        }
        
        function renderAllCategories() {
            renderCategory('tours-container', categoriesData.tours, 'tours');
            renderCategory('medical-container', categoriesData.medical, 'medical');
            renderCategory('hotels-container', categoriesData.hotels, 'hotels');
            renderCategory('apartments-container', categoriesData.apartments, 'apartments');
            renderCategory('cottages-container', categoriesData.cottages, 'cottages');
            renderCategory('flights-container', categoriesData.flights, 'flights');
            renderCategory('cars-container', categoriesData.cars, 'cars');
            handleResponsiveSwipers();
        }

        const countersStarted = { trips: false, clients: false, destinations: false, years: false };

        function startCounterIfVisible() {
            const statsSection = document.getElementById('stats-section');
            const rect = statsSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100 && rect.bottom > 0;
            if (isVisible) {
                if (!countersStarted.trips) animateCounter('tripsCounter', 186, 1800);
                if (!countersStarted.clients) animateCounter('clientsCounter', 3540, 2000);
                if (!countersStarted.destinations) animateCounter('destinationsCounter', 42, 1500);
                if (!countersStarted.years) animateCounter('yearsCounter', 12, 1300);
                countersStarted.trips = countersStarted.clients = countersStarted.destinations = countersStarted.years = true;
            }
        }

        function animateCounter(elementId, targetValue, duration) {
            const element = document.getElementById(elementId);
            if (!element) return;
            const increment = targetValue / (duration / 16);
            let current = 0;
            const update = () => {
                current += increment;
                if (current >= targetValue) {
                    element.innerText = targetValue;
                    return;
                }
                element.innerText = Math.floor(current);
                requestAnimationFrame(update);
            };
            requestAnimationFrame(update);
        }

        const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -30px 0px" };
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        document.querySelectorAll('.section-fade').forEach(section => sectionObserver.observe(section));

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounterIfVisible();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        const statsSec = document.getElementById('stats-section');
        if (statsSec) statsObserver.observe(statsSec);

        window.addEventListener('load', () => {
            renderAllCategories();
            startCounterIfVisible();
            window.addEventListener('resize', () => {
                handleResponsiveSwipers();
            });
        });

        const bookingForm = document.getElementById('bookingForm');
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const tripDate = document.getElementById('tripDate').value;
            const message = document.getElementById('message').value.trim();
            if (!name || !phone || !tripDate) {
                alert('يرجى ملء جميع الحقول الأساسية');
                return;
            }
            let fullMsg = `📅 *طلب حجز جديد - Alwasit Turizm* ✈️%0A%0A`;
            fullMsg += `👤 *الاسم:* ${name}%0A`;
            fullMsg += `📞 *الجوال:* ${phone}%0A`;
            fullMsg += `📆 *تاريخ الرحلة:* ${tripDate}%0A`;
            if (message) fullMsg += `💬 *الطلب:* ${message}%0A`;
            fullMsg += `%0A✅ سيتم الرد عليكم خلال دقائق. شكراً لثقتكم.`;
            const waUrl = `https://wa.me/905523555222?text=${fullMsg}`;
            window.open(waUrl, '_blank');
            bookingForm.reset();
        });

        // Mobile menu logic
        const menuBtn = document.getElementById('mobile-menu-btn');
        const sidebar = document.getElementById('mobile-sidebar');
        const overlay = document.getElementById('mobile-overlay');
        const closeBtn = document.getElementById('mobile-close-btn');

        function openMobileMenu() {
            sidebar.classList.add('active');
            overlay.classList.add('active');
        }

        function closeMobileMenu() {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        }

        menuBtn.addEventListener('click', openMobileMenu);
        closeBtn.addEventListener('click', closeMobileMenu);
        overlay.addEventListener('click', closeMobileMenu);

        document.querySelectorAll('#mobile-sidebar a').forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        window.addEventListener('scroll', () => {
            if (window.innerWidth <= 767 && activeSwipers) {
                Object.values(activeSwipers).forEach(sw => sw?.update());
            }
        });