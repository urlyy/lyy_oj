import React, { useRef, useState } from 'react';

const Draggable = ({ children, initialX = 0, initialY = 0 }) => {
    const [position, setPosition] = useState({ x: initialX, y: initialY });
    const ref = useRef(null);
    const offsetXRef = useRef(null);
    const offsetYRef = useRef(null);

    const handleMouseDown = (event) => {
        const { clientX, clientY } = event;
        const { left, top } = ref.current.getBoundingClientRect();

        const offsetX = clientX - left + window.scrollX;
        const offsetY = clientY - top + window.scrollY;

        offsetXRef.current = offsetX;
        offsetYRef.current = offsetY;

        const handleMouseMove = (event) => {
            const { clientX, clientY } = event;
            const newX = clientX - offsetXRef.current;
            const newY = clientY - offsetYRef.current;

            // 获取组件的尺寸
            const { width, height } = ref.current.getBoundingClientRect();
            // 获取屏幕的尺寸
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            console.log(newY, height, screenHeight);
            // 边界检查，确保组件不会移出屏幕范围
            if (newX >= 0 && newX + width <= screenWidth && newY >= 0 && newY + height <= screenHeight) {
                setPosition({ x: newX, y: newY });
            }
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <div
            ref={ref}
            style={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: 'grab',
                userSelect: 'none',
                zIndex: 100,
                // Add more styles for your component  
            }}
            onMouseDown={handleMouseDown}
        >
            {children}
        </div>
    );
};

export default Draggable;
