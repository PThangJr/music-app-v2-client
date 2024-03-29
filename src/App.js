import React from 'react';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import Header from './components/Header';
import ModalSidebar from './components/ModalSidebar';
import ScrollToTop from './components/ScrollToTop';
import Player from './features/Player';
import Playlist from './features/Playlist';
import { setDisplayPlaylist } from './features/Playlist/displayPlaylistSlice';
import Video from './features/Video';
import { setDisplayVideo } from './features/Video/displayVideoSlice';
import AlbumsPage from './pages/albums';
import AlbumDetailPage from './pages/albums/album_detail';
import AlbumGroupsPage from './pages/album_groups';
import AuthsPage from './pages/auths';
import LoginPage from './pages/auths/login';
import RegisterPage from './pages/auths/register';
import CategoriesPage from './pages/categories';
import CategoryDetail from './pages/categories/category_detail';
import FavoritesPage from './pages/favorites';
import HomePage from './pages/home';
import RankPage from './pages/rank';
import RefreshPage from './pages/refresh';
import SearchPage from './pages/search';
import SingersPage from './pages/singers';
import SingerDetail from './pages/singers/singer_detail';
import SongsPage from './pages/songs';
import SongDetailPage from './pages/songs/song_detail';
import './scss/base.scss';
import './scss/grid.scss';
const App = () => {
  //************Declaration***********
  const dispatch = useDispatch();
  //************Initial state*********

  //************Side effect***********

  //***********Get data from store*****************
  const displayPlaylist = useSelector((state) => state.displayPlaylist);
  const displayVideo = useSelector((state) => state.displayVideo);
  const playlist = useSelector((state) => state.playlist);
  //***********Handle event**************
  const handleCloseVideo = () => {
    dispatch(setDisplayVideo(false));
    // dispatch(setIsPlayingVideo(false));
  };
  const getSingerNames = useMemo(() => {
    if (playlist.currentSong?.singers) {
      return playlist.currentSong.singers.reduce((acc, cur, index) => {
        if (index > 0) {
          return `${acc} ft ${cur.name}`;
        }
        return `${acc}${cur.name}`;
      }, '');
    }
  }, [playlist.currentSong?.singers]);
  //***********Render UI*****************

  return (
    <>
      {/* Head */}
      <Helmet>
        <title>
          {playlist.currentSong?.name ? `${playlist.currentSong.name} - ${getSingerNames}` : 'Music 4u - Music for you'}
        </title>
      </Helmet>
      {/* Body  */}
      <div className="app">
        <ScrollToTop />
        <ToastContainer autoClose={2000} icon={false} />
        <Header />
        <div className="main" id="main">
          <div className="container-md">
            <Routes>
              <Route path="/" element={<HomePage />}></Route>

              <Route path="/auths">
                <Route
                  index
                  element={
                    <AuthsPage>
                      <LoginPage />
                    </AuthsPage>
                  }
                ></Route>
                <Route
                  path="login"
                  element={
                    <AuthsPage>
                      <LoginPage />
                    </AuthsPage>
                  }
                ></Route>
                <Route
                  path="register"
                  element={
                    <AuthsPage>
                      <RegisterPage />
                    </AuthsPage>
                  }
                ></Route>
              </Route>

              <Route path="/bai-hat">
                <Route index element={<SongsPage />} />
                <Route path=":slug" element={<SongDetailPage />} />
              </Route>
              <Route path="/bang-xep-hang" element={<RankPage />}></Route>

              <Route path="/ca-si">
                <Route index element={<SingersPage />}></Route>
                <Route path=":slug" element={<SingerDetail />}></Route>
              </Route>
              <Route path="/albums">
                <Route index element={<AlbumsPage />} />
                <Route path=":slug" element={<AlbumDetailPage />}></Route>
                <Route path="album_groups/:slug" element={<AlbumGroupsPage />} />
              </Route>
              <Route path="/the-loai">
                <Route index element={<CategoriesPage />} />
                <Route path=":slug" element={<CategoryDetail />}></Route>
              </Route>
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/refresh" element={<RefreshPage />} />
            </Routes>
          </div>
          {/* {currentSong.videoId && <YouTube videoId={currentSong.videoId} />} */}
          <Player />

          <ModalSidebar
            direction="right-to-left"
            isOpen={displayPlaylist}
            onClose={() => dispatch(setDisplayPlaylist(false))}
            className="sidebar-playlist"
          >
            <Playlist />
          </ModalSidebar>
          <ModalSidebar
            direction="bottom-to-top"
            isOpen={displayVideo}
            onClose={handleCloseVideo}
            className="modal-sidebar--video"
          >
            <Video />
          </ModalSidebar>
        </div>
      </div>
    </>
  );
};

export default App;
