const galleries = {
  explore: {
    title: 'Explore',
    images: [
      ['explore-dashboard.webp', 'Arsip laporan dan filter pada dashboard Explore (data uji)'],
      ['explore-detail.webp', 'Detail catatan litologi dan lampiran (data uji)'],
      ['explore-mobile.webp', 'Tampilan masuk aplikasi Android Explore'],
    ],
  },
  gymbook: {
    title: 'GymBook',
    images: [
      ['gym-beranda.webp', 'Beranda pendapatan (data contoh)'],
      ['gym-stok.webp', 'Daftar barang dan status stok (data contoh)'],
      ['gym-laporan.webp', 'Rekap bulanan dan ekspor Excel (data contoh)'],
    ],
  },
  tjs: {
    title: 'PT Tangguh Jaya Semesta',
    images: [
      ['tjs-beranda.webp', 'Beranda website profil perusahaan'],
      ['tjs-katalog.webp', 'Detail unit sewa dan tombol pemesanan WhatsApp'],
    ],
  },
};

const dialog = document.querySelector('#gallery');
const title = document.querySelector('#gallery-title');
const image = document.querySelector('#gallery-image');
const caption = document.querySelector('#gallery-caption');
const count = document.querySelector('#gallery-count');
const close = dialog.querySelector('.gallery-close');

let activeGallery;
let activeImage = 0;
let opener;

function displayImage() {
  const [file, description] = activeGallery.images[activeImage];
  image.src = 'assets/' + file;
  image.alt = description;
  caption.textContent = description;
  count.textContent = (activeImage + 1) + ' / ' + activeGallery.images.length;
}

function move(step) {
  const length = activeGallery.images.length;
  activeImage = (activeImage + step + length) % length;
  displayImage();
}

document.querySelectorAll('[data-gallery]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || !dialog.showModal) return;
    event.preventDefault();
    opener = link;
    activeGallery = galleries[link.dataset.gallery];
    activeImage = 0;
    title.textContent = activeGallery.title;
    displayImage();
    dialog.showModal();
    close.focus();
  });
});

close.addEventListener('click', () => dialog.close());
dialog.querySelector('.gallery-prev').addEventListener('click', () => move(-1));
dialog.querySelector('.gallery-next').addEventListener('click', () => move(1));
dialog.addEventListener('keydown', event => {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
  event.preventDefault();
  move(event.key === 'ArrowLeft' ? -1 : 1);
});
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener('close', () => opener?.focus());
