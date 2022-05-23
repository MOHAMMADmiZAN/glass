const imgContent = document.querySelector('.cardImageContent');
const actionBtn = document.querySelector('.try');
// let model;
// import * as faceDetection from '@tensorflow-models/face-detection';
// import '@tensorflow/tfjs-backend-webgl';
// const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
// const detectorConfig = {
//     runtime: 'mediapipe', // or 'tfjs'
// }
// const detector = await faceDetection.createDetector(model, detectorConfig);
// console.log(detector);


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
        <video id="video" style="width: 600px; height: 431px; display: none"></video>
        <canvas id="canvas" style="width: 600px; height: 431px;"></canvas>
        `

        const videoElement = document.getElementById('video');
        const canvasElement = document.getElementById('canvas');
        const canvasCtx = canvasElement.getContext('2d');

        // const detectFace = async () => {
        //     let predictions = await model.estimateFaces(video, false)
        //
        //     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        //
        //
        //     predictions.forEach(prediction => {
        //
        //         ctx.beginPath();
        //         ctx.lineWidth = "5";
        //         ctx.strokeStyle = "red";
        //
        //
        //         // Render a rectangle over each detected face.
        //         ctx.rect(prediction.topLeft[0], prediction.topLeft[1], prediction.bottomRight[0] - prediction.topLeft[0], prediction.bottomRight[1] - prediction.topLeft[1]);
        //         ctx.stroke();
        //         ctx.fillStyle = "red";
        //         console.log()
        //         ctx.fillStyle = "blue";
        //         prediction.landmarks.forEach(function (point) {
        //             ctx.fillRect(point[0], point[1], 5, 5);
        //
        //         });
        //         return detectFace()
        //
        //     })
        //
        //
        // }

        // function onResults(results) {
        //     // Draw the overlays.
        //     ctx.save();
        //     ctx.clearRect(0, 0, canvas.width, canvas.height);
        //     ctx.drawImage(
        //         results.image, 0, 0, canvas.width, canvas.height);
        //     if (results.detections.length > 0) {
        //         drawingUtils.drawRectangle(
        //             ctx, results.detections[0].boundingBox,
        //             {color: 'blue', lineWidth: 4, fillColor: '#00000000'});
        //         drawingUtils.drawLandmarks(ctx, results.detections[0].landmarks, {
        //             color: 'red',
        //             radius: 5,
        //         });
        //     }
        //     ctx.restore();
        // }
        //
        // let url = 'https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4'
        // const faceDetection = new FaceDetection({
        //     locateFile: (file) => {
        //         return `${url}/${file}`;
        //     }
        // });
        // faceDetection.setOptions({
        //     modelSelection: 0,
        //     minDetectionConfidence: 0.5
        // });
        // faceDetection.onResults(onResults);
        //
        // const camera = new Camera(video, {
        //     onFrame: async () => {
        //         // model = await blazeface.load()
        //         // await detectFace()
        //         await faceDetection.send({image: video});
        //
        //     }, width: 600, height: 431,
        // });
        // camera.start();


        //
        // // create setup camera function
        // function setupCamera() {
        //     return new Promise((resolve, reject) => {
        //         // get video input
        //         const video = document.querySelector('#video');
        //
        //         //  video input width and height
        //         let width = video.offsetWidth;
        //         let height = video.offsetHeight;
        //
        //         // stream video
        //         navigator.mediaDevices.getUserMedia({video: {width, height}, audio: false})
        //             .then(stream => {
        //                 video.srcObject = stream;
        //                 video.play();
        //                 resolve(video);
        //                 console.log(detector)
        //             })
        //             .catch(err => {
        //                 reject(err);
        //             });
        //     });
        // }
        //
        // // setup camera function call
        // setupCamera().then(async (v) => {
        //     console.log('camera is ready');
        //
        //     const detectFace = () => {
        //         // let predictions = await model.estimateFaces(v, false)
        //         let canvas = document.getElementById('canvas');
        //         let ctx = canvas.getContext('2d');
        //         let width = canvas.width;
        //         let height = canvas.height;
        //         ctx.drawImage(v, 0, 0, width, height);
        //         // if (predictions.length > 0) {
        //         //     /*
        //         //     `predictions` is an array of objects describing each detected face, for example:
        //         //
        //         //     [
        //         //       {
        //         //         topLeft: [232.28, 145.26],
        //         //         bottomRight: [449.75, 308.36],
        //         //         probability: [0.998],
        //         //         landmarks: [
        //         //           [295.13, 177.64], // right eye
        //         //           [382.32, 175.56], // left eye
        //         //           [341.18, 205.03], // nose
        //         //           [345.12, 250.61], // mouth
        //         //           [252.76, 211.37], // right ear
        //         //           [431.20, 204.93] // left ear
        //         //         ]
        //         //       }
        //         //     ]
        //         //     */
        //         //
        //         //     for (let i = 0; i < predictions.length; i++) {
        //         //         ctx.beginPath();
        //         //         ctx.lineWidth = "5";
        //         //         ctx.strokeStyle = "red";
        //         //         const start = predictions[i].topLeft;
        //         //         const end = predictions[i].bottomRight;
        //         //         const size = [end[0] - start[0], end[1] - start[1]];
        //         //
        //         //         // Render a rectangle over each detected face.
        //         //         ctx.rect(start[0], start[1], size[0], size[1]);
        //         //         ctx.stroke();
        //         //         ctx.fillStyle = "red";
        //         //         console.log()
        //         //         ctx.fillStyle = "blue";
        //         //         predictions[i].landmarks.forEach(function (point) {
        //         //             ctx.fillRect(point[0], point[1], 2, 2);
        //         //
        //         //         });
        //         //
        //         //     }
        //         // }
        //     }
        //     setInterval(detectFace, 10);
        //
        //     // v.addEventListener('loadeddata', async () => {
        //     //     console.log('video loaded');
        //     //     // model = await blazeface.load()
        //     //
        //     //
        //     // })
        //
        //
        // }).catch(err => {
        //     console.error(err);
        // })
        function onResults(results) {
            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            canvasCtx.drawImage(
                results.image, 0, 0, canvasElement.width, canvasElement.height);
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
            width: 600,
            height: 431
        });
        camera.start();


    })
})












