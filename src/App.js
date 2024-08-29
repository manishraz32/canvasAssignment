import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Image, Text, Transformer } from 'react-konva';
import useImage from 'use-image';
import Konva from 'konva';
import './App.css';
const URLImage = ({ imageUrl }) => {
  const [img] = useImage(imageUrl);
  const imageRef = useRef();
  const trRef = useRef();

  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([imageRef.current]); // take image
      trRef.current.getLayer().batchDraw(); // layer which contain Transformer
    }
  }, [isSelected]);

  return (
    <>
      <Image
        image={img}
        ref={imageRef}
        
        onClick={() => setIsSelected(!isSelected)}
        onTap={() => setIsSelected(!isSelected)}
        onTransformEnd={(e) => {
          const node = imageRef.current; // node reperest image
          const scaleX = node.scaleX(); // resize of image
          const scaleY = node.scaleY();

          node.scaleX(1); // set to the risize image
          node.scaleY(1);

          node.width(Math.max(5, node.width() * scaleX)); // 
          node.height(Math.max(5, node.height() * scaleY));
        }}
      />
      {isSelected && (
        <Transformer // to implement resizing
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 50 || newBox.height < 50) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

const ResizableText = ({ isVisible, setIsVisible, textPosition, setTextPosition }) => {
  const textRef = useRef(); // text ref
  const trRef = useRef();   // text transformer ref
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([textRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    isVisible && (
      <>
        <Text
          ref={textRef}
          text="Resizable Text"
          x={textPosition.x}
          y={textPosition.y}
          fontSize={20}
          draggable
          onClick={() => setIsSelected(!isSelected)}
          onTap={() => setIsSelected(!isSelected)}
          onTransformEnd={(e) => {
            const node = textRef.current; //  takng text node
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            console.log("scaleX", scaleX);

            node.scaleX(1);
            node.scaleY(1);

            node.width(Math.max(30, node.width() * scaleX));  // min width is 30 here
            node.height(Math.max(30, node.height() * scaleY));
          }}
        />
        {isSelected && (
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              if (newBox.width < 30 || newBox.height < 30) {
                return oldBox;
              }
              return newBox;
            }}
          />
        )}
      </>
    )
  );
};

const VideoCanvas = ({ videoRef }) => {
  const videoImageRef = useRef();

  useEffect(() => {
    if (!videoRef.current) return;

    const layer = videoImageRef.current.getLayer();
    const anim = new Konva.Animation(() => {}, layer);

    const handlePlay = () => anim.start();
    const handlePause = () => anim.stop();
    const handleEnded = () => anim.stop();

    videoRef.current.addEventListener('play', handlePlay);
    videoRef.current.addEventListener('pause', handlePause);
    videoRef.current.addEventListener('ended', handleEnded);

    return () => {
      anim.stop();
      videoRef.current.removeEventListener('play', handlePlay);
      videoRef.current.removeEventListener('pause', handlePause);
      videoRef.current.removeEventListener('ended', handleEnded);
    };
  }, [videoRef]);

  useEffect(() => {
    if (!videoRef.current) return;

    if (videoImageRef.current) {
      const layer = videoImageRef.current.getLayer();
      const anim = new Konva.Animation(() => {
        if (videoRef.current && videoRef.current.readyState === 4) {
          videoImageRef.current.image(videoRef.current);
        }
      }, layer);

      anim.start();
      return () => anim.stop();
    }
  }, [videoRef]);

  return <Image ref={videoImageRef} />;
};

const App = () => {
  const [textVisible, setTextVisible] = useState(false);
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const videoRef = useRef(null);

  const toggleText = () => {
    setTextVisible(!textVisible);
  };

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const stopVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const moveText = (direction) => {
    setTextPosition(prevPosition => {
      const step = 10; // Movement step size
      switch (direction) {
        case 'up':
          return { ...prevPosition, y: prevPosition.y - 50 };
        case 'down':
          return { ...prevPosition, y: prevPosition.y + 50 };
        case 'left':
          return { ...prevPosition, x: prevPosition.x - 50};
        case 'right':
          return { ...prevPosition, x: prevPosition.x + 50 };
        default:
          return prevPosition;
      }
    });
  };

  return (
    <div class="main-container">
      <div class="btn-container">
          <button onClick={toggleText}>
            {textVisible ? 'Remove Text' : 'Add Text'}
          </button>
          <button onClick={playVideo}>Play Video</button>
          <button onClick={pauseVideo}>Pause Video</button>
          <button onClick={stopVideo}>Stop Video</button>
          <button onClick={() => moveText('up')}>Move Text Up</button>
          <button onClick={() => moveText('down')}>Move Text Down</button>
          <button onClick={() => moveText('left')}>Move Text Left</button>
          <button onClick={() => moveText('right')}>Move Text Right</button>
      </div>
      <Stage width={500} height={500}>
        <Layer>
          <URLImage imageUrl="https://fastly.picsum.photos/id/523/200/300.jpg?hmac=QriXiPxFy9-cMkF-FT75nsGiR-WfIvH1wg1tYx3fpJA" />
          <ResizableText
            isVisible={textVisible}
            setIsVisible={setTextVisible}
            textPosition={textPosition}
            setTextPosition={setTextPosition}
          />
          <VideoCanvas videoRef={videoRef} />
        </Layer>
      </Stage>
      <video
        ref={videoRef}
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default App;
