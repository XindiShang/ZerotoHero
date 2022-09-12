import './register.scss';

const Register = () => {
  return (
    <div className='register'>
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Faceybook</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on Faceybook.
          </span>
        </div>
        <div className="registerRight">
          <div className="registerBox">
            <input placeholder="Username" className="registerInput" />
            <input placeholder="Email" className="registerInput" />
            <input placeholder="Password" className="registerInput" />
            <input placeholder="Password Again" className="registerInput" />
            <button className="registerButton">Sign Up</button>
            <span className="registerForgot">Forgot Password?</span>
            <button className="registerRegisterButton">Log Into Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
