import { Center, Text} from 'native-base'
import Logo from '../assets/logo.svg'
import { Button } from '../components/Button'

export function SignIn() {
  return (
    <Center flex={1} bgColor='gray.900'>
       <Logo />

      <Button 
        title='ENTRAR COM O GOOGLE' 
      />
    </Center>
  )
}