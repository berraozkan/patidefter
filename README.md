# 🐾 PatiDefter — Evcil Hayvan Sağlık Defteri

## Proje Hakkında

Evcil hayvan sahipleri; aşı tarihlerini, parazit uygulamalarını ve veteriner ziyaretlerini genellikle hafızaya, kâğıt karnelere ya da telefon notlarına güvenerek takip eder. Bu da aşıların geciktirilmesine ve sağlık geçmişinin dağınık kalmasına yol açar.

**PatiDefter**, kedi ve köpek sahiplerinin hayvanlarının sağlık bilgilerini tek bir yerde tutmasını sağlayan bir web uygulamasıdır. Kullanıcı, her hayvanı için bir profil oluşturur; aşı ve parazit kayıtlarını ekler ve yaklaşan uygulamaları tek bakışta görür.

**Hedef kullanıcı:** Bir veya birden fazla evcil hayvanı olan, sağlık takibini düzenli yapmak isteyen hayvan sahipleri.

## Proje Panosu

Görev takibi GitHub Projects üzerinde yapılmaktadır:
👉 [PatiDefter Panosu](PANO_LINKI_BURAYA)

## Kullanılan Teknolojiler

- React + TypeScript (Vite)
- Tailwind CSS
- Veriler tarayıcıda `localStorage` ile saklanır (sunucu gerekmez)

## Kurulum ve Çalıştırma

Gereksinim: Node.js 18 veya üzeri

```bash
git clone https://github.com/KULLANICI_ADI/patidefter.git
cd patidefter
npm install
npm run dev
```

Ardından tarayıcıda `http://localhost:5173` adresini açın.

Canlı sürüm: [patidefter demo](DEMO_LINKI_BURAYA)

## Geliştirilen Özellikler ve Nasıl Denenir

### 1. Hayvan Profili Ekleme
1. Ana sayfada **"+ Hayvan Ekle"** butonuna tıklayın.
2. İsim (ör. *Bala*), tür, doğum tarihi ve kilo bilgilerini girip **Kaydet**'e basın.
3. Hayvanın kartı listede görünür.
4. Sayfayı yenileyin: kayıt kaybolmamalıdır.

### 2. Aşı ve Parazit Takvimi
1. Listeden bir hayvanın kartına tıklayın.
2. **"+ Kayıt Ekle"** ile uygulama türünü (aşı / iç parazit / dış parazit), adını ve tarihini girin.
3. Kayıtlar tarihe göre sıralanır; **Yaklaşan** ve **Geçmiş** olarak iki ayrı bölümde gösterilir.
4. Önümüzdeki 7 gün içinde olan uygulamalar vurgulu görünür.

## Yol Haritası

Panoda yer alan ve ileride geliştirilebilecek özellikler:
- Kilo takibi ve grafik
- Mama / kum stok takibi
- Veteriner ziyaret notları
