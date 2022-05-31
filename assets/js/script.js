const imgContent = document.querySelector('.cardImageContent');
const actionBtn = document.querySelector('.try');


actionBtn.addEventListener('click', () => {
    imgContent.classList.add('loadingContent');
    imgContent.innerHTML = `
     <iframe src="./canvas.html" style="width: 100%; height: 100%;"></iframe>
 `;
})












