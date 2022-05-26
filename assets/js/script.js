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
        <video id="video"></video>
        <canvas id="canvas"></canvas>
        `

        const videoElement = document.getElementById('video');
        const canvasElement = document.getElementById('canvas');
        const canvasCtx = canvasElement.getContext('2d');


        function onResults(results) {
            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            canvasCtx.drawImage(
                results.image, 0, 0, canvasElement.width, canvasElement.height);


            // console.log(`right iris ${FACEMESH_RIGHT_IRIS}`)
            // console.log(`left iris ${FACEMESH_LEFT_IRIS}`)
            console.log(typeof FACEMESH_RIGHT_IRIS)
            for (let i in FACEMESH_RIGHT_IRIS) {
                console.log(FACEMESH_RIGHT_IRIS[i])
            }
            // for separate face detection landmarks
            results.multiFaceLandmarks.forEach(function (landmarks) {


                console.log(  `right x ${landmarks[469].x}`)
                console.log(`right y ${landmarks[469].y}`)
                console.log( `right z ${landmarks[469].z}`)
                console.log(`left x ${landmarks[474].x}`)
                console.log(`left y ${landmarks[474].y}`)
                console.log(`left z ${landmarks[474].z}`)



            })

            // for single face detection landmarks




            if (results.multiFaceLandmarks) {
                for (const landmarks of results.multiFaceLandmarks) {


                    drawConnectors(canvasCtx, landmarks,[[469,470],[470,471]], {color: '#FF3030'});



                }

            }
            canvasCtx.restore();
        }

        const faceMesh = new FaceMesh({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
            }
        });
        faceMesh.setOptions({
            maxNumFaces: 1,
            refineLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });
        faceMesh.onResults(onResults);

        const camera = new Camera(videoElement, {
            onFrame: async () => {
                await faceMesh.send({image: videoElement});
            },
            width: videoElement.offsetWidth,
            height: videoElement.offsetHeight
        });
        camera.start();


    })
})












