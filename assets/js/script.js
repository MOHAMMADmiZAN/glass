const imgContent = document.querySelector('.cardImageContent');
const actionBtn = document.querySelector('.try');
let model;


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
        <video id="video" style="width: 100%; height: 431px;"></video>
        <canvas id="canvas" style="width: 100%; height: 431px;"></canvas>
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
                        resolve(video);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        }

        // setup camera function call
        setupCamera().then(async (v) => {
            console.log('camera is ready');

            const detectFace = () => {
                // let predictions = await model.estimateFaces(v, false)
                let canvas = document.getElementById('canvas');
                let ctx = canvas.getContext('2d');
                let width = canvas.width;
                let height = canvas.height;
                ctx.drawImage(v, 0, 0, width, height);
                // if (predictions.length > 0) {
                //     /*
                //     `predictions` is an array of objects describing each detected face, for example:
                //
                //     [
                //       {
                //         topLeft: [232.28, 145.26],
                //         bottomRight: [449.75, 308.36],
                //         probability: [0.998],
                //         landmarks: [
                //           [295.13, 177.64], // right eye
                //           [382.32, 175.56], // left eye
                //           [341.18, 205.03], // nose
                //           [345.12, 250.61], // mouth
                //           [252.76, 211.37], // right ear
                //           [431.20, 204.93] // left ear
                //         ]
                //       }
                //     ]
                //     */
                //
                //     for (let i = 0; i < predictions.length; i++) {
                //         ctx.beginPath();
                //         ctx.lineWidth = "5";
                //         ctx.strokeStyle = "red";
                //         const start = predictions[i].topLeft;
                //         const end = predictions[i].bottomRight;
                //         const size = [end[0] - start[0], end[1] - start[1]];
                //
                //         // Render a rectangle over each detected face.
                //         ctx.rect(start[0], start[1], size[0], size[1]);
                //         ctx.stroke();
                //         ctx.fillStyle = "red";
                //         console.log()
                //         ctx.fillStyle = "blue";
                //         predictions[i].landmarks.forEach(function (point) {
                //             ctx.fillRect(point[0], point[1], 2, 2);
                //
                //         });
                //
                //     }
                // }
            }
            setInterval(detectFace, 10);

            // v.addEventListener('loadeddata', async () => {
            //     console.log('video loaded');
            //     // model = await blazeface.load()
            //
            //
            // })


        }).catch(err => {
            console.error(err);
        })
    })
})












