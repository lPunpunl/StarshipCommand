import { Magnifier } from 'react-image-magnifiers';

export const ReactMagnifierImage = ({ src, alt = '', width = '100%', height = 'auto' }) => {
  return (
    <div style={{ maxWidth: '600px', margin: '0 1px', marginBottom: '0px', border:'0px solid #00000080', borderRadius: '4px'}}>
      <Magnifier
        imageSrc={src}
        imageAlt={alt}
        largeImageSrc={src} // puede ser una imagen de mayor resolución si tienes una
        dragToMove={true}
        mouseActivation="click" // clic para activar
        touchActivation="tap"   // tap para activar en móvil
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
