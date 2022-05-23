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

            // for separate face detection landmarks
            // results.multiFaceLandmarks.forEach(function (landmarks) {
            //     landmarks.forEach(function (point) {
            //         console.log(`x:${point.x}, y:${point.y} z:${point.z}`);
            //
            //     })
            //
            // })



            if (results.multiFaceLandmarks) {
                for (const landmarks of results.multiFaceLandmarks) {
                    drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYE, {color: '#FF3030'});
                    drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_IRIS, {color: '#FF3030'});
                    drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYE, {color: '#FF3030'});
                    drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_IRIS, {color: '#FF3030'});


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












