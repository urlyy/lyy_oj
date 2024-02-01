document.addEventListener("DOMContentLoaded", async function () {
    // 获取视频和画布元素
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // 加载模型
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/models');

    // 获取摄像头权限
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    video.srcObject = stream;

    // 等待视频加载完成后执行
    video.addEventListener('play', async () => {
        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize);

        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceDescriptors();

            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            context.clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        }, 100);
    });
});
