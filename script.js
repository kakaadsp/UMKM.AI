// Global Variables
let chatHistory = [];
let salesChart = null;

// Smooth Scroll Function
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Tab Navigation
function activateTab(tabName) {
    // Hide all contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    // Reset all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('bg-purple-600', 'text-white');
        btn.classList.add('bg-gray-200', 'text-gray-700');
    });
    
    // Show selected content
    document.getElementById(`content-${tabName}`).classList.remove('hidden');
    
    // Highlight selected tab
    document.getElementById(`tab-${tabName}`).classList.remove('bg-gray-200', 'text-gray-700');
    document.getElementById(`tab-${tabName}`).classList.add('bg-purple-600', 'text-white');
    
    // Initialize chart if dashboard tab
    if (tabName === 'dashboard') {
        // Ensure chart is re-initialized only once, or destroyed and recreated if needed
        if (salesChart) {
            salesChart.destroy();
            salesChart = null; // Reset to allow re-initialization
        }
        initSalesChart();
    }
    
    // Scroll to demo section
    scrollToSection('demo');
}

// AI Chat Functions
async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    input.value = '';
    
    // Show loading
    addLoadingMessage();
    
    // Simulate AI response (in production, use real Claude API)
    setTimeout(() => {
        removeLoadingMessage();
        const response = generateAIResponse(message);
        addChatMessage(response, 'ai');
    }, 1500);
}

function quickQuestion(question) {
    document.getElementById('chatInput').value = question;
    sendMessage();
}

