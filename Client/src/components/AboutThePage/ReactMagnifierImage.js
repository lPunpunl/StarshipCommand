import { Magnifier } from 'react-image-magnifiers';

export const ReactMagnifierImage = ({ src, alt = '', width = '100%', height = 'auto' }) => {
  return (
    <div style={{ maxWidth: '600px', margin: '0 1px', padding: '0px 0'}}>
      <Magnifier
        imageSrc={src}
        imageAlt={alt}
        largeImageSrc={src} 
        dragToMove={true}
        mouseActivation="doubleClick" 
        touchActivation="doubleTap"   
        interactionSettings={{
          tapDuration: 250,
          longTapDuration: 500,
          doubleClickSpeed: 300,
        }}
        style={{ width, height }}
      />
    </div>
  );
};
