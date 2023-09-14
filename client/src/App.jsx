import { useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { Navigate, Routes, Route } from 'react-router-dom';
import { fetchUser } from './store/actions/authActions';
import PropTypes from 'prop-types';

const FrontPage = lazy(() => import('./components/home'))
const ConnectedProfilePage = lazy(() => import('./components/profile'))
const ConnectedItemUploadPage = lazy(() => import('./components/items'))
const XrHitModelContainer = lazy(() => import('./components/ar/XrHitModelContainer'))

//custom functional component for using suspense with imported component
const ComponentWithSuspense = ({ component: Component }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

ComponentWithSuspense.propTypes = {
  component: PropTypes.elementType.isRequired
};

function App({ user, fetch_user }) {
  
  useEffect(() => {
    fetch_user(); 
  }, [fetch_user])

  if (user === null) { return <div>Loading...</div> }
  
  //protected routes
  return (
    <Routes>
      <Route exact path="/" element={<ComponentWithSuspense component={FrontPage} />} />
      <Route path="/profile" element={user ? <ComponentWithSuspense component={ConnectedProfilePage} /> : <Navigate to="/" />} />
      <Route path="/items" element={user ? <ComponentWithSuspense component={ConnectedItemUploadPage} /> : <Navigate to="/" />} />
      <Route path="/ar/:userId" element={<ComponentWithSuspense component={XrHitModelContainer} />} />
    </Routes>
  )
}

const mapDispatchToProps = (dispatch) => ({ fetch_user:() => dispatch(fetchUser()) })

const mapStateToProps = (state) => ({ user: state })

App.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  fetch_user: PropTypes.func.isRequired
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;

