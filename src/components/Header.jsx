import { HStack ,Button} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import React from 'react';

const Header = () => {
  return <HStack p={'4'} shadow={'base'} bgColor={'blackAlpha.900'}> 

{/* Home */}
  <Button variant={'unstyled'} color={'white'}>
     <Link to='/'>Home</Link>
  </Button>


{/* Exchanges */}
<Button variant={'unstyled'} color={'white'}>
     <Link to='/exchanges'>Exchanges</Link>
  </Button>

{/* Coins */}
<Button variant={'unstyled'} color={'white'}>
     <Link to='/coins'>Coins</Link>
  </Button>



  </HStack> 
  

}

export default Header