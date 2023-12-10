import { useLocation, Navigate   } from 'react-router-dom'
import { isAuthenticated } from './auth-helper'


//Utilizes React Router's useLocation to get the current location
function PrivateRoute({ children }){
          
    let location = useLocation();

    //Used isAuthenticated from auth-helper to determine whether to allow access.
    // Redirects to the sign-in page if not authenticated.
    if(!isAuthenticated()){
        return <Navigate to="/users/signin" state={{ from: location.pathname}} />
    }

    return children
}

export default PrivateRoute