function addChatMessage(message, type) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message flex items-start space-x-3';
    
    if (type === 'user') {
        messageDiv.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">👤</div>
            <div class="bg-blue-50 rounded-xl p-4 shadow-sm max-w-md">
                <p class="text-gray-800">${message}</p>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white flex-shrink-0">🤖</div>
            <div class="bg-white rounded-xl p-4 shadow-sm max-w-md">
                <p class="text-gray-800">${message}</p>
            </div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addLoadingMessage() {
    const chatMessages = document.getElementById('chatMessages');
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loadingMessage';
    loadingDiv.className = 'chat-message flex items-start space-x-3';
    loadingDiv.innerHTML = `
        <div class="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white flex-shrink-0">🤖</div>
        <div class="bg-white rounded-xl p-4 shadow-sm">
            <div class="loading-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    chatMessages.appendChild(loadingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeLoadingMessage() {
    const loading = document.getElementById('loadingMessage');
    if (loading) loading.remove();
}

function generateAIResponse(message) {
    const responses = {
        'penjualan': 'Untuk meningkatkan penjualan online, saya sarankan: 1) Optimalkan foto produk dengan lighting yang baik, 2) Buat caption yang menarik dengan CTA jelas, 3) Gunakan hashtag yang relevan, 4) Posting di jam prime time (18:00-21:00), 5) Berikan promo menarik untuk first-time buyers.',
        'marketing': 'Marketing dengan budget kecil bisa efektif! Tips saya: 1) Manfaatkan sosial media secara maksimal (gratis!), 2) Buat konten viral dengan storytelling menarik, 3) Kolaborasi dengan micro-influencer, 4) Word of mouth - minta review dari pelanggan puas, 5) Gunakan WhatsApp Business untuk komunikasi langsung.',
        'pricing': 'Strategi pricing yang efektif: 1) Hitung cost dengan detail (bahan + operasional + waktu), 2) Riset harga kompetitor, 3) Tentukan positioning (premium/mid/budget), 4) Tambahkan margin 30-50% untuk sustainability, 5) Test dengan bundle pricing atau psychological pricing (Rp 99.000 vs Rp 100.000).',
        'default': 'Pertanyaan yang bagus! Untuk UMKM, saya sarankan untuk fokus pada 3 hal utama: 1) Kualitas produk yang konsisten, 2) Pelayanan pelanggan yang excellent, 3) Marketing digital yang aktif. Apakah ada aspek spesifik yang ingin Anda tanyakan lebih dalam?'
    };
    
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('penjualan') || lowerMessage.includes('jual')) return responses.penjualan;
    if (lowerMessage.includes('marketing') || lowerMessage.includes('promosi')) return responses.marketing;
    if (lowerMessage.includes('harga') || lowerMessage.includes('pricing')) return responses.pricing;
    
    return responses.default;
}

// Photo Analyzer
function analyzePhoto(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        // Show preview
        document.getElementById('photoPreview').innerHTML = `
            <img src="${e.target.result}" class="w-full h-48 object-cover rounded-lg mb-3">
            <p class="text-sm text-gray-600">Menganalisis foto...</p>
        `;
        
        // Simulate analysis
        setTimeout(() => {
            const analysis = `
                <div class="space-y-4">
                    <div class="flex items-start space-x-3">
                        <div class="text-2xl">✅</div>
                        <div>
                            <h4 class="font-bold text-gray-800">Kualitas Foto</h4>
                            <p class="text-sm text-gray-600">Bagus! Lighting cukup baik dan produk terlihat jelas.</p>
                        </div>
                    </div>
                    <div class="flex items-start space-x-3">
                        <div class="text-2xl">💡</div>
                        <div>
                            <h4 class="font-bold text-gray-800">Saran Perbaikan</h4>
                            <p class="text-sm text-gray-600">• Gunakan background polos putih/netral<br>• Tambahkan detail shot untuk texture<br>• Foto dari berbagai angle (min 3)</p>
                        </div>
                    </div>
                    <div class="flex items-start space-x-3">
                        <div class="text-2xl">📱</div>
                        <div>
                            <h4 class="font-bold text-gray-800">Caption Rekomendasi</h4>
                            <p class="text-sm text-gray-600 italic">"✨ Produk berkualitas premium dengan harga terjangkau! Yuk order sekarang, stok terbatas! 🛒"</p>
                        </div>
                    </div>
                    <div class="flex items-start space-x-3">
                        <div class="text-2xl">🏷️</div>
                        <div>
                            <h4 class="font-bold text-gray-800">Hashtag</h4>
                            <p class="text-xs text-purple-600">#UMKMIndonesia #ProdukLokal #KualitasTerbaik #SupportLocal #Handmade</p>
                        </div>
                    </div>
                    <div class="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div class="text-sm font-semibold text-green-800">Skor Visual: 8.5/10</div>
                        <div class="text-xs text-green-600 mt-1">Foto Anda sudah cukup menarik untuk menarik perhatian pembeli!</div>
                    </div>
                </div>
            `;
            document.getElementById('photoAnalysis').innerHTML = analysis;
        }, 2000);
    };
    reader.readAsDataURL(file);
}

// Sales Dashboard Chart
function initSalesChart() {
    const ctx = document.getElementById('salesChart').getContext('2d');
    salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
            datasets: [{
                label: 'Penjualan (Juta Rp)',
                data: [5.2, 6.8, 5.5, 7.2, 8.1, 9.5, 6.9],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'Rp ' + value + ' Jt';
                        }
                    }
                }
            }
        }
    });
}

// Pricing Calculator
function calculatePrice() {
    const productName = document.getElementById('productName').value;
    const costPrice = parseFloat(document.getElementById('costPrice').value);
    const targetMargin = parseFloat(document.getElementById('targetMargin').value);
    const operationalCost = parseFloat(document.getElementById('operationalCost').value);
    
    if (!productName || !costPrice || isNaN(costPrice)) {
        alert('Mohon isi nama produk dan Harga Modal (dengan angka yang valid)!');
        return;
    }
    
    // Calculations
    const totalCostPercentage = 100 + (isNaN(operationalCost) ? 0 : operationalCost);
    const effectiveCost = costPrice * totalCostPercentage / 100;
    const effectiveMargin = isNaN(targetMargin) ? 0 : targetMargin;

    const sellingPrice = effectiveCost * (1 + effectiveMargin / 100);
    const profit = sellingPrice - effectiveCost;

    // Competitor prices (simulated)
    const minCompetitor = sellingPrice * 0.85;
    const maxCompetitor = sellingPrice * 1.15;
    
    const result = `
        <div class="space-y-4">
            <div class="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6 text-center">
                <div class="text-sm opacity-90 mb-2">Harga Jual Rekomendasi</div>
                <div class="text-4xl font-bold">Rp ${sellingPrice.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
            </div>
            
            <div class="grid grid-cols-2 gap-3">
                <div class="bg-blue-50 rounded-lg p-4">
                    <div class="text-sm text-gray-600">Modal Total</div>
                    <div class="text-xl font-bold text-blue-600">Rp ${effectiveCost.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
                </div>
                <div class="bg-green-50 rounded-lg p-4">
                    <div class="text-sm text-gray-600">Profit</div>
                    <div class="text-xl font-bold text-green-600">Rp ${profit.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
                </div>
            </div>
            
            <div class="bg-gray-100 rounded-lg p-4">
                <h4 class="font-bold text-gray-800 mb-3">📊 Breakdown Biaya</h4>
                <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                        <span class="text-gray-600">Harga Modal:</span>
                        <span class="font-semibold">Rp ${costPrice.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Biaya Operasional (${operationalCost}%):</span>
                        <span class="font-semibold">Rp ${(costPrice * (operationalCost / 100)).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">Target Margin (${targetMargin}%):</span>
                        <span class="font-semibold">Rp ${(profit).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                    </div>
                    <div class="border-t pt-2 flex justify-between font-bold">
                        <span>Total Harga Jual:</span>
                        <span class="text-purple-600">Rp ${sellingPrice.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                    </div>
                </div>
            </div>
            
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 class="font-bold text-gray-800 mb-2">🎯 Analisis Kompetitor</h4>
                <p class="text-sm text-gray-600 mb-2">Estimasi range harga pasar:</p>
                <div class="text-sm">
                    <span class="font-semibold">Rp ${minCompetitor.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                    <span class="text-gray-500"> - </span>
                    <span class="font-semibold">Rp ${maxCompetitor.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                </div>
                <p class="text-xs text-green-600 mt-2">✓ Harga Anda kompetitif!</p>
            </div>
            
            <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 class="font-bold text-gray-800 mb-2">💡 Rekomendasi</h4>
                <ul class="text-sm text-gray-600 space-y-1">
                    <li>• Bulatkan harga ke Rp ${Math.round(sellingPrice / 1000) * 1000}</li>
                    <li>• Pertimbangkan psychological pricing (Rp ${Math.round(sellingPrice / 1000) * 1000 - 1000})</li>
                    <li>• Tawarkan bundle deal untuk meningkatkan value</li>
                </ul>
            </div>
        </div>
    `;
    
    document.getElementById('pricingResult').innerHTML = result;
}

// Content Generator
async function generateContent() {
    const product = document.getElementById('contentProduct').value;
    const promoType = document.getElementById('promoType').value;
    const platform = document.getElementById('platform').value;
    const details = document.getElementById('contentDetails').value;
    
    if (!product) {
        alert('Mohon isi nama produk!');
        return;
    }
    
    document.getElementById('generatedContent').innerHTML = `
        <div class="text-center py-12">
            <div class="loading-dots mx-auto">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <p class="text-gray-600 mt-4">Generating caption...</p>
        </div>
    `;
    
    // Simulate generation
    setTimeout(() => {
        const content = generateCaption(product, promoType, platform, details);
        document.getElementById('generatedContent').innerHTML = content;
    }, 2000);
}

function generateCaption(product, promoType, platform, details) {
    let caption = '';
    let hashtags = '#UMKMIndonesia #ProdukLokal #SupportLocal #KualitasTerbaik';
    
    const templates = {
        'diskon-instagram': `🎉 PROMO SPESIAL! 🎉

${product} ${details || 'diskon hingga 50%'} 😍

✨ Kualitas terjamin
📦 Packing rapi & aman
🚚 Pengiriman cepat

Jangan sampai kehabisan! Stock terbatas!

Order sekarang juga! 👇
Link di bio atau DM langsung ya! 💬

${hashtags} #Promo #Diskon #Sale`,

        'diskon-facebook': `[PROMO SPESIAL] ${product}

Hai teman-teman! Ada kabar gembira nih! 🎉

${product} lagi ada ${details || 'promo special'} lho!

Keuntungan belanja di kami:
✅ Kualitas produk terjamin
✅ Harga terjangkau  
✅ Pengiriman aman & cepat
✅ Pelayanan ramah

Yuk buruan order sebelum kehabisan! Klik link atau hubungi WA kami ya!

${hashtags} #Diskon #PromoMurah`,

        'new-instagram': `🌟 NEW ARRIVAL ALERT! 🌟

Kenalkan ${product} terbaru dari kami! 

${details || 'Produk eksklusif dengan kualitas premium'}

💎 Limited Edition
🎁 Free gift untuk 50 pembeli pertama
📦 Ready stock

Siapa nih yang mau jadi yang pertama punya? 🙋‍♀️

Tap link di bio atau DM untuk order! 

${hashtags} #NewArrival #ProdukTerbaru`,

        'testimoni-instagram': `💬 TESTIMONI CUSTOMER

"${details || 'Produk bagus banget! Packingnya rapi, pengiriman cepat. Puas deh!'}" ⭐⭐⭐⭐⭐

Terima kasih buat kepercayaannya! 🙏

${product} udah dipercaya ribuan customer di seluruh Indonesia! 

Kapan giliran kamu? 😊

Order yuk! Link di bio 👆

${hashtags} #Testimoni #Trusted #KepuasanPelanggan`,

        'educational-instagram': `💡 Waktunya #EdukasiUMKM

Tahukah kamu, ${product} kami dibuat dengan ${details || 'bahan-bahan pilihan yang menyehatkan'}?

Yuk, dukung produk lokal berkualitas!

${hashtags} #EdukasiProduk #LocalPride`,

        'diskon-tiktok': `Promo Gila-gilaan! 😱 Beli ${product} sekarang!

${details || 'Diskon 50% cuma hari ini! Jangan skip!'}` + `
#FYP #TikTokShop #PromoViral`,

        'new-tiktok': `Unboxing ${product} gemes banget! 😍

${details || 'Cocok buat kamu yang mau tampil beda!'}` + `
#FYP #Viral #FashionTikTok`,

        'testimoni-tiktok': `Happy banget lihat testimoni ini! ✨ ${product} memang se-keren itu!

${details || 'Bikin ketagihan kata customer!'}` + `
#FYP #Testi #RacunTikTok`,

        'whatsapp': `*🔥 PROMO SPESIAL HARI INI!* 🔥
        
Dapatkan *${product}* dengan penawaran terbaik!
        
*Details:* ${details || 'Diskon 30% untuk 10 pembeli pertama!'}
        
Yuk, buruan order sebelum kehabisan! Stok terbatas!
        
Klik link ini untuk order: [Link Order Anda]
        
#${product.replace(/\s/g, '')} #PromoUMKM`
    };
    
    // Fallback logic for combination key
    let key = promoType + '-' + platform;
    if (platform === 'whatsapp') key = 'whatsapp'; // Custom template for WA
    if (platform === 'tiktok' && promoType === 'diskon') key = 'diskon-tiktok';
    if (platform === 'tiktok' && promoType === 'new') key = 'new-tiktok';
    if (platform === 'tiktok' && promoType === 'testimoni') key = 'testimoni-tiktok';
    
    caption = templates[key] || templates['diskon-instagram'];
    
    return `
        <div class="space-y-4">
            <div class="bg-white border-2 border-purple-200 rounded-xl p-4">
                <div class="flex items-center justify-between mb-3">
                    <span class="text-sm font-semibold text-purple-600">📱 ${platform.toUpperCase()}</span>
                    <button onclick="copyCaption()" class="text-sm bg-purple-100 text-purple-700 px-4 py-1 rounded-full hover:bg-purple-200">
                        📋 Copy
                    </button>
                </div>
                <div id="captionText" class="text-sm text-gray-700 whitespace-pre-line">${caption}</div>
            </div>
            
            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 class="font-semibold text-green-800 mb-2">✅ Tips Posting</h4>
                <ul class="text-sm text-green-700 space-y-1">
                    <li>• Post di jam prime time (12:00-13:00 atau 18:00-21:00)</li>
                    <li>• Gunakan foto/video berkualitas tinggi</li>
                    <li>• Balas komen dengan cepat untuk engagement</li>
                    <li>• Tag lokasi untuk reach lebih luas</li>
                </ul>
            </div>
            
            <button onclick="generateContent()" class="w-full border-2 border-purple-300 text-purple-600 py-2 rounded-xl font-semibold hover:bg-purple-50">
                🔄 Generate Ulang
            </button>
        </div>
    `;
}

function copyCaption() {
    const text = document.getElementById('captionText').innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert('✅ Caption berhasil dicopy! Langsung paste di sosmed kamu ya!');
    });
}

// Initialize on load
window.addEventListener('load', function() {
    console.log('UMKM.AI Platform Ready! 🚀');
    // Activate chat tab by default on load
    activateTab('chat');
});