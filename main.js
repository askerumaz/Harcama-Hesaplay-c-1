const harcamaInput = document.querySelector('#harcama');
const fiyatInput = document.querySelector('#fiyat');
const statusCheck = document.querySelector('#status-input');
const formBtn = document.querySelector('.ekle-btn');
const liste = document.querySelector('.liste');
const toplamBilgi = document.querySelector('#toplam-bilgi');
const selectFilter = document.querySelector('#filter-select');
// izleme işlemleri
formBtn.addEventListener('click', addExpense);
liste.addEventListener('click', handleClick);
selectFilter.addEventListener('change', handleFilter);
// toplam state'i (durum)
let toplam = 0;

function updateToplam(fiyat) {
    toplam += Number(fiyat);
    toplamBilgi.innerText = toplam;
}

// harcama oluşturma

function addExpense(e) {
    e.preventDefault();

    if (!fiyatInput.value || !harcamaInput.value) {
        alert('Formları Doldurun');
        return;
    };

    // div oluşturma
    const harcamaDiv = document.createElement('div');
    // class ekleme
    harcamaDiv.classList.add('harcama');
    if (statusCheck.checked) {
        harcamaDiv.classList.add('payed');
    }
    
    // içeriği ayarlama
    harcamaDiv.innerHTML = `
    <h2>${harcamaInput.value}</h2>
    <h2 id="value">${fiyatInput.value}</h2>
    <div class="buttons">
        <img id="payment" src="image/pay.png">
        <img id="remove" src="image/remove.png">
    </div> 
    `;

    // oluşan elemanı html ye göndrme(listeye ekleme)
    liste.appendChild(harcamaDiv);
// toplamı güncelle
    updateToplam(fiyatInput.value);
    // formu temizleme
    harcamaInput.value = '';
    fiyatInput.value = '';

}


// listeye tıklanma olayını yönetme
function handleClick(e) {
    // tıklanıloan elemanı alma
    const element = e.target;

    if (element.id === 'remove') {
        // tıklanılan sil butonunun kapsayıcısını bulma
        const wrapperElement = element.parentElement.parentElement;
   
         // silinen elemanın fiyatını toplamdan düşme
        const deletedPrice = wrapperElement.querySelector('#value').innerText;
       
        // silinenin fiyatını toplamdan çıkarma
        updateToplam(- Number(deletedPrice));
       //    kapsaycıyı html den kaldırma
        wrapperElement.remove();
       
        
    }
}

// filtreleme işlemi
function handleFilter(e) {
    const items = liste.childNodes;
    items.forEach((item) => {
        switch (e.target.value) {
            case 'all':
                item.style.display = 'flex';
                break;
            
            case 'payed':
                if (!item.classList.contains('payed')) {
                    item.style.display = 'none';
                } else {
                    item.style.display = 'flex';
                }
                break;
            
            case 'not-payed':
                if (item.classList.contains('payed')) {
                    item.style.display = 'none';
                } else {
                    item.style.display = 'flex';
                }
                break;
        }
    });
}