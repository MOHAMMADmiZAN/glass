const imgContent = document.querySelector('.cardImageContent');
export const actionBtn = document.querySelector('.try');


actionBtn.addEventListener('click', () => {
    imgContent.classList.add('loadingContent');
    imgContent.innerHTML = `
     <iframe src="./index2.html" style="width: 100%; height: 100%;"></iframe>`;
})












