import { categoryLists } from "../core/selectors";

export const categoryRender = (list) => {
    list.forEach((el) => {
        categoryLists.append(createCateogryUi(el));
    })
}

export const createCateogryUi = (categoryName) => {
    const btn = document.createElement('button');
    btn.classList.add('category-badge','whitespace-nowrap');
    btn.innerText = categoryName;
    return btn;
}