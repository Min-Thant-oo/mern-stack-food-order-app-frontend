import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '../ui/button'
import UsernameMenu from './UsernameMenu';
import { Link } from 'react-router-dom';

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <span>Loading...</span>;
  }
  return (
    <nav className="flex space-x-2 items-center gap-x-2">
      {isAuthenticated 
        ? (
          <>
            <Link to='/order-status'className="font-bold text-gray-700 hover:text-orange-500 transition-colors duration-300">
              Orders
            </Link>
            <UsernameMenu />
          </>
        )
        : <Button 
            variant='outline' 
            className='font-bold text-orange-500 border-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-300'
            onClick={async () => await loginWithRedirect()}
          >
              Log In
          </Button>
      }
    </nav>
  )
}

export default MainNav