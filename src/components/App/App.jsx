import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { fetchImages } from 'components/App/services/api';
import Loader from 'components/Loader/Loader';
import Searchbar from 'components/Searchbar/Searchbar';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import ImageGallery from 'components/ImageGallery/ImageGallery';

const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [modalImg, setModalImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [onLoadMore, setOnLoadMore] = useState(false);

  const showLoader = () => {
    setIsLoading(true);
  };
  const hideLoader = () => {
    setIsLoading(false);
  };

  const onSearchSubmit = evt => {
    evt.preventDefault();
    const query = evt.target.elements.query.value.trim().toLowerCase();
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    if (!query) return;

    const loadImages = async () => {
      showLoader();
      try {
        const { hits, onLoadMore } = await fetchImages(query, page);
        if (hits.length === 0) {
          throw new Error('No images found. Please try a different query.');
        }
        setImages(prevImages => [...prevImages, ...hits]);
        setOnLoadMore(onLoadMore);
      } catch (error) {
        toast.error(error.message);
      } finally {
        hideLoader();
      }
    };

    loadImages();
  }, [query, page]);

  const onImageClick = image => {
    setModalImg(image);
  };

  const onCloseModal = () => {
    setModalImg(null);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
        background: 'rgb(242, 245, 252)',
      }}
    >
      <Searchbar onSearchSubmit={onSearchSubmit} />
      <Loader isLoading={isLoading} />
      <ToastContainer />
      <ImageGallery images={images} onImageClick={onImageClick} />
      {onLoadMore && images.length > 0 && (
        <Button onClick={() => setPage(prevPage => prevPage + 1)} />
      )}
      {modalImg && <Modal {...modalImg} onCloseModal={onCloseModal} />}
    </div>
  );
};

export default App;
