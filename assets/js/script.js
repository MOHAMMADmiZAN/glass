const imgContent = document.querySelector('.cardImageContent');
const actionBtn = document.querySelector('.try');


actionBtn.addEventListener('click', (e) => {
    e.preventDefault()
    imgContent.classList.add('loadingContent');
    imgContent.innerHTML = `
     <iframe src="./index2.html" style="width: 100%; height: 100%;"></iframe>`

    //     < img
    // src = "/assets/svg/Graphics-Check-big.svg"
    // alt = "Graphics-Check-big.svg"
    // className = "loadImg" >
    //     < div
    // className = "loadIcons position-relative" >
    //     < div
    // className = "loadIcon position-absolute i-1" >
    //     < img
    // src = "/assets/svg/Button%20Camera.svg"
    // alt = "Button%20Camera.svg" >
    //     < /div>
    // <div className="loadIcon i-2 position-absolute">
    //     <img src="/assets/svg/circle.svg" alt="circle.svg">
    // </div>
    // select camera button
    const cameraBtn = document.querySelector('.i-1');
    // camera button click event
    cameraBtn.addEventListener('click', () => {
        //

    })
})












