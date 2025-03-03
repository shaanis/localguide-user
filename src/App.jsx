import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './user/pages/Home'
import Auth from './user/pages/Auth'; // Example additional page
import Places from './user/pages/Places';
import DetailPlace from './user/pages/DetailPlace';
import Favorites from './user/pages/Favorites';
import Events from './user/pages/Events';
import Hotels from './user/pages/Hotels';
import EventDetailPage from './user/pages/EventDetailPage';
import { ToastContainer } from 'react-toastify';
import TicketsPage from './user/pages/TicketsPage';

function App() {
  return (
   
      <>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path="/places" element={<Places />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth insideRegister={true} />} />
          <Route path='/detailPlace/:id' element={<DetailPlace/>}></Route>
          <Route path='events/:id/detail-events' element={<EventDetailPage/>}></Route>
          <Route path='/favourites' element={<Favorites/>}></Route>
          <Route path='/tickets' element={<TicketsPage/>}></Route>
          <Route path='/events' element={<Events/>}></Route>
          <Route path='/hotels' element={<Hotels/>}></Route>
        </Routes>

        <ToastContainer autoClose={3000}/>
      </>
    
  );
}

export default App;
