"use strict"
const bsktButtonEl = document.querySelector('.header__button-padding');
const bsktEl = document.querySelector('.basket');
const bsktCountEl = document.querySelector('.header__button-padding-totalValue');
const bsktCountElWrp = document.querySelector('.header__button-padding-total');
const bsktTotalValueEl = document.querySelector('.basketTotalValue');
const bsktTotalEl = document.querySelector('.basket__total');

bsktButtonEl.addEventListener('click', event => {
    bsktEl.classList.toggle('visually-hidden');
});

const basket = {};

document.querySelector('.products').addEventListener('click', event => {
    if (!event.target.classList.contains('products__item-button')) {
        bsktEl.classList.add('visually-hidden');
        return;
    }
    bsktEl.classList.remove('visually-hidden');
    bsktCountElWrp.classList.remove('visually-hidden');
    const products__item = event.target.closest('.products__item');
    const id = +products__item.dataset.id;
    const name = products__item.dataset.name;
    const price = +products__item.dataset.price;
    addToCart(id, name, price);
});

function addToCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = {
            id: id,
            name: name,
            price: price,
            count: 0
        };
    }
    basket[id].count++;
    bsktCountEl.textContent = getTotalBasketCount().toString();
    bsktTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
    renderProductInBasket(id);
}

function getTotalBasketCount() {
    return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

function getTotalBasketPrice() {
    return Object.values(basket)
        .reduce((acc, product) => acc + product.count * product.price, 0)
}

function renderProductInBasket(id) {
    const bsktRowEl = bsktEl
        .querySelector(`.basket__row[data-productId="${id}"]`);
    if (!bsktRowEl) {
        renderNewProductInBasket(id);
        return;
    }

    bsktRowEl.querySelector('.productCount').textContent = basket[id].count;
    bsktRowEl.querySelector('.productTotalRow')
        .textContent = basket[id].count * basket[id].price;
}

function renderNewProductInBasket(productId) {
    const productRow = `
        <div class="basket__row" data-productId="${productId}">
            <div>${basket[productId].name}</div>
            <div>
                <span class= "productCount">${basket[productId].count}</span> шт.
            </div>
            <div>${basket[productId].price}</div>
            <div> 
            $<span class="productTotalRow">${(basket[productId].price * basket[productId].count)}
            </div>
        </div>
    `;
    bsktTotalEl.insertAdjacentHTML('beforebegin', productRow);
}