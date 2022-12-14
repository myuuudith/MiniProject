import './App.css';
import './Login.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { Container, Navbar,} from 'react-bootstrap';

function App() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, 'Minimum 8 characters')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Minimum 8 characters')
        .required('Required'),
    }),
    onSubmit: values => {
      console.log(values)
      // Movie DB auth step 1
      axios.get(`${process.env.REACT_APP_BASEURL}authentication/token/new?api_key=${process.env.REACT_APP_APIKEY}`)
        .then(response => {
          const requestToken = response.data.request_token
          console.log(requestToken);
          axios.post(`${process.env.REACT_APP_BASEURL}authentication/token/validate_with_login?api_key=${process.env.REACT_APP_APIKEY}`,
            {
              username: values.username, 
              password: values.password, 
              request_token: requestToken
            }).then(res => {
              const validatedRequestToken = res.data.request_token
              console.log(validatedRequestToken);
              axios.post(`${process.env.REACT_APP_BASEURL}authentication/session/new?api_key=${process.env.REACT_APP_APIKEY}`,
                {
                  request_token: validatedRequestToken
                }).then(res => {
                  const sessionID = res.data.session_id
                  console.log(sessionID);
                  localStorage.setItem('session', sessionID)
                  navigate('/home');
                })
            })
        })
    },
  });

  //--------------------------------------------------

  return (
    <>
  <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
        <Nav defaultActiveKey="/" as="ul">
          <Navbar.Brand href="/home">Home</Navbar.Brand>
          <Navbar.Brand href="/home">Trending</Navbar.Brand>
          
          <Navbar.Toggle aria-controls='navbarScroll'>
          </Navbar.Toggle>

          {/* <NavLink href="/Login" style={{ color: 'red', fontSize: 20 }}>Login</NavLink> */}
          
          </Nav>
          </Container>
          </Navbar>

    <form onSubmit={formik.handleSubmit}>
      <label
        style={{ color: 'red', fontSize: 20 }}
        className='label-username'
        htmlFor="username"
      >
        Username
      </label>
      <input
        id="username"
        name="username"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.username}
      />
      {formik.touched.username && formik.errors.username ? (
        <div style={{ color: 'red' }}>{formik.errors.username}</div>
      ) : null}
      <br />
      <label htmlFor="password">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}
      <br />
      <button type="submit">Login</button>
      
    </form >
    </>
  );
}

export default App;
