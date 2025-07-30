document.addEventListener('DOMContentLoaded', () => {
    const flap = document.querySelector(".flap");
    const paper = document.querySelector(".paper");
    const clickText = document.querySelector(".click-text");
    const contentElement = document.getElementById("content");
    const answerButtons = document.getElementById("cevaplar");
    const resultText = document.getElementById("sonuc");

    let isEnvelopeOpen = false; // Zarfın açık olup olmadığını takip etmek için

    function acMesaj() {
        if (isEnvelopeOpen) return; // Zarf zaten açıksa tekrar açma

        // Zarf kapağını aç
        flap.style.transform = "rotateX(180deg)";

        // Kağıdı yukarı çıkar
        paper.style.bottom = "0";

        // Tıklama metnini gizle
        clickText.style.display = "none";
        isEnvelopeOpen = true;

        // Yazı yazma animasyonunu başlat
        setTimeout(() => {
            typeWriter();
        }, 1000); // kağıt çıkışı tamamlandıktan sonra
    }

    function typeWriter() {
        const fullText = contentElement.getAttribute("data-text");
        let index = 0;
        const speed = 40; // yazma hızı (ms)

        contentElement.textContent = ""; // İçeriği sıfırla

        const timer = setInterval(() => {
            contentElement.textContent += fullText.charAt(index);
            index++;
            if (index === fullText.length) {
                clearInterval(timer);
                answerButtons.classList.remove("gizli");
            }
        }, speed);
    }

    function cevapVer(kabul) {
        const sonuc = document.getElementById("sonuc");
        if (kabul) {
            // Yeni sayfayı aç
            window.open('love.html', '_blank'); // _blank yeni sekmede açar
            sonuc.textContent = "💖 Cevabın beni çok mutlu etti!";
            sonuc.style.color = "#ff4e6a";
            answerButtons.classList.add("gizli");
        } else {
            sonuc.textContent = "😔 Üzgünüm, bu cevabı kabul edemiyorum. Lütfen tekrar dene!";
            sonuc.style.color = "#8b0000";
            
        }
    }

    // Zarfın tıklanma olayını atama
    document.querySelector(".envelope").addEventListener("click", acMesaj);
    // Eğer HTML'deki onclick özelliğini kaldırdıysanız, buraya buton event listener'larını eklemelisiniz.
    // Örneğin:
    document.querySelector("#cevaplar button:nth-child(1)").addEventListener("click", () => cevapVer(true));
    document.querySelector("#cevaplar button:nth-child(2)").addEventListener("click", () => cevapVer(false));
});