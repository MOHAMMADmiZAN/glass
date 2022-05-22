const imgContent = document.querySelector('.cardImageContent');
const actionBtn = document.querySelector('.try');


actionBtn.addEventListener('click', (e) => {
    e.preventDefault()
    imgContent.classList.add('loadingContent');
    imgContent.innerHTML = `
    <img src="/assets/svg/Graphics-Check-big.svg" alt="Graphics-Check-big.svg" class="loadImg">
                            <div class="loadIcons position-relative">
                                <div class="loadIcon position-absolute i-1">
                                    <img src="/assets/svg/Button%20Camera.svg" alt="Button%20Camera.svg">
                                </div>
                                <div class="loadIcon i-2 position-absolute">
                                    <img src="/assets/svg/circle.svg" alt="circle.svg">
                                </div>
    `
    // select camera button
    const cameraBtn = document.querySelector('.i-1');
    // camera button click event
    cameraBtn.addEventListener('click', () => {
        //
        imgContent.classList.remove('loadingContent');
        imgContent.innerHTML = `
        <video id="video" style="width: 100%; height: 431px; "></video>
        `

        // create setup camera function
        function setupCamera() {
            return new Promise((resolve, reject) => {
                // get video input
                const video = document.querySelector('#video');
                //  video input width and height
                let width = video.offsetWidth;
                let height = video.offsetHeight;
                // stream video
                navigator.mediaDevices.getUserMedia({video: {width, height}, audio: false})
                    .then(stream => {
                        video.srcObject = stream;
                        video.play();
                        resolve();
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        }

        // setup camera function call
        setupCamera().then(() => {
            console.log('camera is ready');

        }).catch(err => {
            console.error(err);
        })
    })
})



