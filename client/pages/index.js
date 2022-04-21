import Navbar from "../components/Navbar";
import CallToAction from "../components/CallToAction";

export default function Home() {
    const [loginOpen, toggleLogin] = useToggle();

  return (
      <>
        <Navbar openLogin={toggleLogin} />
          <LoginModal auth={auth} isOpen={loginOpen} toggle={toggleLogin} />
        <CallToAction openLogin={toggleLogin} />
      </>

  )
}
