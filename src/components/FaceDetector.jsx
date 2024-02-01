"use client"
// import { FaceDetection } from "face-api.js";
import { useEffect, useRef, useState, useCallback } from "react";
const FaceDetector = ({ width = "300px", height = "300px", maxInterval = "5000", onNoPerson = () => { } }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const timerRef = useRef(null);

    useEffect(() => {
        let faceapi;
        const ml5 = require('ml5');
        const video = videoRef.current;
        const canvas = canvasRef.current;;
        video.insertAdjacentElement('afterend', canvas);
        const context = canvas.getContext('2d');
        const startWebcam = () => {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then(stream => {
                    video.srcObject = stream;
                }).catch(err => { console.error(err) })
        }
        startWebcam();
        const detectionOptions = {
            withLandmarks: true,
            withDescriptors: false,
        };
        const drawBox = (detections, context) => {
            for (let i = 0; i < detections.length; i += 1) {
                const alignedRect = detections[i].alignedRect;
                const x = alignedRect._box._x;
                const y = alignedRect._box._y;
                const boxWidth = alignedRect._box._width;
                const boxHeight = alignedRect._box._height;
                // 设置矩形边框样式
                context.strokeStyle = 'rgb(161, 95, 251)';
                context.lineWidth = 2;
                // 绘制矩形
                context.beginPath();
                context.rect(x, y, boxWidth, boxHeight);
                context.stroke();
            }
        }
        const handleResults = (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            if (result && result.length > 0) {
                drawBox(result, context);
                clearTimeout(timerRef.current);
                timerRef.current = null;
            } else {
                if (timerRef.current == null) {
                    timerRef.current = setTimeout(onNoPerson, maxInterval * 1000);
                }
            }
            faceapi.detect(handleResults);
        }
        faceapi = ml5.faceApi(
            video,
            detectionOptions,
            () => {
                faceapi.detect(handleResults);
            }
        );
        return () => {
            // 在组件卸载时执行一些清理操作，例如停止视频流
            if (video.srcObject) {
                const tracks = video.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
            clearTimeout(timerRef.current);
        };
    }, [])
    return (
        <div>
            <video className="absolute opacity-0" ref={videoRef} autoPlay muted id="video" width={width} height={height}></video>
            <canvas width={width} height={height} ref={canvasRef}></canvas>
        </div >
    )
}

export default FaceDetector;